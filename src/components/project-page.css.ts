import { globalStyle, style } from '@vanilla-extract/css'
import { darken, lighten, rgba } from 'polished'
import { foil, frameRadius, frameShadow } from '@/styles/effects.css'
import { mq } from '@/styles/media.css'
import {
  hoverOk,
  hueCycle,
  jump,
  motionOk,
  spring,
  wave,
} from '@/styles/motion.css'
import { palette, vars } from '@/styles/theme.css'
import * as tokens from '@/styles/tokens.css'
import { getFontSize } from '@/styles/typography.css'
import { card } from './project.css'

// HEADER

export const header = style({
  display: 'grid',
  gap: '2rem',
  alignItems: 'center',
  '@media': {
    // Clear the fixed navbar, which the home hero handles by being full-height.
    [mq.touch]: {
      paddingTop: '2.5rem',
    },
    [mq.desktop]: {
      gridTemplateColumns: '1fr 1.2fr',
      gap: '4rem',
    },
  },
})

export const intro = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '1rem',
})

export const backLink = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4em',
  position: 'relative',
  color: vars.color.muted,
  fontFamily: tokens.familyHeader,
  fontWeight: 800,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  textDecoration: 'none',
  ...getFontSize('small'),
  transition: `color 0.2s ${tokens.easing}`,
  '::after': {
    content: '""',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: '-0.2em',
    height: '2px',
    backgroundColor: vars.color.accent,
    transform: 'scaleX(0)',
    transformOrigin: 'left',
  },
  selectors: {
    '&:hover, &:focus-visible': {
      color: vars.color.accent,
    },
    '&:hover::after, &:focus-visible::after': {
      transform: 'scaleX(1)',
    },
  },
  '@media': {
    ...getFontSize('small')['@media'],
    [motionOk]: {
      '::after': { transition: `transform 0.25s ${tokens.easing}` },
    },
  },
})

export const backIcon = style({
  '@media': {
    [motionOk]: {
      transition: `transform 0.3s ${spring}`,
      selectors: {
        [`${backLink}:hover &, ${backLink}:focus-visible &`]: {
          transform: 'translateX(-4px)',
        },
      },
    },
  },
})

export const title = style({
  margin: 0,
  fontFamily: tokens.familyHeader,
  fontWeight: 800,
  fontSize: 'clamp(2.4rem, 5.5vw, 4.5rem)',
  lineHeight: 1.05,
  letterSpacing: '-0.02em',
  color: vars.color.ink,
  textRendering: tokens.renderMode,
  wordBreak: 'normal',
  overflowWrap: 'anywhere',
})

export const date = style({
  display: 'block',
  color: vars.color.muted,
  fontFamily: tokens.familyBody,
  ...getFontSize('medium'),
})

export const meta = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '0.5rem',
  marginTop: '0.5rem',
})

export const typePill = style({
  display: 'inline-block',
  padding: '0.2em 0.7em',
  borderRadius: tokens.radiusRounded,
  backgroundColor: vars.color.void,
  color: tokens.white,
  fontFamily: tokens.familyHeader,
  fontWeight: 800,
  letterSpacing: '0.02em',
  ...getFontSize('small'),
  lineHeight: 1.6,
  whiteSpace: 'nowrap',
})

// ART

export const artCard = style([
  card,
  {
    height: 'auto',
    padding: '0.6rem',
  },
])

export const art = style({
  position: 'relative',
  aspectRatio: '16 / 9',
  overflow: 'hidden',
  backgroundColor: vars.color.ground,
  border: `1px solid ${vars.color.hairline}`,
  borderRadius: frameRadius,
  boxShadow: frameShadow,
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
    mixBlendMode: 'screen',
    transition: `opacity 0.3s ${tokens.easing}`,
  },
  '@media': {
    [`${motionOk} and ${hoverOk}`]: {
      selectors: {
        [`${card}:hover &::after`]: {
          opacity: 0.75,
        },
      },
    },
  },
})

// STAT SHEET

export const stats = style({
  display: 'grid',
  gap: '1rem',
  margin: '3rem 0 0',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  '@media': {
    [mq.desktop]: {
      gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
    },
  },
})

export const stat = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
  padding: '1rem 1.1rem',
  backgroundColor: vars.color.surface,
  border: `1px solid ${vars.color.hairline}`,
  borderRadius: frameRadius,
  boxShadow: `0 1px 2px ${rgba(palette.void, 0.05)}`,
  transition: `border-color 0.2s ${tokens.easing}, box-shadow 0.2s ${tokens.easing}`,
  selectors: {
    '&:hover': {
      borderColor: rgba(palette.accent, 0.5),
      boxShadow: `0 8px 20px ${rgba(palette.void, 0.1)}`,
    },
  },
  '@media': {
    [motionOk]: {
      transition: `transform 0.3s ${spring}, border-color 0.2s ${tokens.easing}, box-shadow 0.2s ${tokens.easing}`,
      selectors: {
        '&:hover': { transform: 'translateY(-3px)' },
      },
    },
  },
})

export const statIcon = style({
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
        [`${stat}:hover &`]: {
          animation: `${jump} 650ms ease-out`,
        },
        '[data-party] &': {
          animation: `${wave} 900ms ease-in-out infinite, ${hueCycle} 3s linear infinite`,
        },
        [`[data-party] ${stat}:nth-child(2) &`]: { animationDelay: '150ms' },
        [`[data-party] ${stat}:nth-child(3) &`]: { animationDelay: '300ms' },
        [`[data-party] ${stat}:nth-child(4) &`]: { animationDelay: '450ms' },
      },
    },
  },
})

export const statLabel = style({
  color: vars.color.muted,
  fontFamily: tokens.familyHeader,
  fontWeight: 800,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  ...getFontSize('small'),
})

export const statValue = style({
  margin: 0,
  color: vars.color.ink,
  fontFamily: tokens.familyBody,
  ...getFontSize('normal'),
})

// DESCRIPTION

export const about = style({
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

export const heading = style({
  marginBottom: '1.5rem',
})

export const prose = style({
  maxWidth: '65ch',
})

globalStyle(`${prose} a`, {
  color: vars.color.link,
  textDecoration: 'underline',
  textDecorationColor: rgba(palette.link, 0.35),
  textUnderlineOffset: '0.2em',
  transition: `color 0.15s ${tokens.easing}, text-decoration-color 0.15s ${tokens.easing}`,
})

globalStyle(`${prose} a:hover, ${prose} a:focus-visible`, {
  color: vars.color.accent,
  textDecorationColor: vars.color.accent,
})

export const frame = style({
  position: 'relative',
  overflow: 'hidden',
  marginTop: '2rem',
  backgroundColor: vars.color.ground,
  border: `1px solid ${vars.color.hairline}`,
  borderRadius: frameRadius,
  boxShadow: frameShadow,
})

export const frameImage = style({
  margin: 0,
})

export const video = style({
  aspectRatio: '16 / 9',
})

export const videoIframe = style({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  border: 0,
})

export const questHeading = style({
  marginBottom: '1rem',
  fontWeight: 800,
  color: vars.color.ink,
})

export const quests = style({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
})

export const quest = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '0.75rem',
  color: vars.color.text,
  fontFamily: tokens.familyBody,
  ...getFontSize('normal'),
})

export const questMark = style({
  flexShrink: 0,
  marginTop: '0.35em',
  color: vars.color.accent,
  ...getFontSize('small'),
  lineHeight: 1,
  '@media': {
    ...getFontSize('small')['@media'],
    [motionOk]: {
      transition: `transform 0.3s ${spring}`,
      selectors: {
        [`${quest}:hover &`]: { transform: 'translateX(4px)' },
      },
    },
  },
})

// LINKS

export const links = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '2rem',
})

// A chunky arcade-style button: a solid edge underneath that presses in on click.
const ctaEdge = darken(0.18, palette.accent)

export const cta = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.6em',
  padding: '0.65em 1.3em',
  border: `1px solid ${ctaEdge}`,
  borderRadius: '10px',
  backgroundColor: vars.color.accent,
  color: tokens.white,
  fontFamily: tokens.familyHeader,
  fontWeight: 800,
  textDecoration: 'none',
  ...getFontSize('normal'),
  boxShadow: `0 4px 0 ${ctaEdge}`,
  transition: `box-shadow 0.15s ${tokens.easing}, transform 0.15s ${tokens.easing}`,
  selectors: {
    '&:hover, &:focus-visible': {
      backgroundColor: lighten(0.04, palette.accent),
    },
    '&:active': {
      transform: 'translateY(3px)',
      boxShadow: `0 1px 0 ${ctaEdge}`,
    },
  },
  '@media': {
    ...getFontSize('normal')['@media'],
    [motionOk]: {
      selectors: {
        '&:hover, &:focus-visible': {
          transform: 'translateY(-2px)',
          boxShadow: `0 6px 0 ${ctaEdge}`,
        },
        '&:active': {
          transform: 'translateY(3px)',
          boxShadow: `0 1px 0 ${ctaEdge}`,
        },
        '[data-party] &': {
          animation: `${hueCycle} 3s linear infinite`,
        },
      },
    },
  },
})

export const ctaIcon = style({
  fontSize: '0.85em',
  '@media': {
    [motionOk]: {
      transition: `transform 0.3s ${spring}`,
      selectors: {
        [`${cta}:hover &, ${cta}:focus-visible &`]: {
          transform: 'translate(2px, -2px)',
        },
      },
    },
  },
})

export const widgets = style({
  width: '100%',
  display: 'grid',
  gap: '1.5rem',
  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
})

// itch's widget is fluid up to 552px; wider than that it letterboxes itself.
export const itchFrame = style({
  width: '100%',
  maxWidth: '552px',
  overflow: 'hidden',
  borderRadius: frameRadius,
  boxShadow: `0 1px 2px ${rgba(palette.void, 0.06)}`,
})

export const itchIframe = style({
  display: 'block',
  width: '100%',
  height: '167px',
  border: 0,
})
