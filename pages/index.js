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
import Chatbot from "../components/chatbot";
import Popupform from "../components/Popupform";
import Jobsection from "../components/Jobsection";
import Zohopage from "../components/Zohopage";

export default function Home() {
  return (
    <main>
      <Chatbot/>
      <HeroBanner/>
      <Header />
      <Popupform/>
      <FullImage />
      <Zohopage />
      <GoogleReview/>
      <Discover />
      <Jobsection />
      <StudentsReview />
      <Courses />
      <MeetOurStars />
      <Alumni/>
      <NeedHelp />
      <Footer />
    </main>
  );
}