import { RefObject, useEffect } from 'react'
import { focusFirstElementInScope, isElementInScope } from '.'

let activeScope: RefObject<HTMLElement[]> = null

export interface UseFocusFirstProps {
  isEnabled?: boolean
}

export function useFocusFirst(
  scopeRef: RefObject<HTMLElement[]>,
  { isEnabled }: UseFocusFirstProps = {}
) {
  useEffect(() => {
    activeScope = scopeRef

    if (
      isEnabled &&
      !isElementInScope(activeScope?.current, document.activeElement)
    ) {
      focusFirstElementInScope(scopeRef?.current)
    }
  }, [scopeRef])
}
