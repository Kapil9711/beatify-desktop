import { Button } from '@heroui/react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '../components/ui/breadcrumb'
import { ReactNode, useEffect, useMemo, useState } from 'react'

const useBreadCrumb = ({
  path
}: {
  path: string
}): { BreadCrumbJsx: ReactNode; activeTab: string } => {
  const [activeTab, setActiveTab] = useState<string>('')

  if (path.endsWith('/')) path = path.slice(0, path.length - 1)
  let breadCrumbItems: string[] = []
  switch (path) {
    case '/dashboard':
      breadCrumbItems = ['All', 'Songs', 'Albums', 'Playlist']
      break
    default:
      breadCrumbItems = ['Default']
  }

  useEffect(() => {
    setActiveTab(breadCrumbItems[0])
  }, [path])

  const BreadCrumbJsx: ReactNode = useMemo(() => {
    const BreadCrumb: React.FC = () => {
      return (
        <div>
          <Breadcrumb>
            <BreadcrumbList className="phone:!gap-2 !gap-5">
              {breadCrumbItems.map((item: string) => {
                return (
                  <Button
                    key={item}
                    onPress={() => {
                      setActiveTab(item)
                    }}
                    className={activeTab == item ? 'hover:animate-tilt' : 'hover:animate-tilt'}
                    size="sm"
                    color="primary"
                    // variant="ghost"
                    variant={activeTab == item ? 'solid' : 'ghost'}
                  >
                    {item}
                  </Button>
                  // <ModernAnimatedButton text={item} />
                )
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      )
    }
    return <BreadCrumb />
  }, [path, activeTab])

  return { BreadCrumbJsx, activeTab }
}

export default useBreadCrumb
