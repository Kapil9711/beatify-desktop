import { ReactNode } from 'react'
import { AppSidebar } from '../../components/sidebar/app-sidebar'

import { Separator } from '../../components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '../../components/ui/sidebar'
import { useThemeContext } from '@renderer/providers/themeProvider'
import { useBreadCrumbContext } from '@renderer/providers/breadcrumbProvider'
import { Button } from '@heroui/react'
import { icons } from '@renderer/data/ImagesAndIcon'
import { useAuthContext } from '@renderer/providers/authProvider'

function SideBar() {
  return (
    <>
      <AppSidebar className="desktop:w-56 tablet:w-56 phone:w-52 " />
    </>
  )
}

const DashboardLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex ">
      <SidebarProvider>
        <div className="relative z-50">
          <SideBar />
        </div>
        <div className="flex-1 ">
          <RightComponent children={children} />
        </div>
      </SidebarProvider>
    </div>
  )
}

// icons

const RightComponent = ({ children }) => {
  const breadCrumbContextData = useBreadCrumbContext()
  return (
    <>
      <SidebarInset className="max-h-[100vh] bg-bg border-b-[1px] border-sidebar">
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 ">
          <div className="flex items-center gap-2 px-4 w-[100%] ">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
            </div>

            {breadCrumbContextData?.breadCrumbData}
            <RightButtons />
          </div>
        </header>
      </SidebarInset>

      <div className="bg-bg h-[calc(100vh-64px)] ">{children}</div>
    </>
  )
}

export const ThemeButton = () => {
  const themeContextData = useThemeContext()
  const { DarkMode, LightMode } = icons

  return (
    <>
      <Button
        size="md"
        radius="none"
        className={
          themeContextData?.activeThemeType == 'dark' ? '!rounded-full bg-card' : '!rounded-full'
        }
        variant="solid"
        isIconOnly
        onPress={() => themeContextData?.switchTheme()}
      >
        {themeContextData?.activeThemeType == 'dark' ? (
          <LightMode size={18} className="text-text" />
        ) : (
          <DarkMode size={18} className="text-text" />
        )}
      </Button>
    </>
  )
}

const RightButtons = () => {
  const authContextData = useAuthContext()
  const { UserIcon, Notification } = icons
  return (
    <div className="flex gap-4 justify-center items-center ml-auto">
      <ThemeButton />
      <Notification size={18} className={'text-text'} />
      <Button
        className="bg-card text-text"
        startContent={
          <div>
            {authContextData?.user?.profileImage ? (
              <img
                className="block h-4 w-4 rounded-sm"
                src={authContextData?.user?.profileImage}
                alt="profile-image"
              />
            ) : (
              <UserIcon size={18} />
            )}
          </div>
        }
      >
        {authContextData?.user?.userName}
      </Button>
    </div>
  )
}

export default DashboardLayout
