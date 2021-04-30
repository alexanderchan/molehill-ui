import { defaultConfig } from '@molehill-ui/theme'
import { addVar } from '../addVar'

it('should replace the addVar', () => {
  expect(
    addVar({
      cssPropertyValue: '--1',
      propertyName: 'any',
      config: defaultConfig,
    })
  ).toBe('var(--mh-1)')
})

it('should allow other tokens for replacement', () => {
  expect(
    addVar({
      cssPropertyValue: '$1',
      propertyName: 'any',
      config: { ...defaultConfig, replaceToken: '$' },
    })
  ).toBe('var(--mh-1)')

  expect(
    addVar({
      cssPropertyValue: '$blue-100',
      propertyName: 'border',
      config: { ...defaultConfig, replaceToken: '$' },
    })
  ).toBe('var(--mh-blue-100)')
})

it('should replace values for known properites', () => {
  expect(
    addVar({
      propertyName: 'color',
      cssPropertyValue: 'blue-100',
      config: { ...defaultConfig, replaceToken: '$' },
    })
  ).toBe('var(--mh-color-blue-100)')

  expect(
    addVar({
      propertyName: 'pt',
      cssPropertyValue: '1',
      config: { ...defaultConfig, replaceToken: '$' },
    })
  ).toBe('var(--mh-space-1)')
})

it('should work with numeric replacements', () => {
  expect(
    addVar({
      propertyName: 'pt',
      cssPropertyValue: 1,
      config: { ...defaultConfig, replaceToken: '$' },
    })
  ).toBe('var(--mh-space-1)')
})
it('should not change unmatched values', () => {
  expect(
    addVar({
      cssPropertyValue: 'blue-100',
      propertyName: 'zIndex',
      config: { ...defaultConfig, replaceToken: '$' },
    })
  ).toBe('blue-100')

  expect(
    addVar({
      cssPropertyValue: 'blue-100',
      propertyName: 'zIndex',
      config: defaultConfig,
    })
  ).toBe('blue-100')
})
