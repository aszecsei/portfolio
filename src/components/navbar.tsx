'use client'

import Link from 'next/link'
import { useState } from 'react'
import { navbarContainer } from './container.css'
import * as styles from './navbar.css'

interface IHamburgerProps {
  dimensions: number
  isActive?: boolean
  onClick?: () => void
}

const Hamburger = (props: IHamburgerProps) => (
  <button
    type="button"
    className={styles.hamburgerDiv}
    style={{ height: `${props.dimensions}px`, width: `${props.dimensions}px` }}
    onClick={props.onClick}
  >
    <span
      className={styles.hamburgerSpan({
        isActive: !!props.isActive,
        line: 'first',
      })}
    />
    <span
      className={styles.hamburgerSpan({
        isActive: !!props.isActive,
        line: 'second',
      })}
    />
    <span
      className={styles.hamburgerSpan({
        isActive: !!props.isActive,
        line: 'third',
      })}
    />
  </button>
)

interface INavProps {
  shouldUseScroll?: boolean
}

function scrollTo(id: string) {
  return (event: React.MouseEvent) => {
    event.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }
}

function scrollToTop(event: React.MouseEvent) {
  event.preventDefault()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export default function Nav({ shouldUseScroll }: INavProps) {
  const [isActive, setIsActive] = useState(false)

  return (
    <nav className={styles.navbar}>
      <div className={navbarContainer}>
        <div className={styles.navbarBrand}>
          <Link
            className={styles.navBrandLink}
            href="/"
            onClick={shouldUseScroll ? scrollToTop : undefined}
          >
            Alic Szecsei
          </Link>
          <Hamburger
            dimensions={44}
            isActive={isActive}
            onClick={() => setIsActive(!isActive)}
          />
        </div>

        <div className={styles.navbarCollapse({ isActive })}>
          <ul className={styles.navbarNav}>
            <li className={styles.navItem}>
              <Link
                className={styles.navLink}
                href="/#about"
                onClick={shouldUseScroll ? scrollTo('about') : undefined}
              >
                About
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link
                className={styles.navLink}
                href="/#games"
                onClick={shouldUseScroll ? scrollTo('games') : undefined}
              >
                Games
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link
                className={styles.navLink}
                href="/#software"
                onClick={shouldUseScroll ? scrollTo('software') : undefined}
              >
                Software
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link
                className={styles.navLink}
                href="/#contact"
                onClick={shouldUseScroll ? scrollTo('contact') : undefined}
              >
                Contact
              </Link>
            </li>
            <li className={styles.navItem}>
              <a
                className={styles.navLink}
                href="/static/Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Resume
              </a>
            </li>
            <li className={styles.navItem}>
              <a className={styles.navLink} href="http://blog.alic-szecsei.com">
                Blog
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
