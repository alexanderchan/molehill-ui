import { ReactNode, useState } from 'react'
import {
  useFocus,
  useFocusWithin,
  UseFocusWithinProps,
  useHover,
  UseHoverProps,
} from '@molehill-ui/hooks/a11y'
import { Meta, Story } from '@storybook/react'

export default {
  title: 'a11y',
} as Meta

export const UseFocus = () => {
  const { getFocusProps } = useFocus({
    onFocus(event) {
      console.log('focus', event)
    },
    onBlur(event) {
      console.log('blur', event)
    },
  })

  return (
    <>
      <label>Focus on input and watch console</label>
      <input {...getFocusProps()} />
    </>
  )
}

UseFocus.storyName = 'useFocus'

const UseFocusWithinTemplate: Story<UseFocusWithinProps> = () => {
  const { isFocusWithin, getFocusProps } = useFocusWithin({
    onFocus(event) {
      console.log('focus', event)
    },
    onBlur(event) {
      console.log('blur', event)
    },
  })

  return (
    <div {...getFocusProps()}>
      <label>Is focus within parent div: {isFocusWithin ? 'yes' : 'no'}</label>
      <input />
    </div>
  )
}

export const UseFocusWithin = UseFocusWithinTemplate.bind({})

UseFocusWithin.storyName = 'useFocusWithin'

const UseHoverTemplate: Story<UseHoverProps> = ({ isDisabled }) => {
  const { getHoverProps } = useHover({
    isDisabled,
    onHoverEnd(event) {
      console.log('hoverEnd', event)
    },
    onHoverStart(event) {
      console.log('hoverStart', event)
    },
    onHoverChange(isHovered) {
      console.log('isHovered', isHovered)
    },
  })

  return (
    <>
      <p>Hover button and watch console</p>
      <button {...getHoverProps()}>Hover me</button>
    </>
  )
}

export const UseHover = UseHoverTemplate.bind({})

UseHover.args = {
  isDisabled: false,
}

UseHover.storyName = 'useHover'
