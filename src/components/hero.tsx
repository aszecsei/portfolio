import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { socialLinks } from '@/models/links'
import * as styles from './hero.css'
import { HeroShader } from './hero-shader'

export const HeroImage = ({ children }: { children?: React.ReactNode }) => (
  <div className={styles.heroImage}>
    <HeroShader />
    {children}
  </div>
)

export const HeroContent = ({ children }: { children?: React.ReactNode }) => (
  <div className={styles.heroContent}>{children}</div>
)

export const ScrollCue = ({ target }: { target: string }) => (
  <a
    className={styles.scrollCue}
    href={`#${target}`}
    aria-label={`Scroll to ${target}`}
  >
    <FontAwesomeIcon icon={faChevronDown} aria-hidden="true" />
  </a>
)

export const SocialButtons = ({ className }: { className?: string }) => (
  <div className={[styles.socialRow, className].filter(Boolean).join(' ')}>
    {socialLinks.map((link, i) => (
      <a
        key={link.label}
        className={`${styles.socialButton} ${styles.socialButtonDelay[i] ?? ''}`}
        href={link.href}
        aria-label={link.label}
        {...(link.external
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
      >
        <FontAwesomeIcon icon={link.icon} aria-hidden="true" />
      </a>
    ))}
  </div>
)
