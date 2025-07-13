import useTheme, { Theme } from '@renderer/hooks/useTheme'
import { createContext, ReactNode, useContext } from 'react'

const ThemeContext = createContext<Theme | null>(null)
export const useThemeContext = () => useContext(ThemeContext)

const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const ThemeData = useTheme()
  return <ThemeContext.Provider value={ThemeData}>{children}</ThemeContext.Provider>
}

export default ThemeProvider
