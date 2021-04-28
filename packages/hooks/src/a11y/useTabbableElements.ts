import { RefObject } from 'react'
import {
  focusElement,
  getFocusableElementsInScope,
  isElementInScope,
  isNotTabKey,
} from '.'

export function useTabbableElements(
  scopeRef: RefObject<HTMLElement[]>,
  { isTabbable = true }: { isTabbable: boolean }
) {
  function onKeyDown(event: KeyboardEvent) {
    const focusedElement = document.activeElement as HTMLElement

    if (
      isNotTabKey(event) ||
      !isElementInScope(scopeRef?.current, focusedElement)
    ) {
      return
    }

    const focusableElements = getFocusableElementsInScope(scopeRef?.current, {
      isTabbable,
    })

    const focusedElementIndex = focusableElements?.indexOf(focusedElement)
    const lastFocusedElementIndex = focusableElements?.length - 1

    let nextElement = null

    if (event.shiftKey) {
      if (focusedElementIndex <= 0) {
        nextElement = focusableElements?.[lastFocusedElementIndex]
      } else {
        nextElement = focusableElements?.[focusedElementIndex - 1]
      }
    } else {
      if (focusedElementIndex === lastFocusedElementIndex) {
        nextElement = focusableElements?.[0]
      } else {
        nextElement = focusableElements?.[focusedElementIndex + 1]
      }
    }

    event.preventDefault()

    if (nextElement) {
      focusElement(nextElement)
    }
  }

  return { onKeyDown }
}
