import { useCallback, useRef, useState } from 'react'

export interface UseControlledOptions<T> {
  value: T
  defaultValue: T
}

export function useControlled<T>({
  value,
  defaultValue: defaultValue,
}: UseControlledOptions<T>): [T, (value: T | ((prevState: T) => T)) => void] {
  const [valueState, setValueState] = useState(value || defaultValue)

  const controlledRef = useRef(value !== undefined)
  const stateRef = useRef(valueState)

  const wasControlled = controlledRef?.current
  const isControlled = value !== undefined

  if (wasControlled !== isControlled) {
    console.warn(
      `WARNING: A component changed from ${
        wasControlled ? 'controlled' : 'uncontrolled'
      } to ${isControlled ? 'controlled' : 'uncontrolled'}.`
    )
  }

  controlledRef.current = isControlled

  const setValue = useCallback(
    (value) => {
      if (typeof value === 'function') {
        setValueState((oldValue) => {
          const intercepted = value(isControlled ? stateRef?.current : oldValue)
          if (!isControlled) {
            return intercepted
          } else {
            return oldValue
          }
        })
      } else {
        if (!isControlled) {
          setValueState(value)
        }
      }
    },
    [isControlled]
  )

  if (isControlled) {
    stateRef.current = value
  } else {
    value = valueState
  }

  return [value, setValue]
}
