import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Applications() {
  const router = useRouter();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isVerified, setIsVerified] = useState(false);

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

  const filteredApplications = applications.filter((app) => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return true;
    return (
      (app.jobTitle || "").toLowerCase().includes(term) ||
      (app.phone || "").toLowerCase().includes(term) ||
      (app.alternatePhone || "").toLowerCase().includes(term) ||
      (app.location || "").toLowerCase().includes(term)
    );
  });

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
              {filteredApplications.length}{searchTerm ? ` of ${applications.length}` : ""} Applications
            </span>
          </div>
          <div className="flex items-center gap-2 bg-white border-2 border-green-400 focus-within:border-green-600 rounded-2xl px-3 py-2.5 shadow-sm w-full sm:w-auto sm:min-w-[320px] transition">
            <svg className="w-4 h-4 text-gray-400 shrink-0" fill="currentColor" viewBox="0 0 512 512">
              <path d="M416 208c0 45.4-14.9 87.3-40 120.9L502.6 457c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L341 363.9C307.4 389.1 265.4 404 220 404C98.6 404 0 305.4 0 184S98.6-36 220-36 416 86.6 416 208zM220 336c70.7 0 128-57.3 128-128S290.7 80 220 80 92 137.3 92 208s57.3 128 128 128z" />
            </svg>
            <input type="text" placeholder="Search by job title, phone or location..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="flex-1 min-w-0 bg-transparent text-gray-700 placeholder-gray-400 outline-none text-sm" />
            {searchTerm && (
              <button onClick={() => setSearchTerm("")} className="text-gray-400 hover:text-gray-600 text-lg leading-none shrink-0">×</button>
            )}
          </div>
        </div>
        {filteredApplications.length === 0 ? (
          <div className="text-center py-10 text-gray-500 text-lg">
            {searchTerm ? `No applications match "${searchTerm}".` : "No applications found."}
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="px-4 py-4 whitespace-nowrap">Job Title</th>
                  <th className="px-4 py-4 whitespace-nowrap">Full Name</th>
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
                    <td className="px-4 py-4 whitespace-nowrap font-semibold">{app.jobTitle}</td>
                    <td className="px-4 py-4 whitespace-nowrap">{app.fullName}</td>
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
    </div>
  );
}