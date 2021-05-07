import { addVar, Config } from '@molehill-ui/theme'
import { getShortHandProperties } from '../utils/getShortHandProperties'
import { Node } from './transform'

export function visitorFunction({
  node,
  config,
}: {
  node: Node
  config: Config
}) {
  switch (node.nodeType) {
    case 'identifier': {
      const shortHandProperties = getShortHandProperties({ property: node.key })

      // if we find a match with a single element we can replace it
      if (typeof shortHandProperties === 'string') {
        node.key = shortHandProperties
      } else if (Array.isArray(shortHandProperties)) {
        node.keys = shortHandProperties
      }
      return node
    }

    case 'array': {
      const propertyName = node.key
      node.value = node.value.map((singleValue) => {
        return addVar({ propertyName, cssPropertyValue: singleValue, config })
      })
      return node
    }

    case 'string':
    case 'number': {
      const propertyName = node.key
      node.value = addVar({
        propertyName,
        cssPropertyValue: node.value,
        config,
      })
      return node
    }

    default: {
      return node
    }
  }
}

export function getVisitorFunction({ config }) {
  return ({ node }) => visitorFunction({ node, config })
}
