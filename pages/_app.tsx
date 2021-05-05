import '../styles/index.css';
import { AppProps } from 'next/app';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Casas Home</title>
        <link rel='shortcut icon' href='/favicon.ico' type='image/x-icon' />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
