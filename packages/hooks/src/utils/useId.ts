import { useEffect, useState } from 'react'
import { useIsomorphicLayoutEffect as useLayoutEffect } from './useIsomorphicLayoutEffect'

/**
 * Inspiration from Reach UI
 * https://github.com/reach/reach-ui/blob/develop/packages/auto-id/src/index.tsx
 */

let serverHandoffComplete = false
let id = 0

function generateId() {
  return ++id
}

export function useId() {
  const defaultId = serverHandoffComplete ? generateId() : null
  const [id, setId] = useState(defaultId)

  useLayoutEffect(() => {
    if (id === null) {
      setId(generateId())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (serverHandoffComplete === false) {
      serverHandoffComplete = true
    }
  }, [])

  return id != null ? String(id) : undefined
}
