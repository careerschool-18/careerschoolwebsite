"use client";
import { useState } from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";
import { X } from "lucide-react";

export default function Footer() {
  const [showPolicy, setShowPolicy] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  const courseLink =
    "https://243742367.hs-sites-na2.com/training-internship-with-certification-launch-your-career-today";

  const policies = {
    cancellation: {
      title: "Cancellation & Refund Policy",
      content: `Careerschool HR Solutions – Cancellation and Refund Policy:

- Once the registration is complete, no refunds will be issued under any circumstances.

- Candidates who discontinue or fail to complete the program remain liable for any unpaid fees.`,
    },
    disclaimer: {
      title: "Disclaimer & Limitation of Liability",
      content: `Disclaimer & Limitation of Liability:

- All training materials and course content are provided "as is" without warranty of any kind.

- Careerschool HR Solutions is not liable for any indirect, incidental, or consequential damages arising from the use of our services.

- Participants are responsible for their own career outcomes and job placements.

- We do not guarantee employment or specific salary outcomes upon course completion.`,
    },
    privacy: {
      title: "Privacy Policy",
      content: `Privacy Policy:

- We collect personal information including name, email, phone number, and educational details during registration.

- Your information is used solely for course administration, communication, and improving our services.

- We do not sell or share your personal data with third parties without consent, except as required by law.

- We implement appropriate security measures to protect your personal information.

- You have the right to access, modify, or request deletion of your personal data by contacting us.

- By registering, you consent to our collection and use of your information as described.`,
    },
    shipping: {
      title: "Shipping & Exchange Policy",
      content: `Shipping & Exchange Policy:

- Course materials, certificates, and physical resources will be provided as per the program schedule.

- Digital materials are delivered via email or online platforms within 24-48 hours of enrollment.

- Physical materials (if applicable) are shipped within 7-10 business days.

- No exchanges or returns are accepted for course materials once accessed or received.

- Damaged materials must be reported within 48 hours of receipt for replacement.`,
    },
    terms: {
      title: "Terms & Conditions",
      content: `Terms & Conditions:

- By enrolling, you agree to abide by all course rules, attendance requirements, and code of conduct.

- Students must maintain respectful behavior towards instructors and peers.

- Plagiarism, cheating, or any form of academic dishonesty may result in immediate termination without refund.

- Careerschool HR Solutions reserves the right to modify course content, schedules, and policies with prior notice.

- Students are expected to attend classes regularly; excessive absences may affect certification eligibility.

- All intellectual property, including course materials and recordings, remains the property of Careerschool HR Solutions.

- Unauthorized distribution or reproduction of course materials is strictly prohibited.

- We reserve the right to terminate enrollment for violations of these terms without refund.`,
    },
  };

  const PolicyModal = ({ policy, onClose }) => {
    if (!policy) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                {policy.title}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition"
              >
                <X size={24} />
              </button>
            </div>
            <div className="overflow-y-auto max-h-[60vh] pr-2">
              <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                {policy.content}
              </p>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={onClose}
                className="bg-[#004AAD] text-white px-6 py-2 rounded-lg hover:bg-[#003580] transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 🔹 Social Links
  const socialLinks = {
    CSHR: {
      facebook: "https://www.facebook.com/careerschoolhrsolutions.homepage/",
      instagram: "https://www.instagram.com/careerschoolhrsolutions/?hl=en",
      linkedin:
        "https://www.linkedin.com/company/careerschool-hr-solutions/?viewAsMember=true",
      youtube:
        "https://youtube.com/@careerschoolhrsolutions?si=B94JdkhKg7byI1ml",
      whatsapp: "https://whatsapp.com/channel/0029Va4ufgc17Emp80iBn92I",
    },
    CSIT: {
      facebook: "https://www.facebook.com/profile.php?id=61578868656121",
      instagram: "https://www.instagram.com/careerschoolitsolutions/?hl=en",
      linkedin: "https://www.linkedin.com", // Placeholder since you said "v"
      youtube:
        "https://youtube.com/@careerschoolitsolutionsnellore?si=iNimoC_zvVUEWXnA",
      whatsapp: "https://whatsapp.com/channel/0029Va4ufgc17Emp80iBn92I",
    },
  };

  return (
    <footer className="bg-white text-gray-800 py-8 sm:py-10 md:py-12 lg:py-14 xl:py-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
      {/* 🔹 Top Section */}
      <div className="max-w-[1920px] mx-auto grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-14 2xl:gap-16">
        {/* 🔸 Trending Courses */}
        <div className="text-center xs:text-left">
          <h3 className="font-bold mb-3 sm:mb-4 text-base sm:text-lg md:text-xl xl:text-2xl text-[#004AAD]">
            TRENDING COURSE
          </h3>
          <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm md:text-base xl:text-lg">
            {[
              "Python + AI",
              "HR Analytics",
              "Data Analytics",
              "Digital Marketing",
              "Python Fullstack",
              "Java Fullstack",
              "Business Analytics",
              "Accounts & Finance",
            ].map((course, i) => (
              <li key={i}>
                <a
                  href={courseLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#004AAD] transition duration-300 block"
                >
                  {course}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* 🔸 Resources */}
        <div className="text-center xs:text-left">
          <h3 className="font-bold mb-3 sm:mb-4 text-base sm:text-lg md:text-xl xl:text-2xl text-[#004AAD]">
            RESOURCES
          </h3>
          <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm md:text-base xl:text-lg">
            {[
              "Referral Rewards",
              "Hire Students",
              "Work with us",
              "Become a Mobilizer",
              "Connect with Training Team",
            ].map((item, i) => (
              <li key={i}>
                <a
                  href={courseLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#004AAD] transition duration-300"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* 🔸 Placement */}
        <div className="text-center xs:text-left">
          <h3 className="font-bold mb-3 sm:mb-4 text-base sm:text-lg md:text-xl xl:text-2xl text-[#004AAD]">
            PLACEMENT
          </h3>
          <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm md:text-base xl:text-lg">
            <li>
              <a
                href="#meet-our-stars"
                className="hover:text-[#004AAD] scroll-smooth transition duration-300"
              >
                Success Stories
              </a>
            </li>
            <li>
              <a
                href={courseLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#004AAD] transition duration-300"
              >
                Speak With Campus Team
              </a>
            </li>
            <li>
              <a
                href={courseLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#004AAD] transition duration-300"
              >
                Speak With Placement Team
              </a>
            </li>
            <li>
              <a
                href={courseLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#004AAD] transition duration-300"
              >
                Non-IT Jobs
              </a>
            </li>
          </ul>
        </div>

        {/* 🔸 Company */}
        <div className="text-center xs:text-left">
          <h3 className="font-bold mb-3 sm:mb-4 text-base sm:text-lg md:text-xl xl:text-2xl text-[#004AAD]">
            COMPANY
          </h3>
          <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm md:text-base xl:text-lg">
            <li>
              <a
                href="#"
                className="hover:text-[#004AAD] transition duration-300"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/7708938866"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#004AAD] transition duration-300"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* 🔹 Divider */}
      <div className="mt-12 border-t border-gray-300"></div>

      {/* 🔹 OUR BRANCHES SECTION */}
      <div className="max-w-[1920px] mx-auto mt-12">
        <h3 className="text-center font-bold text-2xl sm:text-3xl xl:text-4xl text-[#004AAD] mb-10">
          OUR BRANCHES
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* CSIT Branch */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 flex flex-col items-center">
            <div className="relative w-full h-56 mb-4 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3825.9361762215854!2d79.97834327566755!3d14.419817784712054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4cf2d284d13ed3%3A0xe52b9f52d17b904a!2sCareer%20School%20IT!5e0!3m2!1sen!2sin!4v1729154600000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Career School IT Map"
              ></iframe>
              <a
                href="https://maps.app.goo.gl/Dp5tKAe5r29MFmCDA"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0"
              ></a>
            </div>

            <img
              src="/Footer Logo/CSIT - Footer Logo.png"
              alt="CSIT Logo"
              className="h-14 w-auto mb-3 object-contain"
            />
            <p className="text-[#004AAD] font-semibold text-lg mb-2">
              📞 CSIT: 93422 86753 / 77089 38866
            </p>
            <p className="text-gray-800 text-center mb-4 font-medium leading-relaxed text-sm px-2">
              📍 <span className="font-bold">Address:</span> Careerschool IT
              Solutions, Children's Park Road, Opposite to Aditya Degree
              College, Aditya Nagar, Nellore, Andhra Pradesh 524002
            </p>

            {/* 🔹 Social Links for CSIT */}
            <div className="flex justify-center gap-4">
              <a
                href={socialLinks.CSIT.instagram}
                target="_blank"
                rel="noreferrer"
                className="bg-[#004AAD] w-10 h-10 flex items-center justify-center rounded-full text-white hover:opacity-80 transition"
              >
                <FaInstagram />
              </a>
              <a
                href={socialLinks.CSIT.facebook}
                target="_blank"
                rel="noreferrer"
                className="bg-[#004AAD] w-10 h-10 flex items-center justify-center rounded-full text-white hover:opacity-80 transition"
              >
                <FaFacebookF />
              </a>
              <a
                href={socialLinks.CSIT.linkedin}
                target="_blank"
                rel="noreferrer"
                className="bg-[#004AAD] w-10 h-10 flex items-center justify-center rounded-full text-white hover:opacity-80 transition"
              >
                <FaLinkedinIn />
              </a>
              <a
                href={socialLinks.CSIT.youtube}
                target="_blank"
                rel="noreferrer"
                className="bg-[#004AAD] w-10 h-10 flex items-center justify-center rounded-full text-white hover:opacity-80 transition"
              >
                <FaYoutube />
              </a>
              <a
                href={socialLinks.CSIT.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="bg-[#004AAD] w-10 h-10 flex items-center justify-center rounded-full text-white hover:opacity-80 transition"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>

          {/* CSHR Branch */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 flex flex-col items-center">
            <div className="relative w-full h-56 mb-4 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.1737921842065!2d80.21105637572875!3d13.021341013514183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52675a57b4f5cf%3A0x1c74b3b91c6e75f1!2sCareer%20School%20HR!5e0!3m2!1sen!2sin!4v1729154500000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Career School HR Map"
              ></iframe>
              <a
                href="https://maps.app.goo.gl/h1JTS1oJBWV8Fxeg6"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0"
              ></a>
            </div>

            <img
              src="/Footer Logo/CSHR - Footer Logo.png"
              alt="CSHR Logo"
              className="h-14 w-auto mb-3 object-contain"
            />
            <p className="text-[#004AAD] font-semibold text-lg mb-2">
              📞 CSHR: 77089 38866 / 99386 36935
            </p>
            <p className="text-gray-800 text-center mb-4 font-medium leading-relaxed text-sm px-2">
              📍 <span className="font-bold">Address:</span> Careerschool HR
              Solutions, L2, SIDCO Industrial Estate, Guindy, Chennai, Tamil
              Nadu 600032
            </p>

            {/* 🔹 Social Links for CSHR */}
            <div className="flex justify-center gap-4">
              <a
                href={socialLinks.CSHR.instagram}
                target="_blank"
                rel="noreferrer"
                className="bg-[#004AAD] w-10 h-10 flex items-center justify-center rounded-full text-white hover:opacity-80 transition"
              >
                <FaInstagram />
              </a>
              <a
                href={socialLinks.CSHR.facebook}
                target="_blank"
                rel="noreferrer"
                className="bg-[#004AAD] w-10 h-10 flex items-center justify-center rounded-full text-white hover:opacity-80 transition"
              >
                <FaFacebookF />
              </a>
              <a
                href={socialLinks.CSHR.linkedin}
                target="_blank"
                rel="noreferrer"
                className="bg-[#004AAD] w-10 h-10 flex items-center justify-center rounded-full text-white hover:opacity-80 transition"
              >
                <FaLinkedinIn />
              </a>
              <a
                href={socialLinks.CSHR.youtube}
                target="_blank"
                rel="noreferrer"
                className="bg-[#004AAD] w-10 h-10 flex items-center justify-center rounded-full text-white hover:opacity-80 transition"
              >
                <FaYoutube />
              </a>
              <a
                href={socialLinks.CSHR.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="bg-[#004AAD] w-10 h-10 flex items-center justify-center rounded-full text-white hover:opacity-80 transition"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 Divider */}
      <div className="mt-12 border-t border-gray-300"></div>

      {/* 🔹 Bottom Section */}
      <div className="text-center mt-6">
        <p className="text-gray-600 text-sm md:text-base">
          © {new Date().getFullYear()} Careerschool HR & IT Solutions — All
          Rights Reserved.
        </p>

        <div className="flex flex-col items-center mt-4 text-gray-600 text-xs sm:text-sm md:text-base">
          <button
            onClick={() => setShowPolicy(!showPolicy)}
            className="hover:text-[#004AAD] font-medium transition flex items-center gap-2"
          >
            Privacy Policy
            <span
              className={`transform transition-transform ${
                showPolicy ? "rotate-180" : "rotate-0"
              }`}
            >
              ▼
            </span>
          </button>

          {showPolicy && (
            <ul className="mt-3 space-y-2 text-gray-700 text-xs sm:text-sm md:text-base">
              <li>
                <button
                  onClick={() => setActiveModal("cancellation")}
                  className="hover:text-[#004AAD] transition flex items-center gap-2"
                >
                  🔹 Cancellation & Refund policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal("disclaimer")}
                  className="hover:text-[#004AAD] transition flex items-center gap-2"
                >
                  🔹 Disclaimer & Limitation of Liability
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal("privacy")}
                  className="hover:text-[#004AAD] transition flex items-center gap-2"
                >
                  🔹 Privacy policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal("shipping")}
                  className="hover:text-[#004AAD] transition flex items-center gap-2"
                >
                  🔹 Shipping & Exchange policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal("terms")}
                  className="hover:text-[#004AAD] transition flex items-center gap-2"
                >
                  🔹 Terms & Conditions
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>

      {activeModal && (
        <PolicyModal
          policy={policies[activeModal]}
          onClose={() => setActiveModal(null)}
        />
      )}
    </footer>
  );
}
