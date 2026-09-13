import type { ReactNode } from 'react'
import * as styles from './typography.css'

type Alignment = 'left' | 'center' | 'right' | 'justify'

interface ITextProps {
  color?: string
  alignment?: Alignment
  className?: string
  children?: ReactNode
  dangerouslySetInnerHTML?: { __html: string }
}

const join = (...classes: (string | undefined)[]) =>
  classes.filter(Boolean).join(' ')

export const Text = ({
  color,
  alignment,
  className,
  children,
  dangerouslySetInnerHTML,
}: ITextProps) => {
  if (dangerouslySetInnerHTML) {
    return (
      <p
        className={join(styles.text({ alignment }), className)}
        style={color ? { color } : undefined}
        dangerouslySetInnerHTML={dangerouslySetInnerHTML}
      />
    )
  }
  return (
    <p
      className={join(styles.text({ alignment }), className)}
      style={color ? { color } : undefined}
    >
      {children}
    </p>
  )
}

interface IHeaderProps {
  color?: string
  alignment?: Alignment
  className?: string
  id?: string
  children?: ReactNode
}

type HeaderTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

function makeHeader(Tag: HeaderTag, recipe: (typeof styles)[HeaderTag]) {
  return ({ color, alignment, className, id, children }: IHeaderProps) => (
    <Tag
      id={id}
      className={join(recipe({ alignment }), className)}
      style={color ? { color } : undefined}
    >
      {children}
    </Tag>
  )
}

export const H1 = makeHeader('h1', styles.h1)
export const H2 = makeHeader('h2', styles.h2)
export const H3 = makeHeader('h3', styles.h3)
export const H4 = makeHeader('h4', styles.h4)
export const H5 = makeHeader('h5', styles.h5)
export const H6 = makeHeader('h6', styles.h6)
