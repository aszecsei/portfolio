import { keyframes } from '@vanilla-extract/css'

export const motionOk = '(prefers-reduced-motion: no-preference)'
export const hoverOk = '(hover: hover) and (pointer: fine)'

/** A springy overshoot curve for small, playful moves. */
export const spring = 'cubic-bezier(0.34, 1.56, 0.64, 1)'

/** Squash-and-stretch jump, the game-animation classic. */
export const jump = keyframes({
  '0%': { transform: 'scale(1, 1) translateY(0)' },
  '15%': { transform: 'scale(1.2, 0.8) translateY(0)' },
  '40%': { transform: 'scale(0.9, 1.15) translateY(-28%)' },
  '65%': { transform: 'scale(1.05, 0.95) translateY(0)' },
  '80%': { transform: 'scale(0.98, 1.02) translateY(-4%)' },
  '100%': { transform: 'scale(1, 1) translateY(0)' },
})

/** Continuous bob used by party mode, staggered per element. */
export const wave = keyframes({
  '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
  '25%': { transform: 'translateY(-30%) rotate(-8deg)' },
  '75%': { transform: 'translateY(6%) rotate(8deg)' },
})

export const hueCycle = keyframes({
  from: { filter: 'hue-rotate(0deg)' },
  to: { filter: 'hue-rotate(360deg)' },
})

export const twinkle = keyframes({
  '0%, 100%': { opacity: 0.35 },
  '50%': { opacity: 1 },
})
