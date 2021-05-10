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
  sm?: MoleHillUIExtendedCSSProperties
  md?: MoleHillUIExtendedCSSProperties
  lg?: MoleHillUIExtendedCSSProperties
  xl?: MoleHillUIExtendedCSSProperties
}

interface OverwrittenCSSProperties {
  boxShadow?: CSS.Property.BoxShadow | number
  fontWeight?: CSS.Property.FontWeight | string
  borderTopStyle?: CSS.Property.BorderTopStyle | string
  borderBottomStyle?: CSS.Property.BorderTopStyle | string
  borderRightStyle?: CSS.Property.BorderTopStyle | string
  borderLeftStyle?: CSS.Property.BorderTopStyle | string
  borderRadius?: CSS.Property.BorderRadius<string | number>
  zIndex?: CSS.Property.ZIndex | string
}

export interface MoleHillUIExtendedCSSProperties
  extends Omit<CSSProperties, keyof OverwrittenCSSProperties>,
    AliasedCSSProperties,
    OverwrittenCSSProperties,
    PseudoCSSProperties {}

export type PseudoCSSProperties = {
  [k in CSS.Pseudos]?: MoleHillUIExtendedCSSProperties
}
