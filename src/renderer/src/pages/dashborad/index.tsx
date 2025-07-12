import DashboardLayout from '@renderer/container/dashboard/layout'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  )
}

export default Dashboard
