import { createHashRouter } from 'react-router-dom'
import App from './App'
import Home from './pages/Home'
import Settings from './pages/Settings'
import AuthLayout from './pages/Auth'
import SignIn from './pages/Auth/SignIn'
import SignUp from './pages/Auth/SignUp'
import Dashboard from './pages/dashborad'
import LocalPage from './pages/dashborad/local'
import ProjectManagerPage from './pages/dashborad/projectManager'
import ExplorePage from './pages/dashborad/explore'
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
            index: true, // This makes SignIn the default route
            element: <ExplorePage />
          },
          {
            path: 'local',
            element: <LocalPage />
          },
          {
            path: 'project-manager',
            element: <ProjectManagerPage />
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
