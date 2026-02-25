"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

export default function TestEngine() {
  const router = useRouter();
  const { category } = router.query;

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [step, setStep] = useState("loading");
  const [timer, setTimer] = useState(20 * 60);
  const [autoSubmitReason, setAutoSubmitReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submittedRef = useRef(false);
  const tabSwitchCountRef = useRef(0); // ✅ NEW

  /* ================= LOAD QUESTIONS ================= */
  useEffect(() => {
    const stored = localStorage.getItem("questions");

    if (!stored) {
      alert("No active test found. Please start again.");
      router.push("/");
      return;
    }

    try {
      const parsed = JSON.parse(stored);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        throw new Error("Invalid questions");
      }
      setQuestions(parsed);
      setStep("test");
    } catch {
      alert("Invalid test data. Please restart test.");
      router.push("/");
    }
  }, [router]);

  /* ================= TIMER ================= */
  useEffect(() => {
    if (step !== "test") return;

    const interval = setInterval(() => {
      setTimer((prev) => {
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

  /* ================= TAB SWITCH WARNING ================= */
  useEffect(() => {
    if (step !== "test") return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        tabSwitchCountRef.current += 1;

        if (tabSwitchCountRef.current <= 2) {
          alert(
            `⚠ Warning ${tabSwitchCountRef.current}/2:\nDo not switch tabs. Next time test will be auto-submitted.`
          );
        } else {
          setAnswers({}); // answers become NULL
          triggerAutoSubmit(
            "Test auto-submitted due to multiple tab switching."
          );
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [step]);

  /* ================= AUTO SUBMIT ================= */
  const triggerAutoSubmit = (reason) => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    setAutoSubmitReason(reason);
    submitTest(true);
  };

  /* ================= SUBMIT TEST ================= */
  const submitTest = async (forced = false) => {
    if (submittedRef.current && !forced) return;

    const studentId = localStorage.getItem("studentId");
    if (!studentId) {
      alert("Session expired.");
      router.push("/");
      return;
    }

    if (!forced && Object.keys(answers).length < questions.length) {
      alert("Answer all questions.");
      return;
    }

    setIsSubmitting(true);
    submittedRef.current = true;

    const formattedAnswers = Object.entries(answers).map(
      ([questionId, selectedAnswer]) => ({
        questionId: Number(questionId),
        selectedAnswer
      })
    );

    try {
      const res = await fetch("https://career-school.co.in/api/tests/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: Number(studentId),
          answers: formattedAnswers
        })
      });

      if (!res.ok) throw new Error(await res.text());

      localStorage.removeItem("questions");
      setStep("submitted");
    } catch (err) {
      console.error("Submit error:", err);
      alert("Error submitting test.");
      submittedRef.current = false;
      setIsSubmitting(false);
    }
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
        <span className="text-red-600 font-bold">
          ⏱ {minutes}:{seconds}
        </span>
      </div>

      <div className="max-w-3xl mx-auto mt-6">
        {questions.map((q, i) => (
          <div key={q.id} className="bg-white p-4 rounded shadow mb-4">
            <p className="font-semibold mb-3">
              {i + 1}. {q.question}
            </p>

            {[q.optionA, q.optionB, q.optionC, q.optionD].map((opt) => (
              <button
                key={opt}
                disabled={isSubmitting}
                onClick={() =>
                  setAnswers((prev) => ({ ...prev, [q.id]: opt }))
                }
                className={`w-full text-left px-4 py-2 mb-2 border rounded ${
                  answers[q.id] === opt
                    ? "bg-blue-600 text-white"
                    : "bg-white"
                } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {opt}
              </button>
            ))}
          </div>
        ))}

        <button
          disabled={isSubmitting}
          onClick={() => submitTest()}
          className="w-full bg-green-600 text-white py-3 rounded font-bold flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {isSubmitting && (
            <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          )}
          {isSubmitting ? "Submitting..." : "Submit Test"}
        </button>
      </div>
    </div>
  );
}
