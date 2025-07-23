import useAuth from '@renderer/container/auth/hook'
import { useThemeContext } from '@renderer/providers/themeProvider'
import { useAuthReturn } from '@renderer/types/formType'
import { createContext, useContext } from 'react'
import { Outlet } from 'react-router-dom'
const AuthContext = createContext<useAuthReturn | null>(null)
export const useAuthContext = () => useContext(AuthContext)

const AuthLayout = () => {
  const data = useAuth()
  const themeContextData = useThemeContext()
  return (
    <div
      // style={{ backgroundImage: `url(${images?.backgroundImage})` }}
      className={`flex h-[100vh] w-[100vw] relative justify-center items-center bg-bg `}
    >
      <AuthContext value={data}>
        <div className="absolute top-5">
          <button
            className="rounded-full bg-card p-2"
            onClick={() => themeContextData?.switchTheme()}
          >
            SwitchTheme
          </button>
        </div>

        <Outlet />
      </AuthContext>
    </div>
  )
}

export default AuthLayout
