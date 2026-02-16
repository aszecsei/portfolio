import type { InputHTMLAttributes, ReactNode } from 'react'
import * as styles from './form.css'

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  color?: string
  isFullwidth?: boolean
  isInline?: boolean
  isRounded?: boolean
  isStatic?: boolean
}

export const Input = ({
  color,
  isFullwidth,
  isInline,
  isRounded,
  isStatic,
  ...rest
}: IInputProps) => <input className={styles.input} {...rest} />

export const Help = ({ children }: { children?: ReactNode }) => (
  <p className={styles.help}>{children}</p>
)

interface IFieldProps {
  hasAddons?: boolean
  children?: ReactNode
}

export const Field = ({ children }: IFieldProps) => (
  <div className={styles.field}>{children}</div>
)

interface IControlProps {
  hasIcon?: boolean
  children?: ReactNode
}

export const Control = ({ hasIcon, children }: IControlProps) => (
  <div className={hasIcon ? styles.controlWithIcon : styles.control}>
    {children}
  </div>
)
