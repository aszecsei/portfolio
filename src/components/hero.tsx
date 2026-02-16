import {
  FaEnvelope,
  FaGithub,
  FaLinkedinIn,
  FaMastodon,
  FaTwitter,
  FaWordpressSimple,
} from 'react-icons/fa'
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
        <FaEnvelope aria-labelledby="Email" role="img" />
      </Icon>
    </a>
    <a className={styles.socialButton} href="https://twitter.com/aszecsei">
      <Icon>
        <FaTwitter aria-labelledby="Twitter" role="img" />
      </Icon>
    </a>
    <a
      className={styles.socialButton}
      href="https://mastodon.gamedev.place/@aszecsei"
    >
      <Icon>
        <FaMastodon aria-labelledby="Mastodon" role="img" />
      </Icon>
    </a>
    <a
      className={styles.socialButton}
      href="https://linkedin.com/in/alic-szecsei"
    >
      <Icon>
        <FaLinkedinIn aria-labelledby="LinkedIn" role="img" />
      </Icon>
    </a>
    <a className={styles.socialButton} href="https://github.com/aszecsei">
      <Icon>
        <FaGithub aria-labelledby="GitHub" role="img" />
      </Icon>
    </a>
    <a className={styles.socialButton} href="http://blog.alic-szecsei.com">
      <Icon>
        <FaWordpressSimple aria-labelledby="Wordpress" role="img" />
      </Icon>
    </a>
  </>
)
