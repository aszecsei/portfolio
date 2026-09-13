import { style } from '@vanilla-extract/css'
import { mq } from '@/styles/media.css'
import { hueCycle, jump, motionOk, wave } from '@/styles/motion.css'
import { vars } from '@/styles/theme.css'
import * as tokens from '@/styles/tokens.css'
import { getFontSize } from '@/styles/typography.css'

export const layout = style({
  display: 'grid',
  gap: '3rem',
  '@media': {
    [mq.desktop]: {
      gridTemplateColumns: '1.4fr 1fr',
      gap: '5rem',
      alignItems: 'start',
    },
  },
})

export const bio = style({
  maxWidth: '65ch',
})

export const heading = style({
  marginBottom: '1.5rem',
})

export const skills = style({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  display: 'grid',
  gap: '2rem 1.5rem',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  '@media': {
    [mq.desktop]: {
      paddingTop: '0.75rem',
    },
  },
})

export const skill = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
})

export const skillIcon = style({
  color: vars.color.accent,
  ...getFontSize(3),
  lineHeight: 1,
  display: 'inline-block',
  width: 'fit-content',
  transformOrigin: '50% 100%',
  '@media': {
    ...getFontSize(3)['@media'],
    [motionOk]: {
      selectors: {
        [`${skill}:hover &, ${skill}:focus-within &`]: {
          animation: `${jump} 650ms ease-out`,
        },
        '[data-party] &': {
          animation: `${wave} 900ms ease-in-out infinite, ${hueCycle} 3s linear infinite`,
        },
        [`[data-party] ${skill}:nth-child(2) &`]: { animationDelay: '150ms' },
        [`[data-party] ${skill}:nth-child(3) &`]: { animationDelay: '300ms' },
        [`[data-party] ${skill}:nth-child(4) &`]: { animationDelay: '450ms' },
      },
    },
  },
})

export const skillTitle = style({
  margin: '0.25rem 0 0',
  fontFamily: tokens.familyHeader,
  fontWeight: 800,
  color: vars.color.ink,
  ...getFontSize(5),
})

export const skillText = style({
  marginBottom: 0,
  ...getFontSize('small'),
})
