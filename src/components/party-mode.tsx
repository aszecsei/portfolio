'use client'

import { useEffect, useState } from 'react'
import * as styles from './party-mode.css'

const KONAMI = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
]

export const PARTY_ATTR = 'data-party'

/**
 * Listens for the Konami code and toggles party mode on the document.
 * Styles hook into `[data-party]` to animate the rest of the page.
 */
export function PartyMode() {
  const [active, setActive] = useState(false)

  useEffect(() => {
    let progress = 0
    function onKeyDown(e: KeyboardEvent) {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
      progress =
        key === KONAMI[progress] ? progress + 1 : key === KONAMI[0] ? 1 : 0
      if (progress === KONAMI.length) {
        progress = 0
        setActive((v) => !v)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (active) root.setAttribute(PARTY_ATTR, '')
    else root.removeAttribute(PARTY_ATTR)
    return () => root.removeAttribute(PARTY_ATTR)
  }, [active])

  return (
    <output className={styles.toast} aria-live="polite" hidden={!active}>
      Party mode on. Enter the code again to stop.
    </output>
  )
}
