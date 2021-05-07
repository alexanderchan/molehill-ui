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
      import: (atRule, { Rule, Declaration }) => {
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
  }
}

module.exports.postcss = true
