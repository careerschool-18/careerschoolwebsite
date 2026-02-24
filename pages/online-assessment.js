"use client";

import { useState } from "react";
import { useRouter } from "next/router";

export default function OnlineAssessment() {
  const router = useRouter();

  const [step, setStep] = useState("form"); // form | instructions
  const [questionsData, setQuestionsData] = useState([]);
  const [studentId, setStudentId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    whatsappNumber: "",
    collegeName: "",
    category: "",
  });

  /* ------------ VALIDATION ------------ */
  const nameRegex = /^[A-Za-z. ]+$/;
  const mobileRegex = /^[0-9]{10}$/;
  const collegeRegex = /^[A-Za-z ]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= START TEST API CALL ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nameRegex.test(form.name))
      return alert("Name should contain only letters.");

    if (!emailRegex.test(form.email))
      return alert("Enter a valid Email address.");

    if (!mobileRegex.test(form.whatsappNumber))
      return alert("Mobile number must be 10 digits.");

    if (!collegeRegex.test(form.collegeName))
      return alert("College name should contain only letters.");

    if (!form.category)
      return alert("Please select a test category.");

    try {
      const res = await fetch("https://career-school.co.in/api/tests/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errorText = await res.text();
        alert("Backend error: " + errorText);
        return;
      }

      const data = await res.json();

      const questions =
        data.questions || data.questionsList || data.data || [];

      if (!data.studentId || !Array.isArray(questions) || questions.length === 0) {
        alert("Invalid response from server.");
        return;
      }

      // Store temporarily in state
      setQuestionsData(questions);
      setStudentId(data.studentId);

      // Move to instruction page
      setStep("instructions");

    } catch (err) {
      console.error("Error calling start API:", err);
      alert("Cannot connect to backend server.");
    }
  };

  /* ================= START AFTER INSTRUCTIONS ================= */
  const startAfterInstructions = () => {

    // Store session data
    localStorage.setItem("studentId", studentId);
    localStorage.setItem("name", form.name);
    localStorage.setItem("email", form.email);
    localStorage.setItem("whatsappNumber", form.whatsappNumber);
    localStorage.setItem("collegeName", form.collegeName);
    localStorage.setItem("questions", JSON.stringify(questionsData));
    localStorage.setItem("endTime", Date.now() + 20 * 60 * 1000); // 20 min timer

    router.push(`/test/${form.category}?start=true`);
  };

  /* ================= FORM PAGE ================= */
  if (step === "form") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-3">
        <div className="bg-white p-6 rounded-2xl shadow w-full max-w-lg">
          <h2 className="text-xl font-bold text-center mb-5">
            Online Assessment
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded-lg"
            />

            <input
              type="email"
              name="email"
              placeholder="Email ID"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded-lg"
            />

            <input
              type="text"
              name="whatsappNumber"
              placeholder="Mobile Number"
              value={form.whatsappNumber}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded-lg"
            />

            <input
              type="text"
              name="collegeName"
              placeholder="College / Company"
              value={form.collegeName}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded-lg"
            />

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded-lg"
            >
              <option value="">Select Test Category</option>
              <option value="APTITUDE">Aptitude</option>
              <option value="JAVA">Java</option>
              <option value="PYTHON">Python</option>
              <option value="DATA">Data Analytics</option>
              <option value="COMMUNICATION">Communication</option>
            </select>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold"
            >
              Proceed
            </button>

          </form>
        </div>
      </div>
    );
  }

  /* ================= INSTRUCTION PAGE ================= */
  if (step === "instructions") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-3">
        <div className="bg-white p-8 rounded-2xl shadow w-full max-w-xl">
          <h2 className="text-xl font-bold text-center mb-4">
            Test Instructions
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>All questions are mandatory. There is no negative marking</li>
            <li>Use a laptop/desktop (preferred) with a stable internet connection.</li>
            <li>Provide your personal email id only and phone number.</li>
            <li>Once the test starts, the timer cannot be paused.</li>
            <li>Do not refresh, close the browser, or switch tabs during the test.</li>
            <li>No external help (books, mobile, friends, internet search) unless informed.</li>
            <li>The test will auto-submit when time is over.</li>
            <li>In case of technical issues, immediately inform the coordinator with a screenshot.</li>
          </ul>

          <button
            onClick={startAfterInstructions}
            className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg font-semibold"
          >
            Start Test
          </button>
        </div>
      </div>
    );
  }

  return null;
}
