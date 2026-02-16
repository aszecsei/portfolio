'use client'

import { animate, remove } from 'animejs'
import { type ReactNode, useRef } from 'react'

interface ISkillIconProps {
  children: ReactNode
}

export function SkillIcon({ children }: ISkillIconProps) {
  const divRef = useRef<HTMLDivElement>(null)

  const mouseEnter = () => {
    if (!divRef.current) return
    remove(divRef.current)
    animate(divRef.current, {
      scale: 1.2,
      rotate: [
        { to: 10, duration: 200, delay: 0, ease: 'inOutSine' },
        { to: 0, duration: 200, delay: 0, ease: 'inOutSine' },
      ],
      duration: 500,
    })
  }

  const mouseLeave = () => {
    if (!divRef.current) return
    remove(divRef.current)
    animate(divRef.current, {
      scale: 1,
      rotate: 0,
      duration: 500,
    })
  }

  return (
    <div
      role="img"
      style={{ display: 'inline-block' }}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      ref={divRef}
    >
      {children}
    </div>
  )
}
