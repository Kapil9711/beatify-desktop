import { Button } from '@heroui/react'
import { useLocalFileContext } from '@renderer/pages/dashborad/local'

const LocalContainer = () => {
  const locaFileContextData = useLocalFileContext()

  return (
    <div>
      {locaFileContextData && locaFileContextData.localFolderArray?.length > 0 ? (
        <>
          <h1>Folder Exists</h1>
          <p>{JSON.stringify(locaFileContextData.localFolderArray)}</p>
        </>
      ) : (
        <>
          <h1>Folder not Exist</h1>
          <Button onPress={locaFileContextData?.handlePickFolder} size="sm" color="primary">
            Select Folder
          </Button>
        </>
      )}
    </div>
  )
}

export default LocalContainer
