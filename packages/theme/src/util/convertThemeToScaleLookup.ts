import clone from 'just-clone'
import { Theme } from '../theme'
import { buildNameFromPath } from './buildNameFromPath'
import { depluralize } from './depluralize'
import { Node, transform } from './transform'

export const ROOT_KEY = 'mhroot'
export const DEFAULT_KEY = 'DEFAULT'

// get a lookup by scale
// const lookup = {
//     colors: {
//         'blue-100': '#00f'
//         'blue-200': '#00f'
//     },
//     spacing: {
//         '1': '1rem'
//     }
// }
// so that lookup[scale][propertyValue] can be used
export type ScaleLookup = {
  [key: string]: {
    [key: string]: string | number
  }
}

export function convertThemeToScaleLookup({
  theme,
  prefix,
}: {
  theme?: Theme
  prefix?: string
} = {}) {
  const themeCopy = clone(theme)
  const valuesByScaleLookup: ScaleLookup = {}

  Object.keys(themeCopy).map((scale) => {
    function visitorFunction({ node }: { node: Node }) {
      switch (node.nodeType) {
        case 'string':
        case 'number': {
          const name = buildNameFromPath({ node })
          if (!valuesByScaleLookup[scale]) {
            valuesByScaleLookup[scale] = {}
          }
          valuesByScaleLookup[scale][
            `${name === '' ? depluralize({ name: scale }) : name}`
          ] = node.value
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
        value: themeCopy[scale],
        parent: null,
      },
      visitorFunction,
    })
  })

  return valuesByScaleLookup
}
