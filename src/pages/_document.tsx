'use client';

import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <script src="https://telegram.org/js/telegram-web-app.js" async />
          <script
            src="//cdn.jsdelivr.net/npm/@ungap/custom-elements"
            async
          ></script>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="format-detection"
            content="telephone=no, date=no, email=no, address=no"
          />
        </Head>
        <body suppressHydrationWarning={true}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
