import { RefObject, useEffect, useRef } from 'react'

export interface UseOnClickOutsideOptions<T> {
  ref: RefObject<T>
  handler: (event: any) => void
  exception?: RefObject<T>
  isEnabled?: boolean
}

export function useOnClickOutside<T extends HTMLElement>({
  ref,
  exception,
  handler,
  isEnabled = true,
}: UseOnClickOutsideOptions<T>) {
  const handlerRef = useRef<UseOnClickOutsideOptions<T>['handler']>()

  useEffect(() => {
    handlerRef.current = handler
  }, [handler])

  useEffect(() => {
    function listener(event: any) {
      if (
        !isEnabled ||
        !ref?.current ||
        ref?.current?.contains(event.target as HTMLElement) ||
        exception?.current?.contains(event.target as HTMLElement)
      ) {
        return
      }

      handlerRef?.current?.(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [isEnabled, ref, exception])
}
