import useIntentMouse from 'hooks/useIntentMouse';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import 'styles/app.scss';
import 'styles/globals.css';
import 'styles/variables.scss';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps }: AppProps) {
  useIntentMouse();

  return (
    <SessionProvider session={pageProps.session}>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
