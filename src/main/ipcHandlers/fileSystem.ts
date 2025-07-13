import { dialog, ipcMain } from 'electron'
import fs from 'fs'
import path from 'path'
import fsPromise from 'fs/promises'
import { fileTypeFromFile } from 'file-type'
import mime from 'mime-types'

const registerFileSystemHandler = () => {
  ipcMain.handle('select-folder', async () => {
    const result = await dialog.showOpenDialog({
      properties: ['openDirectory']
    })

    return result.canceled ? null : result.filePaths[0] // return the selected folder path
  })

  ipcMain.handle('folder-exits', async (event, path: string) => {
    let exist = false
    if (fs.existsSync(path) && fs.lstatSync(path).isDirectory()) exist = true
    return exist
  })

  ipcMain.handle(
    'scan-folder',
    async (
      event,
      folderPath: string,
      scanType: string[] = ['.m4a', '.mp3', '.wav', '.flac', '.ogg', '.mp4']
    ) => {
      let filesArr: string[] = []

      async function isAudioFile(filePath: string) {
        const type = await fileTypeFromFile(filePath)
        return type?.mime.startsWith('audio/') || type?.mime.startsWith('video/')
      }
      try {
        let files = await fsPromise.readdir(folderPath)
        if (scanType.length > 0) {
          let filterFiles: string[] = []
          for (let item of files) {
            if (await isAudioFile(path.join(folderPath, item))) {
              const stats = fs.statSync(path.join(folderPath, item))
              const sizeInBytes = stats.size
              if (30 * 1024 * 1024 > sizeInBytes) {
                filterFiles.push(item)
              }
            } else if (scanType.includes(path.extname(item).toLowerCase())) filterFiles.push(item)
          }
          files = filterFiles
        }
        filesArr = files?.map((file: string) => path.join(folderPath, file))
        return filesArr
      } catch (error) {
        console.log(error, 'folderRead Error')
        return filesArr
      }
    }
  )

  ipcMain.handle('get-audio-data', async (_event, filePath: string) => {
    try {
      const buffer = await fsPromise.readFile(filePath)
      const base64 = buffer.toString('base64')
      const mimeType = mime.lookup(filePath) // e.g. audio/mp3
      return `data:${mimeType};base64,${base64}`
    } catch (err) {
      console.error('❌ Failed to read audio file', err)
      return null
    }
  })
}

export default registerFileSystemHandler
