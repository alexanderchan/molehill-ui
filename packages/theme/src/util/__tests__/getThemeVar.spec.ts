import { defaultConfig } from '../../defaultConfig'
import { convertThemeToCssVar } from '../convertThemeToCssVar'
import { getScaleForProperty } from '../getScaleForProperty'
import { getThemeVar } from '../getThemeVar'

it('should get the correct scale for a property', () => {
  expect(getScaleForProperty({ property: 'padding' })).toBe('spaces')
  expect(getScaleForProperty({ property: 'zIndex' })).toBe('zIndices')
})

const config = defaultConfig
const cssVars = convertThemeToCssVar({
  prefix: config.prefix,
  theme: config.theme,
})
it('should get the css var for a property', () => {
  expect(
    getThemeVar({
      property: 'padding',
      value: '1',
      prefix: config.prefix,
      cssVars,
    })
  ).toBe('--mh-space-1')

  expect(
    getThemeVar({
      property: 'color',
      value: 'blue-100',
      prefix: config.prefix,
      cssVars,
    })
  ).toBe('--mh-color-blue-100')
})

it('should return the original value if no match found', () => {
  expect(
    getThemeVar({
      property: 'color',
      value: 'bluez-100',
      prefix: config.prefix,
      cssVars,
    })
  ).toBe('bluez-100')
})
