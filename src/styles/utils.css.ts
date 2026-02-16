import type { StyleRule } from '@vanilla-extract/css'

export const clearfix: StyleRule = {
  '::after': {
    clear: 'both',
    content: '" "',
    display: 'table',
  },
}

export const center = (width: string, height = '0'): StyleRule => ({
  position: 'absolute',
  left: `calc(50% - (${width} / 2))`,
  top:
    height !== '0'
      ? `calc(50% - (${height} / 2))`
      : `calc(50% - (${width} / 2))`,
})

export const overflowTouch: StyleRule = {
  WebkitOverflowScrolling: 'touch',
}

export const unselectable: StyleRule = {
  WebkitTouchCallout: 'none',
  userSelect: 'none',
}

export const block: StyleRule = {
  selectors: {
    '&:not(:last-child)': {
      marginBottom: '1.5em',
    },
  },
}
