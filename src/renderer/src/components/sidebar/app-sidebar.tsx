import * as React from 'react'
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal
} from 'lucide-react'

import { NavMain } from './nav-main'
import { NavProjects } from './nav-projects'
import { NavUser } from './nav-user'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
  useSidebar
} from '@renderer/components/ui/sidebar'
import { useAuthContext } from '@renderer/providers/authProvider'

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg'
  },
  teams: [
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise'
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup'
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free'
    }
  ],
  dashboard: [
    {
      title: 'Home',
      url: '/dashboard',
      icon: SquareTerminal,
      isActive: true
    },
    {
      title: 'Playlist',
      url: '/dashboard/playlist',
      icon: SquareTerminal,
      isActive: true
    },
    {
      title: 'Offline',
      url: '',
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: 'Downloads',
          url: '/dashboard/downloads'
        },
        {
          title: 'Local',
          url: '/dashboard/local'
        }
      ]
    },

    {
      title: 'Settings',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'General',
          url: '#'
        },
        {
          title: 'Team',
          url: '#'
        },
        {
          title: 'Billing',
          url: '#'
        },
        {
          title: 'Limits',
          url: '#'
        }
      ]
    }
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open, setOpen } = useSidebar()
  return (
    <div className="relative max-w-fit">
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="w-[100vw] h-[100vh] bg-gray-950 opacity-50 z-10 absolute left-0 desktop:hidden"
        ></div>
      )}
      <Sidebar className="relative" collapsible="icon" {...props}>
        <SidebarHeader>
          <div className="mt-2 flex justify-around">
            <h1 className=" relative uppercase font-bold tracking-wide text-xl">Beatify</h1>
            <SidebarTrigger className="desktop:hidden tablet:ml-14 phone:ml-8" />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={data.dashboard} />
          {/* <NavMain items={data.dashboard} /> */}

          {/* <NavProjects projects={data.projects} /> */}
        </SidebarContent>
        <SidebarFooterWithAuthData />
        <SidebarRail />
      </Sidebar>
    </div>
  )
}

const SidebarFooterWithAuthData = () => {
  const { user, logout } = useAuthContext() || {}

  return (
    <SidebarFooter>
      <NavUser user={user} logout={logout} />
    </SidebarFooter>
  )
}
