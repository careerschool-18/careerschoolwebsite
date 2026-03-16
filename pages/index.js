import Head from "next/head";
import HeroBanner from "../components/HeroBanner";
import Header from "../components/Header";
import FullImage from "../components/FullImage";
import GoogleReview from "../components/GoogleReview";
import Discover from "../components/Discover";
import StudentsReview from "../components/StudentsReview";
import MeetOurStars from "../components/MeetOurStars";
import Courses from "../components/Courses";
import Alumni from "../components/Alumni";
import NeedHelp from "../components/NeedHelp";
import Footer from "../components/Footer";
import Popupform from "../components/Popupform";
import Zohopage from "../components/Zohopage";

export default function Home() {
  return (
    <>
          <Head>
        <title>Careerschool HR & IT Solutions | Training & Placement</title>

        <meta name="description" content="Careerschool HR & IT Solutions provides industry-oriented training and placement services in Chennai for freshers and professionals."/>

        <meta name="keywords" content="IT training Chennai, HR training Chennai, placement training, Careerschool HR Solutions, Python training in nellore, Training institution in nellore, Careerschool IT Solutions, Java fullstack course, Data analytics, Data analyst, Business Analytics"
        />

        <meta property="og:title" content="Careerschool HR & IT Solutions" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://careerschool.co.in" />
        <meta property="og:image" content="public/Home page images/Home Page - 1920 x 1080(updated).jpg" />

        <link rel="canonical" href="https://careerschool.co.in" />
      </Head>

    <main>
      <HeroBanner/>
      <Header />
      <Popupform/>
      <FullImage />
      <Zohopage />
      <GoogleReview/>
      <Discover />
      <StudentsReview />
      <Courses />
      <MeetOurStars />
      <Alumni/>
      <NeedHelp />
      <Footer />
    </main>
    </>
  );
}
