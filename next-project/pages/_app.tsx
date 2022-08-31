import '../styles/globals.css';
import type { AppProps } from 'next/app';

import BackButton from '../components/BackButton';
import Header from '../components/Header';

import Script from 'next/script';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script src="https://unpkg.com/flowbite@1.5.2/dist/flowbite.js" />
      <Header />
      <Component {...pageProps} />
      <BackButton />
    </>
  )
}

export default MyApp
