import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="language" content="English" />
        <meta name="robots" content="index, follow" />
        <meta
          name="description"
          content="India’s #1 Training & Placement Institute for Python, Full Stack Development, Java, Web Development, Digital Marketing, Data Analytics, HR and more. Learn, Intern & Get Placed with Careerschool!"
        />
        <meta
          name="keywords"
          content="careerschool, python training, full stack training, data analytics training, digital marketing training"
        />
        <link rel="icon" href="/Fav icon/Fav Icon.png" />

        {/* ✅ Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-H2Y6DYC4SX"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-H2Y6DYC4SX');
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
