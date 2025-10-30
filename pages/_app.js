import Head from "next/head";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* 🔹 Add your favicon */}
        <link rel="icon" href="/Fav icon/Fav Icon.png" />
        {/* Optional: other favicon types */}
        {/* <link rel="icon" type="image/png" href="/favicon.png" /> */}
      </Head>
      <Component {...pageProps} />
    </>
  );
}
