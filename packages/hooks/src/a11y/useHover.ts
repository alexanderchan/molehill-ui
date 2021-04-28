import {
  MouseEvent,
  PointerEvent as PointerEventType,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

// Inspiration and portions of this code is from React Spectrum

// iOS fires onPointerEnter twice: once with pointerType="touch" and again with pointerType="mouse".
// We want to ignore these emulated events so they do not trigger hover behavior.
// See https://bugs.webkit.org/show_bug.cgi?id=214609.
let globalIgnoreEmulatedMouseEvents = false
let hoverCount = 0

function setGlobalIgnoreEmulatedMouseEvents() {
  globalIgnoreEmulatedMouseEvents = true

  // Clear globalIgnoreEmulatedMouseEvents after a short timeout. iOS fires onPointerEnter
  // with pointerType="mouse" immediately after onPointerUp and before onFocus. On other
  // devices tat don't have this quirk, we don't want to ignore a mouse hover sometime in
  // the distant future because a user previously touched the element.
  setTimeout(() => {
    globalIgnoreEmulatedMouseEvents = false
  }, 50)
}

function handleGlobalPointerEvent(e: any) {
  if (e.pointerType === 'touch') {
    setGlobalIgnoreEmulatedMouseEvents()
  }
}

function setupGlobalTouchEvents() {
  if (typeof document === 'undefined') {
    return
  }

  if (typeof PointerEvent !== 'undefined') {
    document.addEventListener('pointerup', handleGlobalPointerEvent)
  } else {
    document.addEventListener('touchend', setGlobalIgnoreEmulatedMouseEvents)
  }

  hoverCount++
  return () => {
    hoverCount--
    if (hoverCount > 0) {
      return
    }

    if (typeof PointerEvent !== 'undefined') {
      document.removeEventListener('pointerup', handleGlobalPointerEvent)
    } else {
      document.removeEventListener(
        'touchend',
        setGlobalIgnoreEmulatedMouseEvents
      )
    }
  }
}

type HoverEvent<T> = MouseEvent<T> | PointerEventType<T>

export interface UseHoverProps<T = Element> {
  isDisabled?: boolean
  onHoverStart?: (
    event: HoverEvent<T>,
    pointerType: PointerEventType['pointerType']
  ) => void
  onHoverEnd?: (
    event: HoverEvent<T>,
    pointerType: PointerEventType['pointerType']
  ) => void
  onHoverChange?: (isHovered: boolean) => void
}

export function useHover<T extends Element>({
  isDisabled = false,
  onHoverChange,
  onHoverEnd,
  onHoverStart,
}: UseHoverProps<T> = {}) {
  const [isHovered, setIsHovered] = useState(false)
  const state = useRef({
    isHovered: false,
    ignoreEmulatedMouseEvents: false,
  }).current

  const canHover = (
    isHovered: boolean,
    pointerType: PointerEventType<T>['pointerType']
  ) => pointerType !== 'touch' && !isHovered

  useEffect(setupGlobalTouchEvents, [])

  const handleHoverStart = useCallback(
    (event: HoverEvent<T>, pointerType: PointerEventType<T>['pointerType']) => {
      if (isDisabled || !canHover(state.isHovered, pointerType)) {
        return
      }

      state.isHovered = true

      onHoverStart?.(event, pointerType)
      onHoverChange?.(true)
      setIsHovered(true)
    },
    [isDisabled, canHover, setIsHovered]
  )

  const handleHoverEnd = useCallback(
    (event: HoverEvent<T>, pointerType: PointerEventType<T>['pointerType']) => {
      if (isDisabled || !canHover(!state.isHovered, pointerType)) {
        return
      }

      state.isHovered = false

      onHoverEnd?.(event, pointerType)
      onHoverChange?.(false)
      setIsHovered(false)
    },
    [isDisabled, canHover, setIsHovered]
  )

  const getPointerEventProps = useCallback(
    () => ({
      onPointerEnter(event: PointerEventType<T>) {
        if (globalIgnoreEmulatedMouseEvents && event.pointerType === 'mouse') {
          return
        }

        handleHoverStart(event, event.pointerType)
      },
      onPointerLeave(event: PointerEventType<T>) {
        handleHoverEnd(event, event.pointerType)
      },
    }),
    [handleHoverStart, handleHoverEnd]
  )

  const getMouseEventProps = useCallback(
    () => ({
      onTouchStart() {
        state.ignoreEmulatedMouseEvents = true
      },
      onMouseEnter(event: MouseEvent<T>) {
        if (
          !state.ignoreEmulatedMouseEvents &&
          !globalIgnoreEmulatedMouseEvents
        ) {
          handleHoverStart(event, 'mouse')
        }

        state.ignoreEmulatedMouseEvents = false
      },
      onMouseLeave(event: MouseEvent<T>) {
        handleHoverEnd(event, 'mouse')
      },
    }),
    [handleHoverStart, handleHoverEnd]
  )

  const getHoverProps = useCallback(() => {
    if (typeof PointerEvent !== 'undefined') {
      return getPointerEventProps()
    }

    return getMouseEventProps()
  }, [getPointerEventProps, getMouseEventProps])

  return { isHovered, getHoverProps }
}
