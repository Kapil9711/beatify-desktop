import * as React from 'react'
import { AudioWaveform, Command, GalleryVerticalEnd, SquareTerminal } from 'lucide-react'

import { NavMain } from './nav-main'

import { NavUser } from './nav-user'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
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
  menu: [
    {
      title: 'Explore',
      url: '/dashboard',
      icon: SquareTerminal,
      isActive: true
    },
    {
      title: 'Genres',
      url: '/dashboard/genres',
      icon: SquareTerminal,
      isActive: true
    },

    {
      title: 'Artist',
      url: '/dashboard/artist',
      icon: SquareTerminal,
      isActive: true
    }

    // {
    //   title: 'Settings',
    //   url: '#',
    //   icon: Settings2,
    //   items: [
    //     {
    //       title: 'General',
    //       url: '#'
    //     },
    //     {
    //       title: 'Team',
    //       url: '#'
    //     },
    //     {
    //       title: 'Billing',
    //       url: '#'
    //     },
    //     {
    //       title: 'Limits',
    //       url: '#'
    //     }
    //   ]
    // }
  ],
  library: [
    {
      title: 'Recent',
      url: '/dashboard/recent',
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
      title: 'Favourites',
      url: '/dashboard/favorites',
      icon: SquareTerminal,
      isActive: true
    },
    {
      title: 'Local',
      url: '/dashboard/local',
      icon: SquareTerminal,
      isActive: true
    }
  ],

  utlities: [
    {
      title: 'Project-Manager',
      url: '/dashboard/project-manager',
      icon: SquareTerminal,
      isActive: true
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
          className="w-[100vw] h-[100vh] bg-black opacity-[.7] z-10 absolute left-0 desktop:hidden"
        ></div>
      )}
      <Sidebar className="relative bg-sidebar !border-none" collapsible="icon" {...props}>
        <SidebarHeader>
          <div className="mt-2 flex justify-around">
            <h1 className=" relative uppercase font-bold tracking-wide text-xl">Beatify</h1>
            <SidebarTrigger className="desktop:hidden tablet:ml-14 phone:ml-8" />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={data.menu} mainTitle="MENU" />
          <NavMain items={data.library} mainTitle="Library" />
          <NavMain items={data.utlities} mainTitle="Utility" />

          {/* <NavMain items={data.dashboard} /> */}

          {/* <NavProjects projects={data.projects} /> */}
        </SidebarContent>
        <SidebarFooterWithAuthData />
        {/* <SidebarRail /> */}
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
