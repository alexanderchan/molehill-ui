import { useOverlay, UseOverlayOptions } from '@molehill-ui/hooks'
import { Meta, Story } from '@storybook/react'

export default {
  title: 'useOverlay',
} as Meta

const UseOverlayTemplate: Story<UseOverlayOptions> = () => {
  const { isOpen, handleToggle } = useOverlay()
  return (
    <>
      <button onClick={handleToggle}>Toggle overlay</button>
      {isOpen ? <div>Overlay</div> : null}
    </>
  )
}

export const UseOverlay = UseOverlayTemplate.bind({})

UseOverlay.args = {
  isOpen: false,
  defaultIsOpen: false,
}

UseOverlay.storyName = 'useOverlay'
