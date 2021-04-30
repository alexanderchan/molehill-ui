import { KeyboardEvent, RefObject, useLayoutEffect } from 'react'
import { useSSR } from '../utils'
import {
  FocusableElementSelector,
  focusElement,
  isElementInScope,
  isNotTabKey,
  TabbableElementSelector,
} from '.'

function getFocusableTreeWalker(
  root: HTMLElement,
  options: { isTabbable?: boolean; from?: HTMLElement } = {}
) {
  const { isTabbable, from } = options

  const selector = isTabbable
    ? TabbableElementSelector
    : FocusableElementSelector

  const walker = document.createTreeWalker(
    root,
    NodeFilter.SHOW_ELEMENT,
    {
      acceptNode(node) {
        if (from?.contains(node)) {
          return NodeFilter.FILTER_REJECT
        }

        if ((node as HTMLElement).matches(selector)) {
          return NodeFilter.FILTER_ACCEPT
        }

        return NodeFilter.FILTER_SKIP
      },
    },
    false
  )

  if (from) {
    walker.currentNode = from
  }

  return walker
}

export interface UseFocusRestoreProps {
  isEnabled?: boolean
  isContained?: boolean
}

export function useFocusRestore(
  scopeRef: RefObject<HTMLElement[]>,
  { isEnabled, isContained }: UseFocusRestoreProps = {}
) {
  const { isBrowser } = useSSR()
  const nodeToRestore = isBrowser
    ? (document.activeElement as HTMLElement)
    : null

  function onKeyDown(event: KeyboardEvent) {
    const focusedElement = document.activeElement as HTMLElement

    if (
      isNotTabKey(event) ||
      !isElementInScope(scopeRef?.current, focusedElement)
    ) {
      return
    }

    const walker = getFocusableTreeWalker(document.body, { isTabbable: true })

    walker.currentNode = focusedElement

    let nextElement = (event?.shiftKey
      ? walker.previousNode()
      : walker.nextNode()) as HTMLElement

    if (
      (!nextElement || !isElementInScope(scopeRef?.current, nextElement)) &&
      nodeToRestore
    ) {
      walker.currentNode = nodeToRestore

      do {
        nextElement = (event?.shiftKey
          ? walker?.previousNode()
          : walker?.nextNode()) as HTMLElement
      } while (isElementInScope(scopeRef?.current, nextElement))

      event.preventDefault()
      event.stopPropagation()

      if (nextElement) {
        nextElement.focus()
      } else {
        focusedElement?.blur()
      }
    }
  }

  useLayoutEffect(() => {
    const scope = scopeRef?.current

    if (!isContained) {
      document.addEventListener('keydown', onKeyDown as any, true)
    }

    return () => {
      if (!isContained) {
        document.removeEventListener('keydown', onKeyDown as any, true)
      }

      if (
        isEnabled &&
        nodeToRestore &&
        isElementInScope(scope, document.activeElement)
      ) {
        requestAnimationFrame(() => {
          if (document.body.contains(nodeToRestore)) {
            focusElement(nodeToRestore)
          }
        })
      }
    }
  }, [isEnabled, isContained, nodeToRestore])
}
