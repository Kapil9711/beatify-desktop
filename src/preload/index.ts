import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { CheckRepoReturnType } from '../main/ipcHandlers/gitSystem'

// Custom APIs for renderer
const api = {
  selectFolder: (): Promise<string | null> => ipcRenderer.invoke('select-folder'),
  isPathExist: (path: string): Promise<boolean> => ipcRenderer.invoke('folder-exits', path),
  scanFolder: (path: string, scanType?: string[]): Promise<string[]> =>
    ipcRenderer.invoke('scan-folder', path, scanType),
  getAudioData: (path: string): Promise<any | null> => ipcRenderer.invoke('get-audio-data', path),
  checkRepo: (path: string): Promise<CheckRepoReturnType> => ipcRenderer.invoke('check-repo', path),
  finalPush: (path: string, targetBranch: string): Promise<boolean> =>
    ipcRenderer.invoke('final-push', path, targetBranch)
}

// if process.contextIsolated that use contextBridge
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
