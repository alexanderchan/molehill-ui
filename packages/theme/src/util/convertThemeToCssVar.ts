import clone from 'just-clone'
import { Theme } from '../theme'
import { buildNameFromPath } from './buildNameFromPath'
import { Node, transform } from './transform'

export const ROOT_KEY = 'mhroot'
export const DEFAULT_KEY = 'DEFAULT'

export function convertThemeToCssVar({
  theme,
  prefix,
}: {
  theme?: Theme
  prefix?: string
} = {}) {
  const themeCopy = clone(theme)
  const cssVarTheme: { [key: string]: string } = {}

  function visitorFunction({ node }: { node: Node }) {
    switch (node.nodeType) {
      case 'string':
      case 'number': {
        const name = buildNameFromPath({ node })
        cssVarTheme[`--${prefix ? prefix + '-' : ''}${name}`] = node.value
        return node
      }

      case 'identifier': {
        return node
      }

      case 'array': {
        return node
      }
      default: {
        return node
      }
    }
  }

  transform({
    node: {
      key: ROOT_KEY,
      value: themeCopy,
      parent: null,
    },
    visitorFunction,
  })

  return cssVarTheme
}
