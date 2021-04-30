import { useEffect, useLayoutEffect } from 'react'
import { canUseDom } from '.'

/**
 * Inspiration taken from Reach UI
 * https://github.com/reach/reach-ui/blob/develop/packages/utils/src/use-isomorphic-layout-effect.ts
 */
export const useIsomorphicLayoutEffect = canUseDom()
  ? useLayoutEffect
  : useEffect
