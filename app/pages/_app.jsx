import App, { Container } from 'next/app'
import Head from 'next/head'
import React from 'react'

import { GlobalStyle } from '../global-styles'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Alic Szecsei</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
        />
      </Head>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  )
}