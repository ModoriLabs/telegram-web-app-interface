import Navigation from '@/components/navigation';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import type { AppProps } from 'next/app';
import Script from 'next/script';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { GlobalStyle } from '@/styles/globals';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();
export default function App({ Component, pageProps }: AppProps) {
  const manifestUrl =
    'https://raw.githubusercontent.com/ton-community/tutorials/main/03-client/test/public/tonconnect-manifest.json';

  return (
    <>
      <TonConnectUIProvider manifestUrl={manifestUrl}>
        <QueryClientProvider client={queryClient}>
          <ToastContainer />
          <GlobalStyle />
          <Navigation />
          <Component {...pageProps} />
          <Script src="https://telegram.org/js/telegram-web-app.js"></Script>
        </QueryClientProvider>
      </TonConnectUIProvider>
    </>
  );
}
