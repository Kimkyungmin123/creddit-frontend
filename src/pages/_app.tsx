import ContextsProvider from 'context/ContextsProvider';
import useIntentMouse from 'hooks/useIntentMouse';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import reducer from '.././store/slice';
import { configureStore } from '@reduxjs/toolkit';
import 'styles/app.scss';
import 'styles/colors.scss';
import 'styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  useIntentMouse();

  const store = configureStore({ reducer });
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default MyApp;
