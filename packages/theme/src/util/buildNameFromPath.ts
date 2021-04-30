import { DEFAULT_KEY, ROOT_KEY } from './convertThemeToCssVar'
import { depluralize } from './depluralize'
import { kebabCase } from './kebab-case'
import { Node } from './transform'

// this can be slow if run a lot but should be fast enough
// during a one time theme generation
export function buildNameFromPath({ node }: { node: Node }) {
  let fullName = node.key !== DEFAULT_KEY ? node.key : ''

  let parent = node.parent
  while (parent && parent?.key !== ROOT_KEY) {
    let key = parent.key
    if (parent.parent?.key === ROOT_KEY) {
      key = depluralize({ name: parent.key })
    }
    fullName = `${key}${fullName ? '-' : ''}${fullName}`
    parent = parent.parent
  }

  return kebabCase(fullName)
}
