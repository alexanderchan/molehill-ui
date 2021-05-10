import * as CSS from 'csstype'

type StandardCSSProperties = CSS.Properties<number | string>

type Empty = undefined | null | false

export type ResponsiveStyleValue<T> = T | Empty | Array<T | Empty>

export interface CSSProperties
  extends CSS.StandardProperties<number | string>,
    CSS.SvgProperties<number | string>,
    CSS.VendorProperties<number | string> {}
export type CSSPseudoSelectorProps = {
  [K in CSS.Pseudos]?: MoleHillUIStyleObject
}

export interface CSSObject
  extends CSSPropertiesWithMultiValues,
    CSSPseudosForCSSObject,
    CSSOthersObjectForCSSObject {}

type CSSPropertiesWithMultiValues = {
  [K in keyof CSSProperties]: CSSProperties[K]
}
type CSSPseudosForCSSObject = { [K in CSS.Pseudos]?: CSSObject }
type CSSInterpolation = undefined | number | string | CSSObject
interface CSSOthersObjectForCSSObject {
  [propertiesName: string]: CSSInterpolation
}

interface AliasesCSSProperties {
  bg?: StandardCSSProperties['backgroundColor']
  m?: StandardCSSProperties['margin']
  mt?: StandardCSSProperties['marginTop']
  mr?: StandardCSSProperties['marginRight']
  mb?: StandardCSSProperties['marginBottom']
  ml?: StandardCSSProperties['marginLeft']
  mx?: StandardCSSProperties['marginLeft']
  my?: StandardCSSProperties['marginTop']
  p?: StandardCSSProperties['padding']
  pt?: StandardCSSProperties['paddingTop']
  pr?: StandardCSSProperties['paddingRight']
  pb?: StandardCSSProperties['paddingBottom']
  pl?: StandardCSSProperties['paddingLeft']
  px?: StandardCSSProperties['paddingLeft']
  py?: StandardCSSProperties['paddingTop']
  sm?: MoleHillUICSSObject
  md?: MoleHillUICSSObject
  lg?: MoleHillUICSSObject
  xl?: MoleHillUICSSObject
}

interface OverwriteCSSProperties {
  boxShadow?: CSS.Property.BoxShadow | number
  fontWeight?: CSS.Property.FontWeight | string
  borderTopStyle?: CSS.Property.BorderTopStyle | string
  borderBottomStyle?: CSS.Property.BorderBottomStyle | string
  borderRightStyle?: CSS.Property.BorderRightStyle | string
  borderLeftStyle?: CSS.Property.BorderLeftStyle | string
  borderRadius?: CSS.Property.BorderRadius<string | number>
  zIndex?: CSS.Property.ZIndex | string
}

export interface MoleHillUIExtendedCSSProperties
  extends Omit<CSSProperties, keyof OverwriteCSSProperties>,
    AliasesCSSProperties,
    OverwriteCSSProperties {}

type MoleHillUIStyleValue<T> = ResponsiveStyleValue<
  T | ObjectWithDefault<T> | T[]
>

export type StylePropertyValue<T> =
  | MoleHillUIStyleValue<Exclude<T, undefined>>
  | MoleHillUIStyleObject
  | Empty

export type MoleHillUICSSProperties = {
  [K in keyof MoleHillUIExtendedCSSProperties]: StylePropertyValue<
    MoleHillUIExtendedCSSProperties[K]
  >
}

export interface CSSOthersObject {
  [k: string]: StylePropertyValue<string | number>
}

export interface MoleHillUICSSObject
  extends MoleHillUICSSProperties,
    CSSPseudoSelectorProps {}

export type MoleHillUIStyleObject = MoleHillUICSSObject

export type TLengthStyledSystem = string | 0 | number

export interface ScaleDict<T> {
  [K: string]: T | T[] | NestedScaleDict<T> | undefined
  [I: number]: T
}

export interface ObjectWithDefault<T> {
  __default?: T
}

export interface NestedScaleDict<T>
  extends ScaleDict<T>,
    ObjectWithDefault<T> {}
