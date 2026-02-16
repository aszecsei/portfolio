import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import * as tokens from '@/styles/tokens.css'
import { getFontSize } from '@/styles/typography.css'

const textBase = {
  textRendering: tokens.renderMode,
  ...getFontSize('normal'),
} as const

export const text = recipe({
  base: {
    ...textBase,
    marginTop: '0em',
    marginBottom: '1em',
    fontFamily: tokens.familyBody,
    color: tokens.greyDark,
  },
  variants: {
    alignment: {
      left: { textAlign: 'left' },
      center: { textAlign: 'center' },
      right: { textAlign: 'right' },
      justify: { textAlign: 'justify' },
    },
  },
  defaultVariants: {
    alignment: 'left',
  },
})

export const textLink = style({
  color: tokens.blue,
  textDecoration: 'none',
  transition: 'all 0.1s ease-in-out',
  display: 'inline-block',
  position: 'relative',
  '::before': {
    content: "''",
    position: 'absolute',
    bottom: '1px',
    left: 0,
    width: '100%',
    height: '1px',
    display: 'block',
    transition: 'all 0.1s ease-in-out',
    transform: 'translateY(-5px) scaleX(0)',
    backgroundColor: tokens.blue,
    opacity: 0,
  },
  selectors: {
    '&:hover': {
      color: tokens.primary,
      cursor: 'pointer',
    },
    '&:hover::before': {
      transform: 'translateY(0) scaleX(1)',
      backgroundColor: tokens.primary,
      opacity: 1,
    },
  },
})

const headerBase = {
  ...textBase,
  fontFamily: tokens.familyHeader,
  ...getFontSize('large'),
} as const

function makeHeader(size: number) {
  return recipe({
    base: {
      ...headerBase,
      display: 'block',
      marginTop: 0,
      marginBottom: 0,
      ...getFontSize(size),
      fontWeight: size < 4 ? tokens.weightBold : tokens.weightNormal,
      color: tokens.dark,
    },
    variants: {
      alignment: {
        left: { textAlign: 'left' },
        center: { textAlign: 'center' },
        right: { textAlign: 'right' },
        justify: { textAlign: 'justify' },
      },
    },
    defaultVariants: {
      alignment: 'left',
    },
  })
}

export const h1 = makeHeader(1)
export const h2 = makeHeader(2)
export const h3 = makeHeader(3)
export const h4 = makeHeader(4)
export const h5 = makeHeader(5)
export const h6 = makeHeader(6)
