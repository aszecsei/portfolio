import type { ReactNode } from 'react'
import * as styles from './tile.css'

interface ITileProps {
  isVertical?: boolean
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  children?: ReactNode
}

export const Tile = ({ isVertical, size, children }: ITileProps) => {
  const sizeStyle = size
    ? { flex: 'none', width: `${(size / 12) * 100}%` }
    : undefined

  return (
    <div
      className={isVertical ? styles.tileVertical : styles.tile}
      style={sizeStyle}
    >
      {children}
    </div>
  )
}

export const AncestorTile = ({ children }: { children?: ReactNode }) => (
  <div className={styles.ancestorTile}>{children}</div>
)

export const ChildTile = ({ children }: { children?: ReactNode }) => (
  <div className={styles.childTile}>{children}</div>
)

export const ParentTile = ({ children }: { children?: ReactNode }) => (
  <div className={styles.parentTile}>{children}</div>
)
