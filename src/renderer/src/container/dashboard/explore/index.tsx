import { useBreadCrumbContext } from '@renderer/providers/breadcrumbProvider'

const Explore = () => {
  const breadCrumbContextData = useBreadCrumbContext()
  return <div>{breadCrumbContextData?.activeTab}</div>
}

export default Explore
