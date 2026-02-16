import { recipe } from '@vanilla-extract/recipes'
import * as tokens from '@/styles/tokens.css'

export const image = recipe({
  base: {
    display: 'block',
    position: 'relative',
    height: 'auto',
    width: '100%',
    marginTop: '1em',
    marginBottom: '1em',
  },
  variants: {
    isRounded: {
      true: { borderRadius: tokens.radiusRounded },
    },
    hasRoundedCorners: {
      true: { borderRadius: tokens.radiusLarge },
    },
  },
})
