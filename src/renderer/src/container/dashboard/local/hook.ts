import { generalUtil } from '@renderer/utils/generalUtility'
import { localStorageUtils } from '@renderer/utils/localStorageUtils'
import { useEffect, useState } from 'react'

// ************************types********************************
export interface LocalFiles {
  handlePickFolder: () => Promise<void>
  isFileExist: (path: string) => Promise<boolean>
  localFolderArray: string[]
  selectedFolder: string
  setSelectedFolder: React.Dispatch<React.SetStateAction<string>>
  scanFolderData: any
  handleRescan: () => void
  // setRescan: React.Dispatch<React.SetStateAction<number>>
}

export const useLocalFiles = (): LocalFiles => {
  const [localFolderArray, setLocalFolderArray] = useState<string[]>([])
  const [selectedFolder, setSelectedFolder] = useState<string>('All')
  const [scanFolderData, setScanFolderData] = useState<any>({})
  const [rescan, setRescan] = useState<number>(1)

  //   **************************effects************************

  useEffect(() => {
    const handleLocalFolderExist = async () => {
      const existedLocalFolder = localStorageUtils.get<string[]>('localFolder')
      let localFolderAfterCheck: string[] = []
      if (!existedLocalFolder) return

      for (let item of existedLocalFolder) {
        if (await isFileExist(item)) {
          localFolderAfterCheck.push(item)
        }
      }

      localStorageUtils.set<string[]>('localFolder', localFolderAfterCheck)
      setLocalFolderArray(localFolderAfterCheck)
      handleScanFolder(localFolderAfterCheck)
    }
    handleLocalFolderExist()
  }, [rescan])

  //   ****************handlers*******************

  const handleScanFolder = async (folderArr: string[] | string) => {
    const obj = {}
    if (typeof folderArr == 'string') {
      const formatedFolder = generalUtil.array.last(folderArr.split('/'))
      const fileArr = await window.api.scanFolder(folderArr)
      obj[formatedFolder] = fileArr
      setScanFolderData((prev: any) => ({ ...prev, ...obj }))
    } else {
      for (let path of folderArr) {
        const formatedFolder = generalUtil.array.last(path.split('/'))
        const fileArr = await window.api.scanFolder(path)
        obj[formatedFolder] = fileArr
      }
    }

    setScanFolderData(obj)
  }

  const handlePickFolder = async () => {
    const folderPath = await window.api.selectFolder()
    if (folderPath) {
      console.log('Selected folder:', folderPath)

      if (await isFileExist(folderPath)) {
        const prevArr = localStorageUtils.get<string[]>('localFolder')
        if (prevArr) {
          if (!prevArr.includes(folderPath)) {
            localStorageUtils.set('localFolder', [...prevArr, folderPath])
            setSelectedFolder(generalUtil.array.last(folderPath.split('/')))
            setLocalFolderArray((prev: string[]) => [...prev, folderPath])
            handleScanFolder(folderPath)
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

  const handleRescan = () => setRescan((prev) => prev + 1)

  return {
    handlePickFolder,
    isFileExist,
    localFolderArray,
    selectedFolder,
    setSelectedFolder,
    scanFolderData,
    handleRescan
  }
}
