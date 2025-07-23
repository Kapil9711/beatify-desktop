import { Button } from '@heroui/react'
import { useBreadCrumbContext } from '@renderer/providers/breadcrumbProvider'

const songs = [
  {
    id: '507f1f77bcf86cd799439011',
    name: 'Bohemian Rhapsody',
    duration: '5:55',
    artistImage: 'https://example.com/artists/queen.jpg',
    songImage: 'https://example.com/covers/bohemian-rhapsody.jpg',
    downloadUrl: [
      {
        low: 'https://example.com/songs/123/low.mp3',
        medium: 'https://example.com/songs/123/medium.mp3',
        high: 'https://example.com/songs/123/high.mp3',
        veryHigh: 'https://example.com/songs/123/very-high.mp3'
      }
    ],
    playCount: 1000000,
    language: 'English'
  }
]
// bg-[url('https://c.saavncdn.com/598/Saiyaara-Hindi-2025-20250703061754-500x500.jpg')]
const Explore = () => {
  return (
    <div className="h-full bg-cover relative bg-center py-5 px-5  overflow-scroll scrollbar-hide">
      <div className="absolute  inset-0 bg-gradient-to-b from-white/10 via-white/5 to-white/0 backdrop-blur-md backdrop-saturate-150   flex items-center justify-center text-white text-2xl font-bold flex-col   "></div>
      <div>
        <div className="top  mt-10 relative   flex-1  flex gap-10  ">
          <div className="left flex-1 relative z-10">
            <p className="text-gray-500">Trending New Hits</p>
            <div className="pl-10 mt-5">
              <h1 className="text-gray-500 text-[70px] phone:text-[60px] font-bold">Bam Bam</h1>
              <div className="flex gap-3 items-center mt-2">
                <p className="text-gray-500 font-semibold">Camila Cabello</p>
                <p className="text-gray-400 text-sm">63 Million Plays</p>
              </div>
              <div className="mt-14 flex gap-4 items-center">
                <Button radius="none" className="!rounded-[40px]" size="lg" color="primary">
                  Listen Now
                </Button>
                <Button
                  size="lg"
                  isIconOnly
                  className="!rounded-[100%] bg-transparent border-2 border-primary"
                >
                  heart
                </Button>
              </div>
            </div>
          </div>
          <div className=" hidden right  desktop:flex justify-end bg-[url('https://c.saavncdn.com/598/Saiyaara-Hindi-2025-20250703061754-500x500.jpg')] bg-cover h-[40vh] w-[500px] relative rounded-md"></div>
        </div>
        <div className="bottom desktop:mt-[-50px] mt-5    p-5  flex-1 relative z-10 desktop:bg-bg mx-[-20px] px-5">
          <div className="absolute hidden inset-0 bg-gradient-to-b from-white/5 via-white/2 to-white/0 backdrop-blur-md backdrop-saturate-150   desktop:flex items-center justify-center text-white text-2xl font-bold flex-col   "></div>
          <div className="flex gap-5 flex-1 h-[47vh] desktop:h-[45vh] relative z-10">
            <div className="flex gap-5 flex-col flex-1 ">
              <div className=" flex-1 bg-card"></div>
              <div className=" flex  flex-1 gap-5  ">
                <div className=" flex-1 bg-card"></div>
                <div className=" flex-1 bg-card"></div>
              </div>
            </div>
            <div className=" w-[320px] bg-card phone:hidden"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Explore
