import type { ReactNode } from 'react'
import { container as containerStyle } from './container.css'

interface IContainerProps {
  isFluid?: boolean
  children?: ReactNode
}

export const Container = ({ isFluid, children }: IContainerProps) => (
  <div className={containerStyle({ isFluid })}>{children}</div>
)
