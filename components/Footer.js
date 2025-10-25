"use client";
import { useState } from "react";
import {
  FaGoogle,
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  const [showContact, setShowContact] = useState(false);

  // ✅ Common course link
  const courseLink =
    "https://243742367.hs-sites-na2.com/training-internship-with-certification-launch-your-career-today";

  // ✅ Resource links mapping
  const resources = [
    { name: "Referral Rewards", link: "https://wa.me/6369119564" },
    { name: "Hire Students", link: "https://wa.me/7305014818" },
    { name: "Work with us", link: "https://wa.me/7708938866" },
    { name: "Become a Mobilizer", link: "https://wa.me/6369119564" },
    { name: "Connect With Training Team", link: "https://wa.me/6369119564" },
    { name: "Blogs", link: "#" }, // no link provided
  ];

  // ✅ Placement links mapping
  const placements = [
    { name: "Success Story", link: "#meet-our-stars" },
    { name: "Speak With Campus Team", link: "https://wa.me/7708938866" },
    { name: "Speak With Placement Team", link: "https://wa.me/7305014818" },
    { name: "Non-IT Jobs", link: "https://wa.me/6382585438" },
  ];

  return (
    <footer className="bg-gradient-to-r from-gray-100 to-gray-300 text-gray-900 py-12 sm:py-16 px-4 sm:px-6">
      {/* 🔹 Top Section: Links */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-left mb-12">
        {/* Trending Course */}
        <div>
          <h3 className="font-bold mb-4 text-lg sm:text-xl">TRENDING COURSE</h3>
          <ul className="space-y-2 text-sm sm:text-base">
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
                  className="hover:text-blue-700 transition duration-300 block"
                >
                  {course}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ✅ Resources */}
        <div>
          <h3 className="font-bold mb-4 text-lg sm:text-xl">RESOURCES</h3>
          <ul className="space-y-2 text-sm sm:text-base">
            {resources.map((item, i) => (
              <li key={i}>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-700 transition duration-300 block"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ✅ Placements */}
        <div>
          <h3 className="font-bold mb-4 text-lg sm:text-xl">PLACEMENTS</h3>
          <ul className="space-y-2 text-sm sm:text-base">
            {placements.map((item, i) => (
              <li key={i}>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-700 transition duration-300 block"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ✅ Company */}
        <div>
          <h3 className="font-bold mb-4 text-lg sm:text-xl">COMPANY</h3>
          <ul className="space-y-2 text-sm sm:text-base">
            <li>
              <a
                href="#"
                className="hover:text-blue-700 transition duration-300 block"
              >
                About Us
              </a>
            </li>
           <li>
  <a
    href="https://wa.me/7708938866"
    target="_blank"
    rel="noopener noreferrer"
    className="font-medium text-gray-800 hover:text-blue-700 transition duration-300 flex items-center gap-1"
  >
    📞 Contact Us
  </a>
</li>

          </ul>
        </div>
      </div>

      {/* 🔹 Middle Section: Logo + Branches */}
      <div className="border-t border-gray-400 pt-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 items-start text-center md:text-left">
          {/* ✅ Logo */}
          <div>
            <div className="mb-4 flex justify-center md:justify-start">
              <img
                src="/logo.png"
                alt="CSHR Logo"
                className="h-16 w-auto object-contain"
              />
            </div>
          </div>

          {/* ✅ Branches Section */}
          <div className="md:col-span-2">
            <h4 className="font-bold text-center mb-6 text-lg">OUR BRANCHES</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center justify-items-center">
              {/* 🔹 CSIT Branch */}
              <div className="flex flex-col items-center bg-transparent p-4">
                <a
                  href="https://maps.app.goo.gl/Dp5tKAe5r29MFmCDA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full max-w-[420px] h-48 bg-blue-700 rounded-lg overflow-hidden shadow-md block transform transition hover:scale-105 cursor-pointer"
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3825.9361762215854!2d79.97834327566755!3d14.419817784712054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4cf2d284d13ed3%3A0xe52b9f52d17b904a!2sCareer%20School%20IT!5e0!3m2!1sen!2sin!4v1729154600000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0, pointerEvents: "none" }}
                    loading="lazy"
                    title="Career School IT"
                  ></iframe>
                </a>

                <div className="mt-3 text-center max-w-[420px] space-y-3">
                  <div className="flex justify-center items-center gap-2">
                    <img
                      src="/call icon - PNG.png"
                      alt="Phone"
                      className="w-6 h-6"
                    />
                    <p className="font-bold text-sm sm:text-base">
                      CSIT: 77089 38866
                    </p>
                  </div>

                  {/* ✅ Address Section */}
                  <div className="flex justify-center items-start gap-2">
                    <img
                      src="/location icon - PNG.png"
                      alt="Address"
                      className="w-6 h-6 mt-1"
                    />
                    <p className="font-bold text-sm sm:text-base text-left">
                      <span className="font-semibold">Address:</span> Careerschool IT Solutions, Children's Park Road, Opposite to Aditya Degree College, Aditya Nagar, Nellore, Andhra Pradesh 524002
                    </p>
                  </div>

                  {/* ✅ Follow Us for CSIT */}
                  <div className="flex justify-center gap-3 mt-3 text-white">
                    <a href="https://www.instagram.com/careerschoolhrsolutions/?hl=en" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-700 hover:bg-pink-600 transition"><FaInstagram /></a>
                    <a href="https://www.facebook.com/profile.php?id=61578868656121" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-700 hover:bg-blue-800 transition"><FaFacebookF /></a>
                    <a href="https://www.linkedin.com/showcase/careerschool-it-solutions/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-700 hover:bg-blue-600 transition"><FaLinkedinIn /></a>
                    <a href="https://youtube.com/@careerschoolitsolutionsnellore?si=iNimoC_zvVUEWXnA" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-700 hover:bg-red-500 transition"><FaYoutube /></a>
                    <a href="https://whatsapp.com/channel/0029Va4ufgc17Emp80iBn92I" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-700 hover:bg-green-600 transition"><FaWhatsapp /></a>
                  </div>
                </div>
              </div>

              {/* 🔹 CSHR Branch */}
              <div className="flex flex-col items-center bg-transparent p-4">
                <a
                  href="https://maps.app.goo.gl/h1JTS1oJBWV8Fxeg6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full max-w-[420px] h-48 bg-blue-700 rounded-lg overflow-hidden shadow-md block transform transition hover:scale-105 cursor-pointer"
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.1737921842065!2d80.21105637572875!3d13.021341013514183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52675a57b4f5cf%3A0x1c74b3b91c6e75f1!2sCareer%20School%20HR!5e0!3m2!1sen!2sin!4v1729154500000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0, pointerEvents: "none" }}
                    loading="lazy"
                    title="Career School HR"
                  ></iframe>
                </a>

                <div className="mt-3 text-center max-w-[420px] space-y-3">
                  <div className="flex justify-center items-center gap-2">
                    <img
                      src="/call icon - PNG.png"
                      alt="Phone"
                      className="w-6 h-6"
                    />
                    <p className="font-bold text-sm sm:text-base">
                      CSHR: 77089 38866
                    </p>
                  </div>

                  {/* ✅ Address Section */}
                  <div className="flex justify-center items-start gap-2">
                    <img
                      src="/location icon - PNG.png"
                      alt="Address"
                      className="w-6 h-6 mt-1"
                    />
                    <p className="font-bold text-sm sm:text-base text-left">
                      <span className="font-semibold">Address:</span> Careerschool HR Solutions, L2, SIDCO Industrial Estate, Guindy, Chennai, Tamil Nadu 600032
                    </p>
                  </div>

                  {/* ✅ Follow Us for CSHR */}
                  <div className="flex justify-center gap-3 mt-3 text-white">
                    <a href="https://www.instagram.com/careerschoolhrsolutions/?hl=en" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-700 hover:bg-pink-600 transition"><FaInstagram /></a>
                    <a href="https://www.facebook.com/careerschoolhrsolutions.homepage/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-700 hover:bg-blue-800 transition"><FaFacebookF /></a>
                    <a href="https://www.linkedin.com/company/careerschool-hr-solutions/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-700 hover:bg-blue-600 transition"><FaLinkedinIn /></a>
                    <a href="https://youtube.com/@careerschoolhrsolutions?si=B94JdkhKg7byI1ml" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-700 hover:bg-red-500 transition"><FaYoutube /></a>
                    <a href="https://whatsapp.com/channel/0029Va4ufgc17Emp80iBn92I" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-700 hover:bg-green-600 transition"><FaWhatsapp /></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 Bottom */}
      <div className="text-center text-xs sm:text-sm mt-10 text-gray-700 border-t border-gray-300 pt-6">
        <p>© 2025 CSHR. All Rights Reserved.</p>
      </div>
    </footer>
  );
}