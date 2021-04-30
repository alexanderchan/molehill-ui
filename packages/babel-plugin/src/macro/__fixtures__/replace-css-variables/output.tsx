'use strict'

var objectStyles = {
  backgroundColor: 'var(--mh-blue-100)',
  color: 'var(--red-500)',
  someFunc: function someFunc() {},
  paddingLeft: 'var(--mh-space-5)',
  paddingRight: 'var(--mh-space-5)',
  margin: 'var(--mh-space-5) 1px var(--mh-space-5) 1px',
  padding: 'calc(var(--mh-space-5) + 5px + var( --space-10 ))',
  '& > svg': {
    color: 'var(--mh-indigo-100)',
  },
  paddingTop: 'var(--mh-space-2)',
  '@media (min-width: 640px)': {
    background: 'var(--mh-blue-100)',
  },
  '@media (min-width: 768px)': {
    color: 'var(--mh-color-red-100)',
  },
}
