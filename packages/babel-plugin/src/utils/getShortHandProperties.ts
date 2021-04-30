// TODO move this to config
const breakPoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
}

// transforms to: { sm: "@media (min-width: 640px)", md: "@media (min-width: 768px)", ... }
const mediaBreakPoints = Object.fromEntries(
  Object.entries(breakPoints).flatMap(([key, value]) => [
    [`@media:${key}`, `@media (min-width: ${value})`], // "@media:sm" : "@media (min-width: 640px)"
    [`${key}`, `@media (min-width: ${value})`], // sm: "@media (min-width: 640px)", md: "@media (min-width: 768px)", ...
  ])
)

// TODO: consider changing this api to use the stiches utils https://stitches.dev/docs/utils
// format
export const shortHandPropertyMap = {
  bg: 'background',

  m: 'margin',
  mt: 'marginTop',
  mb: 'marginBottom',
  mr: 'marginRight',
  ml: 'marginLeft',
  mx: ['marginLeft', 'marginRight'],
  my: ['marginTop', 'marginBottom'],

  p: 'padding',
  pt: 'paddingTop',
  pb: 'paddingBottom',
  pr: 'paddingRight',
  pl: 'paddingLeft',
  px: ['paddingLeft', 'paddingRight'],
  py: ['paddingTop', 'paddingBottom'],

  ...mediaBreakPoints, // can't auto type these, just write them out for typing
} as const

export type ShortHandPropertyMapKeys = keyof typeof shortHandPropertyMap

export function getShortHandProperties({ property }) {
  return shortHandPropertyMap[property]
}
