import extend from 'just-extend'
import { convertThemeToCssVar } from './util/convertThemeToCssVar'
import { Config } from './theme.d'
import { defaultConfig } from './'

type CssTheme = {} & Config

export function createCssTheme(
  {
    config,
  }: {
    config?: Partial<Config>
  } = { config: defaultConfig }
): CssTheme {
  const mergedConfig: Config = {
    ...config,
    theme: {
      ...extend(defaultConfig.theme, config?.extend),
      ...config?.theme,
    },
  } as Config

  const cssVars = convertThemeToCssVar({
    theme: mergedConfig?.theme,
    prefix: mergedConfig?.prefix,
  })

  mergedConfig.cssVars = cssVars

  return mergedConfig
}

export type {
  Theme,
  Config,
  MhCssProperties,
  MhExtendedCssProperties,
  Scale,
} from './theme.d'
export type { Node } from './util/transform'
export { transform } from './util/transform'
export { getThemeVar } from './util/getThemeVar'
export { defaultConfig } from './defaultConfig'
export { getScaleForProperty } from './util/getScaleForProperty'
