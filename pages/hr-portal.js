import React, { useState, useEffect } from "react";
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

  const [formData, setFormData] = useState({
    jobTitle: "",
    domain: "",
    qualification: "",
    location: "",
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
      const response = await fetch(
        "http://localhost:8080/api/jobs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      );
      if(response.ok){
        alert("Job posted successfully");
        setFormData({ jobTitle: "", domain: "", qualification: "", location: "", employmentType: "", jobDescription: "", skills: "", salaryRange: "", applicationDeadline: "" });
        await fetchActiveJobs();
        await fetchExpiredJobs();
      }
    } catch(error){
      console.error(error);
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
        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-xl transition shadow">
          Logout
        </button>
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

            {/* Domain */}
            <div>
              <label className="block font-semibold mb-2">Domain</label>
              <input type="text" name="domain" value={formData.domain} onChange={handleChange} placeholder="Software Development" className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>

            {/* Qualification */}
            <div>
              <label className="block font-semibold mb-2">Qualification</label>
              <select name="qualification" value={formData.qualification} onChange={handleChange} className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500" required>
                <option value="">Select Qualification</option>
                {qualifications.map((qualification) => (
                  <option key={qualification} value={qualification}>{qualification}</option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block font-semibold mb-2">Location</label>
              <select name="location" value={formData.location} onChange={handleChange} className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500" required>
                <option value="">Select Location</option>
                {indianCities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
              </select>
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
              Publish Job
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
                  <div key={job.id} className="bg-blue-50 rounded-3xl p-6 border-t-8 border-yellow-400 shadow-md hover:shadow-xl transition">
                    <h3 className="text-2xl font-bold text-blue-800">{job.jobTitle}</h3>
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
                      <p>💼 <strong>Domain:</strong> {job.domain}</p>
                      <p>🎓 <strong>Qualification:</strong> {job.qualification}</p>
                      <p>🛠️ <strong>Skills:</strong> {job.skills}</p>
                      <p>💰 <strong>Salary:</strong> {job.salaryRange || "Not Mentioned"}</p>
                      <p>📅 <strong>Deadline:</strong> {job.applicationDeadline}</p>
                    </div>

                    {/* DESCRIPTION */}
                    <p className="mt-5 text-gray-600">{job.jobDescription}</p>

                    {/* DELETE BUTTON */}
                    <button className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl font-semibold transition">
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