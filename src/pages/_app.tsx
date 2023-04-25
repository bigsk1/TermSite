import React from 'react';
import '../styles/global.css';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';

const App = ({ Component, pageProps }: AppProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onClickAnywhere = () => {
    inputRef.current.focus();
  };

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width, viewport-fit=cover"
          key="viewport"
          maximum-scale="1"
        />
      </Head>

      <div
        className="text-light-foreground dark:text-dark-foreground min-w-0 text-xs md:min-w-full md:text-base dark"
        onClick={onClickAnywhere}
      >
        <main className="bg-light-background dark:bg-dark-background w-full h-full p-2">
          <Component {...pageProps} inputRef={inputRef} />
        </main>
      </div>
      <Analytics />
    </>
  );
};

export default App;

