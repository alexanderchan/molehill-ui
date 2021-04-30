import mh from '../../macro'

const objectStyles = mh({
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
  '@media:md': {
    color: 'red-100',
  },
})
