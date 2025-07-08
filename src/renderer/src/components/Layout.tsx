import React, { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ipcRenderer } from 'electron' // For Electron-specific functionality

interface LayoutProps {
  children?: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation()

  // Example Electron IPC communication
  const handleMinimize = () => {
    ipcRenderer.send('window-control', 'minimize')
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900">
      {/* Title Bar (Electron-specific) */}
      <header className="drag-region flex justify-between items-center bg-indigo-600 text-white p-2">
        <div className="no-drag flex space-x-4">
          <Link
            to="/"
            className={`px-3 py-1 rounded ${location.pathname === '/' ? 'bg-indigo-700' : 'hover:bg-indigo-500'}`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`px-3 py-1 rounded ${location.pathname === '/about' ? 'bg-indigo-700' : 'hover:bg-indigo-500'}`}
          >
            About
          </Link>
        </div>
        <div className="no-drag flex space-x-2">
          <button onClick={handleMinimize} className="px-3 py-1 hover:bg-indigo-500 rounded">
            ⎯
          </button>
          <button
            onClick={() => ipcRenderer.send('window-control', 'close')}
            className="px-3 py-1 hover:bg-red-500 rounded"
          >
            ×
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-3 text-center text-sm">
        © {new Date().getFullYear()} My Electron App | Version {process.env.APP_VERSION}
      </footer>
    </div>
  )
}

export default Layout
