import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Global tags only */}

        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
