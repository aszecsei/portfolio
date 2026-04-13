import { style } from '@vanilla-extract/css'

export const canvas = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 0,
  display: 'block',
})

export const fallback = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 0,
  background:
    'linear-gradient(135deg, #0a0a0a 0%, #1a0a2e 40%, #0a1a2e 70%, #0a0a0a 100%)',
})
