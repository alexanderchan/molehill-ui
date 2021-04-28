import { Meta, Story } from '@storybook/react'
import {
  useFocus,
  useFocusContain,
  useFocusWithin,
  UseFocusWithinProps,
  useHover,
  UseHoverProps,
} from '@molehill-ui/hooks/a11y'
import { useSentinels } from '../../../hooks/src/a11y/useSentinels'
import { ReactNode, useState } from 'react'
import {
  UseFocusContainProps,
  useFocusFirst,
  UseFocusFirstProps,
} from '../../../hooks/src/a11y'
import {
  useFocusRestore,
  UseFocusRestoreProps,
} from '@molehill-ui/hooks/src/a11y/useFocusRestore'

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
    isDisabled: isDisabled,
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

const UseFocusContainTemplate: Story<
  UseFocusContainProps & { children: ReactNode }
> = ({ children, isEnabled }) => {
  const { scopeRef, getStartProps, getEndProps } = useSentinels({ children })

  useFocusContain(scopeRef, { isEnabled })

  return (
    <>
      <span {...getStartProps()} />
      {children}
      <span {...getEndProps()} />

      <button>No tabbing to this element</button>
    </>
  )
}

export const UseFocusContain = UseFocusContainTemplate.bind({})

UseFocusContain.args = {
  isEnabled: true,
  children: (
    <>
      <input type="text" />
      <input type="text" />
    </>
  ),
}

UseFocusContain.storyName = 'useFocusContain'

const UseFocusFirstTemplate: Story<
  UseFocusFirstProps & { children: ReactNode }
> = ({ children, isEnabled }) => {
  const { scopeRef, getStartProps, getEndProps } = useSentinels({ children })

  useFocusFirst(scopeRef, { isEnabled })

  return (
    <>
      <span {...getStartProps()} />
      {children}
      <span {...getEndProps()} />
    </>
  )
}

export const UseFocusFirst = UseFocusFirstTemplate.bind({})

UseFocusFirst.args = {
  isEnabled: true,
  children: (
    <>
      <input type="text" />
      <input type="text" />
    </>
  ),
}

UseFocusFirst.storyName = 'useFocusFirst'

const UseFocusRestoreTemplate: Story<
  UseFocusRestoreProps & { children: ReactNode }
> = ({ children, isEnabled, isContained }) => {
  const [isVisible, setIsVisible] = useState(false)
  const { scopeRef, startRef, endRef } = useSentinels({ children })

  useFocusRestore(scopeRef, { isEnabled, isContained })
  useFocusFirst(scopeRef, { isEnabled })

  return (
    <>
      <button onClick={() => setIsVisible(true)}>Show inputs</button>
      {isVisible ? (
        <div>
          <span ref={startRef} />
          {children}
          <span ref={endRef} />
        </div>
      ) : null}
    </>
  )
}

export const UseFocusRestore = UseFocusRestoreTemplate.bind({})

UseFocusRestore.args = {
  isEnabled: true,
  isContained: true,
  children: (
    <>
      <input type="text" />
      <input type="text" />
    </>
  ),
}

UseFocusRestore.storyName = 'useFocusRestore'
