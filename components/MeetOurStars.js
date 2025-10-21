"use client";

export default function MeetOurStars() {
  const students = [
    {
      img: "/Shalini.png",
      name: "Shalini",
      training: "DATA ANALYTICS TRAINING",
      started: "BSC",
      landed: "Jr Software Developer",
    },
    {
      img: "/Jayakumar.png",
      name: "Jayakumar",
      training: "DATA ANALYTICS TRAINING",
      started: "BSC",
      landed: "Operations",
    },
    {
      img: "/Sirisha Dasari.png",
      name: "Sirisha Dasari",
      started: "BSC Data Science",
      landed: "IT Internship",
    },
    {
      img: "/Prem.png",
      name: "Prem",
      training: "HR TRAINING",
      started: "MSW",
      landed: "HR Recruiter",
    },
    {
      img: "/Balakumaran.png",
      name: "Balakumaran",
      training: "WEB DEVELOPER TRAINING",
      started: "BCA",
      landed: "IT Backend",
    },
    {
      img: "/Sindhu.png",
      name: "Sindhu",
      training: "HR TRAINING",
      started: "BE ECE",
      landed: "HR Executive",
    },
    {
      img: "/HariPriya.png",
      name: "Haripriya",
      training: "HR TRAINING",
      started: "BE CSE",
      landed: "HR Recruiter",
    },
    {
      img: "/Shanthini.png",
      name: "Shanthini",
      training: "DATA ANALYTICS TRAINING",
      started: "B.COM",
      landed: "Data Executive",
    },
    {
      img: "/Medhuru Girish Kumar.png",
      name: "Medhuru Girish Kumar",
      started: "BCA",
      landed: "UI/UX Designer",
    },
    {
      img: "/Dhanyasree Javali.png",
      name: "Dhanyasree Javali",
      started: "MCA",
      landed: "Python Developer",
    },
    {
      img: "/Ashwathi.png",
      name: "Aswathi",
      training: "PYTHON WITH AI TRAINING",
      started: "BE ECE",
      landed: "Prompt Engineer",
    },
  ];

  const loopedStudents = [...students, ...students];

  return (
    <section
      id="meet-our-stars"
      className="py-16 text-center overflow-hidden"
      style={{ backgroundColor: "#1d1e22" }}
    >
      <h2 className="text-2xl sm:text-2xl md:text-3xl font-bold text-white">
        Meet Our Stars
      </h2>

      <div className="relative w-full overflow-hidden mt-6">
        <div className="flex animate-marquee gap-5">
          {loopedStudents.map((student, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow overflow-hidden min-w-[240px] flex-shrink-0"
            >
              <img
                src={student.img}
                alt={student.name}
                className="h-52 w-full object-cover"
              />
              <div className="bg-blue-700 text-white p-4 h-52 flex flex-col justify-between text-center">
                <div className="mb-4">
                  <h3 className="font-bold text-base">{student.name}</h3>
                  <p className="text-sm font-semibold text-yellow-400 mt-1">
                    {student.training}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-white mb-1">Where I Started</p>
                  <button className="bg-yellow-400 text-black font-bold text-xs px-3 py-1 rounded">
                    {student.started}
                  </button>
                </div>

                <div className="flex justify-center my-1">
                  <img
                    src="/Arrow[1].png"
                    alt="Arrow Down"
                    className="h-5 w-5 animate-bounce opacity-90"
                  />
                </div>

                <div className="mb-2">
                  <p className="text-xs text-white mb-1">Where I Landed</p>
                  <button className="bg-yellow-400 text-black font-bold text-xs px-3 py-1 rounded">
                    {student.landed}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 35s linear infinite;
          width: max-content;
        }
      `}</style>
    </section>
  );
}