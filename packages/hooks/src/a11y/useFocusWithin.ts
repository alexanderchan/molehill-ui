import { FocusEvent, useState } from 'react'

export type UseFocusWithinProps = {
  onFocus?: (event: FocusEvent) => void
  onBlur?: (event: FocusEvent) => void
}

export function useFocusWithin({
  onFocus: onFocusCallback,
  onBlur: onBlurCallback,
}: UseFocusWithinProps) {
  const [isFocusWithin, setIsFocusWithin] = useState(false)

  function onFocus(event: FocusEvent) {
    !isFocusWithin ? (onFocusCallback?.(event), setIsFocusWithin(true)) : null
  }

  function onBlur(event: FocusEvent) {
    isFocusWithin &&
    !event.currentTarget.contains(event.relatedTarget as HTMLElement)
      ? (onBlurCallback?.(event), setIsFocusWithin(false))
      : null
  }

  function getFocusProps() {
    return {
      onFocus,
      onBlur,
    }
  }

  return {
    isFocusWithin,
    getFocusProps,
  }
}
