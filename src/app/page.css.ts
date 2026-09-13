import { style } from '@vanilla-extract/css'
import { motionOk, twinkle } from '@/styles/motion.css'
import { vars } from '@/styles/theme.css'
import * as tokens from '@/styles/tokens.css'
import { srOnly } from '@/styles/utils.css'

export const skipLink = style({
  ...srOnly,
  selectors: {
    '&:focus': {
      position: 'fixed',
      top: '1rem',
      left: '1rem',
      width: 'auto',
      height: 'auto',
      margin: 0,
      padding: '0.75rem 1rem',
      clip: 'auto',
      zIndex: 2000,
      backgroundColor: vars.color.surface,
      color: vars.color.ink,
      borderRadius: tokens.radius,
      fontFamily: tokens.familyHeader,
      textDecoration: 'none',
    },
  },
})

export const contactBand = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1.5rem',
  textAlign: 'center',
})

export const contactText = style({
  maxWidth: '40ch',
  marginBottom: 0,
  color: vars.color.voidText,
})

// Deterministic pseudo-random scatter so the tile is stable across builds.
function mulberry32(seed: number) {
  let a = seed
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function starTile(size: number, count: number, seed: number) {
  const rand = mulberry32(seed)
  const dots = Array.from({ length: count }, () => {
    const x = (rand() * size).toFixed(1)
    const y = (rand() * size).toFixed(1)
    const r = (0.5 + rand() * 0.9).toFixed(2)
    const o = (0.35 + rand() * 0.65).toFixed(2)
    return `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" opacity="${o}"/>`
  }).join('')
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">${dots}</svg>`
  return {
    backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`,
    backgroundSize: `${size}px ${size}px`,
    backgroundRepeat: 'repeat',
  }
}

const edgeFade =
  'linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)'

export const starfield = style({
  position: 'relative',
  overflow: 'hidden',
  '::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    opacity: 0.7,
    maskImage: edgeFade,
    WebkitMaskImage: edgeFade,
    ...starTile(720, 70, 7),
  },
  '::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    opacity: 0.7,
    maskImage: edgeFade,
    WebkitMaskImage: edgeFade,
    ...starTile(1040, 60, 23),
    backgroundPosition: '310px 190px',
  },
  '@media': {
    [motionOk]: {
      '::before': { animation: `${twinkle} 4s ease-in-out infinite` },
      '::after': { animation: `${twinkle} 6s ease-in-out infinite reverse` },
    },
  },
})

export const starfieldContent = style({
  position: 'relative',
  zIndex: 1,
})
