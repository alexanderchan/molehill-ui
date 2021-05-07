import { addVar } from '@molehill-ui/theme'
import fs from 'fs'
import tap from 'lodash/tap'
import postcss from 'postcss'
import { loadConfig } from './loadConfig'

function updateSource(nodes, source) {
  return tap(Array.isArray(nodes) ? postcss.root({ nodes }) : nodes, (tree) => {
    tree.walk((node) => (node.source = source))
  })
}

function getCssFiles() {
  const normalize = postcss.parse(
    fs.readFileSync(require.resolve('modern-normalize'), 'utf8')
  )

  const base = postcss.parse(
    fs.readFileSync(`${__dirname}/../css/base.css`, 'utf8')
  )

  return [...normalize.nodes, ...base.nodes]
}

const config = loadConfig()

module.exports = () => {
  const { cssVars } = config
  const styles = getCssFiles()

  return {
    postcssPlugin: 'postcss-molehill',
    AtRule: {
      import(atRule, { Rule, Declaration }) {
        if (atRule.params.includes('molehill-ui/base')) {
          atRule.replaceWith(updateSource(styles, atRule.source))
        }

        if (atRule.params.includes('molehill-ui/variables')) {
          const rule = new Rule({ selector: ':root' })

          Object.keys(cssVars)?.forEach((key) => {
            const color = new Declaration({ prop: key, value: cssVars?.[key] })
            rule.append(color)
          })

          rule.source = atRule.source

          atRule.replaceWith(rule)
        }
      },
    },
    Declaration(declaration, { Declaration }) {
      const { prop: property, value } = declaration

      const variable = addVar({
        propertyName: property.replace(/-([a-z])/g, function (g) {
          return g[1].toUpperCase()
        }),
        cssPropertyValue: value,
        config,
      })

      const newDeclaration = new Declaration({
        prop: property,
        value: variable,
      })

      if (newDeclaration.value !== declaration.value) {
        declaration.replaceWith(newDeclaration)
      }
    },
  }
}

module.exports.postcss = true
