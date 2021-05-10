import {} from 'react'
import { MoleHillUIStyleObject } from '../src/types/css-prop'

declare module 'react' {
  interface Attributes {
    css?: MoleHillUIStyleObject
    style?: MoleHillUIStyleObject
    sx?: MoleHillUIStyleObject
  }
}
