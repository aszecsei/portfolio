import { style } from '@vanilla-extract/css'
import { motionOk, spring } from '@/styles/motion.css'
import { vars } from '@/styles/theme.css'
import * as tokens from '@/styles/tokens.css'
import { getFontSize } from '@/styles/typography.css'

export const toast = style({
  position: 'fixed',
  bottom: '1.25rem',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 1040,
  padding: '0.6rem 1rem',
  borderRadius: tokens.radiusRounded,
  backgroundColor: vars.color.accent,
  color: tokens.white,
  fontFamily: tokens.familyHeader,
  ...getFontSize('small'),
  boxShadow: '0 8px 24px rgba(10, 10, 15, 0.3)',
  '@media': {
    [motionOk]: {
      transition: `transform 0.4s ${spring}`,
    },
  },
  selectors: {
    '&[hidden]': {
      display: 'block',
      transform: 'translate(-50%, 200%)',
      pointerEvents: 'none',
    },
  },
})
