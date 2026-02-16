import type { ReactNode } from 'react'
import { icon as iconStyle } from './icon.css'

interface IIconProps {
  size?: 'small' | 'normal' | 'medium' | 'large'
  children?: ReactNode
}

export const Icon = ({ size, children }: IIconProps) => (
  <span className={iconStyle({ size })}>{children}</span>
)
