import { style } from '@vanilla-extract/css'
import { rgba } from 'polished'
import { cardInset, cardRadius } from '@/styles/effects.css'
import { motionOk, spring } from '@/styles/motion.css'
import { palette, vars } from '@/styles/theme.css'
import * as tokens from '@/styles/tokens.css'
import { getFontSize } from '@/styles/typography.css'

export const box = style({
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  backgroundColor: vars.color.surface,
  border: `1px solid ${vars.color.hairline}`,
  borderRadius: cardRadius,
  boxShadow: `0 1px 2px ${rgba(palette.void, 0.06)}, ${cardInset}`,
  color: vars.color.text,
  fontFamily: tokens.familyBody,
  ...getFontSize('small'),
})

export const head = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '0.5rem 1rem',
  padding: '0.9rem 1rem',
  borderBottom: `1px solid ${vars.color.hairline}`,
  backgroundImage: `linear-gradient(160deg, ${vars.color.surface} 0%, ${vars.color.ground} 100%)`,
})

export const name = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5em',
  margin: 0,
  minWidth: 0,
  color: vars.color.muted,
  fontFamily: tokens.familyHeader,
  fontWeight: 800,
  ...getFontSize('normal'),
  overflowWrap: 'anywhere',
})

export const nameIcon = style({
  color: vars.color.ink,
})

export const link = style({
  color: 'inherit',
  textDecoration: 'none',
  transition: `color 0.15s ${tokens.easing}`,
  selectors: {
    '&:hover, &:focus-visible': {
      color: vars.color.accent,
    },
  },
})

export const repoLink = style([link, { color: vars.color.ink }])

export const stats = style({
  display: 'flex',
  gap: '0.4rem',
})

export const statLink = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4em',
  padding: '0.2em 0.7em',
  borderRadius: tokens.radiusRounded,
  border: `1px solid ${vars.color.hairline}`,
  backgroundColor: vars.color.surface,
  color: vars.color.ink,
  fontFamily: tokens.familyHeader,
  fontWeight: 800,
  textDecoration: 'none',
  transition: `border-color 0.15s ${tokens.easing}, color 0.15s ${tokens.easing}`,
  selectors: {
    '&:hover, &:focus-visible': {
      borderColor: vars.color.accent,
      color: vars.color.accent,
    },
  },
})

export const body = style({
  flexGrow: 1,
  padding: '0.9rem 1rem',
})

export const description = style({
  margin: 0,
  color: vars.color.text,
})

export const bodyLink = style({
  color: vars.color.link,
  textDecoration: 'underline',
  textDecorationColor: rgba(palette.link, 0.35),
  textUnderlineOffset: '0.2em',
  transition: `color 0.15s ${tokens.easing}`,
  selectors: {
    '&:hover, &:focus-visible': {
      color: vars.color.accent,
      textDecorationColor: vars.color.accent,
    },
  },
})

export const homepage = style({
  margin: '0.5rem 0 0',
  overflowWrap: 'anywhere',
})

export const foot = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '0.5rem 1rem',
  padding: '0.75rem 1rem',
  borderTop: `1px solid ${vars.color.hairline}`,
})

export const updated = style({
  margin: 0,
  color: vars.color.muted,
})

export const branch = style({
  color: vars.color.ink,
  fontWeight: tokens.weightBold,
})

export const download = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4em',
  padding: '0.4em 0.9em',
  borderRadius: tokens.radiusRounded,
  border: `1px solid ${vars.color.hairline}`,
  backgroundColor: vars.color.surface,
  color: vars.color.ink,
  fontFamily: tokens.familyHeader,
  fontWeight: 800,
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  transition: `border-color 0.2s ${tokens.easing}, color 0.2s ${tokens.easing}, box-shadow 0.2s ${tokens.easing}`,
  selectors: {
    '&:hover, &:focus-visible': {
      borderColor: vars.color.accent,
      color: vars.color.accent,
      boxShadow: `0 6px 16px ${rgba(palette.accent, 0.2)}`,
    },
  },
  '@media': {
    [motionOk]: {
      transition: `border-color 0.2s ${tokens.easing}, color 0.2s ${tokens.easing}, box-shadow 0.2s ${tokens.easing}, transform 0.35s ${spring}`,
      selectors: {
        '&:hover, &:focus-visible': {
          transform: 'translateY(-2px)',
        },
      },
    },
  },
})
