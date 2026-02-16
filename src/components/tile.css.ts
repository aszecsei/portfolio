import { style } from '@vanilla-extract/css'
import { mq } from '@/styles/media.css'

const tileBase = {
  alignItems: 'stretch',
  display: 'block',
  flexBasis: 0,
  flexGrow: 1,
  flexShrink: 1,
  minHeight: 'min-content',
} as const

export const tile = style({
  ...tileBase,
  '@media': {
    [mq.tablet]: {
      display: 'flex',
    },
  },
})

export const tileVertical = style({
  ...tileBase,
  '@media': {
    [mq.tablet]: {
      display: 'flex',
      flexDirection: 'column',
    },
  },
})

export const ancestorTile = style({
  ...tileBase,
  marginLeft: '-0.75em',
  marginRight: '-0.75em',
  marginTop: '-0.75em',
  selectors: {
    '&:last-child': {
      marginBottom: '-0.75em',
    },
    '&:not(:last-child)': {
      marginBottom: '0.75em',
    },
  },
  '@media': {
    [mq.tablet]: {
      display: 'flex',
    },
  },
})

export const childTile = style({
  ...tileBase,
  margin: 0,
  '@media': {
    [mq.tablet]: {
      display: 'block',
    },
  },
})

export const parentTile = style({
  ...tileBase,
  padding: '0.75em',
  '@media': {
    [mq.tablet]: {
      display: 'flex',
    },
  },
})
