import { createGlobalTheme } from '@vanilla-extract/css'

export const palette = {
  ground: '#f5f5f8',
  surface: '#ffffff',
  hairline: '#e2e2ea',
  ink: '#1b1b22',
  text: '#3b3b46',
  muted: '#6e6e7a',
  accent: '#b24bef',
  link: '#3273dc',
  void: '#0a0a0f',
  voidText: '#c9c9d6',
} as const

export const vars = createGlobalTheme(':root', {
  color: palette,
  focusRing: `2px solid ${palette.accent}`,
})
