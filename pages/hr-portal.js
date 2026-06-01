import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useRouter } from "next/router";
import Footer from "../components/Footer";
import { qualifications } from "../constants/qualifications";
import { indianCities } from "../constants/locations";

const PostJobs = () => {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);
  const [activeJobs, setActiveJobs] = useState([]);
  const [expiredJobs, setExpiredJobs] = useState([]);
  const [error, setError] = useState("");
  const [editJobId, setEditJobId] = useState(null);
  const [expandedJobs, setExpandedJobs] = useState([]);

  const [formData, setFormData] = useState({
    jobTitle: "",
    domain: "",
    qualification: [],
    location: [],
    employmentType: "",
    jobDescription: "",
    skills: "",
    salaryRange: "",
    applicationDeadline: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const payload = {

        ...formData,

        qualification: formData.qualification
          .map((q) => q.value)
          .join(", "),

        location: formData.location
          .map((loc) => loc.value)
          .join(", ")
      };

      const response = await fetch(
        editJobId
          ? `http://localhost:8080/api/jobs/${editJobId}`
          : "http://localhost:8080/api/jobs",
        {
          method: editJobId ? "PUT" : "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(payload)
        }
      );

      if (response.ok) {

        alert("Job posted successfully");

        setFormData({
          jobTitle: "",
          domain: "",
          qualification: [],
          location: [],
          employmentType: "",
          jobDescription: "",
          skills: "",
          salaryRange: "",
          applicationDeadline: ""
        });

        setEditJobId(null);

        await fetchActiveJobs();

        await fetchExpiredJobs();

      } else {

        alert("Failed to post job");

      }

    } catch (error) {

      console.error(error);

      alert("Error posting job");

    }
  };
  
  const fetchActiveJobs = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/jobs/active");
      const data = await response.json();
      setActiveJobs(data);
    } catch (error) {
      console.error("Error fetching active jobs:", error);
      setError("Failed to load active jobs");
    }
  };

  const fetchExpiredJobs = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/jobs/past");
      const data = await response.json();
      setExpiredJobs(data);
    } catch (error) {
      console.error("Error fetching expired jobs:", error);
      setError("Failed to load expired jobs");
    }
  };



  const deleteJob = async (id) => {

    try {

      const response = await fetch(
        `http://localhost:8080/api/jobs/${id}`,
        {
          method: "DELETE"
        }
      );

      if (response.ok) {

        alert("Job deleted successfully");

        await fetchActiveJobs();

        await fetchExpiredJobs();

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

    setFormData({

      jobTitle: job.jobTitle || "",

      domain: job.domain || "",

      qualification: job.qualification
        ? job.qualification.split(", ").map((q) => ({
            value: q,
            label: q
          }))
        : [],

      location: job.location
        ? job.location.split(", ").map((loc) => ({
            value: loc,
            label: loc
          }))
        : [],

      employmentType: job.employmentType || "",

      jobDescription: job.jobDescription || "",

      skills: job.skills || "",

      salaryRange: job.salaryRange || "",

      applicationDeadline: job.applicationDeadline || ""

    });

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
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
        await fetchExpiredJobs();
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
        <div className="flex gap-4">

          <button
            onClick={() => router.push("/applications")}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-xl transition shadow"
          >
            View Applications
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
        {/* LEFT SIDE */}
        <div className="lg:col-span-1 bg-white p-6 rounded-3xl shadow-xl">
          <h2 className="text-2xl font-bold text-blue-700 mb-6">
            Post New Job
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Job Title */}
            <div>
              <label className="block font-semibold mb-2">Job Title</label>
              <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} placeholder="Frontend Developer" className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>


            {/* Qualification */}
            <div>
              <label className="block font-semibold mb-2">
                Qualification
              </label>

              <Select
                isMulti
                options={qualifications}

                value={formData.qualification}

                onChange={(selectedOptions) =>
                  setFormData({
                    ...formData,
                    qualification: selectedOptions
                  })
                }

                className="text-black"
                placeholder="Select Qualifications"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block font-semibold mb-2">
                Location
              </label>

              <Select
                isMulti
                options={indianCities}

                value={formData.location}

                onChange={(selectedOptions) =>
                  setFormData({
                    ...formData,
                    location: selectedOptions
                  })
                }

                className="text-black"
                placeholder="Select Locations"
              />
            </div>

            {/* Employment Type */}
            <div>
              <label className="block font-semibold mb-2">Employment Type</label>
              <select name="employmentType" value={formData.employmentType} onChange={handleChange} className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500" required>
                <option value="">Select Type</option>
                <option value="FULL_TIME">Full Time</option>
                <option value="PART_TIME">Part Time</option>
                <option value="CONTRACT">Contract</option>
                <option value="INTERNSHIP">Internship</option>
              </select>
            </div>

            {/* Job Description */}
            <div>
              <label className="block font-semibold mb-2">Job Description</label>
              <textarea name="jobDescription" value={formData.jobDescription} onChange={handleChange} rows="5" placeholder="Describe the role..." className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500" required></textarea>
            </div>

            {/* Skills */}
            <div>
              <label className="block font-semibold mb-2">Skills</label>
              <input type="text" name="skills" value={formData.skills} onChange={handleChange} placeholder="React, Java, Spring Boot" className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>

            {/* Salary Range */}
            <div>
              <label className="block font-semibold mb-2">Salary Range</label>
              <input type="text" name="salaryRange" value={formData.salaryRange} onChange={handleChange} placeholder="6 LPA - 10 LPA" className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            {/* Application Deadline */}
            <div>
              <label className="block font-semibold mb-2">Application Deadline</label>
              <input type="date" name="applicationDeadline" value={formData.applicationDeadline} onChange={handleChange} className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>

            {/* Submit Button */}
            <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white py-4 rounded-2xl text-lg font-bold transition">
              {editJobId ? "Update Job" : "Publish Job"}
            </button>
          </form>
        </div>

        {/* RIGHT SIDE */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-3xl shadow-xl">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-blue-700">Active Openings</h2>
              <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
                {activeJobs.length} Jobs
              </span>
            </div>

            {/* EMPTY STATE */}
            {activeJobs.length === 0 ? (
              <div className="text-center py-10 text-gray-500 text-lg">No active jobs available.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeJobs.map((job) => (
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
                      {job.employmentType.replace("_", " ")}
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

                    <div className="mt-5">

                      <p
                        className={`text-gray-600 transition-all duration-300 ${
                          expandedJobs.includes(job.id)
                            ? ""
                            : "line-clamp-2"
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

                              setExpandedJobs([
                                ...expandedJobs,
                                job.id
                              ]);

                            }

                          }}

                          className="mt-2 text-blue-600 hover:text-blue-800 font-semibold text-sm"
                        >

                          {expandedJobs.includes(job.id)
                            ? "Show Less"
                            : "Read More"}

                        </button>

                      )}

                    </div>
                  </div>

                  <button
                    onClick={() => handleEdit(job)}
                    className="w-full mt-8 py-4 rounded-2xl text-lg font-semibold transition bg-yellow-500 hover:bg-yellow-600 text-white"
                  >
                    Edit Job
                  </button>

                  
                </div>
                ))}
              </div>
            )}
          </div>

          {/* EXPIRED JOBS */}
          <div className="bg-white p-6 rounded-3xl shadow-xl mt-8">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-red-600">Expired Jobs</h2>
              <span className="bg-red-100 text-red-600 px-4 py-2 rounded-full font-semibold">
                {expiredJobs.length} Jobs
              </span>
            </div>

            {/* EMPTY STATE */}
            {expiredJobs.length === 0 ? (
              <div className="text-center py-10 text-gray-500 text-lg">No expired jobs available.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {expiredJobs.map((job) => (
                  <div key={job.id} className="bg-red-50 rounded-3xl p-6 border-t-8 border-red-400 shadow-md hover:shadow-xl transition opacity-90">
                    {/* TITLE */}
                    <h3 className="text-2xl font-bold text-red-700">{job.jobTitle}</h3>

                    {/* TYPE BADGE */}
                    <span className={`inline-block mt-3 px-3 py-1 rounded-full text-sm font-semibold ${
                      job.employmentType === "FULL_TIME"
                        ? "bg-green-500 text-white"
                        : job.employmentType === "PART_TIME"
                          ? "bg-yellow-500 text-white"
                          : job.employmentType === "CONTRACT"
                            ? "bg-purple-500 text-white"
                            : "bg-orange-500 text-white"
                    }`}>
                      {job.employmentType.replace("_", " ")}
                    </span>

                    {/* DETAILS */}
                    <div className="space-y-2 mt-5 text-gray-700">
                      <p>📍 <strong>Location:</strong> {job.location}</p>
                      <p>🎓 <strong>Qualification:</strong> {job.qualification}</p>
                      <p>🛠️ <strong>Skills:</strong> {job.skills}</p>
                      <p>💰 <strong>Salary:</strong> {job.salaryRange || "Not Mentioned"}</p>
                      <p>📅 <strong>Deadline:</strong> {job.applicationDeadline}</p>
                    </div>

                    <div className="mt-5">

                      <p
                        className={`text-gray-600 transition-all duration-300 ${
                          expandedJobs.includes(job.id)
                            ? ""
                            : "line-clamp-2"
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

                              setExpandedJobs([
                                ...expandedJobs,
                                job.id
                              ]);

                            }

                          }}

                          className="mt-2 text-blue-600 hover:text-blue-800 font-semibold text-sm"
                        >

                          {expandedJobs.includes(job.id)
                            ? "Show Less"
                            : "Read More"}

                        </button>

                      )}

                    </div>

                    {/* DELETE BUTTON */}
                    <button
                      onClick={() => deleteJob(job.id)}
                      className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl font-semibold transition"
                    >
                      Delete Job
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJobs;