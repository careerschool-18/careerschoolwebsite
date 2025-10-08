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

  return (
    <section className="py-16 bg-gray-50 text-center overflow-hidden">
      <h2 className="text-2xl font-bold mb-10">Meet Our Stars</h2>

      <div className="relative w-full overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {/* 🔹 3 Copies for Better Continuity */}
          {[...Array(3)].map((_, copyIndex) => (
            <div key={copyIndex} className="flex gap-4 flex-shrink-0">
              {students.map((student, i) => (
                <div
                  key={`${copyIndex}-${i}`}
                  className="bg-white rounded-xl shadow overflow-hidden min-w-[220px] flex-shrink-0"
                >
                  <img
                    src={student.img}
                    alt={student.name}
                    className="h-48 w-full object-cover"
                  />
                  <div className="bg-blue-700 text-white p-3 h-44 flex flex-col justify-between text-center">
                    <div>
                      <h3 className="font-bold text-base">{student.name}</h3>
                      <p className="text-xs">{student.training}</p>
                    </div>
                    <div>
                      <button className="bg-yellow-400 text-black font-bold text-xs px-2 py-1 rounded">
                        Where I Started
                      </button>
                      <p className="mt-1 text-sm">{student.started}</p>
                    </div>
                    <div className="text-yellow-400 text-lg">⬇</div>
                    <div>
                      <button className="bg-yellow-400 text-black font-bold text-xs px-2 py-1 rounded">
                        Where I Landed
                      </button>
                      <p className="mt-1 font-bold text-sm">{student.landed}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Animation CSS */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
}
