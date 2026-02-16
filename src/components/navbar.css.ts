import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { mq } from '@/styles/media.css'
import * as tokens from '@/styles/tokens.css'
import { getFontSize } from '@/styles/typography.css'

export const navbar = style({
  textTransform: 'uppercase',
  border: 'none',
  background: 'rgba(0, 0, 0, 0.8)',
  position: 'fixed',
  right: 0,
  left: 0,
  zIndex: 1030,
  display: 'block',
  '@media': {
    [mq.desktop]: {
      paddingTop: '15px',
      paddingBottom: '15px',
      transition: 'padding-top .3s, padding-bottom .3s',
      background: 'rgba(0, 0, 0, 0.7)',
    },
  },
})

const fontSize4 = getFontSize(4)
const fontSize5 = getFontSize(5)

export const navbarBrand = style({
  textRendering: tokens.renderMode,
  fontFamily: tokens.familyHeader,
  ...fontSize4,
  color: tokens.white,
  alignItems: 'center',
  display: 'flex',
  flexShrink: 0,
  padding: '0.3125em',
  whiteSpace: 'nowrap',
  outline: 'none',
  textDecoration: 'none',
})

export const navbarCollapse = recipe({
  base: {
    display: 'flex',
    flexBasis: 'auto',
    flexGrow: 1,
    alignItems: 'center',
    '@media': {
      [mq.until('desktop')]: {
        display: 'none',
        clear: 'both',
        width: '100%',
      },
    },
  },
  variants: {
    isActive: {
      true: {
        '@media': {
          [mq.until('desktop')]: {
            display: 'block',
          },
        },
      },
    },
  },
})

export const navbarNav = style({
  letterSpacing: '1px',
  flexDirection: 'row',
  marginLeft: 'auto',
  display: 'flex',
  paddingLeft: 0,
  marginBottom: 0,
  listStyle: 'none',
  marginTop: 0,
  paddingRight: '1em',
  '@media': {
    [mq.until('desktop')]: {
      flexDirection: 'column',
    },
  },
})

export const navItem = style({
  display: 'list-item',
  userSelect: 'none',
})

export const navLink = style({
  textRendering: tokens.renderMode,
  fontFamily: tokens.familyHeader,
  ...fontSize5,
  color: tokens.white,
  display: 'block',
  paddingLeft: '1.25rem',
  outline: 'none',
  transition: 'all 0.3s ease-in-out',
  textDecoration: 'none',
  selectors: {
    '&:hover': {
      color: tokens.primary,
      cursor: 'pointer',
    },
  },
  '@media': {
    ...fontSize5['@media'],
    [mq.until('desktop')]: {
      paddingTop: '.5em',
      paddingBottom: '.5em',
      paddingLeft: '2em',
    },
  },
})

export const navBrandLink = style({
  textRendering: tokens.renderMode,
  fontFamily: tokens.familyHeader,
  ...fontSize4,
  color: tokens.white,
  display: 'block',
  paddingLeft: '1.25rem',
  outline: 'none',
  transition: 'all 0.3s ease-in-out',
  textDecoration: 'none',
  selectors: {
    '&:hover': {
      color: tokens.primary,
      cursor: 'pointer',
    },
  },
  '@media': {
    ...fontSize4['@media'],
    [mq.until('desktop')]: {
      paddingTop: '.5em',
      paddingBottom: '.5em',
      paddingLeft: '2em',
    },
  },
})

export const hamburgerDiv = style({
  marginLeft: 'auto',
  cursor: 'pointer',
  color: 'white',
  position: 'relative',
  display: 'block',
  background: 'none',
  border: 'none',
  padding: 0,
  selectors: {
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },
  },
  '@media': {
    [mq.desktop]: {
      display: 'none',
    },
  },
})

export const hamburgerSpan = recipe({
  base: {
    backgroundColor: 'currentColor',
    display: 'block',
    height: '1px',
    left: 'calc(50% - 8px)',
    position: 'absolute',
    transformOrigin: 'center',
    transitionDuration: '86ms',
    transitionProperty: 'background-color, opacity, transform',
    transitionTimingFunction: 'ease-in-out',
    width: '16px',
  },
  variants: {
    isActive: {
      true: {},
      false: {},
    },
    line: {
      first: {},
      second: {},
      third: {},
    },
  },
  compoundVariants: [
    {
      variants: { line: 'first', isActive: false },
      style: { top: 'calc(50% - 6px)' },
    },
    {
      variants: { line: 'first', isActive: true },
      style: {
        top: 'calc(50% - 6px)',
        transform: 'translateY(5px) rotate(45deg)',
      },
    },
    {
      variants: { line: 'second', isActive: false },
      style: { top: 'calc(50% - 1px)' },
    },
    {
      variants: { line: 'second', isActive: true },
      style: { top: 'calc(50% - 1px)', opacity: 0 },
    },
    {
      variants: { line: 'third', isActive: false },
      style: { top: 'calc(50% + 4px)' },
    },
    {
      variants: { line: 'third', isActive: true },
      style: {
        top: 'calc(50% + 4px)',
        transform: 'translateY(-5px) rotate(-45deg)',
      },
    },
  ],
  defaultVariants: {
    isActive: false,
  },
})
