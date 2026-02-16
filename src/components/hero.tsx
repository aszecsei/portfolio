import {
  faBluesky,
  faGithub,
  faLinkedinIn,
  faMastodon,
  faXTwitter as faTwitter,
  faWordpressSimple,
} from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as styles from './hero.css'
import { Icon } from './icon'

export const HeroImage = ({ children }: { children?: React.ReactNode }) => (
  <div className={styles.heroImage}>{children}</div>
)

export const HeroText = ({ children }: { children?: React.ReactNode }) => (
  <div className={styles.heroText}>{children}</div>
)

export const SocialButtonContainer = ({
  children,
}: {
  children?: React.ReactNode
}) => <div className={styles.socialButtonContainer}>{children}</div>

export const HeroSocialButtonContainer = ({
  children,
}: {
  children?: React.ReactNode
}) => <div className={styles.heroSocialButtonContainer}>{children}</div>

export const SocialButtons = () => (
  <>
    <a className={styles.socialButton} href="mailto:aszecsei@gmail.com">
      <Icon>
        <FontAwesomeIcon icon={faEnvelope} aria-labelledby="Email" role="img" />
      </Icon>
    </a>
    <a
      className={styles.socialButton}
      href="https://bsky.app/profile/crowmaki.bsky.social"
    >
      <Icon>
        <FontAwesomeIcon
          icon={faBluesky}
          aria-labelledby="Bluesky"
          role="img"
        />
      </Icon>
    </a>
    <a
      className={styles.socialButton}
      href="https://mastodon.gamedev.place/@aszecsei"
    >
      <Icon>
        <FontAwesomeIcon
          icon={faMastodon}
          aria-labelledby="Mastodon"
          role="img"
        />
      </Icon>
    </a>
    <a
      className={styles.socialButton}
      href="https://linkedin.com/in/alic-szecsei"
    >
      <Icon>
        <FontAwesomeIcon
          icon={faLinkedinIn}
          aria-labelledby="LinkedIn"
          role="img"
        />
      </Icon>
    </a>
    <a className={styles.socialButton} href="https://github.com/aszecsei">
      <Icon>
        <FontAwesomeIcon icon={faGithub} aria-labelledby="GitHub" role="img" />
      </Icon>
    </a>
    <a className={styles.socialButton} href="http://blog.alic-szecsei.com">
      <Icon>
        <FontAwesomeIcon
          icon={faWordpressSimple}
          aria-labelledby="Wordpress"
          role="img"
        />
      </Icon>
    </a>
    <a className={styles.socialButton} href="https://x.com/aszecsei">
      <Icon>
        <FontAwesomeIcon
          icon={faTwitter}
          aria-labelledby="Twitter"
          role="img"
        />
      </Icon>
    </a>
  </>
)
