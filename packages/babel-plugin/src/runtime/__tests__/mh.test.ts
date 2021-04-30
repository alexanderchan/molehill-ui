import { mh } from '../mh'

it('should add vars', () => {
  const style = mh({
    mx: '--1',
  })

  expect(style).toMatchInlineSnapshot(`
    Object {
      "marginLeft": "var(--mh-1)",
      "marginRight": "var(--mh-1)",
    }
  `)
})

// TODO: Fix the array
it.skip('should replace array values', () => {
  const style = mh({
    mt: ['--space-2', '--space-3', '--space-4'],
  })

  expect(style).toMatchInlineSnapshot(`
    Object {
      "marginTop": Array [
        "var(--mh-space-2)",
        "var(--mh-space-3)",
        "var(--mh-space-4)",
      ],
    }
  `)
})

it('should replace media values', () => {
  const style = mh({
    md: { fontSize: 1 },
  })

  expect(style).toMatchInlineSnapshot(`
    Object {
      "@media (min-width: 768px)": Object {
        "fontSize": 1,
      },
    }
  `)

  const atStyle = mh({
    '@media:lg': { fontSize: 1 },
  })

  expect(atStyle).toMatchInlineSnapshot(`
    Object {
      "@media (min-width: 1024px)": Object {
        "fontSize": 1,
      },
    }
  `)
})

it('should leave a functions alone', () => {
  const templateFunction: any = () => null
  const style = mh({
    mt: templateFunction,
  })

  expect(style).toEqual({
    marginTop: templateFunction,
  })
})

it('should allow extending', () => {
  const baseStyle = {
    mt: '--5',
  }

  const style = mh({
    ...baseStyle,
    mx: '--1',
  })

  expect(style).toMatchInlineSnapshot(`
    Object {
      "marginLeft": "var(--mh-1)",
      "marginRight": "var(--mh-1)",
      "marginTop": "var(--mh-5)",
    }
  `)
})
