'use strict'

var _jsxRuntime = require('react/jsx-runtime')

function App() {
  var someTemplateVar = '1rem'
  return /*#__PURE__*/ (0, _jsxRuntime.jsx)('div', {
    style: {
      '--red-500': 'red',
    },
    children: /*#__PURE__*/ (0, _jsxRuntime.jsxs)('div', {
      css: {
        backgroundColor: 'var(--mh-color-blue-100)',
        color: 'var(--red-500)',
        fontWeight: 'var(--mh-font-weight-bold)',
        someFunc: function someFunc() {},
        paddingLeft: 'var(--mh-space-5)',
        paddingRight: 'var(--mh-space-5)',
        margin: 'var(--mh-space-5) '
          .concat(someTemplateVar, ' var(--mh-space-5) ')
          .concat(someTemplateVar),
        padding: 'calc(var(--mh-space-5) + 5px + var( --space-10 ))',
        '& > svg': {
          color: 'var(--mh-indigo-100)',
        },
        paddingTop: 'var(--mh-space-2)',
        '@media (min-width: 640px)': {
          background: 'var(--mh-blue-100)',
        },
      },
      style: {
        padding: 'var(--mh-space-5)',
      },
      children: [' ', 'test', ' '],
    }),
  })
}
