import {
  Config,
  defaultConfig,
  MhCssProperties,
  transform,
} from '@molehill-ui/theme'
import clone from 'just-clone'
import { getVisitorFunction } from './visitorFunction'

export function mh(
  obj: MhCssProperties,
  { config = defaultConfig }: { config?: Config } = {}
): MhCssProperties {
  // We need to return an updated object so copy the original
  // using immer's draft could be better if we need to improve the runtime
  // but this isn't intended for production builds
  const objCopy = clone(obj)

  const convertedOjbect = transform({
    node: {
      key: 'mhroot',
      value: objCopy,
      parent: null,
    },
    visitorFunction: getVisitorFunction({ config }),
  })

  return convertedOjbect.value
}
