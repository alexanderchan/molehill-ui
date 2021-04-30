import { FocusEvent } from 'react'

interface UseFocusProps<T> {
  onFocus?: <T>(event: FocusEvent<T>) => void
  onBlur?: <T>(event: FocusEvent<T>) => void
}

export function useFocus<T = HTMLInputElement>({
  onFocus: onFocusCallback,
  onBlur: onBlurCallback,
}: UseFocusProps<T>): {
  getFocusProps: () => {
    onFocus: (event: FocusEvent<T>) => void
    onBlur: (event: FocusEvent<T>) => void
  }
} {
  function onFocus(event: FocusEvent<T>) {
    onFocusCallback
      ? event?.target === event?.currentTarget
        ? onFocusCallback(event)
        : null
      : null
  }

  function onBlur(event: FocusEvent<T>) {
    onBlurCallback
      ? event?.target === event?.currentTarget
        ? onBlurCallback(event)
        : null
      : null
  }

  function getFocusProps() {
    return {
      onFocus,
      onBlur,
    }
  }

  return {
    getFocusProps,
  }
}
