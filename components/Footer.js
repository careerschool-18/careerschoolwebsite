"use client";
import { useState } from "react";
import { FaGoogle, FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  const [showContact, setShowContact] = useState(false); // 👈 For "Contact Us"
  const [showCSIT, setShowCSIT] = useState({ number: false, address: false });
  const [showCSHR, setShowCSHR] = useState({ number: false, address: false });

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
                <a href="#" className="hover:text-blue-700 transition duration-300 block">
                  {course}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="font-bold mb-4 text-lg sm:text-xl">RESOURCES</h3>
          <ul className="space-y-2 text-sm sm:text-base">
            {[
              "Referral Rewards",
              "Hire Students",
              "Work with us",
              "Become a Mobilizer",
              "Connect With Training Team",
              "Blogs",
            ].map((res, i) => (
              <li key={i}>
                <a href="#" className="hover:text-blue-700 transition duration-300 block">
                  {res}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Placements */}
        <div>
          <h3 className="font-bold mb-4 text-lg sm:text-xl">PLACEMENTS</h3>
          <ul className="space-y-2 text-sm sm:text-base">
            <li>
              <a
                href="#meet-our-stars"
                className="hover:text-blue-700 transition duration-300 block"
              >
                Success Story
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-700 transition duration-300 block">
                Speak With Campus Team
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-700 transition duration-300 block">
                Speak With Placement Team
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-700 transition duration-300 block">
                Non-IT Jobs
              </a>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-bold mb-4 text-lg sm:text-xl">COMPANY</h3>
          <ul className="space-y-2 text-sm sm:text-base">
            <li>
              <a href="#" className="hover:text-blue-700 transition duration-300 block">
                About Us
              </a>
            </li>

            {/* 🔹 Contact Us with toggle */}
            <li>
              <button
                onClick={() => setShowContact(!showContact)}
                className="hover:text-blue-700 transition duration-300 block text-left w-full font-medium"
              >
                Contact Us
              </button>
              {showContact && (
                <p className="mt-2 text-sm font-semibold text-gray-800">
                  📞 77089 38866
                </p>
              )}
            </li>
          </ul>
        </div>
      </div>

      {/* 🔹 Middle Section: Logo + Branches */}
      <div className="border-t border-gray-400 pt-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 items-start text-center md:text-left">
          
          {/* ✅ Logo + Social */}
          <div>
            <div className="mb-4 flex justify-center md:justify-start">
              <img src="/logo.png" alt="CSHR Logo" className="h-16 w-auto object-contain" />
            </div>

            <h4 className="font-bold mb-3 text-lg">Follow Us</h4>
            <div className="flex justify-center md:justify-start gap-3 text-white">
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-700 hover:bg-pink-600 transition"><FaInstagram /></a>
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-700 hover:bg-blue-800 transition"><FaFacebookF /></a>
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-700 hover:bg-blue-600 transition"><FaLinkedinIn /></a>
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-700 hover:bg-red-500 transition"><FaGoogle /></a>
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

                <div className="mt-3 text-center max-w-[420px]">
                  {/* Phone */}
                  <div className="flex justify-center items-center gap-2">
                    <p className="font-bold text-sm sm:text-base">CSIT</p>
                    <img
                      src="/call icon.jpg"
                      alt="Phone"
                      className="w-6 h-6 cursor-pointer"
                      onClick={() =>
                        setShowCSIT(prev => ({ ...prev, number: !prev.number }))
                      }
                    />
                  </div>
                  {showCSIT.number && (
                    <p className="font-bold text-sm sm:text-base mt-1">
                      NUMBER: 77089 38866
                    </p>
                  )}

                  {/* Address */}
                  <div className="flex justify-center items-center gap-2 mt-3">
                    <p className="font-bold text-sm sm:text-base">ADDRESS</p>
                    <img
                      src="/location icon.jpg"
                      alt="Address"
                      className="w-6 h-6 cursor-pointer"
                      onClick={() =>
                        setShowCSIT(prev => ({ ...prev, address: !prev.address }))
                      }
                    />
                  </div>
                  {showCSIT.address && (
                    <p className="font-bold text-sm sm:text-base mt-1">
                      Careerschool IT Solutions, Children's Park Road, Opposite to Aditya Degree College, Aditya Nagar, Nellore, Andhra Pradesh 524002
                    </p>
                  )}

                  <a
                    href="https://maps.app.goo.gl/Dp5tKAe5r29MFmCDA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:underline text-sm font-semibold block mt-2"
                  >
                     </a>
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

                <div className="mt-3 text-center max-w-[420px]">
                  {/* Phone */}
                  <div className="flex justify-center items-center gap-2">
                    <p className="font-bold text-sm sm:text-base">CSHR</p>
                    <img
                      src="/call icon.jpg"
                      alt="Phone"
                      className="w-6 h-6 cursor-pointer"
                      onClick={() =>
                        setShowCSHR(prev => ({ ...prev, number: !prev.number }))
                      }
                    />
                  </div>
                  {showCSHR.number && (
                    <p className="font-bold text-sm sm:text-base mt-1">
                      NUMBER: 77089 38866
                    </p>
                  )}

                  {/* Address */}
                  <div className="flex justify-center items-center gap-2 mt-3">
                    <p className="font-bold text-sm sm:text-base">ADDRESS</p>
                    <img
                      src="/location icon.jpg"
                      alt="Address"
                      className="w-6 h-6 cursor-pointer"
                      onClick={() =>
                        setShowCSHR(prev => ({ ...prev, address: !prev.address }))
                      }
                    />
                  </div>
                  {showCSHR.address && (
                    <p className="font-bold text-sm sm:text-base mt-1">
                      Careerschool HR Solutions, L2, SIDCO Industrial Estate, Guindy, Chennai, Tamil Nadu 600032
                    </p>
                  )}

                  <a
                    href="https://maps.app.goo.gl/h1JTS1oJBWV8Fxeg6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:underline text-sm font-semibold block mt-2"
                  >
                   </a>
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