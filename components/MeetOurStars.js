"use client";

export default function MeetOurStars() {
  const students = [
    {
      img: "/Meet%20Our%20stars/Shalini.png",
      name: "Shalini",
      training: "DATA ANALYTICS TRAINING",
      started: "BSC",
      landed: "Jr Software Developer",
    },
    {
      img: "/Meet%20Our%20stars/Jayakumar.png",
      name: "Jayakumar",
      training: "DATA ANALYTICS TRAINING",
      started: "BSC",
      landed: "Operations",
    },
    {
      img: "/Meet%20Our%20stars/Balakumaran.png",
      name: "Balakumaran",
      training: "WEB DEVELOPER TRAINING",
      started: "BCA",
      landed: "IT Backend",
    },
    {
      img: "/Meet%20Our%20stars/Sindhu.png",
      name: "Sindhu",
      training: "HR TRAINING",
      started: "BE ECE",
      landed: "HR Executive",
    },
    {
      img: "/Meet%20Our%20stars/Shanthini.png",
      name: "Shanthini",
      training: "DATA ANALYTICS TRAINING",
      started: "B.COM",
      landed: "Data Executive",
    },
    {
      img: "/Meet%20Our%20stars/Gayathri.jpg",
      name: "Gayathri",
      training: "DATA ANALYTICS TRAINING",
      started: "BA English",
      landed: "Data Operations",
      isNew: true,
    },
    {
      img: "/Meet%20Our%20stars/Kokila.jpg",
      name: "Kokila",
      training: "PYTHON FULLSTACK + AI TRAINING",
      started: "BCA",
      landed: "Eexcutive",
      isNew: true,
    },
    {
      img: "/Meet%20Our%20stars/Manju Priya.jpg",
      name: "Manju Priya",
      training: "DATA ANALYTICS TRAINING",
      started: "BSC CS",
      landed: "Data Analyst",
      isNew: true,
    },
    {
      img: "/Meet%20Our%20stars/Punith.jpg",
      name: "Punith",
      training: "DATA ANALYTICS TRAINING",
      started: "BSDS",
      landed: "Data Analyst",
      isNew: true,
    },
    {
      img: "/Meet%20Our%20stars/Riyas.jpg",
      name: "Riyas",
      training: "DATA ANALYTICS TRAINING",
      started: "MBA",
      landed: "Accounts Executive",
      isNew: true,
    },
    {
      img: "/Meet%20Our%20stars/Snega.jpg",
      name: "Snega",
      training: "HR ANALYTICS TRAINING",
      started: "BA",
      landed: "HR Recuiter",
      isNew: true,
    },
    {
      img: "/Meet%20Our%20stars/Varshini Raghuram.jpg",
      name: "Varshini Raguvaram",
      training: "HR ANALYTICS TRAINING",
      started: "BA",
      landed: "HR Operations",
      isNew: true,
    },
  ];
  
  const newStudents = students.filter(s => s.isNew);
  const normalStudents = students.filter(s => !s.isNew);

  const arrangedStudents = [];
  const max = Math.max(newStudents.length, normalStudents.length);

  for (let i = 0; i < max; i++) {
    if (newStudents[i]) arrangedStudents.push(newStudents[i]);
    if (normalStudents[i]) arrangedStudents.push(normalStudents[i]);
  }

  const loopedStudents = [...arrangedStudents, ...arrangedStudents];

  return (
    <section
      id="meet-our-stars"
      className="py-16 text-center overflow-hidden"
      style={{ backgroundColor: "#1d1e22" }}
    >
      <h2 className="text-2xl md:text-3xl font-bold text-white">
        Meet Our Stars
      </h2>

      <div className="relative w-full overflow-hidden mt-6">
        <div className="flex animate-marquee gap-5">
          {loopedStudents.map((student, i) => (
            <div
              key={i}
              className="relative bg-white rounded-xl shadow overflow-hidden min-w-[240px] flex-shrink-0"
            >
              {student.isNew && (
                <div className="absolute top-2 right-2 bg-red-600 text-white text-[10px] px-2 py-1 rounded-full animate-pulse z-10">
                  NEWLY PLACED
                </div>
              )}

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
                  <p className="text-xs mb-1">Where I Started</p>
                  <div className="bg-yellow-400 text-black font-bold text-xs px-3 py-1 rounded inline-block">
                    {student.started}
                  </div>
                </div>

                <div className="flex justify-center my-1">
                  <img
                    src="/Meet%20Our%20stars/Arrow.png"
                    alt="Arrow Down"
                    className="h-5 w-5 animate-bounce opacity-90"
                  />
                </div>

                <div>
                  <p className="text-xs mb-1">Where I Landed</p>
                  <div className="bg-yellow-400 text-black font-bold text-xs px-3 py-1 rounded inline-block">
                    {student.landed}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
          width: max-content;
        }
      `}</style>
    </section>
  );
}
