import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Select from "react-select";
import SuccessToast from "../components/SuccessToast";

const JOBS_PER_PAGE = 12;

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

const formatDate = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

/* ─── SVG Icons ─── */
const IconLocation = () => (
  <svg className="w-4 h-4 text-blue-500 shrink-0" fill="currentColor" viewBox="0 0 384 512">
    <path d="M215.7 499.2C267 435 384 279.4 384 192 384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
  </svg>
);
const IconSalary = () => (
  <svg className="w-4 h-4 text-blue-500 shrink-0" fill="currentColor" viewBox="0 0 320 512">
    <path d="M308 96c6.6 0 12-5.4 12-12V44c0-6.6-5.4-12-12-12H12C5.4 32 0 37.4 0 44v44.7c0 6.6 5.4 12 12 12h85.5c32.6 0 61.9 16.9 76.4 43.2H12c-6.6 0-12 5.4-12 12v42.7c0 6.6 5.4 12 12 12h176c-11.3 49.1-54.9 86.1-108.2 87.9L12 299c-6.6.2-12 5.6-12 12.2v47.6c0 3.4 1.4 6.6 3.9 8.9l176.9 163.4c2.3 2.1 5.2 3.2 8.3 3.2H255c10.8 0 16.5-12.8 9.2-20.8L101.8 352.3c67.2-10.2 116.6-64.7 121.9-131.3H308c6.6 0 12-5.4 12-12v-42.7c0-6.6-5.4-12-12-12h-80.8c-7-14.3-17.2-26.8-29.5-37H308z" />
  </svg>
);
const IconBag = () => (
  <svg className="w-4 h-4 text-blue-500 shrink-0" fill="currentColor" viewBox="0 0 512 512">
    <path d="M184 48H328c4.4 0 8 3.6 8 8V96H176V56c0-4.4 3.6-8 8-8zm-56 8V96H64C28.7 96 0 124.7 0 160v96H192 320 512V160c0-35.3-28.7-64-64-64H384V56c0-30.9-25.1-56-56-56H184c-30.9 0-56 25.1-56 56zM512 288H320v32c0 17.7-14.3 32-32 32H224c-17.7 0-32-14.3-32-32V288H0V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V288z" />
  </svg>
);
const IconCalendar = () => (
  <svg className="w-4 h-4 text-blue-500 shrink-0" fill="currentColor" viewBox="0 0 448 512">
    <path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336z" />
  </svg>
);

const JobPortal = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [activeFormJobId, setActiveFormJobId] = useState(null);
  const [toast, setToast] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const hireStudentsLink = "https://wa.me/7305014818";
  const contactLink = "https://wa.me/7708938866";

  useEffect(() => { fetchJobs(); }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/jobs/active");
      const data = await response.json();
      const sorted = [...data].sort((a, b) => b.id - a.id);
      setJobs(sorted);
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

  const handleSearch = (e) => { e.preventDefault(); setCurrentPage(1); };

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

  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * JOBS_PER_PAGE,
    currentPage * JOBS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* Build page number array with ellipsis */
  const getPageNumbers = () => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages = [];
    if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, "...", totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
    }
    return pages;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl font-bold text-blue-700">
        Loading jobs...
      </div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.96) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        .modal-panel { animation: modalIn 0.22s cubic-bezier(0.34,1.2,0.64,1) both; }

        @keyframes cardPop {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .job-card { animation: cardPop 0.18s ease both; }

        .job-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 28px rgba(30,64,175,0.13);
        }
        .job-card { transition: transform 0.18s ease, box-shadow 0.18s ease; }

        .page-btn {
          min-width: 38px;
          height: 38px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.875rem;
          cursor: pointer;
          border: 2px solid transparent;
          transition: all 0.15s ease;
        }
        .page-btn-default {
          background: #ffffff;
          color: #1e40af;
          border-color: #bfdbfe;
        }
        .page-btn-default:hover {
          background: #eff6ff;
          border-color: #93c5fd;
        }
        .page-btn-active {
          background: #1d4ed8;
          color: #ffffff;
          border-color: #1d4ed8;
          box-shadow: 0 2px 8px rgba(29,78,216,0.35);
        }
        .page-btn-nav {
          background: #eff6ff;
          color: #1e40af;
          border-color: #bfdbfe;
          padding: 0 14px;
        }
        .page-btn-nav:hover:not(:disabled) {
          background: #dbeafe;
          border-color: #93c5fd;
        }
        .page-btn-nav:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .page-btn-ellipsis {
          background: transparent;
          color: #6b7280;
          cursor: default;
          border-color: transparent;
        }
      `}</style>

      <div className="min-h-screen bg-gray-50 font-sans">

        {/* ── Header ── */}
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
              <img src="/Zoho Images/ZOHO LOGO - Zoho Card.png" className="h-7 sm:h-7 md:h-9 object-contain" alt="Zoho Logo" />
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
        <section className="bg-gradient-to-r from-blue-700 to-blue-500 text-white px-4 sm:px-20 py-10 text-center">
          <h2 className="text-3xl sm:text-5xl font-bold mb-5 leading-tight">Find Your Dream Job Today</h2>
          <p className="text-lg sm:text-xl mb-8 text-blue-100">Explore jobs from top companies and apply instantly.</p>
          <form onSubmit={handleSearch} className="flex justify-center">
            <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/30 rounded-2xl px-3 py-2.5 shadow-lg w-full max-w-xl mx-4 sm:mx-0">
              <svg className="w-5 h-5 text-white/70 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 6.5 6.5a7.5 7.5 0 0 0 10.15 10.15z" />
              </svg>
              <input
                type="text"
                placeholder="Search jobs by title or location..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                className="flex-1 min-w-0 bg-transparent text-white placeholder-blue-200 outline-none text-sm sm:text-base"
              />
              <button type="submit"
                className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold px-4 sm:px-6 py-2 rounded-xl text-sm sm:text-base transition cursor-pointer shrink-0 whitespace-nowrap">
                Search
              </button>
            </div>
          </form>
        </section>

        {/* ── Jobs Grid Section ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-800">Latest Job Openings</h3>
            {filteredJobs.length > 0 && (
              <span className="text-sm text-gray-500 bg-white border border-blue-100 rounded-full px-4 py-1.5 font-medium self-start sm:self-auto">
                {filteredJobs.length} {filteredJobs.length === 1 ? "job" : "jobs"} found
                {totalPages > 1 && ` · Page ${currentPage} of ${totalPages}`}
              </span>
            )}
          </div>

          {filteredJobs.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-xl text-gray-600 mb-4">No jobs found matching your search.</p>
              <button onClick={() => { setSearchTerm(""); setCurrentPage(1); }}
                className="mt-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-semibold">
                Clear Search
              </button>
            </div>
          ) : (
            <>
              {/* ── 12-Card Grid ── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {paginatedJobs.map((job, idx) => (
                  <div
                    key={job.id}
                    className="job-card bg-white rounded-2xl p-5 border border-blue-50 shadow-sm cursor-pointer flex flex-col gap-3"
                    style={{ animationDelay: `${idx * 0.04}s` }}
                    onClick={() => setSelectedJob(job)}
                  >
                    {/* Title + badge */}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-base font-bold text-blue-900 leading-snug line-clamp-2 flex-1">
                          {job.jobTitle}
                        </h4>
                      </div>
                      <span className={`self-start px-2.5 py-0.5 rounded-full text-xs font-semibold ${employmentTypeBadge(job.employmentType)}`}>
                        {formatEmploymentType(job.employmentType)}
                      </span>
                    </div>

                    {/* Meta info */}
                    <div className="flex flex-col gap-2 mt-1 flex-1">
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <IconLocation />
                        <span className="truncate">{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <IconSalary />
                        <span className="truncate">{job.salaryRange}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <IconBag />
                        <span className="truncate">{job.experience || "Fresher"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-red-400 text-sm font-semibold">
                        <IconCalendar />
                        <span className="truncate">Deadline: {formatDate(job.applicationDeadline)}</span>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="pt-2 border-t border-gray-100">
                      <span className="text-blue-600 text-xs font-semibold hover:text-blue-800 transition">
                        View Details →
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* ── Pagination ── */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-1.5 mt-10 flex-wrap">
                  <button
                    className="page-btn page-btn-nav"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    ← Previous
                  </button>

                  {getPageNumbers().map((page, i) => (
                    page === "..." ? (
                      <span key={`ellipsis-${i}`} className="page-btn page-btn-ellipsis">…</span>
                    ) : (
                      <button
                        key={page}
                        className={`page-btn ${page === currentPage ? "page-btn-active" : "page-btn-default"}`}
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </button>
                    )
                  ))}

                  <button
                    className="page-btn page-btn-nav"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </section>

        <Footer />
      </div>

      {/* ── Job Detail Modal (popup) ── */}
      {selectedJob && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
          style={{ background: "rgba(15,23,42,0.55)", backdropFilter: "blur(4px)" }}
          onClick={() => setSelectedJob(null)}
        >
          <div
            className="modal-panel bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header strip */}
            <div className="sticky top-0 bg-white rounded-t-3xl border-b border-gray-100 px-6 pt-5 pb-4 flex items-start justify-between gap-3 z-10">
              <div className="flex-1 min-w-0">
                <h2 className="text-xl sm:text-2xl font-bold text-blue-900 leading-snug">{selectedJob.jobTitle}</h2>
                <span className={`inline-block mt-2 px-3 py-0.5 rounded-full text-xs font-semibold ${employmentTypeBadge(selectedJob.employmentType)}`}>
                  {formatEmploymentType(selectedJob.employmentType)}
                </span>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="text-gray-400 hover:text-gray-700 transition text-2xl font-light shrink-0 -mt-1 p-1 rounded-full hover:bg-gray-100"
                aria-label="Close"
              >✕</button>
            </div>

            {/* Modal body */}
            <div className="px-6 py-5 space-y-5">
              {/* Quick facts grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { icon: <IconLocation />, label: "Location", value: selectedJob.location },
                  { icon: <IconSalary />, label: "Salary", value: selectedJob.salaryRange },
                  { icon: <IconBag />, label: "Experience", value: selectedJob.experience || "Fresher" },
                  { icon: <IconCalendar />, label: "Deadline", value: formatDate(selectedJob.applicationDeadline) },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3 bg-blue-50 rounded-xl p-3.5">
                    <div className="mt-0.5">{icon}</div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">{label}</p>
                      <p
                        className={`text-sm font-medium mt-0.5 break-words ${
                          label === "Deadline" ? "text-red-400 font-bold" : "text-gray-800"
                        }`}
                      >
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Qualification & Skills */}
              {(selectedJob.qualification || selectedJob.skills) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedJob.qualification && (
                    <div className="bg-gray-50 rounded-xl p-3.5">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Qualification</p>
                      <p className="text-sm text-gray-800">{selectedJob.qualification}</p>
                    </div>
                  )}
                  {selectedJob.skills && (
                    <div className="bg-gray-50 rounded-xl p-3.5">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Skills Required</p>
                      <p className="text-sm text-gray-800">{selectedJob.skills}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Job description */}
              {selectedJob.jobDescription && (
                <div>
                  <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-2">Job Description</h4>
                  <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{selectedJob.jobDescription}</p>
                </div>
              )}
            </div>

            {/* Modal footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-100 rounded-b-3xl px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <p className="text-xs text-gray-400">
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
              <button
                onClick={() => handleApply(selectedJob.id)}
                disabled={appliedJobs.includes(selectedJob.id)}
                className={`shrink-0 px-8 py-2.5 rounded-xl text-sm font-bold transition ${
                  appliedJobs.includes(selectedJob.id)
                    ? "bg-green-600 text-white cursor-not-allowed"
                    : "bg-blue-700 hover:bg-blue-800 text-white cursor-pointer shadow-md hover:shadow-lg"
                }`}
              >
                {appliedJobs.includes(selectedJob.id) ? "Applied ✓" : "Apply Now"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Apply Form Modal ── */}
      {activeFormJobId && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center p-4 overflow-y-auto">
          <div className="relative bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-1 shadow-2xl">
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
      const result = await response.json();

      if (response.ok && result.success) {
        onSuccess();
      } else {
        const errorMessages = result?.errors
          ? Object.values(result.errors).join(" ")
          : result?.message || "Failed to submit application. Please try again.";
        alert(errorMessages);
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("An unexpected error occurred while submitting. Please try again.");
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
                    setFormData({ ...formData, alternatePhone: digitsOnly });
                    setPhoneError("");
                  }
                }}
                placeholder="Alternate Number"
                className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-gray-800" />
            </div>
            {phoneError && (
              <p className="mt-2 text-sm text-red-600 font-medium">{phoneError}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Email</label>
            <input type="email" name="email" value={formData.email}
              onChange={(e) => { handleChange(e); setEmailError(""); }}
              placeholder="email@example.com"
              className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition" required />
            {emailError && <p className="mt-2 text-sm text-red-600 font-medium">{emailError}</p>}
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
