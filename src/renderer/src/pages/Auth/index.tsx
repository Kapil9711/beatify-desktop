import useAuth from '@renderer/components/auth/hook'
import { images } from '@renderer/data/ImagesAndIcon'
import { useAuthReturn } from '@renderer/types/formType'
import { createContext, useContext } from 'react'
import { Outlet } from 'react-router-dom'
const AuthContext = createContext<useAuthReturn | null>(null)
export const useAuthContext = () => useContext(AuthContext)

const AuthLayout = () => {
  const data = useAuth()
  return (
    <div
      style={{ backgroundImage: `url(${images?.backgroundImage})` }}
      className={`flex h-[100vh] w-[100vw] justify-center items-center bg-cover `}
    >
      <AuthContext value={data}>
        <Outlet />
      </AuthContext>
    </div>
  )
}

export default AuthLayout
