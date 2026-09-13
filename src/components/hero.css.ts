import { keyframes, style } from '@vanilla-extract/css'
import { rgba } from 'polished'
import { mq } from '@/styles/media.css'
import { hueCycle, motionOk, spring, wave } from '@/styles/motion.css'
import { palette, vars } from '@/styles/theme.css'
import * as tokens from '@/styles/tokens.css'
import { getFontSize } from '@/styles/typography.css'

const rise = keyframes({
  from: { opacity: 0, transform: 'translateY(14px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
})

const riseIn = (delay: string) => ({
  '@media': {
    '(prefers-reduced-motion: no-preference)': {
      animation: `${rise} 700ms ${tokens.easing} ${delay} both`,
    },
  },
})

export const heroImage = style({
  minHeight: ['100vh', '100svh'],
  position: 'relative',
  zIndex: 0,
  display: 'grid',
  placeItems: 'center',
  overflow: 'hidden',
  backgroundColor: vars.color.void,
})

export const heroContent = style({
  position: 'relative',
  zIndex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '2rem',
  padding: '6rem 1.5rem',
  textAlign: 'center',
  color: tokens.white,
})

export const heroTitle = style({
  letterSpacing: '-0.02em',
  textShadow: `0 2px 24px ${rgba(palette.void, 0.6)}`,
  ...riseIn('0ms'),
})

export const heroTagline = style({
  marginTop: '0.5rem',
  textShadow: `0 1px 12px ${rgba(palette.void, 0.6)}`,
  ...riseIn('120ms'),
})

export const heroSocials = style(riseIn('240ms'))

export const socialRow = style({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '0.75rem',
})

export const socialButton = style({
  width: '3rem',
  height: '3rem',
  display: 'inline-grid',
  placeItems: 'center',
  border: `2px solid ${tokens.white}`,
  borderRadius: tokens.radiusRounded,
  color: tokens.white,
  backgroundColor: 'transparent',
  ...getFontSize(5),
  transition: `color 0.3s ${tokens.easing}, border-color 0.3s ${tokens.easing}, background-color 0.3s ${tokens.easing}`,
  selectors: {
    '&:hover, &:focus-visible': {
      color: tokens.white,
      borderColor: vars.color.accent,
      backgroundColor: rgba(palette.accent, 0.35),
    },
  },
  '@media': {
    ...getFontSize(5)['@media'],
    [motionOk]: {
      transition: `color 0.3s ${tokens.easing}, border-color 0.3s ${tokens.easing}, background-color 0.3s ${tokens.easing}, transform 0.25s ease-out`,
      selectors: {
        '&:hover, &:focus-visible': {
          transform: 'translateY(-4px) scale(1.08)',
          transitionTimingFunction: `${tokens.easing}, ${tokens.easing}, ${tokens.easing}, ${spring}`,
          transitionDuration: '0.3s, 0.3s, 0.3s, 0.45s',
        },
        '[data-party] &': {
          animation: `${wave} 900ms ease-in-out infinite, ${hueCycle} 3s linear infinite`,
        },
      },
    },
  },
})

// Stagger the party wave across the seven buttons.
export const socialButtonDelay = [0, 1, 2, 3, 4, 5, 6].map((i) =>
  style({
    '@media': {
      [motionOk]: {
        selectors: {
          '[data-party] &': { animationDelay: `${i * 110}ms` },
        },
      },
    },
  }),
)

export const scrollCue = style({
  position: 'absolute',
  bottom: '1.5rem',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 1,
  display: 'none',
  width: '2.5rem',
  height: '2.5rem',
  placeItems: 'center',
  color: tokens.white,
  opacity: 0.55,
  transition: `opacity 0.3s ${tokens.easing}`,
  selectors: {
    '&:hover': { opacity: 1 },
  },
  '@media': {
    [mq.tablet]: {
      display: 'grid',
      ...riseIn('600ms')['@media'],
    },
  },
})
