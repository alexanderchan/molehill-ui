import { convertThemeToCssVar } from './util/convertThemeToCssVar'
import { convertTwToTheme } from './util/convertTwToTheme'
import { defaultTwConfig } from './util/defaultTwConfig'
import { Config } from './theme'

const theme = convertTwToTheme({ twConfig: defaultTwConfig })

const defaultVarPrefix = 'mh'

const cssVars = convertThemeToCssVar({
  theme: theme,
  prefix: defaultVarPrefix,
})

export const defaultConfig: Config = {
  prefix: defaultVarPrefix,
  replaceToken: '--',
  theme,
  cssVars,
}
