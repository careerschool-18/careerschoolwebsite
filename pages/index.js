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

export default function Home() {
  return (
    <main>
      <HeroBanner />
      <Header />
      <FullImage />
      <GoogleReview/>
       <Discover />
      <StudentsReview />
      <MeetOurStars />
      <Courses />
      <Alumni />
      <NeedHelp />
      <Footer />
    </main>
  );
}