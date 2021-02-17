const varReplaceRegex = /(?<!var\(\s*)--([a-zA-Z\-_\d]+)/gm

// Theme

// move this to config
const breakPoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
}

// transforms to: { sm: "@media (min-width: 640px)", md: "@media (min-width: 768px)", ... }
const mediaBreakPoints = Object.fromEntries(
  Object.entries(breakPoints).map(([key, value]) => [
    `@media:${key}`,
    `@media (min-width: ${value})`,
  ])
)

const shortHandPropertyMap = {
  bg: 'background',

  m: 'margin',
  mt: 'marginTop',
  mb: 'marginBottom',
  mr: 'marginRight',
  ml: 'marginLeft',
  mx: ['marginLeft', 'marginRight'],
  my: ['marginTop', 'marginBottom'],

  p: 'padding',
  pt: 'paddingTop',
  pb: 'paddingBottom',
  pr: 'paddingRight',
  pl: 'paddingLeft',
  px: ['paddingLeft', 'paddingRight'],
  py: ['paddingTop', 'paddingBottom'],

  ...mediaBreakPoints,
}

// jsx attributes to search through
const attributesToReplace = ['sx', 'variants', 'css', 'style']

// adds the --var() wrapper
function addVar(cssPropertyValue) {
  if (typeof cssPropertyValue !== 'string') {
    return cssPropertyValue
  }

  if (cssPropertyValue.includes('--')) {
    return cssPropertyValue.replace(varReplaceRegex, 'var(--$1)')
  }

  return cssPropertyValue
}

// Babel plugin

export default function ({ types: t }) {
  const replaceVars = {
    // translate --short-hand => var(--short-hand) in strings
    StringLiteral(path) {
      path.node.value = addVar(path.node.value)
    },

    TemplateElement(path) {
      path.node.value.raw = addVar(path.node.value.raw)
      // TODO: check the difference between raw and cooked
      path.node.value.cooked = addVar(path.node.value.cooked)
    },

    // shorthand and media query replacements
    Property(path) {
      const replacementNames = shortHandPropertyMap[path.node.key.name]
      if (replacementNames) {
        if (typeof replacementNames === 'string') {
          const newName = replacementNames
          // path.node.key.name = replacementNames;

          const newNode = t.cloneNode(path.node, false)
          if (t.isIdentifier(path.node.key) && t.isValidIdentifier(newName)) {
            newNode.key = t.identifier(newName)
          } else {
            newNode.key = t.stringLiteral(newName)
          }

          path.replaceWith(newNode)
        }

        if (Array.isArray(replacementNames)) {
          path.replaceWithMultiple(
            replacementNames.map((name) => {
              return t.objectProperty(t.identifier(name), path.node.value)
            })
          )
        }
      }
    },
  }

  return {
    name: '@molehill-ui',
    visitor: {
      JSXAttribute(path) {
        if (attributesToReplace.includes(path.node.name.name)) {
          path.traverse(replaceVars)
        }

        if (path.node.name.name === 'sx') {
          path.replaceWith(
            t.jsxAttribute(t.jsxIdentifier('css'), path.node.value)
          )
        }
      },
    },
  }
}
