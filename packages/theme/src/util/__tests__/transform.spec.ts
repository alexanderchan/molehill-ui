import { Node, transform } from '../transform'

it('should visit all properties of an object', () => {
  const valueToTransform = {
    px: '--5',
    md: {
      margin: '--1',
      fontSize: 1,
      color: ['red', 'blue', 'green'],
    },
  }

  const rootNode = {
    key: 'root',
    value: valueToTransform,
    parent: null,
  }

  const transformedNode = transform({
    node: rootNode,
    visitorFunction: function visitorFunction({ node }: { node: Node }) {
      switch (node.nodeType) {
        case 'identifier': {
          if (node.key === 'px') {
            node.keys = ['paddingTop', 'paddingBottom']
          }

          return node
        }

        default: {
          return node
        }
      }
    },
  })

  expect(transformedNode.value).toMatchInlineSnapshot(`
    Object {
      "md": Object {
        "color": Object {
          "0": "red",
          "1": "blue",
          "2": "green",
        },
        "fontSize": 1,
        "margin": "--1",
      },
      "paddingBottom": "--5",
      "paddingTop": "--5",
    }
  `)
})

it('should visit all properties of an object', () => {
  let propertyCount = 0
  const properties = []
  const result = transform({
    node: {
      key: 'root',
      parent: null,
      value: {
        px: '--5',
        md: {
          margin: '--1',
        },
      },
    },
    visitorFunction({ node }) {
      if (node.nodeType === 'identifier') {
        propertyCount++
        properties.push(node.key)
      }
      return node
    },
  })

  expect(properties).toMatchInlineSnapshot(`
    Array [
      "root",
      "px",
      "md",
      "margin",
    ]
  `)

  expect(propertyCount).toBe(4)
})

it('should visit objects in an array', () => {
  let propertyCount = 0
  const properties = []
  let foundMatch = false

  const result = transform({
    node: {
      key: 'root',
      parent: null,
      value: [
        { location: 'a' },
        { location: { countryCode: 'GD' } },
        { location: 'c' },
      ],
    },
    visitorFunction({ node }) {
      if (node.nodeType === 'identifier') {
        propertyCount++
        properties.push(node.key)
      }

      if (node.key === 'countryCode' && node.value === 'GD') {
        foundMatch = true
      }

      return node
    },
  })

  expect(properties).toMatchInlineSnapshot(`
    Array [
      "root",
      "0",
      "location",
      "1",
      "location",
      "countryCode",
      "2",
      "location",
    ]
  `)

  expect(propertyCount).toBe(8)

  expect(foundMatch).toBe(true)
})
