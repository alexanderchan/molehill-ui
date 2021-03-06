import {
  FocusEvent,
  RefObject,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react'
import { useFocus } from './useFocus'
import { useTabbableElements } from './useTabbableElements'
import { focusFirstElementInScope, isElementInAnyScope } from '.'

export let activeScope: RefObject<HTMLElement[]> = null

export type UseFocusContainProps = {
  availableScopes?: Set<RefObject<HTMLElement[]>>
  isEnabled?: boolean
  isTabbable?: boolean
}

export function useFocusContain(
  scopeRef: RefObject<HTMLElement[]>,
  {
    isEnabled = true,
    isTabbable = true,
    availableScopes,
  }: UseFocusContainProps = {}
) {
  const focusedRef = useRef<HTMLElement>(null)
  const animationFrameRef = useRef<number>(null)

  const { onKeyDown } = useTabbableElements(scopeRef, { isTabbable })

  const { getFocusProps } = useFocus({
    onFocus(event: FocusEvent<HTMLElement>) {
      const isInScope = isElementInAnyScope(
        availableScopes,
        event?.target as Element
      )

      if (!isInScope) {
        if (focusedRef?.current) {
          focusedRef?.current?.focus()
        } else if (activeScope?.current) {
          focusFirstElementInScope(activeScope?.current)
        }
      } else {
        activeScope = scopeRef
        focusedRef.current = event?.target as HTMLElement
      }
    },

    onBlur(event: FocusEvent<HTMLElement>) {
      animationFrameRef.current = requestAnimationFrame(() => {
        const isInScope = isElementInAnyScope(
          availableScopes,
          document.activeElement
        )

        if (!isInScope) {
          activeScope = scopeRef
          focusedRef.current = event?.target as HTMLElement
          focusedRef?.current?.focus()
        }
      })
    },
  })

  const { onFocus, onBlur } = getFocusProps()
  const onFocusRef = useRef(onFocus)
  const onBlurRef = useRef(onBlur)

  useLayoutEffect(() => {
    onFocusRef.current = onFocus
    onBlurRef.current = onBlur
  })

  useEffect(() => {
    const scope = scopeRef?.current

    if (!isEnabled) {
      return
    }

    document.addEventListener('keydown', onKeyDown, false)
    document.addEventListener('focusin', onFocusRef.current as any, false)

    scope.forEach((element) =>
      element.addEventListener('focusout', onBlurRef.current as any, false)
    )

    scope.forEach((element) =>
      element.addEventListener('focusin', onFocusRef.current as any, false)
    )

    return () => {
      document.removeEventListener('keydown', onKeyDown, false)
      document.removeEventListener('focusin', onFocusRef.current as any, false)

      scope.forEach((element) =>
        element.removeEventListener('focusout', onBlurRef.current as any, false)
      )

      scope.forEach((element) =>
        element.removeEventListener('focusin', onFocusRef.current as any, false)
      )
    }
  }, [scopeRef, isEnabled, onKeyDown])

  useEffect(() => {
    return () => cancelAnimationFrame(animationFrameRef.current)
  }, [animationFrameRef])
}
