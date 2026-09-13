'use client'

import { type PointerEvent, type ReactNode, useRef } from 'react'

const MAX_TILT = 6
const SHADOW_SHIFT = 10
const PARALLAX = 9

interface ITiltCardProps {
  className?: string
  children: ReactNode
}

/**
 * Tilts toward the pointer and exposes the pointer position as CSS variables
 * (`--mx`, `--my`) so styles can draw a glow under the cursor.
 * Pure DOM mutation per move, no React re-render.
 */
export function TiltCard({ className, children }: ITiltCardProps) {
  const ref = useRef<HTMLElement>(null)

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    const el = ref.current
    if (!el || e.pointerType !== 'mouse') return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    el.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`)
    el.style.setProperty('--my', `${(y * 100).toFixed(1)}%`)
    el.style.setProperty('--ry', `${((x - 0.5) * 2 * MAX_TILT).toFixed(2)}deg`)
    el.style.setProperty('--rx', `${((0.5 - y) * 2 * MAX_TILT).toFixed(2)}deg`)
    // Art sinks behind the frame (moves against the pointer); label floats above it.
    el.style.setProperty('--px', `${((0.5 - x) * 2 * PARALLAX).toFixed(1)}px`)
    el.style.setProperty('--py', `${((0.5 - y) * 2 * PARALLAX).toFixed(1)}px`)
    // Shadow falls away from the raised edge.
    el.style.setProperty(
      '--sx',
      `${((0.5 - x) * 2 * SHADOW_SHIFT).toFixed(1)}px`,
    )
    el.style.setProperty(
      '--sy',
      `${(12 + (0.5 - y) * 2 * SHADOW_SHIFT).toFixed(1)}px`,
    )
  }

  const onPointerLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
    el.style.setProperty('--sx', '0px')
    el.style.setProperty('--sy', '12px')
    el.style.setProperty('--px', '0px')
    el.style.setProperty('--py', '0px')
  }

  return (
    <article
      ref={ref}
      className={className}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {children}
    </article>
  )
}
