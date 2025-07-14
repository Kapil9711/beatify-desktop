import useBreadCrumb from '@renderer/hooks/useBreadCrumb'
import { createContext, ReactNode, useContext, useMemo } from 'react'
import { useLocation } from 'react-router-dom'

interface BreadCrumbContext {
  breadCrumbData: ReactNode
  activeTab: string
}

const BreadCrumbContext = createContext<BreadCrumbContext | null>(null)
export const useBreadCrumbContext = () => useContext(BreadCrumbContext)

const BreadCrumbProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const location = useLocation()
  const { BreadCrumbJsx, activeTab } = useBreadCrumb({ path: location.pathname })
  const value: BreadCrumbContext = useMemo(() => {
    return { breadCrumbData: BreadCrumbJsx, activeTab }
  }, [location.pathname, BreadCrumbJsx, activeTab])
  return <BreadCrumbContext.Provider value={value}>{children}</BreadCrumbContext.Provider>
}

export default BreadCrumbProvider
