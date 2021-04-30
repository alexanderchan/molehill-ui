import { useRef } from 'react'
import {
  useDialog,
  useFocusTrap,
  useKeyboard,
  useOnClickOutside,
  useScrollLock,
} from '@molehill-ui/hooks'
import { Meta } from '@storybook/react'

export default {
  title: 'Dialogs',
} as Meta

const UseDialogTemplate = () => {
  const ref = useRef()
  const triggerRef = useRef()

  const { isOpen, handleToggle, handleClose, getDialogProps } = useDialog()

  const { getStartProps, getEndProps } = useFocusTrap({ isEnabled: isOpen })

  const { getKeyboardProps } = useKeyboard({
    isEnabled: isOpen,
    onKeyUp(event) {
      if (event.key === 'Escape') {
        handleClose(event)
      }
    },
  })

  useOnClickOutside({
    ref,
    isEnabled: isOpen,
    handler: handleClose,
    exception: triggerRef,
  })

  useScrollLock({ isEnabled: isOpen })

  return (
    <>
      <button ref={triggerRef} onClick={handleToggle}>
        Toggle dialog
      </button>
      <div ref={ref}>
        {isOpen ? (
          <div {...getDialogProps()} {...getKeyboardProps()}>
            <span {...getStartProps()} />
            <input type="text" />
            <button onClick={handleClose}>Dismiss</button>
            <span {...getEndProps()} />
          </div>
        ) : null}
      </div>
    </>
  )
}

export const UseDialog = UseDialogTemplate.bind({})

UseDialog.args = {
  isOpen: false,
  defaultIsOpen: false,
}

UseDialog.storyName = 'useDialog'
