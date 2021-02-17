'use strict'

var _jsxRuntime = require('react/jsx-runtime')

function App() {
  var someTemplateVar = '1rem'
  return /*#__PURE__*/ (0, _jsxRuntime.jsxs)('div', {
    css: {
      backgroundColor: 'var(--blue-100)',
      color: 'var(--red-500)',
      someFunc: function someFunc() {},
      paddingLeft: 'var(--space-5)',
      paddingRight: 'var(--space-5)',
      margin: 'var(--space-5) '
        .concat(someTemplateVar, ' var(--space-5) ')
        .concat(someTemplateVar),
      padding: 'calc(var(--space-5) + 5px + var( --space-10 ))',
      '& > svg': {
        color: 'var(--indigo-100)',
      },
      paddingTop: 'var(--space-2)',
      sm: {
        background: 'var(--blue-100)',
      },
    },
    style: {
      padding: 'var(--space-5)',
    },
    children: [' ', 'test', ' '],
  })
}
