"use client";

import { useState } from "react";
import { useRouter } from "next/router";

export default function OnlineAssessment() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    whatsappNumber: "",
    collegeName: "",
    category: "",
  });

  /* ------------ VALIDATION ------------ */
  const nameRegex = /^[A-Za-z ]+$/;
  const mobileRegex = /^[0-9]{10}$/;
  const collegeRegex = /^[A-Za-z ]+$/;
  const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= START TEST ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nameRegex.test(form.name))
      return alert("Name should contain only letters.");

    if (!gmailRegex.test(form.email))
      return alert("Enter a valid Gmail address.");

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
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          whatsappNumber: form.whatsappNumber,
          collegeName: form.collegeName,
          category: form.category,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        alert("Backend error: " + errorText);
        return;
      }

      const data = await res.json();

      /*
        Expected backend response (ANY ONE):
        1️⃣ { studentId: 1, questions: [...] }
        2️⃣ { studentId: 1, data: [...] }
        3️⃣ { studentId: 1, questionsList: [...] }
      */

      const questions =
        data.questions || data.questionsList || data.data || [];

      if (!data.studentId || !Array.isArray(questions) || questions.length === 0) {
        alert("Invalid response from server.");
        return;
      }

      /* ================= STORE SESSION DATA ================= */
      localStorage.setItem("studentId", data.studentId);
      localStorage.setItem("name", form.name);
      localStorage.setItem("email", form.email);
      localStorage.setItem("whatsappNumber", form.whatsappNumber);
      localStorage.setItem("collegeName", form.collegeName);

      // 🔑 MOST IMPORTANT: store questions for TestEngine
      localStorage.setItem("questions", JSON.stringify(questions));

      /* ================= GO TO TEST ================= */
      router.push(`/test/${form.category}?start=true`);

    } catch (err) {
      console.error("Error calling start API:", err);
      alert("Cannot connect to backend server.");
    }
  };

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
            Take Test
          </button>

        </form>
      </div>
    </div>
  );
}
