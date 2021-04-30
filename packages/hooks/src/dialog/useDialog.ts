import { useRef } from 'react'
import { useOverlay } from '../useOverlay'
import { useId } from '../utils'

export interface UseDialogOptions {
  id?: string
  isOpen?: boolean
  defaultIsOpen?: boolean
  role?: string
  isDismissable?: boolean
}

export function useDialog<T extends HTMLDivElement>({
  id: idProp,
  isOpen: isOpenProp,
  defaultIsOpen: defaultIsOpenProp,
  role = 'dialog',
  ...options
}: UseDialogOptions = {}) {
  const ref = useRef<T>()
  const defaultId = `molehill-use-dialog-${useId()}`

  const id = idProp || defaultId

  const { isOpen, ...handlers } = useOverlay({
    isOpen: isOpenProp,
    defaultIsOpen: defaultIsOpenProp,
  })

  function getDialogProps() {
    return {
      id,
      ref,
      role,
      tabIndex: -1,
      'aria-modal': isOpen ? true : undefined,
      'aria-labelledby': options?.['aria-labelledby'],
      'aria-describedby': options?.['aria-describedby'],
    }
  }

  return {
    isOpen,
    getDialogProps,
    ...handlers,
  }
}
