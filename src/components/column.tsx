import type { ReactNode } from 'react'
import * as styles from './column.css'

interface IColumnProps {
  size?: number | 'narrow' | 'full'
  offsetsize?: number
  children?: ReactNode
}

export const Column = ({ size, offsetsize, children }: IColumnProps) => {
  let className: string
  if (size === 'full') {
    className = styles.columnFull
  } else if (size === 'narrow' || size === undefined) {
    className = styles.columnDefault
  } else if (size >= 1 && size <= 12) {
    className =
      styles.columnSizes[
        String(Math.floor(size)) as keyof typeof styles.columnSizes
      ]
  } else {
    className = styles.columnDefault
  }

  const offsetClass = offsetsize
    ? styles.columnOffsets[
        String(offsetsize) as keyof typeof styles.columnOffsets
      ]
    : undefined

  return (
    <div className={`${className}${offsetClass ? ` ${offsetClass}` : ''}`}>
      {children}
    </div>
  )
}

interface IColumnsProps {
  alignment?: 'left' | 'center'
  isGapless?: boolean
  isMultiline?: boolean
  isVcentered?: boolean
  children?: ReactNode
}

export const Columns = ({
  alignment,
  isGapless,
  isMultiline,
  isVcentered,
  children,
}: IColumnsProps) => (
  <div
    className={styles.columns({
      alignment,
      isGapless,
      isMultiline,
      isVcentered,
    })}
  >
    {children}
  </div>
)
