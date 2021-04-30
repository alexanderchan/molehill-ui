export * from './useSSR'
export * from './useIsomorphicLayoutEffect'
export * from './useId'
export * from './useEventListener'
export * from './useScrollLock'

/**
 * Inspiration from Reach UI
 * https://github.com/reach/reach-ui/blob/develop/packages/utils/src/can-use-dom.ts
 */
export function canUseDom() {
  return !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  )
}
