import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Select from "react-select";

const JobPortal = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [expandedJobs, setExpandedJobs] = useState([]);
  const [activeFormJobId, setActiveFormJobId] = useState(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const hireStudentsLink = "https://wa.me/7305014818";
  const contactLink = "https://wa.me/7708938866";
  const takeTestFormLink = "/online-assessment";
  const LoginLink = "/login";

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/jobs/active");
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 10);

      if (window.innerWidth >= 768) {
        if (currentY > lastScrollY && currentY > 120) {
          setShowHeader(false);
        } else {
          setShowHeader(true);
        }
      }
      setLastScrollY(currentY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
  };

  const handleApply = (jobId) => {
    if (!appliedJobs.includes(jobId)) {
      setActiveFormJobId(jobId);
    } else {
      alert("You have already applied for this position.");
    }
  };

  const handleFormSubmitSuccess = (jobId) => {
    setAppliedJobs([...appliedJobs, jobId]);
    setActiveFormJobId(null);
    alert("Successfully applied for the position!");
  };

  const filteredJobs = jobs.filter(
    (job) =>
      (job.jobTitle || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (job.location || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl font-bold text-blue-700">
        Loading jobs...
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-blue-50 font-sans">
        <header
          className={`
            w-full sticky top-0 z-50
            transition-all duration-500
            ${scrolled ? "bg-white/80 backdrop-blur-xl shadow-md" : "bg-white"}
            ${showHeader ? "translate-y-0" : "-translate-y-full"}
          `}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => window.location.href = '/'}
            >
              <img
                src="/Nav Logo/CSHR - Nav Logo.png"
                className="h-7 sm:h-9 md:h-10 object-contain"
                alt="CSHR Logo"
              />
              <div className="h-6 w-[1px] bg-gray-300"></div>
              <div className="flex flex-col items-center">
                <img
                  src="/Zoho Images/ZOHO LOGO - Zoho Card.png"
                  className="h-7 sm:h-7 md:h-9 object-contain"
                  alt="Zoho Logo"
                />
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-3 ml-auto mr-4">
              <button
                onClick={() => (window.location.href = 'https://www.careerschool.co.in/')}
                className="bg-blue-100 text-blue-700 px-4 py-2 rounded font-semibold text-sm"
              >
                Home
              </button>

              <button
                onClick={() => (window.location.href = '/#courses')}
                className="bg-blue-100 text-blue-700 px-4 py-2 rounded font-semibold text-sm"
              >
                Courses
              </button>
            </nav>

            <button className="md:hidden text-black" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? (
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>

          {menuOpen && (
            <div className="md:hidden bg-white shadow-md flex flex-col items-center gap-4 py-6 text-black">
              <span className="text-xs text-gray-500">Powered by Zoho</span>

              <button
                onClick={() => (window.location.href = 'https://www.careerschool.co.in/')}
                className="bg-blue-100 px-6 py-2 rounded w-4/5 text-center"
              >
                Home
              </button>

              <button
                onClick={() => (window.location.href = '/#courses')}
                className="bg-blue-100 px-6 py-2 rounded w-4/5 text-center"
              >
                Courses
              </button>
            </div>
          )}
        </header>

        <section className="bg-gradient-to-r from-blue-700 to-blue-500 text-white px-10 py-20 text-center">
          <h2 className="text-5xl font-bold mb-5 leading-tight">
            Find Your Dream Job Today
          </h2>

          <p className="text-xl mb-8 text-blue-100">
            Explore jobs from top companies and apply instantly.
          </p>

          <form
            onSubmit={handleSearch}
            className="flex justify-center gap-4 flex-wrap"
          >
            <input
              type="text"
              placeholder="Search jobs by title or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-80 px-5 py-4 rounded-xl text-black outline-none text-lg"
            />

            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold px-8 py-4 rounded-xl text-lg transition cursor-pointer"
            >
              Search
            </button>
          </form>
        </section>

        <section className="px-10 py-16">
          <h3 className="text-4xl font-bold text-blue-800 text-center mb-12">
            Latest Job Openings
          </h3>

          {filteredJobs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-2xl text-gray-600">
                No jobs found matching your search.
              </p>
              <button
                onClick={() => setSearchTerm("")}
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-3xl p-7 shadow-lg hover:shadow-2xl transition border-t-8 border-yellow-400"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-2xl font-bold text-blue-800">
                        {job.jobTitle}
                      </h4>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        job.employmentType === "FULL_TIME"
                          ? "bg-green-500 text-white"
                          : job.employmentType === "PART_TIME"
                            ? "bg-yellow-500 text-white"
                            : job.employmentType === "CONTRACT"
                              ? "bg-purple-500 text-white"
                              : job.employmentType === "INTERNSHIP"
                                ? "bg-orange-500 text-white"
                                : "bg-blue-500 text-white"
                      }`}
                    >
                      {job.employmentType}
                    </span>
                  </div>

                  <div className="space-y-3 mt-6">
                    <p className="text-gray-700 text-lg">
                      📍 <span className="font-medium">Location:</span>{" "}
                      {job.location}
                    </p>

                    <p className="text-gray-700 text-lg">
                      💰 <span className="font-medium">Salary:</span> {job.salaryRange}
                    </p>

                    <p>
                      <strong>Qualification:</strong> {job.qualification}
                    </p>

                    <p>
                      <strong>Skills:</strong> {job.skills}
                    </p>

                    <p>
                      <strong>Deadline:</strong> {job.applicationDeadline}
                    </p>
                  </div>

                  <div className="mt-5">
                    <p
                      className={`text-gray-600 transition-all duration-300 break-words ${
                        expandedJobs.includes(job.id) ? "" : "line-clamp-2"
                      }`}
                    >
                      {job.jobDescription}
                    </p>

                    {job.jobDescription?.length > 120 && (
                      <button
                        onClick={() => {
                          if (expandedJobs.includes(job.id)) {
                            setExpandedJobs(
                              expandedJobs.filter((id) => id !== job.id)
                            );
                          } else {
                            setExpandedJobs([...expandedJobs, job.id]);
                          }
                        }}
                        className="mt-2 text-blue-600 hover:text-blue-800 font-semibold text-sm"
                      >
                        {expandedJobs.includes(job.id) ? "Show Less" : "Read More"}
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => handleApply(job.id)}
                    disabled={appliedJobs.includes(job.id)}
                    className={`w-full mt-8 py-4 rounded-2xl text-lg font-semibold transition ${
                      appliedJobs.includes(job.id)
                        ? "bg-green-600 text-white cursor-not-allowed"
                        : "bg-blue-700 hover:bg-blue-800 text-white cursor-pointer"
                    }`}
                  >
                    {appliedJobs.includes(job.id) ? "Applied ✓" : "Apply Now"}
                  </button>
                </div>
              ))}
            </div>
          )}

          {appliedJobs.length > 0 && (
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                You have applied for {appliedJobs.length} job
                {appliedJobs.length !== 1 ? "s" : ""}
              </p>
            </div>
          )}
        </section>

        {activeFormJobId && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center p-4 overflow-y-auto">
            <div className="relative bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-1 animate-in fade-in zoom-in-95 duration-200 shadow-2xl">
              <button 
                onClick={() => setActiveFormJobId(null)}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 font-bold text-xl z-10 p-2"
              >
                ✕
              </button>
              <div className="pt-4">
                <ApplicationForm 
  jobId={activeFormJobId}
  jobTitle={jobs.find(j => j.id === activeFormJobId)?.jobTitle || ""} 
  onSuccess={() => handleFormSubmitSuccess(activeFormJobId)} 
/>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default JobPortal;

const ApplicationForm = ({ jobId, jobTitle, onSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    countryCode: "+91",
    phone: "",
    alternateCountryCode: "+91",
    alternatePhone: "",
    email: "",
    location: "",
    language: [],
    highestEducation: "",
    collegeName: "",
    stream: "",
    yearOfPassing: "",
    arrears: "",
    experience: "",
    source: ""
  });

  const countryCodeOptions = [
    { label: "India +91", value: "+91", digits: 10 },
    { label: "United States +1", value: "+1", digits: 10 },
    { label: "United Kingdom +44", value: "+44", digits: 10 },
    { label: "Australia +61", value: "+61", digits: 9 },
    { label: "UAE +971", value: "+971", digits: 9 },
    { label: "Qatar +974", value: "+974", digits: 8 },
    { label: "Kuwait +965", value: "+965", digits: 8 },
    { label: "Saudi Arabia +966", value: "+966", digits: 9 },
    { label: "New Zealand +64", value: "+64", digits: 9 }
  ];

  const degreeOptions = [
    { label: "B.Tech / B.E", value: "BTECH" },
    { label: "BCA", value: "BCA" },
    { label: "B.Sc", value: "BSC" },
    { label: "B.Com", value: "BCOM" },
    { label: "BBA", value: "BBA" },
    { label: "BA", value: "BA" },
    { label: "MCA", value: "MCA" },
    { label: "MBA", value: "MBA" },
    { label: "Diploma / Polytechnic", value: "DIPLOMA" },
    { label: "ITI", value: "ITI" },
    { label: "Other", value: "OTHER" }
  ];

  const sourceOptions = [
    { label: "WhatsApp", value: "WHATSAPP" },
    { label: "Google", value: "GOOGLE" },
    { label: "Referral", value: "REFERRAL" },
    { label: "LinkedIn", value: "LINKEDIN" },
    { label: "Facebook", value: "FACEBOOK" },
    { label: "Instagram", value: "INSTAGRAM" },
    { label: "YouTube", value: "YOUTUBE" }
  ];

  const ISO6391 = require('iso-639-1');
  const languageOptions = ISO6391.getAllNames().map(name => ({
    label: name,
    value: name.toUpperCase()
  }));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getDigitLimit = (code) => {
    const country = countryCodeOptions.find(
      (c) => c.value === code
    );

    return country ? country.digits : 10;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submissionData = {
      ...formData,

      phone: `${formData.countryCode}${formData.phone}`,

      alternatePhone: formData.alternatePhone
        ? `${formData.alternateCountryCode}${formData.alternatePhone}`
        : "",

      jobTitle: jobTitle,

      language: formData.language.map(lang => lang.value).join(", ")
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address");
      return;
    }

    const phoneLimit = getDigitLimit(formData.countryCode);

    if (formData.phone.length !== phoneLimit) {
      alert(
        `Phone number must contain exactly ${phoneLimit} digits`
      );
      return;
    }

    if (formData.alternatePhone) {

      const alternateLimit = getDigitLimit(
        formData.alternateCountryCode
      );

      if (formData.alternatePhone.length !== alternateLimit) {
        alert(
          `Alternate phone number must contain exactly ${alternateLimit} digits`
        );
        return;
      }
    }

    try {
      const response = await fetch("http://localhost:8080/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData)
      });
      if (response.ok) {
        onSuccess();
      } else {
        alert("Failed to submit application. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl font-sans">
      <h3 className="text-2xl font-bold text-blue-800 mb-6 text-center">Complete Your Application</h3>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Full Name (As per Records)</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter full name" className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition" required />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* PHONE NUMBER */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
              Phone Number (WhatsApp)
            </label>

            <div className="flex gap-2">

              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                className="bg-gray-50 border-0 rounded-2xl p-4 text-gray-800 outline-none min-w-[140px]"
              >
                {countryCodeOptions.map((country) => (
                  <option key={country.value} value={country.value}>
                    {country.label}
                  </option>
                ))}
              </select>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={(e) => {
                  const digitsOnly = e.target.value.replace(/\D/g, "");

                  const limit = getDigitLimit(formData.countryCode);

                  if (digitsOnly.length <= limit) {
                    setFormData({
                      ...formData,
                      phone: digitsOnly
                    });
                  }
                }}
                placeholder="WhatsApp Number"
                className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-gray-800"
                required
              />

            </div>
          </div>

          {/* ALTERNATE NUMBER */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
              Alternate Phone Number
            </label>

            <div className="flex gap-2">

              <select
                name="alternateCountryCode"
                value={formData.alternateCountryCode}
                onChange={handleChange}
                className="bg-gray-50 border-0 rounded-2xl p-4 text-gray-800 outline-none min-w-[140px]"
              >
                {countryCodeOptions.map((country) => (
                  <option key={country.value} value={country.value}>
                    {country.label}
                  </option>
                ))}
              </select>

              <input
                type="tel"
                name="alternatePhone"
                value={formData.alternatePhone}
                onChange={(e) => {
                  const digitsOnly = e.target.value.replace(/\D/g, "");

                  const limit = getDigitLimit(
                    formData.alternateCountryCode
                  );

                  if (digitsOnly.length <= limit) {
                    setFormData({
                      ...formData,
                      alternatePhone: digitsOnly
                    });
                  }
                }}
                placeholder="Alternate Number"
                className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-gray-800"
              />

            </div>
          </div>

        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="email@example.com" className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition" required />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Current Location? (Area & City)</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="e.g. Adyar, Chennai" className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition" required />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Languages You Speak?</label>
            <Select
              isMulti={true}
              name="language"
              options={languageOptions}
              value={formData.language}
              onChange={(selectedOptions) => setFormData({ ...formData, language: selectedOptions || [] })}
              placeholder="Select Languages..."
              className="react-select-container"
              classNamePrefix="react-select"
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: "#f9fafb",
                  border: "none",
                  borderRadius: "1rem",
                  padding: "0.5rem",
                  boxShadow: "none",
                }),
                multiValue: (base) => ({
                  ...base,
                  backgroundColor: "#e5e7eb",
                  borderRadius: "0.5rem",
                  padding: "2px 6px",
                }),
                multiValueLabel: (base) => ({
                  ...base,
                  color: "#1f2937",
                  fontSize: "0.875rem",
                }),
                multiValueRemove: (base) => ({
                  ...base,
                  color: "#9ca3af",
                  ":hover": { backgroundColor: "#d1d5db", color: "#111827" },
                })
              }}
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Highest Education</label>
            <select name="highestEducation" value={formData.highestEducation} onChange={handleChange} className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition appearance-none" required>
              <option value="">Select Education</option>
              <option value="10th">10th</option>
              <option value="12th">12th</option>
              <option value="Graduate">Graduate</option>
              <option value="PG">PG</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Name of College?</label>
            <input type="text" name="collegeName" value={formData.collegeName} onChange={handleChange} placeholder="College Name" className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition" required />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Stream / Course of Study</label>
            <select name="stream" value={formData.stream} onChange={handleChange} className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition appearance-none" required>
              <option value="">Select Degree</option>
              {degreeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Year of Passing</label>
            <input type="number" name="yearOfPassing" value={formData.yearOfPassing} onChange={handleChange} placeholder="e.g. 2025" className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition" required />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Any Arrears?</label>
            <select name="arrears" value={formData.arrears} onChange={handleChange} className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition appearance-none" required>
              <option value="">Select Option</option>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* EXPERIENCE */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
              Experience
            </label>

            <select
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition appearance-none"
              required
            >
              <option value="">Select Experience</option>
              <option value="fresher">Fresher</option>
              <option value="less than 1 year">Less than 1 year</option>
              <option value="1-5 years">1-5 years</option>
              <option value="5-10 years">5-10 years</option>
              <option value="more than 10 years">More than 10 years</option>
            </select>
          </div>

          {/* SOURCE */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
              How did you know about Careerschool?
            </label>

            <select
              name="source"
              value={formData.source}
              onChange={handleChange}
              className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition appearance-none"
              required
            >
              <option value="">Choose Source</option>

              {sourceOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

        </div>
        <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white py-4 rounded-2xl text-md font-bold transition mt-6">
          Submit Application
        </button>
      </form>
    </div>
  );
};