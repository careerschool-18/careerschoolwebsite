export default function Footer() {
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
                  href="#"
                  className="hover:text-blue-700 transition duration-300 block"
                >
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
                <a
                  href="#"
                  className="hover:text-blue-700 transition duration-300 block"
                >
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
            {[
              "Success Story",
              "Speak With Campus Team",
              "Speak With Placement Team",
              "Non-IT Jobs",
            ].map((item, i) => (
              <li key={i}>
                <a
                  href="#"
                  className="hover:text-blue-700 transition duration-300 block"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-bold mb-4 text-lg sm:text-xl">COMPANY</h3>
          <ul className="space-y-2 text-sm sm:text-base">
            {["About us", "Contact us", "FAQs"].map((item, i) => (
              <li key={i}>
                <a
                  href="#"
                  className="hover:text-blue-700 transition duration-300 block"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 🔹 Middle Section: Logo + Branches */}
      <div className="border-t border-gray-400 pt-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 items-start text-center md:text-left">
          {/* Logo + Social */}
          <div>
            <div className="mx-auto md:mx-0 bg-gray-400 h-16 w-32 flex items-center justify-center font-bold text-white mb-4 rounded-lg">
              LOGO
            </div>
            <h4 className="font-bold mb-3 text-lg">Follow Us</h4>
            <div className="flex justify-center md:justify-start gap-3">
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-blue-700 hover:bg-blue-800 transition"
              ></a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-blue-700 hover:bg-blue-800 transition"
              ></a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-blue-700 hover:bg-blue-800 transition"
              ></a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-blue-700 hover:bg-blue-800 transition"
              ></a>
            </div>
          </div>

          {/* Branches */}
          <div className="md:col-span-2">
            <h4 className="font-bold text-center mb-6 text-lg">OUR BRANCHES</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center">
              {/* CSIT */}
              <div>
                <a
                  href="#"
                  className="bg-blue-700 text-white h-24 flex items-center justify-center font-bold rounded-lg hover:bg-blue-800 transition"
                >
                  Google Map
                </a>
                <p className="mt-3 font-bold text-sm sm:text-base">
                  <a href="#" className="hover:text-blue-700 transition">
                    CSIT Number
                  </a>
                </p>
                <p className="font-bold text-sm sm:text-base">
                  <a href="#" className="hover:text-blue-700 transition">
                    CSIT Address
                  </a>
                </p>
              </div>

              {/* CSHR */}
              <div>
                <a
                  href="#"
                  className="bg-blue-700 text-white h-24 flex items-center justify-center font-bold rounded-lg hover:bg-blue-800 transition"
                >
                  Google Map
                </a>
                <p className="mt-3 font-bold text-sm sm:text-base">
                  <a href="#" className="hover:text-blue-700 transition">
                    CSHR Number
                  </a>
                </p>
                <p className="font-bold text-sm sm:text-base">
                  <a href="#" className="hover:text-blue-700 transition">
                    CSHR Address
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 Bottom Copyright */}
      <div className="text-center text-xs sm:text-sm mt-10 text-gray-700 border-t border-gray-300 pt-6">
        <p>© 2025 CSHR. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
