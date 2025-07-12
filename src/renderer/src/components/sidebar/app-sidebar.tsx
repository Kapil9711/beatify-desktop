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
  SidebarTrigger
} from '@renderer/components/ui/sidebar'

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
      url: '#',
      icon: SquareTerminal,
      isActive: true
    },
    {
      title: 'Playlist',
      url: '#',
      icon: SquareTerminal,
      isActive: true
    },
    {
      title: 'Offline',
      url: '#',
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: 'Downloads',
          url: '#'
        },
        {
          title: 'Local Files',
          url: '#'
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
  return (
    <Sidebar collapsible="icon" {...props}>
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
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
