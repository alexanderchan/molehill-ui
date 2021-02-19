import { createMacro, MacroError } from 'babel-plugin-macros'
import { traverseVars } from '../index'

export default createMacro(mhMacro)

function mhMacro({ references, babel }) {
  const { types: t } = babel

  // import defaultImport, { mh } from './macro'
  const { mh = [], default: defaultImport = [] } = references
  const referencesArray = [...mh, ...defaultImport]

  referencesArray.forEach((referencePath) => {
    if (referencePath.parentPath.type === 'CallExpression') {
      if (referencePath === referencePath.parentPath.get('callee')) {
        referencePath.parentPath.traverse(traverseVars({ t }))

        const argsNode = referencePath.parentPath.get('arguments')?.[0]?.node
        argsNode && referencePath.parentPath.replaceWith(argsNode)
      }
    } else {
      throw new MacroError('Unknown use of molehill macro. ')
    }
  })
}
