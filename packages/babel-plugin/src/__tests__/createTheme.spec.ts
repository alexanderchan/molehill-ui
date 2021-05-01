import { createCssTheme } from '@molehill-ui/theme/src'

it('should allow customization of the prefix', () => {
  const theme = createCssTheme({
    config: {
      prefix: 'mz',
    },
  })

  expect(theme.cssVars['--mz-space-1']).toBeTruthy()
})

it('should allow extending the default color scheme', () => {
  const theme = createCssTheme({
    config: {
      extend: {
        colors: {
          awesomeRed: {
            DEFAULT: 'rgba(255,0,0,1)',
            100: 'crimson',
          },
        },
      },
    },
  })

  expect(theme.cssVars['--mh-space-1']).toBeTruthy()
  expect(theme.cssVars['--mh-color-red-100']).toBeTruthy()
  expect(theme.cssVars['--mh-color-awesome-red']).toBe('rgba(255,0,0,1)')
  expect(theme.cssVars['--mh-color-awesome-red-100']).toBe('crimson')
})

it('should allow overriding the entire theme', () => {
  const theme = createCssTheme({
    config: {
      theme: {
        colors: {
          awesomeRed: {
            DEFAULT: 'rgba(255,0,0,1)',
            100: 'crimson',
          },
        },
      },
    },
  })

  expect(theme.cssVars['--mh-space-1']).toBeFalsy()
  expect(theme.cssVars['--mh-color-red-100']).toBeFalsy()

  // only the new colors
  expect(theme.cssVars['--mh-color-awesome-red']).toBe('rgba(255,0,0,1)')
  expect(theme.cssVars['--mh-color-awesome-red-100']).toBe('crimson')
})
