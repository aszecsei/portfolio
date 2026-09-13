import { rgba } from 'polished'
import { palette } from './theme.css'

/** Outer radius shared by the project card and other framed surfaces. */
export const cardRadius = '14px'

/** Inner radius for framed media (art, embeds). */
export const frameRadius = '8px'

/** Foil sheen: a diagonal rainbow band that slides with the pointer. */
export const foil = [
  'linear-gradient(115deg,',
  'transparent 25%,',
  'rgba(255, 60, 200, 0.55) 36%,',
  'rgba(80, 210, 255, 0.55) 43%,',
  'rgba(255, 235, 90, 0.5) 50%,',
  'rgba(90, 255, 180, 0.55) 57%,',
  'transparent 70%)',
].join(' ')

/** Soft highlight ring that makes a surface read as a physical card. */
export const cardInset = 'inset 0 0 0 1px rgba(255, 255, 255, 0.7)'

/** Recessed look for media sitting inside a card. */
export const frameShadow = `inset 0 0 0 1px rgba(255, 255, 255, 0.6), inset 0 2px 6px ${rgba(palette.void, 0.12)}`
