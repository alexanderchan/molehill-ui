import { KeyboardEvent, RefObject, SyntheticEvent } from 'react'

export * from './useHover'
export * from './useFocus'
export * from './useFocusWithin'
export * from './useTabbableElements'
export * from './useFocusTrap'
export * from './useKeyboard'

const focusableElements = [
  'input:not([disabled]):not([type=hidden])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'button:not([disabled])',
  'a[href]',
  'area[href]',
  'summary',
  'iframe',
  'object',
  'embed',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]',
]

export const FocusableElementSelector = [
  ...focusableElements,
  '[tabindex]',
].join(',')
export const TabbableElementSelector = [
  ...focusableElements,
  '[tabindex]:not([tabindex="-1"])',
].join(':not([tabindex="-1"]),')

export function isElementInScope(scope: HTMLElement[], element: Element) {
  return scope.some((node) => node.contains(element))
}

export function isElementInAnyScope(
  scopes: Set<RefObject<HTMLElement[]>>,
  element: Element
) {
  for (const scope of scopes.values()) {
    if (isElementInScope(scope.current, element)) {
      return true
    }
  }

  return false
}

export function getFocusableElementsInScope(
  scope: HTMLElement[],
  options: { isTabbable?: boolean }
): HTMLElement[] {
  const focusableElements = []
  const selector = options?.isTabbable
    ? TabbableElementSelector
    : FocusableElementSelector

  for (const node of scope) {
    if (node.matches(selector)) {
      focusableElements.push(node)
    }
    focusableElements.push(...Array.from(node.querySelectorAll(selector)))
  }

  return focusableElements
}

export function focusElement(element: HTMLElement | null) {
  try {
    element?.focus()
  } catch (err) {
    // silently fail
  }
}

export function focusFirstElementInScope(scope: HTMLElement[]) {
  const elements = getFocusableElementsInScope(scope, { tabbable: true })
  focusElement(elements?.[0])
}

export function isNotTabKey(event: KeyboardEvent) {
  return (
    !['Tab'].includes(event?.key) ||
    event.altKey ||
    event.ctrlKey ||
    event.metaKey
  )
}

/**
 * Inspiration from React Spectrum
 * https://github.com/adobe/react-spectrum/blob/main/packages/%40react-types/shared/src/events.d.ts
 */
export type BaseEvent<T extends SyntheticEvent> = T & {
  /** @deprecated Use continuePropagation. */
  stopPropagation(): void
  continuePropagation(): void
}

export function createEventHandler<T extends SyntheticEvent>(
  handler: (e: BaseEvent<T>) => void
): (e: T) => void {
  if (!handler) {
    return
  }

  let shouldStopPropagation = true
  return (e: T) => {
    const event: BaseEvent<T> = {
      ...e,
      preventDefault() {
        e.preventDefault()
      },
      isDefaultPrevented() {
        return e.isDefaultPrevented()
      },
      stopPropagation() {
        console.error(
          'stopPropagation is now the default behavior for events in React Spectrum. You can use continuePropagation() to revert this behavior.'
        )
      },
      continuePropagation() {
        shouldStopPropagation = false
      },
    }

    handler(event)

    if (shouldStopPropagation) {
      e.stopPropagation()
    }
  }
}
