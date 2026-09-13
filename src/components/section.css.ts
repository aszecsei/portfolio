import { createVar, style } from '@vanilla-extract/css'
import { mq } from '@/styles/media.css'

export const sectionBgVar = createVar()

const base = {
  padding: 'clamp(4rem, 8vw, 7rem) 1.5rem',
  backgroundColor: sectionBgVar,
  scrollMarginTop: '3.5rem',
  '@media': {
    [mq.desktop]: {
      scrollMarginTop: '4.5rem',
    },
  },
} as const

export const section = style(base)

export const sectionMedium = style({
  ...base,
  '@media': {
    ...base['@media'],
    [mq.desktop]: {
      ...base['@media'][mq.desktop],
      padding: 'clamp(6rem, 12vw, 10rem) 1.5rem',
    },
  },
})

export const sectionLarge = style({
  ...base,
  '@media': {
    ...base['@media'],
    [mq.desktop]: {
      ...base['@media'][mq.desktop],
      padding: 'clamp(9rem, 18vw, 15rem) 1.5rem',
    },
  },
})
