import { assignInlineVars } from '@vanilla-extract/dynamic'
import type { ReactNode } from 'react'
import * as tokens from '@/styles/tokens.css'
import * as styles from './section.css'

interface ISectionProps {
  size?: 'small' | 'medium' | 'large'
  color?: string
  id?: string
  className?: string
  children?: ReactNode
}

export const Section = ({
  size,
  color,
  id,
  className: extraClassName,
  children,
}: ISectionProps) => {
  const sizeClassName =
    size === 'medium'
      ? styles.sectionMedium
      : size === 'large'
        ? styles.sectionLarge
        : styles.section

  return (
    <section
      className={[sizeClassName, extraClassName].filter(Boolean).join(' ')}
      id={id}
      style={{
        ...assignInlineVars({
          [styles.sectionBgVar]: color ?? tokens.background,
        }),
      }}
    >
      {children}
    </section>
  )
}
