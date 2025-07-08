import { Outlet } from 'react-router-dom'
import AuthProvider from './providers/authProvider'

export default function App() {
  return (
    <AuthProvider>
      <div className="electron-app">
        <header className="electron-titlebar">{/* Custom title bar */}</header>
        <main>
          <Outlet />
        </main>
      </div>
    </AuthProvider>
  )
}
