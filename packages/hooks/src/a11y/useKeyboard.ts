import { KeyboardEvent } from 'react'
import { createEventHandler } from '.'

export interface UseKeyboardOptions {
  isEnabled?: boolean
  onKeyDown?: (event: KeyboardEvent) => void
  onKeyUp?: (event: KeyboardEvent) => void
}

export function useKeyboard({
  isEnabled = true,
  onKeyDown,
  onKeyUp,
}: UseKeyboardOptions) {
  function getKeyboardProps() {
    if (!isEnabled) {
      return
    }

    return {
      onKeyDown: createEventHandler(onKeyDown),
      onKeyUp: createEventHandler(onKeyUp),
    }
  }

  return { getKeyboardProps }
}
