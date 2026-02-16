import { createVar, style } from '@vanilla-extract/css'
import { mq } from '@/styles/media.css'

export const sectionBgVar = createVar()

export const section = style({
  padding: 'calc(1rem + 100px) 1.5rem',
  backgroundColor: sectionBgVar,
})

export const sectionMedium = style({
  padding: 'calc(1rem + 100px) 1.5rem',
  backgroundColor: sectionBgVar,
  '@media': {
    [mq.desktop]: {
      padding: 'calc(9em + 100px) 1.5em',
    },
  },
})

export const sectionLarge = style({
  padding: 'calc(1rem + 100px) 1.5rem',
  backgroundColor: sectionBgVar,
  '@media': {
    [mq.desktop]: {
      padding: 'calc(18em + 100px) 1.5em',
    },
  },
})
