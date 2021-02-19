'use strict'

var objectStyles = {
  backgroundColor: 'var(--blue-100)',
  color: 'var(--red-500)',
  someFunc: function someFunc() {},
  paddingLeft: 'var(--space-5)',
  paddingRight: 'var(--space-5)',
  margin: 'var(--space-5) 1px var(--space-5) 1px',
  padding: 'calc(var(--space-5) + 5px + var( --space-10 ))',
  '& > svg': {
    color: 'var(--indigo-100)',
  },
  paddingTop: 'var(--space-2)',
  sm: {
    background: 'var(--blue-100)',
  },
}
