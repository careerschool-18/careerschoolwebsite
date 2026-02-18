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
      <title>
        Careerschool HR & IT Solutions | Best Training & Placement in Chennai
      </title>
      <meta
        name="description"
        content="India’s #1 Training & Placement Institute for Python, Java, Data Analytics, Digital Marketing & more. Learn, Intern & Get Placed with Careerschool!"
      />
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
