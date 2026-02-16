import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import type { Metadata } from 'next'
import { Open_Sans, Raleway } from 'next/font/google'
import '@/styles/global.css'

config.autoAddCss = false

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['400', '800'],
  display: 'swap',
  variable: '--font-raleway',
})

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  display: 'fallback',
  variable: '--font-open-sans',
})

export const metadata: Metadata = {
  title: 'Alic Szecsei',
  description:
    'Game programming and software development portfolio of Alic Szecsei.',
  authors: [{ name: 'Alic Szecsei' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Alic Szecsei',
    description:
      'Game programming and software development portfolio of Alic Szecsei.',
    url: 'https://alic-szecsei.com',
    images: [
      {
        url: 'https://alic-szecsei.com/static/img/og-image.jpg',
        width: 344,
        height: 180,
      },
    ],
  },
  twitter: {
    title: "Alic Szecsei's Portfolio",
  },
  icons: {
    apple: '/static/img/apple-touch-icon.png?v=alQgGE7PNp',
    icon: [
      {
        url: '/static/img/favicon-32x32.png?v=alQgGE7PNp',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/static/img/favicon-16x16.png?v=alQgGE7PNp',
        sizes: '16x16',
        type: 'image/png',
      },
    ],
    shortcut: '/static/img/favicon.ico?v=alQgGE7PNp',
  },
  manifest: '/static/site.webmanifest?v=alQgGE7PNp',
  other: {
    'apple-mobile-web-app-title': 'Alic Szecsei',
    'application-name': 'Alic Szecsei',
    'msapplication-TileColor': '#603cba',
    'msapplication-config': '/static/browserconfig.xml?v=alQgGE7PNp',
    'theme-color': '#ffffff',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${raleway.variable} ${openSans.variable}`}>
      <head>
        <link
          rel="mask-icon"
          href="/static/img/safari-pinned-tab.svg?v=alQgGE7PNp"
          color="#5bbad5"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
