"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

export default function TestEngine() {
  const router = useRouter();
  const { category, start } = router.query;

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [step, setStep] = useState("loading");
  const [timer, setTimer] = useState(20 * 60);
  const [autoSubmitReason, setAutoSubmitReason] = useState("");

  const submittedRef = useRef(false);

  useEffect(() => {
    if (start === "true" && category) {
      // ✅ FIXED: Corrected fetch syntax and added full backend URL
      fetch(`http://localhost:8080/api/questions/category/${category}/random`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          if (!Array.isArray(data) || data.length === 0) {
            alert("No questions available for this category.");
            router.push("/");
            return;
          }
          setQuestions(data);
          setStep("test");
        })
        .catch((error) => {
          console.error("Error loading questions:", error);
          alert("Server error while loading questions.");
          router.push("/");
        });
    }
  }, [start, category, router]);

  /* ================= TIMER ================= */
  useEffect(() => {
    if (step !== "test") return;

    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          triggerAutoSubmit("Time ended. Test auto-submitted.");
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [step]);

  /* ================= AUTO SUBMIT ================= */
  const triggerAutoSubmit = message => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    setAutoSubmitReason(message);
    submitTest(true);
  };

  /* ================= SUBMIT TEST ANSWERS ================= */
  const submitTest = async (forced = false) => {
    const testId = localStorage.getItem("studentId"); // saved during registration

    if (!testId) {
      alert("Session expired. Register again.");
      router.push("/");
      return;
    }

    if (!forced && Object.keys(answers).length < questions.length) {
      alert("Answer all questions.");
      return;
    }

    try {
      // ✅ FIXED: Added full backend URL
      await fetch("http://localhost:8080/api/v1/tests/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          testId: Number(testId),
          category,
          answers,
        }),
      });
    } catch (err) {
      console.error("Submit error:", err);
    }

    setStep("submitted");
  };

  const minutes = String(Math.floor(timer / 60)).padStart(2, "0");
  const seconds = String(timer % 60).padStart(2, "0");

  /* ================= LOADING ================= */
  if (step === "loading") {
    return <h2 className="text-center mt-10">Loading Questions...</h2>;
  }

  /* ================= SUBMITTED ================= */
  if (step === "submitted") {
    return (
      <div className="text-center mt-10">
        <h2 className="text-xl font-bold">Test Submitted</h2>
        <p className="text-red-600">
          {autoSubmitReason || "Your test has been submitted successfully."}
        </p>
        <button
          onClick={() => router.push("/")}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded"
        >
          OK
        </button>
      </div>
    );
  }

  /* ================= TEST UI ================= */
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <div className="sticky top-0 bg-white shadow p-4 flex justify-between rounded">
        <h2 className="font-bold capitalize">{category} Test</h2>
        <span className="text-red-600 font-bold">⏱ {minutes}:{seconds}</span>
      </div>

      <div className="max-w-3xl mx-auto mt-6">
        {questions.map((q, i) => (
          <div key={q.id} className="bg-white p-4 rounded shadow mb-4">
            <p className="font-semibold mb-3">{i + 1}. {q.question}</p>

            {[q.optionA, q.optionB, q.optionC, q.optionD].map(opt => (
              <button
                key={opt}
                onClick={() => setAnswers(p => ({ ...p, [q.id]: opt }))}
                className={`w-full text-left px-4 py-2 mb-2 border rounded ${
                  answers[q.id] === opt ? "bg-blue-600 text-white" : "bg-white"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        ))}

        <button
          onClick={() => submitTest()}
          className="w-full bg-green-600 text-white py-3 rounded font-bold"
        >
          Submit Test
        </button>
      </div>
    </div>
  );
}