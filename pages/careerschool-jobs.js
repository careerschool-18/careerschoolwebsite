import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Select from "react-select";
import SuccessToast from "../components/SuccessToast";

const employmentTypeBadge = (type) => {
  if (type === "FULL_TIME") return "bg-green-500 text-white";
  if (type === "PART_TIME") return "bg-yellow-500 text-white";
  if (type === "CONTRACT") return "bg-purple-500 text-white";
  if (type === "INTERNSHIP") return "bg-orange-500 text-white";
  return "bg-blue-500 text-white";
};

const formatEmploymentType = (type) => {
  return type ? type.replace(/_/g, " ") : "";
};

const JobPortal = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [expandedJobs, setExpandedJobs] = useState([]);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [activeFormJobId, setActiveFormJobId] = useState(null);
  const [toast, setToast] = useState("");

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const hireStudentsLink = "https://wa.me/7305014818";
  const contactLink = "https://wa.me/7708938866";
  const takeTestFormLink = "/online-assessment";
  const LoginLink = "/login";

  useEffect(() => { fetchJobs(); }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/jobs/active");
      const data = await response.json();
      // Sort newest first (highest id = most recently posted)
      const sorted = [...data].sort((a, b) => b.id - a.id);
      setJobs(sorted);
      if (sorted.length > 0) setSelectedJob(sorted[0]);
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
        if (currentY > lastScrollY && currentY > 120) setShowHeader(false);
        else setShowHeader(true);
      }
      setLastScrollY(currentY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleSearch = (e) => { e.preventDefault(); };

  const handleApply = (jobId) => {
    if (!appliedJobs.includes(jobId)) setActiveFormJobId(jobId);
    else alert("You have already applied for this position.");
  };

  const handleFormSubmitSuccess = (jobId) => {
    setAppliedJobs([...appliedJobs, jobId]);
    setActiveFormJobId(null);
    setToast("Successfully applied for the position!");
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
      <div className="min-h-screen bg-white font-sans">

        {/* ── Header (unchanged) ── */}
        <header className={`
          w-full sticky top-0 z-50
          transition-all duration-500
          ${scrolled ? "bg-white/80 backdrop-blur-xl shadow-md" : "bg-white"}
          ${showHeader ? "translate-y-0" : "-translate-y-full"}
        `}>
          <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.location.href = '/'}>
              <img src="/Nav Logo/CSHR - Nav Logo.png" className="h-7 sm:h-9 md:h-10 object-contain" alt="CSHR Logo" />
              <div className="h-6 w-[1px] bg-gray-300"></div>
              <div className="flex flex-col items-center">
                <img src="/Zoho Images/ZOHO LOGO - Zoho Card.png" className="h-7 sm:h-7 md:h-9 object-contain" alt="Zoho Logo" />
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-3 ml-auto mr-4">
              <button onClick={() => (window.location.href = 'https://www.careerschool.co.in/')}
                className="bg-blue-100 text-blue-700 px-4 py-2 rounded font-semibold text-sm">Home</button>
              <button onClick={() => (window.location.href = '/#courses')}
                className="bg-blue-100 text-blue-700 px-4 py-2 rounded font-semibold text-sm">Courses</button>
            </nav>

            <button className="md:hidden text-black" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen
                ? <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                : <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              }
            </button>
          </div>

          {menuOpen && (
            <div className="md:hidden bg-white shadow-md flex flex-col items-center gap-4 py-6 text-black">
              <span className="text-xs text-gray-500">Powered by Zoho</span>
              <button onClick={() => (window.location.href = 'https://www.careerschool.co.in/')}
                className="bg-blue-100 px-6 py-2 rounded w-4/5 text-center">Home</button>
              <button onClick={() => (window.location.href = '/#courses')}
                className="bg-blue-100 px-6 py-2 rounded w-4/5 text-center">Courses</button>
            </div>
          )}
        </header>

        {/* ── Hero ── */}
        <section className="bg-gradient-to-r from-blue-700 to-blue-500 text-white px-20 py-10 text-center">
          <h2 className="text-5xl font-bold mb-5 leading-tight">Find Your Dream Job Today</h2>
          <p className="text-xl mb-8 text-blue-100">Explore jobs from top companies and apply instantly.</p>
          <form onSubmit={handleSearch} className="flex justify-center">
            <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/30 rounded-2xl px-3 py-2.5 shadow-lg w-full max-w-xl mx-4 sm:mx-0">
              <input
                type="text"
                placeholder="Search jobs by title or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 min-w-0 bg-transparent text-white placeholder-blue-200 outline-none text-sm sm:text-base"
              />
              <button type="submit"
                className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold px-4 sm:px-6 py-2 rounded-xl text-sm sm:text-base transition cursor-pointer shrink-0 whitespace-nowrap">
                Search
              </button>
            </div>
          </form>
        </section>

        {/* ── Split layout ── */}
        <section className="px-4 md:px-10 py-16">
          <h3 className="text-4xl font-bold text-blue-800 text-center mb-12">Latest Job Openings</h3>

          {filteredJobs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-2xl text-gray-600">No jobs found matching your search.</p>
              <button onClick={() => setSearchTerm("")}
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                Clear Search
              </button>
            </div>
          ) : (
            <div className="flex gap-8 items-start">

              {/* ── LEFT: mini card list ── */}
              <style>{`
                @keyframes detailFadeIn {
                  from { opacity: 0; transform: translateY(8px); }
                  to   { opacity: 1; transform: translateY(0); }
                }
                .detail-panel { animation: detailFadeIn 0.22s ease both; }
                .card-selected { background: linear-gradient(135deg, #1e40af, #2563eb) !important; box-shadow: 0 4px 20px rgba(30,64,175,.35) !important; }
                .card-selected h4,
                .card-selected span,
                .card-selected p { color: #ffffff !important; }
                .card-selected svg { color: #ffffff !important; }
                .card-selected .font-medium { color: rgba(255,255,255,0.85) !important; }
                @keyframes sheetUp {
                  from { transform: translateY(100%); }
                  to   { transform: translateY(0); }
                }
                .sheet-panel { animation: sheetUp 0.32s cubic-bezier(0.32,0.72,0,1) both; }
              `}</style>
              <div className="w-full md:w-[380px] shrink-0 flex flex-col gap-6 max-h-[80vh] overflow-y-auto pr-2">
                {filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    onClick={() => { setSelectedJob(job); if (window.innerWidth < 768) setSheetOpen(true); }}
                    className={`bg-blue-50 rounded-3xl p-7 transition-all duration-200 cursor-pointer
                      ${selectedJob?.id === job.id ? "card-selected" : ""}`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-2xl font-bold text-blue-800">{job.jobTitle}</h4>
                      <span className={`px-4 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${employmentTypeBadge(job.employmentType)}`}>
                        {formatEmploymentType(job.employmentType)}
                      </span>
                    </div>

                    <div className="space-y-3 mt-4">
                      <p className="text-gray-700 text-lg flex items-center gap-2">
                        <svg className="w-4 h-4 text-blue-600 shrink-0" fill="currentColor" viewBox="0 0 384 512"><path d="M215.7 499.2C267 435 384 279.4 384 192 384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" /></svg>
                        <span><span className="font-medium">Location:</span> {job.location}</span>
                      </p>
                      <p className="text-gray-700 text-lg flex items-center gap-2">
                        <svg className="w-4 h-4 text-blue-600 shrink-0" fill="currentColor" viewBox="0 0 320 512"><path d="M308 96c6.6 0 12-5.4 12-12V44c0-6.6-5.4-12-12-12H12C5.4 32 0 37.4 0 44v44.7c0 6.6 5.4 12 12 12h85.5c32.6 0 61.9 16.9 76.4 43.2H12c-6.6 0-12 5.4-12 12v42.7c0 6.6 5.4 12 12 12h176c-11.3 49.1-54.9 86.1-108.2 87.9L12 299c-6.6.2-12 5.6-12 12.2v47.6c0 3.4 1.4 6.6 3.9 8.9l176.9 163.4c2.3 2.1 5.2 3.2 8.3 3.2H255c10.8 0 16.5-12.8 9.2-20.8L101.8 352.3c67.2-10.2 116.6-64.7 121.9-131.3H308c6.6 0 12-5.4 12-12v-42.7c0-6.6-5.4-12-12-12h-80.8c-7-14.3-17.2-26.8-29.5-37H308z" /></svg>
                        <span><span className="font-medium">Salary:</span> {job.salaryRange}</span>
                      </p>
                      <p className="text-gray-700 flex items-center gap-2">
                        <svg className="w-4 h-4 text-blue-600 shrink-0" fill="currentColor" viewBox="0 0 512 512"><path d="M184 48H328c4.4 0 8 3.6 8 8V96H176V56c0-4.4 3.6-8 8-8zm-56 8V96H64C28.7 96 0 124.7 0 160v96H192 320 512V160c0-35.3-28.7-64-64-64H384V56c0-30.9-25.1-56-56-56H184c-30.9 0-56 25.1-56 56zM512 288H320v32c0 17.7-14.3 32-32 32H224c-17.7 0-32-14.3-32-32V288H0V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V288z" /></svg>
                        <span><span className="font-medium">Experience:</span> {job.experience || "Fresher"}</span>
                      </p>
                      <p className="text-gray-700 flex items-center gap-2">
                        <svg className="w-4 h-4 text-blue-600 shrink-0" fill="currentColor" viewBox="0 0 448 512"><path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z" /></svg>
                        <span><span className="font-medium">Deadline:</span> {job.applicationDeadline}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* ── RIGHT: full job detail (desktop only) ── */}
              <div className="hidden md:block flex-1 sticky top-24">
                {selectedJob ? (
                  <div key={selectedJob.id} className="detail-panel bg-blue-50 rounded-3xl p-7 shadow-lg">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-2xl font-bold text-blue-800">{selectedJob.jobTitle}</h4>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${employmentTypeBadge(selectedJob.employmentType)}`}>
                        {formatEmploymentType(selectedJob.employmentType)}
                      </span>
                    </div>

                    <div className="space-y-3 mt-6">
                      <p className="text-gray-700 text-lg">📍 <span className="font-medium">Location:</span> {selectedJob.location}</p>
                      <p className="text-gray-700 text-lg">💰 <span className="font-medium">Salary:</span> {selectedJob.salaryRange}</p>
                      <p><strong>Qualification:</strong> {selectedJob.qualification}</p>
                      <p><strong>Skills:</strong> {selectedJob.skills}</p>
                      <p><strong>Deadline:</strong> {selectedJob.applicationDeadline}</p>
                    </div>

                    <div className="mt-5">
                      <p className="text-gray-600 break-words">
                        {selectedJob.jobDescription}
                      </p>
                    </div>

                    <div className="mt-8 flex flex-col items-end gap-3">
                      <button
                        onClick={() => handleApply(selectedJob.id)}
                        disabled={appliedJobs.includes(selectedJob.id)}
                        className={`px-8 py-2.5 rounded-xl text-base font-semibold transition ${appliedJobs.includes(selectedJob.id)
                          ? "bg-green-600 text-white cursor-not-allowed"
                          : "bg-blue-700 hover:bg-blue-800 text-white cursor-pointer"
                          }`}
                      >
                        {appliedJobs.includes(selectedJob.id) ? "Applied ✓" : "Apply Now"}
                      </button>
                      <p className="text-xs text-black-400 text-right">
                        Don't see a role that fits?{" "}
                        <a
                          href={`https://wa.me/918939592323?text=${encodeURIComponent("Hi, I would like to know about the current job openings. Please let me know the available timings for a walk-in interview or a call with the HR team.")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 font-semibold underline underline-offset-2"
                        >
                          Enquire on WhatsApp →
                        </a>
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-blue-50 rounded-3xl p-7 shadow-lg text-center text-gray-400">
                    <p className="text-xl">Select a job on the left to view details</p>
                  </div>
                )}
              </div>

            </div>
          )}


        </section>

        {/* ── Mobile bottom sheet ── */}
        {sheetOpen && selectedJob && (
          <div className="md:hidden fixed inset-0 z-50 flex flex-col justify-end">
            {/* backdrop */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSheetOpen(false)} />
            {/* sheet */}
            <div className="sheet-panel relative bg-white rounded-t-3xl max-h-[88vh] overflow-y-auto z-10">
              {/* drag handle */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-gray-300" />
              </div>
              {/* close button */}
              <button onClick={() => setSheetOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold p-1">✕</button>

              <div key={selectedJob.id} className="detail-panel p-6 pt-3">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-xl font-bold text-blue-800 pr-8">{selectedJob.jobTitle}</h4>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold shrink-0 ${employmentTypeBadge(selectedJob.employmentType)}`}>
                    {formatEmploymentType(selectedJob.employmentType)}
                  </span>
                </div>

                <div className="space-y-3 mt-4">
                  <p className="text-gray-700 flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-600 shrink-0" fill="currentColor" viewBox="0 0 384 512"><path d="M215.7 499.2C267 435 384 279.4 384 192 384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" /></svg>
                    <span><span className="font-medium">Location:</span> {selectedJob.location}</span>
                  </p>
                  <p className="text-gray-700 flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-600 shrink-0" fill="currentColor" viewBox="0 0 320 512"><path d="M308 96c6.6 0 12-5.4 12-12V44c0-6.6-5.4-12-12-12H12C5.4 32 0 37.4 0 44v44.7c0 6.6 5.4 12 12 12h85.5c32.6 0 61.9 16.9 76.4 43.2H12c-6.6 0-12 5.4-12 12v42.7c0 6.6 5.4 12 12 12h176c-11.3 49.1-54.9 86.1-108.2 87.9L12 299c-6.6.2-12 5.6-12 12.2v47.6c0 3.4 1.4 6.6 3.9 8.9l176.9 163.4c2.3 2.1 5.2 3.2 8.3 3.2H255c10.8 0 16.5-12.8 9.2-20.8L101.8 352.3c67.2-10.2 116.6-64.7 121.9-131.3H308c6.6 0 12-5.4 12-12v-42.7c0-6.6-5.4-12-12-12h-80.8c-7-14.3-17.2-26.8-29.5-37H308z" /></svg>
                    <span><span className="font-medium">Salary:</span> {selectedJob.salaryRange}</span>
                  </p>
                  <p className="text-gray-700 flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-600 shrink-0" fill="currentColor" viewBox="0 0 512 512"><path d="M184 48H328c4.4 0 8 3.6 8 8V96H176V56c0-4.4 3.6-8 8-8zm-56 8V96H64C28.7 96 0 124.7 0 160v96H192 320 512V160c0-35.3-28.7-64-64-64H384V56c0-30.9-25.1-56-56-56H184c-30.9 0-56 25.1-56 56zM512 288H320v32c0 17.7-14.3 32-32 32H224c-17.7 0-32-14.3-32-32V288H0V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V288z" /></svg>
                    <span><span className="font-medium">Experience:</span> {selectedJob.experience || "Fresher"}</span>
                  </p>
                  <p className="text-gray-700 flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-600 shrink-0" fill="currentColor" viewBox="0 0 448 512"><path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z" /></svg>
                    <span><span className="font-medium">Deadline:</span> {selectedJob.applicationDeadline}</span>
                  </p>
                  <p className="text-gray-700"><strong>Qualification:</strong> {selectedJob.qualification}</p>
                  <p className="text-gray-700"><strong>Skills:</strong> {selectedJob.skills}</p>
                </div>

                <div className="mt-5">
                  <p className="text-gray-600 break-words">{selectedJob.jobDescription}</p>
                </div>

                <div className="mt-8 flex flex-col items-end gap-3 pb-4">
                  <button
                    onClick={() => handleApply(selectedJob.id)}
                    disabled={appliedJobs.includes(selectedJob.id)}
                    className={`px-8 py-2.5 rounded-xl text-base font-semibold transition ${appliedJobs.includes(selectedJob.id)
                      ? "bg-green-600 text-white cursor-not-allowed"
                      : "bg-blue-700 hover:bg-blue-800 text-white cursor-pointer"
                      }`}
                  >
                    {appliedJobs.includes(selectedJob.id) ? "Applied ✓" : "Apply Now"}
                  </button>
                  <p className="text-xs text-gray-400 text-right">
                    Don't see a role that fits?{" "}
                    <a
                      href={`https://wa.me/918939592323?text=${encodeURIComponent("Hi, I would like to know about the current job openings. Please let me know the available timings for a walk-in interview or a call with the HR team.")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 font-semibold underline underline-offset-2"
                    >
                      Enquire on WhatsApp →
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Apply modal (unchanged) ── */}
        {activeFormJobId && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center p-4 overflow-y-auto">
            <div className="relative bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-1 animate-in fade-in zoom-in-95 duration-200 shadow-2xl">
              <button
                onClick={() => setActiveFormJobId(null)}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 font-bold text-xl z-10 p-2"
              >✕</button>
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

      {/* ── Success Toast ── */}
      {toast && (
        <SuccessToast message={toast} onClose={() => setToast("")} />
      )}
    </>
  );
};

export default JobPortal;


/* ─────────────────────────────────────────────
   ApplicationForm — completely unchanged
───────────────────────────────────────────── */
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

  const [phoneError, setPhoneError] = useState("");
  const [phoneLengthError, setPhoneLengthError] = useState("");
  const [emailError, setEmailError] = useState("");

  const countryCodeOptions = [
    { label: "India +91", value: "+91", digits: 10 },
    { label: "United States +1", value: "+1", digits: 10 },
    { label: "United Kingdom +44", value: "+44", digits: 10 },
    { label: "Australia +61", value: "+61", digits: 9 },
    { label: "UAE +971", value: "+971", digits: 9 },
    { label: "Qatar +974", value: "+974", digits: 8 },
    { label: "Kuwait +965", value: "+965", digits: 8 },
    { label: "Saudi Arabia +966", value: "+966", digits: 9 },
    { label: "New Zealand +64", value: "+64", digits: 9 },
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
    { label: "Other", value: "OTHER" },
  ];

  const sourceOptions = [
    { label: "WhatsApp", value: "WHATSAPP" },
    { label: "Google", value: "GOOGLE" },
    { label: "Referral", value: "REFERRAL" },
    { label: "LinkedIn", value: "LINKEDIN" },
    { label: "Facebook", value: "FACEBOOK" },
    { label: "Instagram", value: "INSTAGRAM" },
    { label: "YouTube", value: "YOUTUBE" },
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
    const country = countryCodeOptions.find((c) => c.value === code);
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

    // Clear all validation errors before re-checking
    setEmailError("");
    setPhoneLengthError("");
    setPhoneError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    const phoneLimit = getDigitLimit(formData.countryCode);
    if (formData.phone.length !== phoneLimit) {
      setPhoneLengthError(`Phone number must contain exactly ${phoneLimit} digits.`);
      return;
    }

    if (formData.alternatePhone) {
      const alternateLimit = getDigitLimit(formData.alternateCountryCode);
      if (formData.alternatePhone.length !== alternateLimit) {
        setPhoneError(`Alternate number must contain exactly ${alternateLimit} digits.`);
        return;
      }
    }

    if (
      formData.alternatePhone &&
      formData.phone === formData.alternatePhone &&
      formData.countryCode === formData.alternateCountryCode
    ) {
      setPhoneError("Alternate phone number must be different from the primary phone number.");
      return;
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
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Phone Number (WhatsApp)</label>
            <div className="flex gap-2">
              <select name="countryCode" value={formData.countryCode} onChange={handleChange}
                className="bg-gray-50 border-0 rounded-2xl p-4 text-gray-800 outline-none min-w-[140px]">
                {countryCodeOptions.map((country) => (
                  <option key={country.value} value={country.value}>{country.label}</option>
                ))}
              </select>
              <input type="tel" name="phone" value={formData.phone}
                onChange={(e) => {
                  const digitsOnly = e.target.value.replace(/\D/g, "");
                  const limit = getDigitLimit(formData.countryCode);
                  if (digitsOnly.length <= limit) {
                    setFormData({ ...formData, phone: digitsOnly });
                    setPhoneLengthError("");
                  }
                }}
                placeholder="WhatsApp Number"
                className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-gray-800" required />
            </div>
            {phoneLengthError && (
              <p className="mt-2 text-sm text-red-600 font-medium">{phoneLengthError}</p>
            )}
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Alternate Phone Number</label>
            <div className="flex gap-2">
              <select name="alternateCountryCode" value={formData.alternateCountryCode} onChange={handleChange}
                className="bg-gray-50 border-0 rounded-2xl p-4 text-gray-800 outline-none min-w-[140px]">
                {countryCodeOptions.map((country) => (
                  <option key={country.value} value={country.value}>{country.label}</option>
                ))}
              </select>
              <input type="tel" name="alternatePhone" value={formData.alternatePhone}
                onChange={(e) => {
                  const digitsOnly = e.target.value.replace(/\D/g, "");
                  const limit = getDigitLimit(formData.alternateCountryCode);

                  if (digitsOnly.length <= limit) {
                    setFormData({
                      ...formData,
                      alternatePhone: digitsOnly
                    });

                    setPhoneError("");
                  }
                }}
                placeholder="Alternate Number"
                className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-gray-800" />
            </div>
            {phoneError && (
              <p className="mt-2 text-sm text-red-600 font-medium">
                {phoneError}
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => { handleChange(e); setEmailError(""); }}
              placeholder="email@example.com"
              className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition"
              required
            />
            {emailError && (
              <p className="mt-2 text-sm text-red-600 font-medium">{emailError}</p>
            )}
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Current Location? (Area & City)</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="e.g. Adyar, Chennai" className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition" required />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Languages You Speak?</label>
            <Select isMulti={true} name="language" options={languageOptions} value={formData.language}
              onChange={(selectedOptions) => setFormData({ ...formData, language: selectedOptions || [] })}
              placeholder="Select Languages..."
              styles={{
                control: (base) => ({ ...base, backgroundColor: "#f9fafb", border: "none", borderRadius: "1rem", padding: "0.5rem", boxShadow: "none" }),
                multiValue: (base) => ({ ...base, backgroundColor: "#e5e7eb", borderRadius: "0.5rem", padding: "2px 6px" }),
                multiValueLabel: (base) => ({ ...base, color: "#1f2937", fontSize: "0.875rem" }),
                multiValueRemove: (base) => ({ ...base, color: "#9ca3af", ":hover": { backgroundColor: "#d1d5db", color: "#111827" } }),
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
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Experience</label>
            <select name="experience" value={formData.experience} onChange={handleChange} className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition appearance-none" required>
              <option value="">Select Experience</option>
              <option value="fresher">Fresher</option>
              <option value="less than 1 year">Less than 1 year</option>
              <option value="1-5 years">1-5 years</option>
              <option value="5-10 years">5-10 years</option>
              <option value="more than 10 years">More than 10 years</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">How did you know about Careerschool?</label>
            <select name="source" value={formData.source} onChange={handleChange} className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition appearance-none" required>
              <option value="">Choose Source</option>
              {sourceOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
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