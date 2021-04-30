export type Node = {
  key: string
  keys?: string[]
  value: any
  parent: Node
  nodeType?: any
  meta?: any
}

type VisitorFunction = ({ node }: { node?: Node }) => Node

// [ [key, value], [key, value], [key, value] ]
export function transform({
  node,
  visitorFunction,
}: {
  node: Node
  visitorFunction: VisitorFunction
}): Node {
  const isArray = Array.isArray(node.value)
  const nodeType = isArray ? 'array' : typeof node.value

  // visitor for the identifier (key)
  const identifierNode: Node = {
    key: node.key,
    value: node.value,
    nodeType: 'identifier',
    parent: node.parent,
  }

  visitorFunction({ node: identifierNode })

  if (identifierNode.keys) {
    node.keys = identifierNode.keys
  } else {
    node.key = identifierNode.key
  }

  // Value is an object { px: '--5 ', md: {  } }
  if (typeof node.value === 'object') {
    node.value = Object.fromEntries(
      Object.entries(node.value).flatMap(([key, value]) => {
        const childNode: Node = {
          key,
          value,
          parent: node,
        }

        transform({ node: childNode, visitorFunction })

        // we don't have a generate phase or something like an insertNode
        // so we just use multiple keys as a way to "insertNode"
        // we need to change "px" to ["paddingLeft", "paddingRight"]
        if (Array.isArray(childNode.keys)) {
          return childNode.keys.map((newKey) => {
            return [newKey, childNode.value]
          })
        }

        return [[childNode.key, childNode.value]]
      })
    )
  } else {
    const leafNode: Node = {
      ...node,
      nodeType: nodeType,
    }

    visitorFunction({ node: leafNode })

    node.value = leafNode.value
  }

  return node
}
