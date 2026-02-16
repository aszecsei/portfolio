import { style } from '@vanilla-extract/css'
import { mq } from '@/styles/media.css'
import * as tokens from '@/styles/tokens.css'

export const card = style({
  padding: '2em',
  boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.18)',
  border: `1px solid ${tokens.border}`,
  borderRadius: tokens.radius,
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  flexWrap: 'wrap',
  height: '100%',
  position: 'relative',
  backgroundColor: tokens.white,
  '@media': {
    [mq.tablet]: {
      selectors: {
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0px 7px 14px 0px rgba(0,0,0,0.18)',
          transition: `all ${tokens.speed} ease-in-out`,
        },
      },
    },
  },
})

export const cardFooter = style({
  marginTop: 'auto',
  marginLeft: '-2em',
  marginRight: '-2em',
  paddingLeft: '2em',
  paddingRight: '2em',
  paddingTop: '1em',
  marginBottom: '-2em',
  paddingBottom: '1em',
  borderTop: `1px solid ${tokens.border}`,
})

export const projectChecks = style({
  padding: 0,
  marginBottom: '1.5em',
})

export const projectCheckHolder = style({
  paddingTop: '0.5rem',
  paddingBottom: '1rem',
  marginLeft: '-1rem',
  marginRight: '-1rem',
  paddingLeft: '1rem',
  paddingRight: '1rem',
  borderTop: `1px solid ${tokens.border}`,
  selectors: {
    '&:last-child': {
      borderBottom: `1px solid ${tokens.border}`,
    },
    '&:hover, &:active': {
      backgroundColor: tokens.blueLight,
    },
  },
})

export const projectCheck = style({
  paddingLeft: 0,
  paddingRight: '4px',
  position: 'relative',
  top: '2px',
})

export const projectCheckText = style({
  marginBottom: 0,
  lineHeight: 1.2,
})

export const projectLink = style({
  textDecoration: 'none',
  fontVariant: 'small-caps',
  color: tokens.blue,
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
