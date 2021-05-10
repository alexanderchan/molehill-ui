import {} from 'react'
import { MoleHillUIExtendedCSSProperties } from '../src/types/css-prop'

declare module 'react' {
  interface Attributes {
    css?: MoleHillUIExtendedCSSProperties
    style?: MoleHillUIExtendedCSSProperties
  }
}
