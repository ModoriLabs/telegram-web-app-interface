import { WebAppProvider } from '@vkruglikov/react-telegram-web-app';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WebAppProvider
      options={{
        smoothButtonsTransition: true,
      }}>
      <Component {...pageProps} />
    </WebAppProvider>
  );
}
