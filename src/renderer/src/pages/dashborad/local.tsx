import LocalContainer from '@renderer/container/dashboard/local'
import { LocalFiles, useLocalFiles } from '@renderer/container/dashboard/local/hook'
import { createContext, useContext } from 'react'

const LocalFileContext = createContext<LocalFiles | null>(null)
export const useLocalFileContext = () => useContext(LocalFileContext)

const LocalPage = () => {
  const data = useLocalFiles()
  return (
    <LocalFileContext.Provider value={data}>
      <LocalContainer />
    </LocalFileContext.Provider>
  )
}

export default LocalPage
