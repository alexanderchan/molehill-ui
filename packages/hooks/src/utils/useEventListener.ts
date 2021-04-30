import { useEffect, useRef } from 'react'

export interface UseEventListenerOptions<T extends keyof WindowEventMap> {
  name: T
  listener: (event: WindowEventMap[T]) => any
  element?: HTMLElement | Document | Window | EventTarget
}

export function useEventListener<T extends keyof WindowEventMap>({
  name,
  listener: listenerProp,
  element = window,
}: UseEventListenerOptions<T>) {
  const handler = useRef(listenerProp)

  useEffect(() => {
    handler.current = listenerProp
  }, [listenerProp])

  useEffect(() => {
    const isSupported = element && element.addEventListener

    if (!isSupported) {
      return
    }

    function listener(event: WindowEventMap[T]) {
      handler.current(event)
    }

    element.addEventListener(name, listener as any, true)

    return () => element.removeEventListener(name, listener as any, true)
  }, [name, element])
}
