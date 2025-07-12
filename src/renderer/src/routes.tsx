import { createHashRouter } from 'react-router-dom'
import App from './App'
import Home from './pages/Home'
import Settings from './pages/Settings'
import AuthLayout from './pages/Auth'
import SignIn from './pages/Auth/SignIn'
import SignUp from './pages/Auth/SignUp'
import Dashboard from './pages/dashborad'
// import NotFound from './pages/NotFound'

export const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    // errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: 'settings', element: <Settings /> },
      {
        path: 'auth',
        element: <AuthLayout />,
        children: [
          {
            index: true, // This makes SignIn the default route
            element: <SignIn />
          },
          {
            path: 'sign-in',
            element: <SignIn />
          },
          {
            path: 'sign-up',
            element: <SignUp />
          }
          // Redirect empty auth to sign-in
          //   {
          //     index: true,
          //     element: <Navigate to="sign-in" replace />
          //   }
        ]
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
        children: [
          {
            path: 'local',
            element: <h1>local</h1>
          },
          {
            path: 'sign-up',
            element: <SignUp />
          }
          // Redirect empty auth to sign-in
          //   {
          //     index: true,
          //     element: <Navigate to="sign-in" replace />
          //   }
        ]
      }
      //   { path: '*', element: <NotFound /> }
    ]
  }
])
