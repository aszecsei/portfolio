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
    'radial-gradient(ellipse 70% 60% at 30% 75%, #0d2a33 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 75% 30%, #241040 0%, transparent 70%), #0a0a0f',
})
