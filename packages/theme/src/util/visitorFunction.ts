import { Node } from './transform'

export function visitorFunction({ node }: { node: Node }) {
  switch (node.nodeType) {
    case 'identifier': {
      // switch the names of the

      return node
    }

    case 'array': {
      return node
    }

    case 'string':
    case 'number': {
      return node
    }

    default: {
      return node
    }
  }
}
