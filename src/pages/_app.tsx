import ContextsProvider from 'context/ContextsProvider';
import useIntentMouse from 'hooks/useIntentMouse';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import 'styles/app.scss';
import 'styles/colors.scss';
import 'styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  useIntentMouse();

  return (
    <ContextsProvider>
      <SessionProvider session={pageProps.session}>
        <Head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <Component {...pageProps} />
      </SessionProvider>
    </ContextsProvider>
  );
}

export default MyApp;
