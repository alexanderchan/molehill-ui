import { KeyboardEvent, MouseEvent } from 'react'
import { useControlled } from './useControlled'

export enum OverlayState {
  Open = 'OPEN',
  Closed = 'CLOSED',
}

export interface UseOverlayOptions {
  isOpen?: OverlayState
  defaultIsOpen?: OverlayState
}

export function useOverlay({
  isOpen: isOpenProp,
  defaultIsOpen: defaultIsOpenProp,
}: UseOverlayOptions = {}) {
  const [state, setState] = useControlled<OverlayState>({
    value: isOpenProp,
    defaultValue: defaultIsOpenProp,
  })

  return {
    state,
    isOpen: state === OverlayState.Open,
    isClosed: state === OverlayState.Closed,
    handleOpen(event: MouseEvent<HTMLElement> | KeyboardEvent) {
      event.preventDefault()

      setState(OverlayState.Open)
    },
    handleClose(event: MouseEvent<HTMLElement> | KeyboardEvent) {
      event.preventDefault()

      setState(OverlayState.Closed)
    },
    handleToggle(event: MouseEvent<HTMLElement> | KeyboardEvent) {
      event.preventDefault()
      if (state === OverlayState.Open) {
        setState(OverlayState.Closed)
      } else {
        setState(OverlayState.Open)
      }
    },
  }
}
