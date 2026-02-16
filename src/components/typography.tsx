import type { ReactNode } from 'react'
import * as styles from './typography.css'

interface ITextProps {
  color?: string
  alignment?: 'left' | 'center' | 'right' | 'justify'
  children?: ReactNode
  dangerouslySetInnerHTML?: { __html: string }
}

export const Text = ({
  color,
  alignment,
  children,
  dangerouslySetInnerHTML,
}: ITextProps) => {
  if (dangerouslySetInnerHTML) {
    return (
      <p
        className={styles.text({ alignment })}
        style={color ? { color } : undefined}
        dangerouslySetInnerHTML={dangerouslySetInnerHTML}
      />
    )
  }
  return (
    <p
      className={styles.text({ alignment })}
      style={color ? { color } : undefined}
    >
      {children}
    </p>
  )
}

interface IHeaderProps {
  color?: string
  alignment?: 'left' | 'center' | 'right' | 'justify'
  children?: ReactNode
}

export const H1 = ({ color, alignment, children }: IHeaderProps) => (
  <h1
    className={styles.h1({ alignment })}
    style={color ? { color } : undefined}
  >
    {children}
  </h1>
)

export const H2 = ({ color, alignment, children }: IHeaderProps) => (
  <h2
    className={styles.h2({ alignment })}
    style={color ? { color } : undefined}
  >
    {children}
  </h2>
)

export const H3 = ({ color, alignment, children }: IHeaderProps) => (
  <h3
    className={styles.h3({ alignment })}
    style={color ? { color } : undefined}
  >
    {children}
  </h3>
)

export const H4 = ({ color, alignment, children }: IHeaderProps) => (
  <h4
    className={styles.h4({ alignment })}
    style={color ? { color } : undefined}
  >
    {children}
  </h4>
)

export const H5 = ({ color, alignment, children }: IHeaderProps) => (
  <h5
    className={styles.h5({ alignment })}
    style={color ? { color } : undefined}
  >
    {children}
  </h5>
)

export const H6 = ({ color, alignment, children }: IHeaderProps) => (
  <h6
    className={styles.h6({ alignment })}
    style={color ? { color } : undefined}
  >
    {children}
  </h6>
)
