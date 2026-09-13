import { style } from '@vanilla-extract/css'
import { rgba } from 'polished'
import { hoverOk, motionOk } from '@/styles/motion.css'
import { palette, vars } from '@/styles/theme.css'
import * as tokens from '@/styles/tokens.css'
import { getFontSize } from '@/styles/typography.css'

const cardRadius = '14px'

// Foil sheen: a diagonal rainbow band that slides with the pointer.
const foil = [
  'linear-gradient(115deg,',
  'transparent 25%,',
  'rgba(255, 60, 200, 0.55) 36%,',
  'rgba(80, 210, 255, 0.55) 43%,',
  'rgba(255, 235, 90, 0.5) 50%,',
  'rgba(90, 255, 180, 0.55) 57%,',
  'transparent 70%)',
].join(' ')

export const card = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  overflow: 'hidden',
  padding: '0.5rem',
  backgroundColor: vars.color.surface,
  backgroundImage: `linear-gradient(160deg, ${vars.color.surface} 0%, ${vars.color.ground} 100%)`,
  border: `1px solid ${vars.color.hairline}`,
  borderRadius: cardRadius,
  boxShadow: `0 1px 2px ${rgba(palette.void, 0.06)}, inset 0 0 0 1px rgba(255, 255, 255, 0.7)`,
  transition: `transform 0.2s ${tokens.easing}, box-shadow 0.2s ${tokens.easing}, border-color 0.2s ${tokens.easing}`,
  selectors: {
    '&:hover, &:focus-within': {
      borderColor: rgba(palette.accent, 0.5),
      boxShadow: `var(--sx) var(--sy) 28px ${rgba(palette.void, 0.18)}, 0 1px 2px ${rgba(palette.void, 0.08)}, inset 0 0 0 1px rgba(255, 255, 255, 0.7)`,
    },
  },
  vars: {
    '--rx': '0deg',
    '--ry': '0deg',
    '--mx': '50%',
    '--my': '50%',
    '--sx': '0px',
    '--sy': '12px',
    '--px': '0px',
    '--py': '0px',
  },
  '::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    zIndex: 2,
    pointerEvents: 'none',
    opacity: 0,
    background: `radial-gradient(280px circle at var(--mx) var(--my), rgba(255, 255, 255, 0.55), ${rgba(palette.accent, 0.12)} 45%, transparent 70%)`,
    mixBlendMode: 'soft-light',
    transition: `opacity 0.3s ${tokens.easing}`,
  },
  '@media': {
    [motionOk]: {
      selectors: {
        '&:hover, &:focus-within': {
          transform: 'translateY(-3px)',
        },
      },
    },
    [`${motionOk} and ${hoverOk}`]: {
      transformStyle: 'preserve-3d',
      transition: `transform 0.15s ease-out, box-shadow 0.2s ${tokens.easing}, border-color 0.2s ${tokens.easing}`,
      selectors: {
        '&:hover': {
          transform:
            'perspective(900px) rotateX(var(--rx)) rotateY(var(--ry)) translateY(-3px)',
        },
        '&:hover::before': {
          opacity: 1,
        },
      },
    },
  },
})

export const media = style({
  position: 'relative',
  aspectRatio: '4 / 3',
  overflow: 'hidden',
  backgroundColor: vars.color.ground,
  border: `1px solid ${vars.color.hairline}`,
  borderRadius: '8px',
  boxShadow: `inset 0 0 0 1px rgba(255, 255, 255, 0.6), inset 0 2px 6px ${rgba(palette.void, 0.12)}`,
  // Foil sheen over the art only, sliding with the pointer.
  '::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    zIndex: 2,
    pointerEvents: 'none',
    opacity: 0,
    backgroundImage: foil,
    backgroundSize: '220% 220%',
    backgroundPosition: 'var(--mx) var(--my)',
    mixBlendMode: 'color-dodge',
    transition: `opacity 0.3s ${tokens.easing}`,
  },
  '@media': {
    [`${motionOk} and ${hoverOk}`]: {
      selectors: {
        [`${card}:hover &::after`]: {
          opacity: 0.7,
        },
      },
    },
  },
})

export const typeLabel = style({
  position: 'absolute',
  top: '0.5rem',
  left: '0.5rem',
  zIndex: 1,
  padding: '0.2em 0.6em',
  borderRadius: tokens.radiusRounded,
  backgroundColor: rgba(palette.void, 0.65),
  color: tokens.white,
  fontFamily: tokens.familyHeader,
  fontWeight: 800,
  letterSpacing: '0.02em',
  ...getFontSize('small'),
  lineHeight: 1.4,
  backdropFilter: 'blur(4px)',
  '@media': {
    ...getFontSize('small')['@media'],
    [`${motionOk} and ${hoverOk}`]: {
      transition: 'transform 0.15s ease-out',
      selectors: {
        [`${card}:hover &`]: {
          transform:
            'translate(calc(var(--px) * -0.4), calc(var(--py) * -0.4))',
        },
      },
    },
  },
})

export const mediaImage = style({
  '@media': {
    [motionOk]: {
      transition: 'transform 0.5s ease-out',
      selectors: {
        [`${card}:hover &`]: {
          transform: 'scale(1.05)',
        },
      },
    },
    [`${motionOk} and ${hoverOk}`]: {
      selectors: {
        [`${card}:hover &`]: {
          // Zoom leaves room to slide without exposing the edges.
          transform: 'translate(var(--px), var(--py)) scale(1.1)',
          transition: 'transform 0.15s ease-out',
        },
      },
    },
  },
})

export const body = style({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  padding: '0.9rem 0.75rem 0.75rem',
  gap: '0.5rem',
})

export const title = style({
  margin: 0,
  fontFamily: tokens.familyHeader,
  fontWeight: 800,
  color: vars.color.ink,
  ...getFontSize(5),
})

export const titleLink = style({
  color: 'inherit',
  textDecoration: 'none',
  transition: `color 0.15s ${tokens.easing}`,
  selectors: {
    '&::after': {
      content: '""',
      position: 'absolute',
      inset: 0,
    },
    '&:hover': {
      color: vars.color.accent,
    },
    '&:focus-visible': {
      outline: 'none',
    },
  },
})

export const date = style({
  display: 'block',
  color: vars.color.muted,
  fontFamily: tokens.familyBody,
  ...getFontSize('small'),
})

export const summary = style({
  margin: 0,
  color: vars.color.text,
})

export const footer = style({
  marginTop: 'auto',
  paddingTop: '0.75rem',
  borderTop: `1px solid ${vars.color.hairline}`,
})
