import { hsl } from 'polished'

// COLORS
export const black = hsl(0, 0, 0.04)
export const blackBis = hsl(0, 0, 0.07)
export const blackTer = hsl(0, 0, 0.14)

export const greyDarker = hsl(0, 0, 0.21)
export const greyDark = hsl(0, 0, 0.29)
export const grey = hsl(0, 0, 0.48)
export const greyLight = hsl(0, 0, 0.71)
export const greyLighter = hsl(0, 0, 0.86)

export const whiteTer = hsl(0, 0, 0.96)
export const whiteBis = hsl(0, 0, 0.98)
export const white = hsl(0, 0, 1)

export const orange = hsl(14, 1, 0.53)
export const yellow = hsl(48, 1, 0.67)
export const green = hsl(141, 0.71, 0.48)
export const turquoise = hsl(171, 1, 0.41)
export const cyan = hsl(204, 0.86, 0.53)
export const blue = hsl(217, 0.71, 0.53)
export const blueLight = hsl(217, 0.71, 0.96)
export const purple = hsl(271, 1, 0.71)
export const red = hsl(348, 1, 0.61)
export const navy = '#001f3f'
export const lime = '#01ff70'
export const maroon = '#85144b'

// Derived colors
export const primary = purple
export const info = cyan
export const success = green
export const warning = yellow
export const danger = red

export const light = whiteTer
export const dark = greyDarker

export const background = whiteTer
export const border = greyLighter
export const borderHover = greyLight

export const text = greyDark
export const textLight = grey
export const textStrong = greyDarker

// TYPOGRAPHY
export const familyBody =
  "var(--font-open-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'"
export const familyHeader =
  "var(--font-raleway), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'"
export const familyMonospace = 'monospace'
export const renderMode = 'optimizeLegibility' as const

export const weightLight = 300
export const weightNormal = 400
export const weightMedium = 500
export const weightSemibold = 600
export const weightBold = 700

export const easing = 'ease-out'
export const radiusSmall = '2px'
export const radius = '4px'
export const radiusLarge = '6px'
export const radiusRounded = '290486px'
export const speed = '86ms'
