import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Footer from "../components/Footer";
import JobForm from "../components/JobForm";
import SuccessToast from "../components/SuccessToast";
import { qualifications } from "../constants/qualifications";
import { indianCities } from "../constants/locations";

const statusBadge = (status) => {
  if (status === "ACTIVE")   return "bg-green-100 text-green-700";
  if (status === "INACTIVE") return "bg-orange-100 text-orange-700";
  if (status === "EXPIRED")  return "bg-red-100 text-red-600";
  return "bg-gray-100 text-gray-600";
};

const AllJobs = () => {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [jdModal, setJdModal] = useState(null);
  const [editModal, setEditModal] = useState(null);
  const [toast, setToast] = useState(""); // success message; empty = hidden
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  /* ── Auth guard ── */
  useEffect(() => {
    const authStatus = sessionStorage.getItem("isHRAuthenticated");
    if (authStatus !== "true") {
      router.push("/HRLogin");
    } else {
      setIsVerified(true);
    }
  }, [router]);

  /* ── Fetch all jobs ── */
  useEffect(() => {
    if (!isVerified) return;
    const fetchAllJobs = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/jobs/all");
        const data = await response.json();
        const sorted = [...data].sort((a, b) => b.id - a.id);
        setJobs(sorted);
      } catch (err) {
        console.error("Error fetching all jobs:", err);
        setError("Failed to load jobs.");
      } finally {
        setLoading(false);
      }
    };
    fetchAllJobs();
  }, [isVerified]);

  /* ── Refresh jobs list ── */
  const refreshJobs = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/jobs/all");
      const data = await response.json();
      const sorted = [...data].sort((a, b) => b.id - a.id);
      setJobs(sorted);
    } catch (err) {
      console.error("Error refreshing jobs:", err);
    }
  };

  /* ── Convert a saved job into JobForm-compatible initialData ── */
  const toFormData = (job) => {
    // qualification & location are stored as comma-separated strings on the server
    const toOptions = (str, optionsList) => {
      if (!str) return [];
      return str.split(",").map((v) => v.trim()).map((v) => {
        const found = optionsList.find(
          (o) => o.value === v || o.label === v
        );
        return found || { value: v, label: v };
      });
    };
    return {
      jobTitle:            job.jobTitle || "",
      domain:              job.domain || "",
      qualification:       toOptions(job.qualification, qualifications),
      location:            toOptions(job.location, indianCities),
      employmentType:      job.employmentType || "",
      jobDescription:      job.jobDescription || "",
      skills:              job.skills || "",
      salaryRange:         job.salaryRange || "",
      experience:          job.experience || "",
      applicationDeadline: job.applicationDeadline || "",
    };
  };

  /* ── Filtered list ── */
  const filteredJobs = jobs.filter((j) => {
    const matchesStatus = statusFilter === "ALL" || j.status === statusFilter;
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch = !term ||
      (j.jobTitle  || "").toLowerCase().includes(term) ||
      (j.location  || "").toLowerCase().includes(term);
    return matchesStatus && matchesSearch;
  });

  /* ── States ── */
  if (!isVerified) return (
    <div className="min-h-screen bg-blue-50 flex justify-center items-center font-semibold text-blue-800">
      Verifying access security...
    </div>
  );

  if (loading) return (
    <div className="min-h-screen bg-blue-50 flex justify-center items-center text-xl font-bold text-blue-700">
      Loading jobs...
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex justify-center items-center text-2xl font-bold text-red-600">
      {error}
    </div>
  );

  return (
    <>
      <div className="min-h-screen bg-blue-50 p-8">

        {/* ── Header ── */}
        <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
          <h1 className="text-4xl font-bold text-blue-800">All Jobs</h1>
          <div className="flex gap-3">
            <button
              onClick={() => router.push("/hr-portal")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-xl transition shadow"
            >
              ← HR Dashboard
            </button>
            <button
              onClick={() => {
                sessionStorage.removeItem("isHRAuthenticated");
                router.push("/HRLogin");
              }}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-xl transition shadow"
            >
              Logout
            </button>
          </div>
        </div>

        {/* ── Stats + search row ── */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">

          {/* Status filter pills */}
          <div className="flex flex-wrap gap-3">
            {["ALL", "ACTIVE", "INACTIVE", "EXPIRED"].map((s) => {
              const count = s === "ALL"
                ? jobs.length
                : jobs.filter((j) => j.status === s).length;
              const colours = {
                ALL:      "bg-blue-100 text-blue-700 border-blue-200",
                ACTIVE:   "bg-green-100 text-green-700 border-green-200",
                INACTIVE: "bg-orange-100 text-orange-700 border-orange-200",
                EXPIRED:  "bg-red-100 text-red-600 border-red-200",
              };
              return (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-5 py-2.5 rounded-2xl font-semibold border text-sm transition
                    ${colours[s]}
                    ${statusFilter === s ? "ring-2 ring-offset-1 ring-current" : "opacity-70 hover:opacity-100"}`}
                >
                  {s === "ALL" ? "All Jobs" : s.charAt(0) + s.slice(1).toLowerCase()} — {count}
                </button>
              );
            })}
          </div>

          {/* Search bar */}
          <div className="flex items-center gap-2 bg-white border-2 border-blue-300 focus-within:border-blue-500 rounded-2xl px-3 py-2.5 shadow-sm w-full sm:w-auto sm:min-w-[300px] transition">
            <svg className="w-4 h-4 text-blue-400 shrink-0" fill="currentColor" viewBox="0 0 512 512">
              <path d="M416 208c0 45.4-14.9 87.3-40 120.9L502.6 457c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L341 363.9C307.4 389.1 265.4 404 220 404C98.6 404 0 305.4 0 184S98.6-36 220-36 416 86.6 416 208zM220 336c70.7 0 128-57.3 128-128S290.7 80 220 80 92 137.3 92 208s57.3 128 128 128z"/>
            </svg>
            <input
              type="text"
              placeholder="Search by job title or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 min-w-0 bg-transparent text-gray-700 placeholder-gray-400 outline-none text-sm"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm("")} className="text-gray-400 hover:text-gray-600 text-lg leading-none shrink-0">×</button>
            )}
          </div>

        </div>

        {/* ── Table ── */}
        <div className="bg-white rounded-3xl shadow-xl overflow-x-auto">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-16 text-gray-500 text-lg">No jobs found.</div>
          ) : (
            <table className="w-full text-left border border-gray-200 border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wide">
                  <th className="p-3 border border-gray-200">Status</th>
                  <th className="p-3 border border-gray-200">Job Title</th>
                  <th className="p-3 border border-gray-200">Type</th>
                  <th className="p-3 border border-gray-200">Location</th>
                  <th className="p-3 border border-gray-200">Salary</th>
                  <th className="p-3 border border-gray-200">Qualification</th>
                  <th className="p-3 border border-gray-200">Experience</th>
                  <th className="p-3 border border-gray-200">Deadline</th>
                  <th className="p-3 border border-gray-200 text-center">JD</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm">
                {filteredJobs.map((job) => (
                  <tr
                    key={job.id}
                    className={`hover:bg-gray-50 transition ${job.status === "EXPIRED" ? "opacity-60" : ""}`}
                  >
                    <td className="p-3 border border-gray-200">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusBadge(job.status)}`}>
                        {job.status?.charAt(0) + job.status?.slice(1).toLowerCase()}
                      </span>
                    </td>
                    <td className="p-3 border border-gray-200 font-semibold text-blue-900">
                      <span className="flex items-center gap-2">
                        {job.jobTitle}
                        <button
                          title="Edit job"
                          onClick={() => setEditModal(job)}
                          className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-blue-50 hover:bg-blue-200 text-blue-500 hover:text-blue-700 transition-all duration-150 shrink-0"
                        >
                          {/* Pencil / edit icon */}
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </button>
                      </span>
                    </td>
                    <td className="p-3 border border-gray-200">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                        {job.employmentType?.replace("_", " ")}
                      </span>
                    </td>
                    <td className="p-3 border border-gray-200">{job.location}</td>
                    <td className="p-3 border border-gray-200">{job.salaryRange || "Disclosed on interview"}</td>
                    <td className="p-3 border border-gray-200">{job.qualification}</td>
                    <td className="p-3 border border-gray-200">{job.experience || "Fresher"}</td>
                    <td className="p-3 border border-gray-200">{job.applicationDeadline}</td>
                    <td className="p-3 border border-gray-200 text-center">
                      <button
                        onClick={() => setJdModal(job)}
                        className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold py-1 px-3 rounded-lg text-xs transition"
                      >
                        View JD
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>

      {/* ── JD Modal ── */}
      {jdModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center p-4"
          onClick={() => setJdModal(null)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl w-full max-w-xl max-h-[80vh] overflow-y-auto p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setJdModal(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 text-xl font-bold"
            >✕</button>

            <div className="flex items-start justify-between gap-4 mb-5">
              <h2 className="text-2xl font-bold text-blue-800">{jdModal.jobTitle}</h2>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 ${statusBadge(jdModal.status)}`}>
                {jdModal.status?.charAt(0) + jdModal.status?.slice(1).toLowerCase()}
              </span>
            </div>

            <div className="space-y-2 text-sm text-gray-700 mb-6">
              <p><span className="font-semibold">Location:</span> {jdModal.location}</p>
              <p><span className="font-semibold">Salary:</span> {jdModal.salaryRange || "Disclosed on interview"}</p>
              <p><span className="font-semibold">Experience:</span> {jdModal.experience || "Fresher"}</p>
              <p><span className="font-semibold">Qualification:</span> {jdModal.qualification}</p>
              <p><span className="font-semibold">Skills:</span> {jdModal.skills}</p>
              <p><span className="font-semibold">Deadline:</span> {jdModal.applicationDeadline}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Job Description</h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{jdModal.jobDescription}</p>
            </div>
          </div>
        </div>
      )}

      {/* ── Edit Job Modal ── */}
      {editModal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-start p-4 overflow-y-auto"
          onClick={() => setEditModal(null)}
        >
          <div
            className="w-full max-w-2xl my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <JobForm
              editJobId={editModal.id}
              initialData={toFormData(editModal)}
              statusNode={
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadge(editModal.status)}`}>
                  {editModal.status?.charAt(0) + editModal.status?.slice(1).toLowerCase()}
                </span>
              }
              onClose={() => setEditModal(null)}
              onSubmitSuccess={(msg) => {
                setEditModal(null);
                refreshJobs();
                setToast(msg);
              }}
              onCancelEdit={() => setEditModal(null)}
            />
          </div>
        </div>
      )}

      {/* ── Success Toast ── */}
      {toast && (
        <SuccessToast message={toast} onClose={() => setToast("")} />
      )}

      <Footer />
    </>
  );
};

export default AllJobs;
