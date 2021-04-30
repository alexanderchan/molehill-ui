import * as CSS from 'csstype'
// https://github.com/system-ui/theme-ui/blob/0df2cf6d753a205281a832dad8287ceb5f000f70/packages/css/src/types.ts#L501
import {
  AliasesCSSProperties,
  OverwriteCSSProperties,
} from './types/cssProperties'

type Length = string | number
type MhSpace = Length | Length[] | object // TODO fix object typing

type CSSProperties = CSS.Properties

export interface MhExtendedCssProperties
  extends Omit<CSSProperties, keyof OverwriteCSSProperties>,
    AliasesCSSProperties,
    OverwriteCSSProperties {}

type MhCssProperties = MhExtendedCssProperties

type Empty = undefined | null | false

export type ResponsiveStyleValue<T> = T | Empty | Array<T | Empty>

export interface ObjectWithDefault<T> {
  /**
   * Default value in nested scale.
   *
   * Given theme
   * ```
   * {
   *   colors: {
   *     primary: { __default: '#00f', light: '#33f' }
   *   }
   * }
   * ```
   * `sx={{ color: 'primary' }}` resolves to `color: #00f`.
   */
  __default?: T
}

export interface NestedScaleDict<T>
  extends ScaleDict<T>,
    ObjectWithDefault<T> {}

export interface ScaleDict<T> {
  [K: string]: T | T[] | NestedScaleDict<T> | undefined
  [I: number]: T
}

type ThemeStyleValue<T> = ResponsiveStyleValue<T | ObjectWithDefault<T> | T[]>

export type StylePropertyValue<T> =
  | ThemeStyleValue<Exclude<T, undefined>>
  | ((theme: Theme) => ThemeStyleValue<Exclude<T, undefined>> | undefined)
  | Empty

export type ThemeCSSProperties = {
  [K in keyof MhCssProperties]: StylePropertyValue<MhCssProperties[K]>
}

export type Scale<T> = T[] | ScaleDict<T>

export type TLengthStyledSystem = string | 0 | number

export interface Theme {
  colors?: Scale<CSS.Property.Color>
  sizes?: Scale<CSS.Property.Height<{}> | CSS.Property.Width<{}>>
  fontWeights?: Scale<CSS.Property.FontWeight | CSS.Property.FontSize<number>>
  fontSizes?: Scale<
    | CSS.Property.FontSize<number>
    | (
        | CSS.Property.FontSize<number>
        | {
            lineHeight?: string
          }
      )[]
  >
  fonts?: Scale<CSS.Property.FontFamily>
  lineHeights?: Scale<CSS.Property.LineHeight<TLengthStyledSystem>>
  // theme-ui theme spec uses space instead of spaces
  spaces?: Scale<CSS.Property.Margin<number | string>>
  space?: Scale<CSS.Property.Margin<number | string>>
  zIndices?: Scale<CSS.Property.ZIndex | string>
  borderWidths?: Scale<CSS.Property.BorderWidth<TLengthStyledSystem>>
  shadows?: Scale<CSS.Property.BoxShadow>
  radii?: Scale<CSS.Property.BorderRadius<TLengthStyledSystem>>
  opacities?: Scale<CSS.Property.Opacity>
  letterSpacings?: Scale<CSS.Property.LetterSpacing<TLengthStyledSystem>>

  // TODO
  breakpoints?: Array<string>
  mediaQueries?: { [size: string]: string }

  borders?: Scale<CSS.Property.Border<{}>>
  borderStyles?: Scale<CSS.Property.Border<{}>>
  colorStyles?: Scale<ThemeCSSProperties>
  textStyles?: Scale<ThemeCSSProperties>
  transitions?: Scale<CSS.Property.Transition>
}

type CssVars = Record<string, string | number>

type InsertionMethod = 'append'

export type Config = {
  prefix?: string // The value css vars are prefixed with --mh-color-black
  replaceToken?: string // the token to look for css vars default: -- but could be $

  /** Determines how the CSS file is inserted to a document. */
  insertionMethod?: 'append' | 'prepend' | (() => (cssVars: CssVars) => void)

  theme: Theme
  extend: Partial<Theme>
  cssVars?: CssVars
}
