import { dialog, ipcMain } from 'electron'
import fs from 'fs'

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
}

export default registerFileSystemHandler
