import type { AppProps } from 'next/app';
import Head from 'next/head';
import 'styles/app.scss';
import 'styles/globals.css';
import 'styles/variables.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
