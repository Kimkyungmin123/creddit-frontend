import useIntentMouse from 'hooks/useIntentMouse';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import 'styles/app.scss';
import 'styles/colors.scss';
import 'styles/globals.css';
import { SWRConfig } from 'swr';
import reIssueAuthToken from 'utils/reIssueAuthToken';

function MyApp({ Component, pageProps }: AppProps) {
  useIntentMouse();

  return (
    <SWRConfig
      value={{
        onErrorRetry: async (error, key, config, revalidate) => {
          await reIssueAuthToken();
          revalidate();
        },
      }}
    >
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
    </SWRConfig>
  );
}

export default MyApp;
