"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Exam() {
  const router = useRouter();
  const [userQuestions, setUserQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load user's questions from localStorage (SAFE)
  useEffect(() => {
    try {
      const stored = localStorage.getItem("userQuestions");

      if (!stored) {
        setUserQuestions([]);
        setUserAnswers([]);
        setLoading(false);
        return;
      }

      const questions = JSON.parse(stored);

      if (!Array.isArray(questions)) {
        setUserQuestions([]);
        setUserAnswers([]);
        setLoading(false);
        return;
      }

      setUserQuestions(questions);
      setUserAnswers(new Array(questions.length).fill(null));
      setLoading(false);
    } catch (err) {
      console.error("LocalStorage error:", err);
      setUserQuestions([]);
      setUserAnswers([]);
      setLoading(false);
    }
  }, []);

  // Handle selecting an option
  const handleSelectOption = (index, option) => {
    const updated = [...userAnswers];
    updated[index] = option;
    setUserAnswers(updated);
  };

  // Submit all answers
  const handleSubmit = () => {
    localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
    alert("Exam submitted successfully!");
    router.push("/results");
  };

  // ⛔ Prevent crash while loading
  if (loading) {
    return <p className="text-center mt-10">Loading exam...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Exam</h1>

      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        {userQuestions.length === 0 && (
          <p className="text-center text-red-500">
            No questions found. Please start the test again.
          </p>
        )}

        {userQuestions.map((q, index) => (
          <div key={q.id ?? index} className="bg-white p-4 rounded shadow">
            <p className="font-semibold mb-2">
              {index + 1}. {q.question}
            </p>

            <div className="flex flex-col gap-2">
              {Array.isArray(q.options) &&
                q.options.map((opt, i) => (
                  <label
                    key={i}
                    className={`flex items-center gap-2 px-2 py-1 rounded border cursor-pointer
                    ${
                      userAnswers[index] === opt
                        ? "bg-blue-100 border-blue-400"
                        : "border-gray-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name={question-$`{index}`}
                      value={opt}
                      checked={userAnswers[index] === opt}
                      onChange={() => handleSelectOption(index, opt)}
                    />
                    {opt}
                  </label>
                ))}
            </div>
          </div>
        ))}

        {userQuestions.length > 0 && (
          <button
            onClick={handleSubmit}
            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded w-full max-w-xs mx-auto"
          >
            Submit Exam
          </button>
        )}
      </div>
    </div>
  );
}