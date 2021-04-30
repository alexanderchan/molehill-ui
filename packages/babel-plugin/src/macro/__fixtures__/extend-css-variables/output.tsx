'use strict'

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object)
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object)
    if (enumerableOnly)
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable
      })
    keys.push.apply(keys, symbols)
  }
  return keys
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {}
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key])
      })
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key)
        )
      })
    }
  }
  return target
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    })
  } else {
    obj[key] = value
  }
  return obj
}

// TODO need to wrap base styles in macro for compile time extension
// need to look for a way to walk down the object that is spread over?
var base = {
  display: 'flex',
  marginTop: 'var(--space-5)',
}

var objectStyles = _objectSpread(
  _objectSpread({}, base),
  {},
  {
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
    '@media (min-width: 640px)': {
      background: 'var(--blue-100)',
    },
  }
)
