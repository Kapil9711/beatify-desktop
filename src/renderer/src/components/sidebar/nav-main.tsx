'use client'

import { ChevronRight, type LucideIcon } from 'lucide-react'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@renderer/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from '@renderer/components/ui/sidebar'
import { useLocation, useNavigate } from 'react-router-dom'

export function NavMain({
  items,
  mainTitle = 'Media'
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
  mainTitle?: string
}) {
  const location = useLocation()
  const currPath = location.pathname.toLowerCase()
  const navigate = useNavigate()

  const handleNavigate = (url: string) => navigate(url)

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{mainTitle}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  onClick={() => {
                    if (item.url) handleNavigate(item?.url)
                  }}
                  className={`hover:bg-green-300 ${(currPath == '/dashboard' && item.title == 'Home') || currPath.includes(item.title.toLowerCase()) ? 'bg-green-400' : ''} `}
                  tooltip={item.title}
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  {item.items && (
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  )}
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton
                        onClick={() => {
                          if (subItem.url) handleNavigate(subItem?.url)
                        }}
                        className={`hover:bg-green-300 ${(currPath == '/dashboard' && item.title == 'Home') || currPath.includes(subItem.title.toLowerCase()) ? 'bg-green-400' : ''} `}
                        asChild
                      >
                        <span>{subItem.title}</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
