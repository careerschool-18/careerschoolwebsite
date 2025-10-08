import HeroBanner from "../components/HeroBanner";
import Header from "../components/Header";
import FullImage from "../components/FullImage";
import GoogleReview from "../components/GoogleReview";   // 👈 must match file name
import StudentsReview from "../components/StudentsReview";
import MeetOurStars from "../components/MeetOurStars";
import About from "../components/About";
import Courses from "../components/Courses";
import Alumni from "../components/Alumni";
import Discover from "../components/Discover";
import NeedHelp from "../components/NeedHelp";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main>
      {/* Top Banner */}
      <HeroBanner />

      {/* Header Section */}
      <Header />

      {/* Full Page Image Section */}
      <FullImage />

      <GoogleReview/>

    
      <StudentsReview />
    
    
      <MeetOurStars />
      <About />
      <Courses />
      <Alumni />
      <Discover />
      <NeedHelp />
      <Footer />
    </main>
  );
}
