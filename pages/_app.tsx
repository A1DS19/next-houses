import '../styles/index.css';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { AuthProvider } from 'src/auth/useAuth';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from 'src/apollo';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const client = useApollo();

  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <Head>
          <title>Casas Home</title>
          <link rel='shortcut icon' href='/favicon.ico' type='image/x-icon' />
        </Head>
        <Component {...pageProps} />
      </ApolloProvider>
    </AuthProvider>
  );
}

export default MyApp;
