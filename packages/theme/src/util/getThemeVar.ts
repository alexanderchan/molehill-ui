import { depluralize } from './depluralize'
import { getScaleForProperty } from './getScaleForProperty'

export function buildNameFromScale({
  value,
  scale,
  prefix,
}: {
  value: any
  scale: string
  prefix?: string
}) {
  const depluralizedScale = depluralize({ name: scale })
  return `--${prefix ? `${prefix}-` : ''}${depluralizedScale}-${value}`
}

// TODO: it would be nice to be able to parse out shorthand properties ie
// "border": "1px solid red-100"
// "font": sans purple-700
// "padding" "1 5 1 5"
// https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties

export function getThemeVar({ property, value, prefix, cssVars }) {
  const scale = getScaleForProperty({ property })
  const name = buildNameFromScale({ scale, value, prefix })

  return cssVars?.[name] ? name : value
}
