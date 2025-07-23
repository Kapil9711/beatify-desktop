import { useBreadCrumbContext } from '@renderer/providers/breadcrumbProvider'

const Explore = () => {
  const breadCrumbContextData = useBreadCrumbContext()
  return (
    <div className="bg-[url('https://c.saavncdn.com/598/Saiyaara-Hindi-2025-20250703061754-500x500.jpg')] h-full bg-cover relative bg-center">
      {breadCrumbContextData?.activeTab}
      <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/10 to-white/30 backdrop-blur-md backdrop-saturate-150 rounded-lg  flex items-center justify-center text-white text-2xl font-bold"></div>
    </div>
  )
}

export default Explore
