import '../styles/index.css';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { AuthProvider } from 'src/auth/useAuth';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <AuthProvider>
      <Head>
        <title>Casas Home</title>
        <link rel='shortcut icon' href='/favicon.ico' type='image/x-icon' />
      </Head>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
