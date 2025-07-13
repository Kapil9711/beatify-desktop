import { Button } from '@heroui/react'
import HorizontalSlider from '@renderer/components/horizontalSlider'
import { useLocalFileContext } from '@renderer/pages/dashborad/local'
import { generalUtil } from '@renderer/utils/generalUtility'
import { useEffect, useRef } from 'react'

const LocalContainer = () => {
  const locaFileContextData = useLocalFileContext()

  return (
    <div>
      {locaFileContextData && locaFileContextData.localFolderArray?.length > 0 ? (
        <FolderExist />
      ) : (
        <FolderNotExist />
      )}
    </div>
  )
}

const FolderNotExist = () => {
  const locaFileContextData = useLocalFileContext()
  return (
    <div className="flex justify-center flex-col gap-4 items-center h-[400px] w-100">
      <p>Select a folder</p>
      <Button
        onPress={locaFileContextData?.handlePickFolder}
        size="sm"
        color="primary"
        className=" animate-border-glow"
      >
        Select
      </Button>
    </div>
  )
}

const FolderExist = () => {
  const locaFileContextData = useLocalFileContext()
  const getFormatedFolder = (path: string) => generalUtil.array.last<any>(path.split('/'))
  console.log(locaFileContextData?.scanFolderData, 'folderData')

  const audioRef = useRef(null)

  useEffect(() => {
    const path = '/home/kapil9711/Downloads/Zimmewari (PenduJatt.Com.Se).mp3'

    window.api.getAudioData(path).then((dataUrl) => {
      if (dataUrl) {
        const audio: any = audioRef.current
        audio.src = dataUrl
      } else {
        console.error('❌ Failed to load audio')
      }
    })
  }, [])

  return (
    <HorizontalSlider className="gap-5 p-1">
      <Button
        size="sm"
        color="secondary"
        onPress={() => locaFileContextData?.setSelectedFolder('All')}
        className={
          locaFileContextData?.selectedFolder == 'All'
            ? 'animate-pulse hover:animate-tilt'
            : 'hover:animate-tilt'
        }
        variant={locaFileContextData?.selectedFolder == 'All' ? 'solid' : 'bordered'}
      >
        All
      </Button>
      {locaFileContextData?.localFolderArray?.map((item: string) => {
        return (
          <Button
            size="sm"
            color="secondary"
            variant={
              locaFileContextData?.selectedFolder == getFormatedFolder(item) ? 'solid' : 'bordered'
            }
            className={`hover:animate-tilt px-1 ${locaFileContextData?.selectedFolder == getFormatedFolder(item) ? 'animate-pulse' : ''}`}
            onPress={() => locaFileContextData.setSelectedFolder(getFormatedFolder(item))}
          >
            {getFormatedFolder(item)}
          </Button>
        )
      })}

      <Button
        onPress={locaFileContextData?.handlePickFolder}
        size="sm"
        // color="secondary"
        className=""
      >
        + Add
      </Button>

      <Button
        onPress={locaFileContextData?.handleRescan}
        size="sm"
        // color="secondary"
        className=""
      >
        Re-scan
      </Button>

      <div key={locaFileContextData?.localFolderArray.length}>
        <audio
          ref={audioRef}
          src={''}
          controls={true}
          autoPlay
          onError={() => console.error('❌ Could not load or play audio')}
        />
      </div>
    </HorizontalSlider>
  )
}

export default LocalContainer
