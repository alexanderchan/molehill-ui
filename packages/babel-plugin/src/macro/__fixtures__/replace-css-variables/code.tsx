import macro from '../../macro'

const objectStyles = macro({
  backgroundColor: '--blue-100',
  color: 'var(--red-500)',
  someFunc() {},
  px: '--space-5',
  m: `--space-5 1px --space-5 1px`,
  p: 'calc(--space-5 + 5px + var( --space-10 ))',
  '& > svg': {
    color: '--indigo-100',
  },
  pt: '--space-2',
  sm: {
    bg: '--blue-100',
  },
})
