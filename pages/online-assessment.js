"use client";

import { useState } from "react";
import { useRouter } from "next/router";

export default function OnlineAssessment() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    college: "",
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

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!nameRegex.test(form.name))
    return alert("Name should contain only letters.");

  if (!gmailRegex.test(form.email))
    return alert("Enter a valid Gmail address.");

  if (!mobileRegex.test(form.mobile))
    return alert("Mobile number must be 10 digits.");

  if (!collegeRegex.test(form.college))
    return alert("College name should contain only letters.");

  if (!form.category)
    return alert("Please select a test category.");

  try {
    // Replace with your actual API URL
    const res = await fetch("http://localhost:8080/api/v1/tests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        candidateName: form.name,
        email: form.email,
        whatsappNumber: form.mobile,
        college: form.college,
        category: form.category,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      alert("Backend error: " + errorText);
      return;
    }

    const data = await res.json();

    // Save student info for test engine
    localStorage.setItem("studentId", data.testId || Date.now());
    localStorage.setItem("name", form.name);
    localStorage.setItem("email", form.email);
    localStorage.setItem("mobile", form.mobile);
    localStorage.setItem("college", form.college);

    router.push(`/test/${form.category}?start=true`);

  } catch (err) {
    console.error("Error calling test API:", err);
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
            name="mobile"
            placeholder="Mobile Number"
            value={form.mobile}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-lg"
          />

          <input
            type="text"
            name="college"
            placeholder="College / Company"
            value={form.college}
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
            <option value="aptitude">Aptitude</option>
            <option value="java">Java</option>
            <option value="python">Python</option>
            <option value="data">Data Analytics</option>
            <option value="communication">Communication</option>
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