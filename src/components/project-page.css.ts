import { style } from '@vanilla-extract/css'
import { mq } from '@/styles/media.css'
import * as tokens from '@/styles/tokens.css'

export const projectSummaries = style({
  marginBottom: '1rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
})

export const projectSummaryHolder = style({
  display: 'flex',
  justifyContent: 'center',
  margin: '5px 0',
  flexDirection: 'row',
  paddingTop: '1rem',
  width: '100%',
  selectors: {
    '&:not(:last-child)': {
      borderBottom: `1px solid ${tokens.border}`,
    },
  },
  '@media': {
    [mq.tablet]: {
      margin: '0',
      width: '50%',
    },
  },
})

export const projectSummaryText = style({
  width: '50%',
  padding: '0 2rem',
})

export const projectSummaryLabel = style({
  width: '50%',
  padding: '0 2rem',
  fontWeight: tokens.weightBold,
  textAlign: 'right',
})

export const youtubeWrapper = style({
  position: 'relative',
  paddingBottom: '56.25%',
  paddingTop: '25px',
  height: 0,
  marginBottom: '1em',
})

export const youtubeIframe = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
})

export const projectLink = style({
  textDecoration: 'none',
  color: tokens.blue,
  transition: 'all 0.1s ease-in-out',
  display: 'inline-block',
  position: 'relative',
  margin: '2rem 0',
  padding: '0.5rem 0',
  '::before': {
    content: "''",
    position: 'absolute',
    bottom: '1px',
    left: 0,
    width: '100%',
    height: '1px',
    display: 'block',
    transition: 'all 0.1s ease-in-out',
    transform: 'translateY(-5px) scaleX(0)',
    backgroundColor: tokens.blue,
    opacity: 0,
  },
  '::after': {
    content: "''",
    position: 'absolute',
    top: '1px',
    left: 0,
    width: '100%',
    height: '1px',
    display: 'block',
    transition: 'all 0.1s ease-in-out',
    transform: 'translateY(5px) scaleX(0)',
    backgroundColor: tokens.blue,
    opacity: 0,
  },
  selectors: {
    '&:hover': {
      color: tokens.primary,
      cursor: 'pointer',
    },
    '&:hover::before': {
      transform: 'translateY(0) scaleX(1)',
      backgroundColor: tokens.primary,
      opacity: 1,
    },
    '&:hover::after': {
      transform: 'translateY(0) scaleX(1)',
      backgroundColor: tokens.primary,
      opacity: 1,
    },
  },
})
