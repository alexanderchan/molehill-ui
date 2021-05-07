import { convertThemeToCssVar } from './util/convertThemeToCssVar'
import { convertTwToTheme } from './util/convertTwToTheme'
import { defaultTwConfig } from './util/defaultTwConfig'
import { Config } from './theme'

const theme = convertTwToTheme({ twConfig: defaultTwConfig })

const defaultVarPrefix = 'mh'

const cssVars = convertThemeToCssVar({
  theme,
  prefix: defaultVarPrefix,
})

export const defaultConfig: Config = {
  attributesToReplace: ['sx', 'variants', 'css', 'style'],
  prefix: defaultVarPrefix,
  replaceToken: '--',
  theme: {
    ...theme,
    space: {
      ...theme.space,
      'w-full': '100%',
      'h-full': '100%',
      full: '100%',
      'w-screen': '100vw',
      'h-screen': '100vh',
      min: 'min-content',
      max: 'max-content',
    },
  },
  cssVars,
}
