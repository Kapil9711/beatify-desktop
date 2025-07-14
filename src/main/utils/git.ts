import simpleGit, { SimpleGit, BranchSummary, StatusResult, RemoteWithRefs } from 'simple-git'
import { exec } from 'child_process'

class GitHelper {
  private git: SimpleGit
  private repoPath: string

  constructor(repoPath: string) {
    this.git = simpleGit(repoPath)
    this.repoPath = repoPath
  }

  // Check if the folder is a Git repo
  async isGitRepo(): Promise<boolean> {
    try {
      const isRepo = await this.git.checkIsRepo()
      return isRepo
    } catch (err) {
      console.error('Error checking Git repo:', err)
      return false
    }
  }

  // Get current branch
  async getCurrentBranch(): Promise<string | null> {
    try {
      const branch: BranchSummary = await this.git.branch()
      return branch.current
    } catch (err) {
      console.error('Error getting branch:', err)
      return null
    }
  }

  // Get remote origin URL
  async getRemoteOrigin(): Promise<string | null> {
    try {
      const remotes: RemoteWithRefs[] = await this.git.getRemotes(true)
      const origin = remotes.find((remote) => remote.name === 'origin')
      return origin?.refs?.push || null
    } catch (err) {
      console.error('Error getting remote:', err)
      return null
    }
  }

  // Run `yarn build` (or `npm run build`)
  async runBuild(): Promise<string> {
    return new Promise((resolve, reject) => {
      exec('yarn build', { cwd: this.repoPath }, (error, stdout, stderr) => {
        if (error) {
          console.error('Build failed:', stderr)
          reject(stderr)
        } else {
          console.log('Build successful:', stdout)
          resolve(stdout)
        }
      })
    })
  }

  // Commit, push, and create a merge request (GitHub/GitLab)
  async finalPushAndMerge(
    targetBranch: string,
    commitMessage: string = 'Final push before merge'
  ): Promise<boolean> {
    try {
      // 1. Check if there are changes
      const status: StatusResult = await this.git.status()
      if (!status.files.length) {
        console.log('No changes to commit.')
        return false
      }

      // 2. Add, commit, and push
      await this.git.add('.')
      await this.git.commit(commitMessage)
      await this.git.push('origin', status.current as string)

      console.log(`✅ Pushed to ${status.current}`)

      // 3. Create a merge request (GitHub/GitLab API needed)
      await this.createMergeRequest(targetBranch)

      return true
    } catch (err) {
      console.error('Error in final push:', err)
      throw err
    }
  }

  // (Optional) Create a merge request (GitHub/GitLab API)
  async createMergeRequest(targetBranch: string): Promise<void> {
    console.log(`🚀 Creating MR from current branch to ${targetBranch}`)
    // Use GitHub REST API or GitLab API here
    // Example: https://docs.gitlab.com/ee/api/merge_requests.html#create-mr
  }
}

export default GitHelper

// Example usage with types
// async function exampleUsage() {
//   const repoPath = '/path/to/your/repo'
//   const gitHelper = new GitHelper(repoPath)

//   if (await gitHelper.isGitRepo()) {
//     const currentBranch: string | null = await gitHelper.getCurrentBranch()
//     const remoteOrigin: string | null = await gitHelper.getRemoteOrigin()

//     console.log('Current branch:', currentBranch)
//     console.log('Remote origin:', remoteOrigin)

//     try {
//       const buildOutput: string = await gitHelper.runBuild()
//       const pushSuccess: boolean = await gitHelper.finalPushAndMerge('main')
//     } catch (err) {
//       console.error('Process failed:', err)
//     }
//   } else {
//     console.log('Not a Git repository.')
//   }
// }
