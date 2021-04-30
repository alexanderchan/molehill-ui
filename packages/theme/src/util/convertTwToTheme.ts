import { Theme } from '../theme'
import { defaultTwConfig, TwConfig } from './defaultTwConfig'

function convertFontFamily({ fonts }): Theme['fonts'] {
  return Object.fromEntries(
    Object.entries(fonts).map(([key, value]) => {
      if (Array.isArray(value)) {
        return [key, value.join(', ')]
      }

      return [key, value]
    })
  ) as any
}

// pull off the array value[0] font size of ['0.875rem', { lineHeight: '1.25rem' }]
function convertFontSizes({ fontSize }) {
  return Object.fromEntries(
    Object.entries(fontSize).map(([key, value]) => {
      if (Array.isArray(value)) {
        return [key, value[0]]
      }

      return [key, value]
    })
  ) as any
}

// TODO, maybe find a way to expand ['0.875rem', { lineHeight: '1.25rem' }]
// from { fontSize: 'sm' } to
// { fontSize: '0.875rem', lineHeight: '1.25rem' }
// until then {fontSize: "sm", lineHeight: "sm" }
function convertFontSizesLineHeights({ fontSize }) {
  return Object.fromEntries(
    Object.entries(fontSize).map(([key, value]) => {
      if (Array.isArray(value)) {
        return [key, value[1]?.lineHeight]
      }

      return [key, value]
    })
  ) as any
}

function negative({ spacing }) {
  return Object.fromEntries(
    Object.entries(spacing).map(([key, value]) => {
      return [`-${key}`, `-${value}`]
    })
  ) as any
}

export function convertTwToTheme({
  twConfig = defaultTwConfig,
}: {
  twConfig?: TwConfig
} = {}): Theme {
  const theme: Theme = {
    colors: twConfig.theme.colors,
    spaces: {
      ...twConfig.theme.spacing,
      ...negative({ spacing: twConfig.theme.spacing }),
    },
    fontSizes: convertFontSizes({ fontSize: twConfig.theme.fontSize }),
    lineHeights: {
      ...twConfig.theme.lineHeight,
      ...convertFontSizesLineHeights({ fontSize: twConfig.theme.fontSize }),
    },
    fonts: convertFontFamily({ fonts: twConfig.theme.fontFamily }),
    fontWeights: twConfig.theme.fontWeight,
    borderWidths: twConfig.theme.borderWidth,
    shadows: twConfig.theme.boxShadow,
    opacities: twConfig.theme.opacity,
    zIndices: twConfig.theme.zIndex,
    radii: twConfig.theme.borderRadius,
    letterSpacings: twConfig.theme.letterSpacing,
  }

  return theme
}
