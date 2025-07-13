import { Outlet } from 'react-router-dom'
import AuthProvider from './providers/authProvider'
import ThemeProvider from './providers/themeProvider'

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <div className="electron-app">
          <header className="electron-titlebar">{/* Custom title bar */}</header>
          <main>
            <Outlet />
          </main>
        </div>
      </ThemeProvider>
    </AuthProvider>
  )
}
