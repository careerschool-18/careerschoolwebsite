"use client";

export default function MeetOurStars() {
  const students = [
    {
      img: "/pavi pic.jpeg",
      name: "Pavithra",
      training: "HR Training",
      started: "B.COM",
      landed: "HR GENERALIST",
    },
    {
      img: "/sarathi pic.jpeg",
      name: "Sarathi",
      training: "Python Training",
      started: "BCA",
      landed: "Software Engineer",
    },
    {
      img: "/pavi pic.jpeg",
      name: "Pavithra",
      training: "Data Analytics",
      started: "M.Sc Maths",
      landed: "Data Analyst",
    },
    {
      img: "/sarathi pic.jpeg",
      name: "Sarathi",
      training: "Java Fullstack",
      started: "B.E CSE",
      landed: "Fullstack Developer",
    },
    {
      img: "/pavi pic.jpeg",
      name: "Pavithra",
      training: "HR with Analytics",
      started: "MBA HR",
      landed: "HR Specialist",
    },
  ];

  // 🔹 Duplicate for seamless looping
  const loopedStudents = [...students, ...students];

  return (
    <section className="py-16 bg-gray-50 text-center overflow-hidden">
      <h2 className="text-2xl font-bold mb-10">Meet Our Stars</h2>

      <div className="relative w-full overflow-hidden">
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
                <div>
                  <h3 className="font-bold text-base">{student.name}</h3>
                  <p className="text-sm opacity-90">{student.training}</p>
                </div>

                <div>
                  <button className="bg-yellow-400 text-black font-bold text-xs px-3 py-1 rounded">
                    Where I Started
                  </button>
                  <p className="mt-1 text-sm">{student.started}</p>
                </div>

                <div className="text-yellow-400 text-lg">⬇</div>

                <div className="mb-2">
                  <button className="bg-yellow-400 text-black font-bold text-xs px-3 py-1 rounded">
                    Where I Landed
                  </button>
                  <p className="mt-1 font-bold text-sm">{student.landed}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🔹 Animation CSS */}
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
