import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

/* Every filterable column of the applications table */
const emptyFilters = {
  jobTitle: "",
  fullName: "",
  studentId: "",
  phone: "",
  alternatePhone: "",
  email: "",
  location: "",
  language: "",
  highestEducation: "",
  collegeName: "",
  stream: "",
  yearOfPassing: "",
  arrears: "",
  experience: "",
  source: "",
};

/* Field-by-field controls shown inside the right-side filter drawer */
const filterFields = [
  { key: "jobTitle", label: "Job Title", type: "text", placeholder: "e.g. Telecaller" },
  { key: "fullName", label: "Full Name", type: "text", placeholder: "e.g. Arun Kumar" },
  { key: "phone", label: "Phone Number", type: "text", placeholder: "e.g. 9123456789" },
  { key: "alternatePhone", label: "Alt Phone", type: "text", placeholder: "e.g. 9123456789" },
  { key: "email", label: "Email", type: "text", placeholder: "e.g. gmail.com" },
  { key: "location", label: "Location", type: "text", placeholder: "e.g. Chennai" },
  { key: "language", label: "Languages Spoken", type: "text", placeholder: "e.g. TAMIL" },
  { key: "studentId", label: "Student ID", type: "text", placeholder: "e.g. CS-1024" },
  { key: "highestEducation", label: "Highest Education", type: "select", options: ["10th", "12th", "Graduate", "PG"] },
  { key: "collegeName", label: "College Name", type: "text", placeholder: "e.g. Anna University" },
  { key: "stream", label: "Stream", type: "select", options: ["BTECH", "BCA", "BSC", "BCOM", "BBA", "BA", "MCA", "MBA", "DIPLOMA", "ITI", "OTHER"] },
  { key: "yearOfPassing", label: "Year of Passing", type: "text", placeholder: "e.g. 2025" },
  { key: "arrears", label: "Arrears Status", type: "select", options: ["No", "Yes"] },
  { key: "experience", label: "Experience Level", type: "select", options: ["fresher", "less than 1 year", "1-5 years", "5-10 years", "more than 10 years"] },
  { key: "source", label: "Source", type: "select", options: ["WHATSAPP", "GOOGLE", "REFERRAL", "LINKEDIN", "FACEBOOK", "INSTAGRAM", "YOUTUBE"] },
];

export default function Applications() {
  const router = useRouter();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  // Right-side filter drawer state
  const [showFilter, setShowFilter] = useState(false);
  const [draftFilters, setDraftFilters] = useState(emptyFilters); // edited inside the drawer
  const [activeFilters, setActiveFilters] = useState(emptyFilters); // applied to the table

  useEffect(() => {
    const authStatus = sessionStorage.getItem("isHRAuthenticated");
    if (authStatus !== "true") {
      router.push("/HRLogin");
    } else {
      setIsVerified(true);
    }
  }, [router]);

  useEffect(() => {
    if (!isVerified) return;
    const fetchApplications = async () => {
      try {
        const response = await fetch("https://career-school.co.in/api/applications");
        const data = await response.json();
        setApplications(data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, [isVerified]);

  const handleDraftChange = (field, value) =>
    setDraftFilters((prev) => ({ ...prev, [field]: value }));

  const applyFilters = () => {
    const cleaned = {};
    Object.keys(draftFilters).forEach((key) => {
      const v = draftFilters[key].trim();
      if (v) cleaned[key] = v;
    });
    setActiveFilters(cleaned);
    setShowFilter(false);
  };

  const resetFilters = () => {
    setDraftFilters(emptyFilters);
    setActiveFilters(emptyFilters);
  };

  const activeFilterCount = Object.keys(activeFilters).length;

  const filteredApplications = applications.filter((app) => {
    // Universal top search bar (searches across all columns)
    const term = searchTerm.toLowerCase().trim();
    if (term) {
      const haystack = [
        app.jobTitle, app.fullName, app.studentId, app.phone, app.alternatePhone,
        app.email, app.location, app.language, app.highestEducation,
        app.collegeName, app.stream, app.yearOfPassing, app.arrears,
        app.experience, app.source,
      ].join(" ").toLowerCase();
      if (!haystack.includes(term)) return false;
    }
    // Field-by-field drawer filters — combined with (not cleared by) the search bar
    for (const [field, value] of Object.entries(activeFilters)) {
      if (!(app[field] || "").toString().toLowerCase().includes(value.toLowerCase())) return false;
    }
    return true;
  });

  /* Export the currently visible (filtered) rows to CSV */
  const exportCsv = () => {
    const headers = ["Job Title", "Full Name", "Student I'd", "Phone", "Alt. Phone", "Email", "Location", "Language", "Education", "College", "Stream", "YOP", "Arrears", "Experience", "Source"];
    const keys = ["jobTitle", "fullName", "studentId", "phone", "alternatePhone", "email", "location", "language", "highestEducation", "collegeName", "stream", "yearOfPassing", "arrears", "experience", "source"];
    const escape = (v) => {
      const s = v === null || v === undefined ? "" : String(v);
      return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const lines = [
      headers.map(escape).join(","),
      ...filteredApplications.map((app) => keys.map((k) => escape(app[k])).join(",")),
    ];
    const blob = new Blob(["\uFEFF" + lines.join("\r\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `applications_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (!isVerified) {
    return (
      <div className="min-h-screen bg-blue-50 flex justify-center items-center font-semibold text-blue-800">
        Verifying access security...
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl font-semibold">
        Loading applications...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-green-700">Applied Candidates</h1>
        <button onClick={() => router.push("/hr-portal")} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold">
          Back to HR Portal
        </button>
      </div>
      <div className="bg-white p-6 rounded-3xl shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-green-700">Applications</h2>
            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold whitespace-nowrap">
              {filteredApplications.length}
              {(searchTerm || activeFilterCount) ? ` of ${applications.length}` : ""} Applications
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {/* Filter button (funnel) — opens the right-side drawer */}
            <button
              onClick={() => { setDraftFilters({ ...activeFilters }); setShowFilter(true); }}
              className="flex items-center gap-2 border-2 border-green-400 text-green-700 hover:bg-green-50 rounded-2xl px-4 py-2.5 font-semibold shadow-sm transition"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 5h18l-7 8.2V19l-4 2v-7.8L3 5z" />
              </svg>
              Filters
              {activeFilterCount > 0 && (
                <span className="bg-green-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
                  {activeFilterCount}
                </span>
              )}
            </button>
            {/* Universal search bar */}
            <div className="flex items-center gap-2 bg-white border-2 border-green-400 focus-within:border-green-600 rounded-2xl px-3 py-2.5 shadow-sm w-full sm:w-auto sm:min-w-[320px] transition">
              <svg className="w-4 h-4 text-gray-400 shrink-0" fill="currentColor" viewBox="0 0 512 512">
                <path d="M416 208c0 45.4-14.9 87.3-40 120.9L502.6 457c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L341 363.9C307.4 389.1 265.4 404 220 404C98.6 404 0 305.4 0 184S98.6-36 220-36 416 86.6 416 208zM220 336c70.7 0 128-57.3 128-128S290.7 80 220 80 92 137.3 92 208s57.3 128 128 128z" />
              </svg>
              <input type="text" placeholder="Search by job title, phone or location..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="flex-1 min-w-0 bg-transparent text-gray-700 placeholder-gray-400 outline-none text-sm" />
              {searchTerm && (
                <button onClick={() => setSearchTerm("")} className="text-gray-400 hover:text-gray-600 text-lg leading-none shrink-0">×</button>
              )}
            </div>
            {/* Export to CSV/Excel */}
            <button
              onClick={exportCsv}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white rounded-2xl px-4 py-2.5 font-semibold shadow-sm transition"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3v11m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
              </svg>
              Export to CSV/Excel
            </button>
          </div>
        </div>
        {filteredApplications.length === 0 ? (
          <div className="text-center py-10 text-gray-500 text-lg">
            {searchTerm || activeFilterCount
              ? "No applications match your current search/filters."
              : "No applications found."}
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="px-4 py-4 whitespace-nowrap">Job Title</th>
                  <th className="px-4 py-4 whitespace-nowrap">Full Name</th>
                  <th className="px-4 py-4 whitespace-nowrap">Student I'd</th>
                  <th className="px-4 py-4 whitespace-nowrap">Phone</th>
                  <th className="px-4 py-4 whitespace-nowrap">Alt. Phone</th>
                  <th className="px-4 py-4 whitespace-nowrap">Email</th>
                  <th className="px-4 py-4 whitespace-nowrap">Location</th>
                  <th className="px-4 py-4 whitespace-nowrap">Language</th>
                  <th className="px-4 py-4 whitespace-nowrap">Education</th>
                  <th className="px-4 py-4 whitespace-nowrap">College</th>
                  <th className="px-4 py-4 whitespace-nowrap">Stream</th>
                  <th className="px-4 py-4 whitespace-nowrap">YOP</th>
                  <th className="px-4 py-4 whitespace-nowrap">Arrears</th>
                  <th className="px-4 py-4 whitespace-nowrap">Experience</th>
                  <th className="px-4 py-4 whitespace-nowrap">Source</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map((app, index) => (
                  <tr key={app.id} className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-green-50 transition`}>
                    <td className="px-4 py-4 whitespace-nowrap font-semibold max-w-[220px] truncate" title={app.jobTitle}>{app.jobTitle}</td>
                    <td className="px-4 py-4 whitespace-nowrap">{app.fullName}</td>
                    <td className="px-4 py-4 whitespace-nowrap">{app.studentId || "—"}</td>
                    <td className="px-4 py-4 whitespace-nowrap">{app.phone}</td>
                    <td className="px-4 py-4 whitespace-nowrap">{app.alternatePhone || "—"}</td>
                    <td className="px-4 py-4 whitespace-nowrap">{app.email}</td>
                    <td className="px-4 py-4 whitespace-nowrap">{app.location}</td>
                    <td className="px-4 py-4 whitespace-nowrap">{app.language || "—"}</td>
                    <td className="px-4 py-4 whitespace-nowrap">{app.highestEducation}</td>
                    <td className="px-4 py-4 whitespace-nowrap">{app.collegeName}</td>
                    <td className="px-4 py-4 whitespace-nowrap">{app.stream}</td>
                    <td className="px-4 py-4 whitespace-nowrap">{app.yearOfPassing}</td>
                    <td className="px-4 py-4 whitespace-nowrap">{app.arrears || "—"}</td>
                    <td className="px-4 py-4 whitespace-nowrap">{app.experience}</td>
                    <td className="px-4 py-4 whitespace-nowrap">{app.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Right-side Filter Drawer ── */}
      <div className={`fixed inset-0 z-50 ${showFilter ? "" : "pointer-events-none"}`}>
        {/* Overlay — click outside to close */}
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${showFilter ? "opacity-100" : "opacity-0"}`}
          onClick={() => setShowFilter(false)}
        />
        {/* Slide-over panel */}
        <div className={`absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col transition-transform duration-300 ${showFilter ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex items-center justify-between border-b border-gray-100 p-4">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-green-700">Filters</h3>
              {activeFilterCount > 0 && (
                <span className="bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full">
                  {activeFilterCount} active
                </span>
              )}
            </div>
            <button
              onClick={() => setShowFilter(false)}
              className="text-gray-400 hover:text-gray-700 text-2xl font-light p-1 rounded-full hover:bg-gray-100"
              aria-label="Close filters"
            >✕</button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {filterFields.map((f) => (
              <div key={f.key}>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">{f.label}</label>
                {f.type === "select" ? (
                  <select
                    value={draftFilters[f.key]}
                    onChange={(e) => handleDraftChange(f.key, e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-green-500 transition"
                  >
                    <option value="">All</option>
                    {f.options.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={draftFilters[f.key]}
                    onChange={(e) => handleDraftChange(f.key, e.target.value)}
                    placeholder={f.placeholder}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-green-500 transition"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 p-4 flex items-center gap-3 bg-white">
            <button
              onClick={resetFilters}
              className="flex-1 border-2 border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl py-3 font-semibold transition"
            >
              Reset / Clear All
            </button>
            <button
              onClick={applyFilters}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-xl py-3 font-bold transition"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}