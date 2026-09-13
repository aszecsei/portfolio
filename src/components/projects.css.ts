import { style } from '@vanilla-extract/css'
import { mq } from '@/styles/media.css'
import { vars } from '@/styles/theme.css'
import { getFontSize } from '@/styles/typography.css'

export const header = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  gap: '1rem 2rem',
  marginBottom: '2rem',
})

export const heading = style({
  display: 'flex',
  alignItems: 'baseline',
  gap: '0.75rem',
})

export const count = style({
  color: vars.color.muted,
  fontFamily: 'inherit',
  fontWeight: 400,
  ...getFontSize(4),
})

export const search = style({
  flex: '1 1 16rem',
  '@media': {
    [mq.tablet]: {
      flex: '0 1 20rem',
    },
  },
})

export const grid = style({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
  gap: '1.5rem',
})

export const empty = style({
  color: vars.color.muted,
  marginBottom: 0,
})
