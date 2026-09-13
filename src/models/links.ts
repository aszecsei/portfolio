import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import {
  faBluesky,
  faGithub,
  faLinkedinIn,
  faMastodon,
  faWordpressSimple,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

export interface ISocialLink {
  label: string
  href: string
  icon: IconDefinition
  external: boolean
}

export const blogUrl = 'https://blog.alic-szecsei.com'

export const socialLinks: ISocialLink[] = [
  {
    label: 'Email',
    href: 'mailto:aszecsei@gmail.com',
    icon: faEnvelope,
    external: false,
  },
  {
    label: 'Bluesky',
    href: 'https://bsky.app/profile/crowmaki.bsky.social',
    icon: faBluesky,
    external: true,
  },
  {
    label: 'Mastodon',
    href: 'https://mastodon.gamedev.place/@aszecsei',
    icon: faMastodon,
    external: true,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/alic-szecsei',
    icon: faLinkedinIn,
    external: true,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/aszecsei',
    icon: faGithub,
    external: true,
  },
  {
    label: 'Blog',
    href: blogUrl,
    icon: faWordpressSimple,
    external: true,
  },
  {
    label: 'X',
    href: 'https://x.com/aszecsei',
    icon: faXTwitter,
    external: true,
  },
]
