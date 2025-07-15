import { ipcMain } from 'electron'
import GitHelper from '../utils/git'

export interface CheckRepoReturnType {
  isRepo: boolean
  branch: string | null
  remote: string | null
}

const registerGitHandler = () => {
  ipcMain.handle('check-repo', async (_event, path: string) => {
    const gitHelper = new GitHelper(path)
    return {
      isRepo: await gitHelper.isGitRepo(),
      branch: await gitHelper.getCurrentBranch(),
      remote: await gitHelper.getRemoteOrigin()
    }
  })
  ipcMain.handle('final-push', async (_event, path: string, targetBranch: string = 'test') => {
    const gitHelper = new GitHelper(path)
    return gitHelper.finalPushAndMerge(targetBranch)
  })
}

export default registerGitHandler
