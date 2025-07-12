import { localStorageUtils } from '@renderer/utils/localStorageUtils'
import { useEffect, useState } from 'react'

// ************************types********************************
export interface LocalFiles {
  handlePickFolder: () => Promise<void>
  isFileExist: (path: string) => Promise<boolean>
  localFolderArray: string[]
}

export const useLocalFiles = (): LocalFiles => {
  const [localFolderArray, setLocalFolderArray] = useState<string[]>([])

  //   **************************effects************************

  useEffect(() => {
    const handleLocalFolderExist = async () => {
      const existedLocalFolder = localStorageUtils.get<string[]>('localFolder')
      let localFolderAfterCheck: string[] = []
      if (!existedLocalFolder) return

      existedLocalFolder.forEach(async (item: string) => {
        if (await isFileExist(item)) {
          localFolderAfterCheck.push(item)
        }
      })
      localStorageUtils.set<string[]>('localFolder', localFolderAfterCheck)
      setLocalFolderArray(localFolderAfterCheck)
    }
    handleLocalFolderExist()
  }, [])

  //   ****************handlers*******************

  const handlePickFolder = async () => {
    const folderPath = await window.api.selectFolder()
    if (folderPath) {
      console.log('Selected folder:', folderPath)

      if (await isFileExist(folderPath)) {
        setLocalFolderArray((prev: string[]) => [...prev, folderPath])
        const prevArr = localStorageUtils.get<string[]>('localFolder')
        if (prevArr) {
          if (!prevArr.includes(folderPath)) {
            localStorageUtils.set('localFolder', [...prevArr, folderPath])
          }
        } else {
          localStorageUtils.set<string[]>('localFolder', [folderPath])
        }
      }
    } else {
      console.log('User cancelled folder selection.')
    }
  }
  const isFileExist = async (path: string) => {
    return await window.api.isPathExist(path)
  }

  return { handlePickFolder, isFileExist, localFolderArray }
}
