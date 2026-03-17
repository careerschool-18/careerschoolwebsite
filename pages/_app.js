import "../styles/globals.css";
import Script from "next/script";
import "react-phone-input-2/lib/style.css";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-H2Y6DYC4SX"
        strategy="afterInteractive"
      />

      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-H2Y6DYC4SX');
        `}
      </Script>

      {/* ✅ Toast */}
      <Toaster position="top-right" />

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;