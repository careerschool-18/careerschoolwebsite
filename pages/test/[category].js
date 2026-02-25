"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export default function TestEngine() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const [submitError, setSubmitError] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [step, setStep] = useState("loading");
  const [timer, setTimer] = useState(0);
  const [autoSubmitReason, setAutoSubmitReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [missingQuestions, setMissingQuestions] = useState([]);

  const submittedRef = useRef(false);
  const tabSwitchCountRef = useRef(0);
  const questionRefs = useRef([]);

  /* ================= LOAD QUESTIONS ================= */
  useEffect(() => {
    const stored = localStorage.getItem("questions");

    if (!stored) {
      toast.error("No active test found.");
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
      toast.error("Invalid test data.");
      router.push("/");
    }
  }, [router]);

  /* ================= TIMER ================= */
  useEffect(() => {
    if (step !== "test") return;

    const updateTimer = () => {
      const storedEndTime = localStorage.getItem("endTime");
      if (!storedEndTime) return;

      const remaining = Math.floor(
        (Number(storedEndTime) - Date.now()) / 1000
      );

      if (remaining <= 0) {
        setTimer(0);
        triggerAutoSubmit("Time ended. Test auto-submitted.");
      } else {
        setTimer(remaining);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [step]);

  /* ================= TAB SWITCH WARNING ================= */
  useEffect(() => {
    if (step !== "test") return;

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        tabSwitchCountRef.current += 1;

        if (tabSwitchCountRef.current === 1) {
          toast("Warning 1 of 2: Stay on test page.", { icon: "⚠️" });
        } else if (tabSwitchCountRef.current === 2) {
          toast("Final Warning: Next violation auto-submit.", { icon: "⚠️" });
        } else {
          triggerAutoSubmit(
            "Test auto-submitted due to repeated tab switching."
          );
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [step]);

  /* ================= CHECK UNANSWERED ================= */
  const getUnansweredQuestions = () => {
    return questions
      .map((q, index) => (!answers[q.id] ? index + 1 : null))
      .filter((num) => num !== null);
  };

  useEffect(() => {
    setMissingQuestions(getUnansweredQuestions());
  }, [answers, questions]);

  /* ================= AUTO SUBMIT ================= */
  const triggerAutoSubmit = (reason) => {
    if (submittedRef.current) return;
    setAutoSubmitReason(reason);
    submitTest(true);
  };

  /* ================= SUBMIT TEST ================= */
  const submitTest = async (forced = false) => {
    if (submittedRef.current) return;

    const studentId = localStorage.getItem("studentId");
    if (!studentId) {
      toast.error("Session expired.");
      router.push("/");
      return;
    }

    if (!forced) {
        const unanswered = getUnansweredQuestions();
      
        if (unanswered.length > 0) {
      
          toast.custom((t) => (
            <div
              className={`${
                t.visible ? "animate-bounce" : ""
              } max-w-md w-full bg-red-600 text-white shadow-lg rounded-lg p-4`}
            >
              <p className="font-bold text-lg">
                ⚠ {unanswered.length} Question(s) Missing!
              </p>
              <p className="text-sm mt-1">
                Unanswered: {unanswered.join(", ")}
              </p>
            </div>
          ), {
            duration: 4000,
          });
      
          questionRefs.current[unanswered[0] - 1]?.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });
      
          return;
        }
      }

    submittedRef.current = true;
    setIsSubmitting(true);

    const formattedAnswers = questions.map((q) => ({
      questionId: Number(q.id),
      selectedAnswer: answers[q.id] || null
    }));

    try {
      const res = await fetch(
        "https://career-school.co.in/api/tests/submit",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            studentId: Number(studentId),
            answers: formattedAnswers
          })
        }
      );

      if (!res.ok) throw new Error(await res.text());

      localStorage.removeItem("questions");
      setStep("submitted");
      toast.success("Test submitted successfully!");
    } catch (err) {
      console.error("Submit error:", err);
      toast.error("Error submitting test.");
      submittedRef.current = false;
      setIsSubmitting(false);
    }
  };

  const minutes = String(Math.floor(timer / 60)).padStart(2, "0");
  const seconds = String(timer % 60).padStart(2, "0");

  if (step === "loading") {
    return <h2 className="text-center mt-10">Loading Questions...</h2>;
  }

  if (step === "submitted") {
    return (
      <div className="text-center mt-10">
        <h2 className="text-xl font-bold">Test Submitted</h2>
        <p className="text-gray-600">
          {autoSubmitReason || "Your test has been submitted."}
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
          <div
            key={q.id}
            ref={(el) => (questionRefs.current[i] = el)}
            className="p-4 rounded shadow mb-4 bg-white"
          >
            <p className="font-semibold mb-3">
              {i + 1}. {q.question}
            </p>

            {[q.optionA, q.optionB, q.optionC, q.optionD].map((opt) => (
  <button
    key={opt}
    disabled={isSubmitting}
    onClick={() => {
      setAnswers((prev) => ({ ...prev, [q.id]: opt }));
      toast.dismiss();
    }}
    className={`w-full text-left px-4 py-2 mb-2 border rounded ${
      answers[q.id] === opt
        ? "bg-blue-600 text-white"
        : "bg-white"
    }`}
  >
    {opt}
  </button>
))}
          </div>
        ))}

        <button
          disabled={isSubmitting}
          onClick={() => submitTest()}
          className="w-full bg-green-600 text-white py-3 rounded font-bold"
        >
          {isSubmitting ? "Submitting..." : "Submit Test"}
        </button>
      </div>
    </div>
  );
}
