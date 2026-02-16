import type { StyleRule } from '@vanilla-extract/css'
import { mq } from './media.css'

const bigScale = Math.SQRT2 // Augmented 4th
const medScale = 1.25 // Major 3rd
const smallScale = 1.25 // Major 2nd

const sizeIndices = [6, 5, 4, 3, 2, 1, 0, -1]
const smallSizes = sizeIndices.map((x) => smallScale ** x)
const smallLineHeight = sizeIndices.map((_, i) => 1 + (smallScale / 12) * i)
const medSizes = sizeIndices.map((x) => medScale ** x)
const medLineHeight = sizeIndices.map((_, i) => 1 + (medScale / 12) * i)
const bigSizes = sizeIndices.map((x) => bigScale ** x)
const bigLineHeight = sizeIndices.map((_, i) => 1 + (bigScale / 12) * i)

export type FontSize = number | 'small' | 'normal' | 'medium' | 'large'

function resolveSizeIndex(size: FontSize): number {
  if (size === 'small') return 7
  if (size === 'normal') return 6
  if (size === 'medium') return 5
  if (size === 'large') return 4
  return size
}

export function getFontSize(size: FontSize): StyleRule {
  const idx = resolveSizeIndex(size)
  return {
    fontSize: `${smallSizes[idx]}rem`,
    lineHeight: smallLineHeight[idx],
    '@media': {
      [mq.tablet]: {
        fontSize: `${medSizes[idx]}rem`,
        lineHeight: medLineHeight[idx],
      },
      [mq.desktop]: {
        fontSize: `${bigSizes[idx]}rem`,
        lineHeight: bigLineHeight[idx],
      },
    },
  }
}
