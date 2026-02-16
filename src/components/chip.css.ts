import { createVar, style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import * as tokens from '@/styles/tokens.css'
import { getFontSize } from '@/styles/typography.css'
import { unselectable } from '@/styles/utils.css'

export const chipBgVar = createVar()
export const chipColorVar = createVar()
export const chipHoverBgVar = createVar()
export const chipActiveBgVar = createVar()

export const chip = recipe({
  base: {
    alignItems: 'center',
    backgroundColor: chipBgVar,
    borderRadius: tokens.radius,
    color: chipColorVar,
    display: 'inline-flex',
    ...getFontSize('small'),
    height: '2em',
    justifyContent: 'center',
    lineHeight: 1.5,
    paddingLeft: '0.75em',
    paddingRight: '0.75em',
    whiteSpace: 'nowrap',
    ...unselectable,
    selectors: {
      '&:hover, &:focus': {
        backgroundColor: chipHoverBgVar,
      },
      '&:active': {
        backgroundColor: chipActiveBgVar,
      },
    },
  },
  variants: {
    isRounded: {
      true: { borderRadius: tokens.radiusRounded },
    },
  },
})

export const chips = recipe({
  base: {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    selectors: {
      '&:last-child': {
        marginBottom: '-0.5em',
      },
      '&:not(:last-child)': {
        marginBottom: '1em',
      },
    },
  },
  variants: {
    alignment: {
      left: {},
      center: { justifyContent: 'center' },
      right: { justifyContent: 'flex-end' },
    },
  },
})

export const chipInChips = style({
  marginBottom: '0.5em',
  selectors: {
    '&:not(:last-child)': {
      marginRight: '0.5em',
    },
  },
})
