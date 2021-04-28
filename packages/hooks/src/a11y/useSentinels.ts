import { ReactNode, RefObject, useEffect, useRef } from 'react'

export const sentinelScopes: Set<RefObject<HTMLElement[]>> = new Set()

export function useSentinels({ children }: { children: ReactNode }) {
  const startRef = useRef<HTMLSpanElement>()
  const endRef = useRef<HTMLSpanElement>()
  const scopeRef = useRef<HTMLElement[]>([])

  useEffect(() => {
    let node = startRef?.current?.nextSibling
    const nodes = []

    while (node && node !== endRef?.current) {
      nodes.push(node)
      node = node.nextSibling
    }

    scopeRef.current = nodes
    sentinelScopes.add(scopeRef)

    return () => {
      sentinelScopes.delete(scopeRef)
    }
  }, [children])

  function getStartProps() {
    return {
      ref: startRef,
      hidden: true,
    }
  }

  function getEndProps() {
    return {
      ref: endRef,
      hidden: true,
    }
  }

  return { scopeRef, startRef, endRef, getStartProps, getEndProps }
}
