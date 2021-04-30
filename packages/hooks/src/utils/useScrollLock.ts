import { useEffect } from 'react'

export interface UseScrollLockOptions {
  isEnabled: boolean
}

export function useScrollLock({ isEnabled }: UseScrollLockOptions) {
  useEffect(() => {
    if (!isEnabled) {
      return
    }

    const overflow = document.documentElement.style.overflow
    const paddingRight = document.documentElement.style.paddingRight

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth

    document.documentElement.style.overflow = 'hidden'
    document.documentElement.style.paddingRight = `${scrollbarWidth}px`

    return () => {
      document.documentElement.style.overflow = overflow
      document.documentElement.style.paddingRight = paddingRight
    }
  }, [isEnabled])
}
