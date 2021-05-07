import { addVar } from '@molehill-ui/theme'
import { getPropertyName } from './utils/getPropertyName'
import { getShortHandProperties } from './utils/getShortHandProperties'
import { loadConfig } from './loadConfig'

// Babel plugin

const config = loadConfig()

export function traverseVars({ t }) {
  const visitor = {
    // translate --short-hand => var(--short-hand) in strings
    // eslint-disable-next-line @typescript-eslint/naming-convention
    StringLiteral(path) {
      const propertyName = getPropertyName(path)
      path.node.value = addVar({
        propertyName,
        cssPropertyValue: path.node.value,
        config,
      })
    },
    // eslint-disable-next-line @typescript-eslint/naming-convention
    NumericLiteral(path) {
      const propertyName = getPropertyName(path)
      const updatedValue = addVar({
        propertyName,
        cssPropertyValue: path.node.value,
        config,
      })

      if (typeof updatedValue === 'string') {
        path.replaceWith(t.stringLiteral(updatedValue))
      }
    },
    // eslint-disable-next-line @typescript-eslint/naming-convention
    TemplateElement(path) {
      const propertyName = getPropertyName(path)
      path.node.value.raw = addVar({
        propertyName,
        cssPropertyValue: path.node.value.raw,
        config,
      })
      // TODO: check the difference between raw and cooked
      path.node.value.cooked = addVar({
        propertyName,
        cssPropertyValue: path.node.value.cooked,
        config,
      })
    },

    // shorthand and media query replacements
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Property(path) {
      // handle object idenfier md: and '@media:md': string literal identifiers
      const replacementNames = getShortHandProperties({
        property: path.node.key.name ?? path.node.key.value,
      })

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

  return visitor
}

export default function ({ types: t }) {
  return {
    name: '@molehill-ui',
    visitor: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      JSXAttribute(path) {
        if (config?.attributesToReplace?.includes(path.node.name.name)) {
          path.traverse(traverseVars({ t }))
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
