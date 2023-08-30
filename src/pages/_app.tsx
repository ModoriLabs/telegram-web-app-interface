import { WebAppProvider } from '@vkruglikov/react-telegram-web-app';
import type { AppProps } from 'next/app';
import Script from 'next/script';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WebAppProvider
      options={{
        smoothButtonsTransition: true,
      }}>
      <Component {...pageProps} />
      <Script src="https://telegram.org/js/telegram-web-app.js"></Script>
    </WebAppProvider>
  );
}
