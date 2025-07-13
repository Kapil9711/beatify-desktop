import { Button } from '@heroui/react'
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
      className={`flex h-[100vh] w-[100vw] justify-center items-center bg-bg `}
    >
      <AuthContext value={data}>
        <Button onPress={() => themeContextData?.switchTheme()}>SwitchTheme</Button>
        <Outlet />
      </AuthContext>
    </div>
  )
}

export default AuthLayout
