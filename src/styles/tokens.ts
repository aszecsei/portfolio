import { getLuminance } from 'polished'
import { dark, light } from './tokens.css'

export const getInverse = (color: string) => {
  if (getLuminance(color) > 0.55) {
    return dark
  }
  return light
}
