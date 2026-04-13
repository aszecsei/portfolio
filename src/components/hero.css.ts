import { style } from '@vanilla-extract/css'
import { rgba } from 'polished'
import * as tokens from '@/styles/tokens.css'
import { getFontSize } from '@/styles/typography.css'

export const heroImage = style({
  height: '100vh',
  position: 'relative',
  zIndex: 0,
  overflow: 'hidden',
  backgroundColor: '#0a0a0a',
})

export const heroText = style({
  textAlign: 'center',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  color: 'white',
  width: '100%',
})

export const socialButton = style({
  padding: '10px',
  display: 'inline-flex',
  border: `2px solid ${tokens.white}`,
  borderRadius: tokens.radiusRounded,
  color: tokens.white,
  backgroundColor: 'transparent',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  ...getFontSize(5),
  marginBottom: '1rem',
  marginLeft: '1em',
  marginRight: '1em',
  selectors: {
    '&:hover': {
      color: tokens.primary,
      cursor: 'pointer',
      transition: 'all 0.3s ease-in-out',
      borderColor: tokens.primary,
      backgroundColor: rgba(tokens.primary, 0.3),
    },
  },
})

export const socialButtonContainer = style({
  position: 'relative',
  top: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  textAlign: 'center',
  width: '100%',
  marginTop: '1rem',
})

export const heroSocialButtonContainer = style({
  position: 'absolute',
  bottom: '3em',
  left: '50%',
  transform: 'translateX(-50%)',
  textAlign: 'center',
  width: '100%',
  marginTop: '1rem',
  top: 'auto',
})
