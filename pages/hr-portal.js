import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Footer from "../components/Footer";
import JobForm from "../components/JobForm";
import SuccessToast from "../components/SuccessToast";

const PostJobs = () => {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);
  const [activeJobs, setActiveJobs] = useState([]);
  const [inactiveJobs, setInactiveJobs] = useState([]);
  const [error, setError] = useState("");
  const [editJobId, setEditJobId] = useState(null);
  const [expandedJobs, setExpandedJobs] = useState([]);
  const [selectedJobForEdit, setSelectedJobForEdit] = useState(null);
  const [toast, setToast] = useState("");

  const fetchActiveJobs = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/jobs/active");
      const data = await response.json();
      const sorted = [...data].sort((a, b) => b.id - a.id);
      setActiveJobs(sorted);
    } catch (error) {
      console.error("Error fetching active jobs:", error);
      setError("Failed to load active jobs");
    }
  };

  const fetchInactiveJobs = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/jobs/inactive");
      const data = await response.json();
      const sorted = [...data].sort((a, b) => b.id - a.id);
      setInactiveJobs(sorted);
    } catch (error) {
      console.error("Error fetching inactive jobs:", error);
      setError("Failed to load inactive jobs");
    }
  };

  const deleteJob = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/jobs/${id}`, {
        method: "DELETE"
      });
      if (response.ok) {
        alert("Job deleted successfully");
        await fetchActiveJobs();
        await fetchInactiveJobs();
      } else {
        alert("Failed to delete job");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Error deleting job");
    }
  };

  const handleEdit = (job) => {
    setEditJobId(job.id);
    setSelectedJobForEdit({
      ...job,
      experience: job.experience || "",
      qualification: job.qualification
        ? job.qualification.split(", ").map((q) => ({ value: q, label: q }))
        : [],
      location: job.location
        ? job.location.split(", ").map((loc) => ({ value: loc, label: loc }))
        : []
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    const authStatus = sessionStorage.getItem("isHRAuthenticated");
    if (authStatus !== "true") {
      router.push("/HRLogin");
    } else {
      setIsVerified(true);
    }
  }, [router]);

  useEffect(() => {
    if (isVerified) {
      const loadJobs = async () => {
        await fetchActiveJobs();
        await fetchInactiveJobs();
      };
      loadJobs();
    }
  }, [isVerified]);

  const handleLogout = () => {
    sessionStorage.removeItem("isHRAuthenticated");
    router.push("/HRLogin");
  };

  if (!isVerified) {
    return <div className="min-h-screen bg-blue-50 flex justify-center items-center font-semibold text-blue-800">Verifying access security...</div>;
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl font-bold text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-blue-800">
          HR Dashboard
        </h1>

        <div className="flex gap-3">
          <button
            onClick={() => router.push("/applications")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-xl transition shadow"
          >
            View Applications
          </button>

          <button
            onClick={() => router.push("/all-jobs")}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-xl transition shadow"
          >
            All Jobs
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-xl transition shadow"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <JobForm
            editJobId={editJobId}
            initialData={editJobId ? selectedJobForEdit : null}
            onCancelEdit={() => {
              setEditJobId(null);
              setSelectedJobForEdit(null);
            }}
            onSubmitSuccess={async (msg) => {
              setEditJobId(null);
              setSelectedJobForEdit(null);
              await fetchActiveJobs();
              await fetchInactiveJobs();
              setToast(msg);
            }}
          />
        </div>

       <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-6 rounded-3xl shadow-xl overflow-x-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-blue-700">Active Openings</h2>
              <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
                {activeJobs.length} Jobs
              </span>
            </div>
            {activeJobs.length === 0 ? (
              <div className="text-center py-10 text-gray-500 text-lg">No active jobs available.</div>
            ) : (
              <table className="w-full text-left border border-gray-200 border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-600 text-sm uppercase">
                    <th className="p-3 border border-gray-200 text-center">Actions</th>
                    <th className="p-3 border border-gray-200">Job Title</th>
                    <th className="p-3 border border-gray-200">Type</th>
                    <th className="p-3 border border-gray-200">Location</th>
                    <th className="p-3 border border-gray-200">Salary</th>
                    <th className="p-3 border border-gray-200">Qualification</th>
                    <th className="p-3 border border-gray-200">Experience</th>
                    <th className="p-3 border border-gray-200">Deadline</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 text-sm">
                  {activeJobs.map((job) => (
                    <tr key={job.id} className="hover:bg-gray-50 transition">
                      <td className="p-3 border border-gray-200 text-center">
                        <button onClick={() => handleEdit(job)} className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1.5 px-4 rounded-lg transition text-xs">
                          Edit Job
                        </button>
                      </td>
                      <td className="p-3 border border-gray-200 font-semibold text-blue-900">{job.jobTitle}</td>
                      <td className="p-3 border border-gray-200">
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                          {job.employmentType.replace("_", " ")}
                        </span>
                      </td>
                      <td className="p-3 border border-gray-200">{job.location}</td>
                      <td className="p-3 border border-gray-200">{job.salaryRange || "Disclosed on interview"}</td>
                      <td className="p-3 border border-gray-200">{job.qualification}</td>
                      <td className="p-3 border border-gray-200">{job.experience || "Fresher"}</td>
                      <td className="p-3 border border-gray-200">{job.applicationDeadline}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-xl overflow-x-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-orange-600">Inactive Jobs</h2>
              <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full font-semibold">
                {inactiveJobs.length} Jobs
              </span>
            </div>
            {inactiveJobs.length === 0 ? (
              <div className="text-center py-10 text-gray-500 text-lg">No inactive jobs at the moment.</div>
            ) : (
              <table className="w-full text-left border border-gray-200 border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-600 text-sm uppercase">
                    <th className="p-3 border border-gray-200 text-center">Actions</th>
                    <th className="p-3 border border-gray-200">Job Title</th>
                    <th className="p-3 border border-gray-200">Type</th>
                    <th className="p-3 border border-gray-200">Location</th>
                    <th className="p-3 border border-gray-200">Salary</th>
                    <th className="p-3 border border-gray-200">Qualification</th>
                    <th className="p-3 border border-gray-200">Experience</th>
                    <th className="p-3 border border-gray-200">Deadline</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 text-sm">
                  {inactiveJobs.map((job) => (
                    <tr key={job.id} className="hover:bg-gray-50 transition">
                      <td className="p-3 border border-gray-200 text-center">
                        <button onClick={() => handleEdit(job)} className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-1.5 px-4 rounded-lg transition text-xs">
                          Reactivate
                        </button>
                      </td>
                      <td className="p-3 border border-gray-200 font-semibold text-red-900">{job.jobTitle}</td>
                      <td className="p-3 border border-gray-200">
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-700">
                          {job.employmentType.replace("_", " ")}
                        </span>
                      </td>
                      <td className="p-3 border border-gray-200">{job.location}</td>
                      <td className="p-3 border border-gray-200">{job.salaryRange || "Not Mentioned"}</td>
                      <td className="p-3 border border-gray-200">{job.qualification}</td>
                      <td className="p-3 border border-gray-200">{job.experience || "Not Mentioned"}</td>
                      <td className="p-3 border border-gray-200">{job.applicationDeadline}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      <Footer />

      {/* ── Success Toast ── */}
      {toast && (
        <SuccessToast message={toast} onClose={() => setToast("")} />
      )}
    </div>
  );
};

export default PostJobs;