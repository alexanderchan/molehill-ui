import {} from 'react'
import * as CSS from 'csstype'

type StandardCSSProperties = CSS.Properties<number | string>

interface CSSProperties
  extends CSS.StandardProperties<number | string>,
    CSS.SvgProperties<number | string>,
    CSS.VendorProperties<number | string> {}

interface AliasedCSSProperties {
  bg?: StandardCSSProperties['backgroundColor']
  m?: StandardCSSProperties['margin']
  mt?: StandardCSSProperties['margin']
  mr?: StandardCSSProperties['margin']
  mb?: StandardCSSProperties['margin']
  ml?: StandardCSSProperties['margin']
  mx?: StandardCSSProperties['margin']
  my?: StandardCSSProperties['margin']
  p?: StandardCSSProperties['padding']
  pt?: StandardCSSProperties['padding']
  pr?: StandardCSSProperties['padding']
  pb?: StandardCSSProperties['padding']
  pl?: StandardCSSProperties['padding']
  px?: StandardCSSProperties['padding']
  py?: StandardCSSProperties['padding']
}

interface OverwrittenCSSProperties {
  fontWeight?: CSS.Property.FontWeight | 'extrabold'
}

interface MoleHillUIExtendedCSSProperties
  extends Omit<CSSProperties, keyof OverwrittenCSSProperties>,
    AliasedCSSProperties,
    OverwrittenCSSProperties {}

declare module 'react' {
  interface Attributes {
    css?: MoleHillUIExtendedCSSProperties
    style?: MoleHillUIExtendedCSSProperties
  }
}
