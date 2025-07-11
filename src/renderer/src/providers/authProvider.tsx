import { ReactNode, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { createContext } from 'react'
import { Spinner } from '@heroui/react'
import axios from 'axios'

export let globalNavigate: any = null

interface AuthContextType {
  user: { userName: string; email: string; profileImage: string; id: string } | null
  login: (token: string) => void
  logout: () => void
}
const AuthContext = createContext<AuthContextType | null>(null)
interface AuthProviderProps {
  children: ReactNode
}
const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null as any)
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
    initializeAuth()
  }, [])

  useEffect(() => {
    globalNavigate = navigate
  }, [navigate])

  const initializeAuth = async () => {
    setLoading(true)
    const token: string = localStorage.getItem('token') || ''

    try {
      const { data } = await axios.get(`http://localhost:5000/api/v1/user`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setUser(data?.data)
      navigate('/dashboard')
    } catch (error) {
      localStorage.setItem('token', '')
      navigate('/auth')
      setUser(null)
    }

    setLoading(false)
  }
  const value = useMemo(() => {
    return {
      user,
      login: (token: string) => {
        localStorage.setItem('token', token)
        initializeAuth()
      },
      logout: () => {
        localStorage.setItem('token', '')
        navigate('/auth')
      }
    }
  }, [user])

  if (location.pathname.includes('auth')) {
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  }

  if (loading) {
    return (
      <div className="h-[100vh] w-[100vw] flex justify-center items-center">
        <Spinner color="success" size="md" />
      </div>
    )
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
