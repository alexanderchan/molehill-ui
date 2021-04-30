import { visitorFunction } from '../visitorFunction'

it('should replace identifiers with their long form', () => {
  const node = visitorFunction({
    node: {
      key: 'px',
      nodeType: 'identifier',
      parent: null,
      value: '--1',
    },
  })

  expect(node).toMatchInlineSnapshot(`
    Object {
      "key": "px",
      "keys": Array [
        "paddingLeft",
        "paddingRight",
      ],
      "nodeType": "identifier",
      "parent": null,
      "value": "--1",
    }
  `)
})

it('should replace identifiers with their long form', () => {
  const node = visitorFunction({
    node: {
      key: 'pt',
      nodeType: 'identifier',
      parent: null,
      value: '--1',
    },
  })

  expect(node).toMatchInlineSnapshot(`
    Object {
      "key": "paddingTop",
      "nodeType": "identifier",
      "parent": null,
      "value": "--1",
    }
  `)
})

it('should replace leaf nodes with vars with long form', () => {
  const node = visitorFunction({
    node: {
      key: 'pt',
      nodeType: 'string',
      parent: null,
      value: '--1',
    },
  })

  expect(node).toMatchInlineSnapshot(`
    Object {
      "key": "pt",
      "nodeType": "string",
      "parent": null,
      "value": "var(--mh-1)",
    }
  `)
})

it('should replace media queries with their long form', () => {
  const node = visitorFunction({
    node: {
      key: 'md',
      nodeType: 'identifier',
      parent: null,
      value: { fontSize: 1 },
    },
  })

  expect(node).toMatchInlineSnapshot(`
    Object {
      "key": "@media (min-width: 768px)",
      "nodeType": "identifier",
      "parent": null,
      "value": Object {
        "fontSize": 1,
      },
    }
  `)
})
