export default function StudentsReview() {
  const reviews = [
    {
      id: 1,
      name: "Pavithra",
      training: "HR Training",
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      photo: "/pavi pic.jpeg",
    },
    {
      id: 2,
      name: "Sarathi",
      training: "Python with AI",
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      photo: "/sarathi pic.jpeg",
    },
    {
      id: 3,
      name: "Pavithra",
      training: "Data Analytics",
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      photo: "/pavi pic.jpeg",
    },
    {
      id: 4,
      name: "Sarathi",
      training: "Java Fullstack",
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      photo: "/sarathi pic.jpeg",
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-white text-center overflow-hidden px-4 sm:px-6">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-8 text-gray-900">
        Student Reviews
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
        {reviews.map((student) => (
          <div
            key={student.id}
            className="bg-blue-700 text-white p-4 sm:p-6 rounded-2xl shadow-md text-left hover:scale-[1.02] transition-transform duration-300"
          >
            {/* 🔹 Student Info */}
            <div className="flex items-center mb-3 sm:mb-4">
              <img
                src={student.photo}
                alt={student.name}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover flex-shrink-0"
              />
              <div className="ml-3 sm:ml-4">
                <h3 className="font-bold text-base sm:text-lg">{student.name}</h3>
                <p className="text-xs sm:text-sm opacity-90">
                  {student.training}
                </p>
              </div>
            </div>

            {/* 🔹 Review Text */}
            <p className="text-xs sm:text-sm leading-relaxed">
              {student.review}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
 
