import Head from "next/head";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* 🔹 Basic Meta Tags */}
        <title>
          Careerschool HR & IT Solutions | Best Training, Internship & Placement
          in Chennai & Nellore
        </title>
        <meta
          name="description"
          content="India's #1 Training & Placement Institute for Python, Full Stack Development, Java, Web Development, Digital Marketing, Data Analytics, HR and more. Learn, Intern & Get Placed with Careerschool!"
        />
        <meta
          name="keywords"
          content="careerschool, career school, careerschool hr solutions, careerschool it solutions, python full stack training, java full stack training, data analytics training, data analysis course, digital marketing training, ai and machine learning course, power bi training, sql training, excel course, finance internship, internship in chennai, internship in nellore, training institute in chennai, training institute in nellore, software training, web development course, full stack course, placement support, job oriented training, college placement training, campus drive, career guidance, online training, offline training, certification course, professional courses, mba student training, engineering student training, arts student training, job seekers course, fresher training, career school chennai, career school nellore"
        />

        {/* 🔹 SEO Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Careerschool HR & IT Solutions" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* 🔹 Open Graph Meta Tags */}
        <meta
          property="og:title"
          content="Careerschool HR & IT Solutions | Best Training, Internship & Placement in Chennai & Nellore"
        />
        <meta
          property="og:description"
          content="India's #1 Training & Placement Institute for Python, Full Stack Development, Java, Web Development, Digital Marketing, Data Analytics, HR and more. Learn, Intern & Get Placed with Careerschool!"
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_IN" />
        <meta
          property="og:site_name"
          content="Careerschool HR & IT Solutions"
        />

        {/* 🔹 Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Careerschool HR & IT Solutions | Best Training, Internship & Placement in Chennai & Nellore"
        />
        <meta
          name="twitter:description"
          content="India's #1 Training & Placement Institute for Python, Full Stack Development, Java, Web Development, Digital Marketing, Data Analytics, HR and more."
        />

        {/* 🔹 Favicon */}
        <link rel="icon" href="/Fav icon/Fav Icon.png" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/Fav icon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/Fav icon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/Fav icon/favicon-16x16.png"
        />

        {/* 🔹 Canonical URL */}
        <link rel="canonical" href="https://www.careerschool.co.in/" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
