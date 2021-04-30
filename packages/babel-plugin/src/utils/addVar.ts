import { Config, defaultConfig, getThemeVar } from '@molehill-ui/theme'

const varReplaceRegexes: Record<string, RegExp> = {
  default: /(?<!var\(\s*)--([a-zA-Z\-_\d]+)/gm,
}

function getReplacementRegex({ replaceToken }) {
  // initialize the regex
  if (replaceToken && !varReplaceRegexes[replaceToken]) {
    varReplaceRegexes[replaceToken] = new RegExp(
      `(?<!var\\(\\s*)\\${replaceToken}([a-zA-Z\\-_\\d]+)`,
      'gm'
    )
  }

  return varReplaceRegexes[replaceToken] || varReplaceRegexes.default
}

// adds the --var() wrapper
export function addVar({
  cssPropertyValue: propertyValue,
  propertyName,
  config = defaultConfig,
}: {
  cssPropertyValue?: string | number
  propertyName?: string
  config?: Config
}) {
  let value = propertyValue

  if (typeof value === 'number') {
    // convert to string
    value = `${propertyValue}`
  }

  if (typeof value !== 'string') {
    return value
  }

  // simple replacement for prefix
  if (value.includes(config?.replaceToken)) {
    const regex = getReplacementRegex({ replaceToken: config.replaceToken })

    value = value.replace(
      regex,
      `var(--${config?.prefix ? `${config?.prefix}-` : ''}$1)`
    )
  }

  // property aware theme replacement
  value = getThemeVar({
    property: propertyName,
    prefix: config.prefix,
    value,
    cssVars: config.cssVars,
  })

  // strange type error if we don't assert first even though we've converted to string
  if (typeof value === 'string' && value.startsWith('--')) {
    return `var(${value})`
  }

  // if there was no actual conversion return the original
  if (value === `${propertyValue}`) {
    return propertyValue
  }

  return value
}
