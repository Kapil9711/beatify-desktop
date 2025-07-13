import { ReactNode } from 'react'
import { AppSidebar } from '../../components/sidebar/app-sidebar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '../../components/ui/breadcrumb'
import { Separator } from '../../components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '../../components/ui/sidebar'
import { useThemeContext } from '@renderer/providers/themeProvider'

function SideBar() {
  return (
    <>
      <AppSidebar className="desktop:w-56 tablet:w-56 phone:w-52 " />
    </>
  )
}

const DashboardLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const themeContextData = useThemeContext()
  return (
    <div className="flex ">
      <SidebarProvider>
        <div className="relative z-50">
          <SideBar />
        </div>
        <div className="flex-1 ">
          <SidebarInset className="max-h-[100vh] bg-bg ">
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 ">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator
                  orientation="vertical"
                  className="mr-2 data-[orientation=vertical]:h-4"
                />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">Building Your Application</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>

                <button
                  className="rounded-full bg-card p-2"
                  onClick={() => themeContextData?.switchTheme()}
                >
                  SwitchTheme
                </button>
              </div>
            </header>
          </SidebarInset>

          <div className="bg-bg min-h-[calc(100vh-67px)] phone:px-2 tablet:px-3 desktop:px-5 py-5">
            {children}
          </div>
        </div>
      </SidebarProvider>
    </div>
  )
}
export default DashboardLayout
