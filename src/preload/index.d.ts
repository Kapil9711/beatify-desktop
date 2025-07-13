import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      selectFolder: () => Promise<string | null>
      isPathExist: (path: string) => Promise<boolean>
      scanFolder: (path: string, scanType?: string[]) => Promise<string[]>
      getAudioData: (path: string) => Promise<any | null>
    }
  }
}
