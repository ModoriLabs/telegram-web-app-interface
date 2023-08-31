import { TonConnectUIProvider } from '@tonconnect/ui-react';
import type { AppProps } from 'next/app';
import Script from 'next/script';

export default function App({ Component, pageProps }: AppProps) {
  const manifestUrl =
    'https://raw.githubusercontent.com/ton-community/tutorials/main/03-client/test/public/tonconnect-manifest.json';

  return (
    <>
      <TonConnectUIProvider manifestUrl={manifestUrl}>
        <Component {...pageProps} />
        <Script src="https://telegram.org/js/telegram-web-app.js"></Script>
      </TonConnectUIProvider>
    </>
  );
}
