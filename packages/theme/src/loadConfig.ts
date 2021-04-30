import { cosmiconfigSync } from 'cosmiconfig'
import { defaultConfig } from './defaultConfig'
import { Config } from './theme'

const moduleName = 'molehill'

export function loadConfig(): Config {
  const explorerSync = cosmiconfigSync(moduleName)

  const searchedFor = explorerSync.search()

  if (searchedFor?.config) {
    return searchedFor?.config
  } else {
    return defaultConfig
  }
}
