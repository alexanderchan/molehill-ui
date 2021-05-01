import { Config, createCssTheme } from '@molehill-ui/theme'
import { cosmiconfigSync } from 'cosmiconfig'

const moduleName = 'molehill'

export function loadConfig(): Config {
  const explorerSync = cosmiconfigSync(moduleName)

  const searchedFor = explorerSync.search()

  if (searchedFor?.config?.default || searchedFor?.config) {
    return searchedFor?.config?.default || searchedFor?.config
  } else {
    return createCssTheme()
  }
}
