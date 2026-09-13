import { style } from '@vanilla-extract/css'
import { vars } from '@/styles/theme.css'
import { getFontSize } from '@/styles/typography.css'

export const foot = style({
  backgroundColor: vars.color.void,
  padding: '0 1.5rem 3rem',
})

export const line = style({
  color: vars.color.muted,
  marginBottom: '0.25rem',
  ...getFontSize('small'),
})
