import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { bp, gap, mq } from '@/styles/media.css'

export const container = recipe({
  base: {
    margin: '0 auto',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    '@media': {
      [mq.desktop]: {
        maxWidth: `${bp.desktop - 2 * gap}px`,
        width: `${bp.desktop - 2 * gap}px`,
      },
      [mq.widescreen]: {
        maxWidth: `${bp.widescreen - 2 * gap}px`,
        width: `${bp.widescreen - 2 * gap}px`,
      },
      [mq.fullhd]: {
        maxWidth: `${bp.fullhd - 2 * gap}px`,
        width: `${bp.fullhd - 2 * gap}px`,
      },
    },
  },
  variants: {
    isFluid: {
      true: {
        '@media': {
          [mq.desktop]: {
            marginLeft: `${gap}px`,
            marginRight: `${gap}px`,
            maxWidth: 'none',
            width: 'auto',
          },
        },
      },
    },
  },
})

export const navbarContainer = style({
  margin: '0 auto',
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  '@media': {
    [mq.until('desktop')]: {
      display: 'block',
      alignItems: 'stretch',
    },
    [mq.desktop]: {
      maxWidth: `${bp.desktop - 2 * gap}px`,
      width: `${bp.desktop - 2 * gap}px`,
    },
    [mq.widescreen]: {
      maxWidth: `${bp.widescreen - 2 * gap}px`,
      width: `${bp.widescreen - 2 * gap}px`,
    },
    [mq.fullhd]: {
      maxWidth: `${bp.fullhd - 2 * gap}px`,
      width: `${bp.fullhd - 2 * gap}px`,
    },
  },
})
