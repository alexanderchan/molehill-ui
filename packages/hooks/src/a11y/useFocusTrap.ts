import { RefObject, useEffect, useRef } from 'react'
import { useEventListener } from '../utils/useEventListener'
import { useTabbableElements } from './useTabbableElements'
import { focusElement, focusFirstElementInScope, isElementInScope } from '.'

export const scopes: Set<RefObject<HTMLElement[]>> = new Set()

export interface UseFocusTrapOptions {
  isEnabled: boolean
  isContained?: boolean
  isRestorable?: boolean
  isAutoFocused?: boolean
}

export function useFocusTrap({
  isEnabled,
  isContained = true,
  isRestorable = true,
  isAutoFocused = true,
}) {
  const startRef = useRef<HTMLElement>()
  const endRef = useRef<HTMLElement>()
  const scopeRef = useRef<HTMLElement[]>()
  const restoreElementRef = useRef<HTMLElement>(
    typeof window !== 'undefined'
      ? (document.activeElement as HTMLElement)
      : null
  )

  const { onKeyDown } = useTabbableElements(scopeRef, { isTabbable: true })

  useEffect(
    function saveElementsToScope() {
      if (!isEnabled) {
        return
      }

      let node = startRef?.current?.nextSibling
      const nodes = []

      while (node && node !== endRef?.current) {
        nodes.push(node)
        node = node.nextSibling
      }

      scopeRef.current = nodes
      scopes.add(scopeRef)

      return () => {
        scopes.delete(scopeRef)
      }
    },
    [isEnabled]
  )

  useEffect(
    function autoFocusFirstElement() {
      const scope = scopeRef
      const activeElement = document.activeElement as HTMLElement

      if (
        isEnabled &&
        isAutoFocused &&
        !isElementInScope(scope?.current, activeElement)
      ) {
        restoreElementRef.current = activeElement
        focusFirstElementInScope(scope?.current)
      }

      return () => {
        if (isRestorable) {
          focusElement(restoreElementRef?.current)
        }
        restoreElementRef.current = null
      }
    },
    [isEnabled, isAutoFocused, isRestorable, scopeRef]
  )

  useEventListener({
    name: 'keydown',
    listener: (event) => {
      if (!isEnabled || !isContained) {
        return
      }

      onKeyDown(event)
    },
  })

  function getStartProps() {
    return {
      hidden: true,
      ref: startRef,
    }
  }

  function getEndProps() {
    return {
      hidden: true,
      ref: endRef,
    }
  }

  return {
    getStartProps,
    getEndProps,
  }
}
