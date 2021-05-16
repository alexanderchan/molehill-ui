import { convertThemeToCssVar } from './util/convertThemeToCssVar'
import { mergeDeep } from './util/mergeDeep'
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
    ...defaultConfig,
    ...config,
    theme: {
      ...(config?.theme
        ? config?.theme
        : mergeDeep(defaultConfig.theme, config?.extend)),
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

export { defaultConfig } from './defaultConfig'

export * from './util/kebab-case'
export * from './util/addVar'
export type { Node } from './util/transform'
export { transform } from './util/transform'
export { getThemeVar } from './util/getThemeVar'
export { getScaleForProperty } from './util/getScaleForProperty'
export { convertThemeToScaleLookup } from './util/convertThemeToScaleLookup'
export type { ScaleLookup } from './util/convertThemeToScaleLookup'
