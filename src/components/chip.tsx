import { assignInlineVars } from '@vanilla-extract/dynamic'
import { darken } from 'polished'
import type { ReactNode } from 'react'
import { getInverse } from '@/styles/tokens'
import * as tokens from '@/styles/tokens.css'
import * as styles from './chip.css'

const defaultBg = tokens.background
const defaultColor = tokens.text

interface IChipProps {
  size?: 'small' | 'medium' | 'large'
  isRounded?: boolean
  color?: string
  children?: ReactNode
}

export const Chip = ({ isRounded, color, children }: IChipProps) => {
  const bg = color ?? defaultBg
  const fg = color ? getInverse(color) : defaultColor

  return (
    <span
      className={`${styles.chip({ isRounded })} ${styles.chipInChips}`}
      style={assignInlineVars({
        [styles.chipBgVar]: bg,
        [styles.chipColorVar]: fg,
        [styles.chipHoverBgVar]: darken(0.05, bg),
        [styles.chipActiveBgVar]: darken(0.1, bg),
      })}
    >
      {children}
    </span>
  )
}

interface IChipsProps {
  alignment?: 'left' | 'center' | 'right'
  hasAddons?: boolean
  children?: ReactNode
}

export const Chips = ({ alignment, children }: IChipsProps) => (
  <div className={styles.chips({ alignment })}>{children}</div>
)
