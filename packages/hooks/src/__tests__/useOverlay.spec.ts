import { renderHook, act } from '@testing-library/react-hooks'
import { OverlayState, useOverlay } from '../useOverlay'

describe('useOverlay', () => {
  it('should open the overlay when handleOpen handler is called', () => {
    const { result } = renderHook(() => useOverlay())

    act(() => result?.current?.handleOpen({ preventDefault: jest.fn() } as any))

    expect(result?.current?.isOpen).toEqual(true)
    expect(result?.current?.isClosed).toEqual(false)
    expect(result?.current?.state).toEqual(OverlayState.Open)
  })

  it('should close the overlay when handleClose handler is called', () => {
    const { result } = renderHook(() => useOverlay())

    act(() =>
      result?.current?.handleClose({ preventDefault: jest.fn() } as any)
    )

    expect(result?.current?.isOpen).toEqual(false)
    expect(result?.current?.isClosed).toEqual(true)
    expect(result?.current?.state).toEqual(OverlayState.Closed)
  })

  it('should toggle the state when handleToggler handler is called', () => {
    const { result } = renderHook(() => useOverlay())

    act(() =>
      result?.current?.handleToggle({ preventDefault: jest.fn() } as any)
    )

    expect(result?.current?.state).toEqual(OverlayState.Open)

    act(() =>
      result?.current?.handleToggle({ preventDefault: jest.fn() } as any)
    )

    expect(result?.current?.state).toEqual(OverlayState.Closed)
  })

  it('should accept default open state', () => {
    const { result } = renderHook(() =>
      useOverlay({ defaultIsOpen: OverlayState.Closed })
    )

    expect(result?.current?.state).toEqual(OverlayState.Closed)

    act(() => result?.current?.handleOpen({ preventDefault: jest.fn() } as any))

    expect(result?.current?.state).toEqual(OverlayState.Open)
  })
})
