import { Outlet } from 'react-router-dom'
import AuthProvider from './providers/authProvider'
import ThemeProvider from './providers/themeProvider'
import BreadCrumbProvider from './providers/breadcrumbProvider'

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BreadCrumbProvider>
          <div className="electron-app">
            <header className="electron-titlebar">{/* Custom title bar */}</header>
            <main>
              <Outlet />
            </main>
          </div>
        </BreadCrumbProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}
