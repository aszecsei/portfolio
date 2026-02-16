import { recipe } from '@vanilla-extract/recipes'

export const icon = recipe({
  base: {
    alignItems: 'center',
    display: 'inline-flex',
    justifyContent: 'center',
    height: '1.5em',
    width: '1.5em',
  },
  variants: {
    size: {
      small: { height: '1em', width: '1em' },
      normal: { height: '1.5em', width: '1.5em' },
      medium: { height: '2em', width: '2em' },
      large: { height: '3em', width: '3em' },
    },
  },
  defaultVariants: {
    size: 'normal',
  },
})
