import { loadConfig } from './loadConfig'

const config = loadConfig()

module.exports = () => {
  const { cssVars } = config

  return {
    postcssPlugin: 'postcss-molehill',
    AtRule: {
      import: (atRule, { Rule, Declaration }) => {
        if (atRule.params.includes('molehill/theme')) {
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
