// App.js - Main Job Portal Component
import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
const JobPortal = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const [appliedJobs, setAppliedJobs] = useState([]);
  const [expandedJobs, setExpandedJobs] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Search logic is handled by filter, but we can add additional search features
    console.log("Searching for:", searchTerm);
  };

  const handleApply = (jobId) => {
    if (!appliedJobs.includes(jobId)) {
      setAppliedJobs([...appliedJobs, jobId]);
      alert("Successfully applied for the position!");
    } else {
      alert("You have already applied for this position.");
    }
  };

  const filteredJobs = jobs.filter(
    (job) =>
      (job.jobTitle || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (job.location || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
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
        {/* Navbar */}
        <nav className="bg-blue-700 text-white px-10 py-5 flex justify-between items-center shadow-lg">
          <h1 className="text-3xl font-bold tracking-wide">
            Careerschool <span className="text-yellow-300">Jobs</span>
          </h1>

          <div className="flex gap-6 text-lg">
              <button className="hover:text-yellow-300 transition cursor-pointer font-semibold" onClick={ () => window.location.href='https://www.careerschool.co.in/'}>
                Home
              </button>

            
            
          </div>
        </nav>

        {/* Hero Section */}
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

        {/* Job Cards */}
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

                  <button
                    onClick={() => handleApply(job.id)}
                    disabled={appliedJobs.includes(job.id)}
                    className={`w-full mt-8 py-4 rounded-2xl text-lg font-semibold transition ${
                      appliedJobs.includes(job.id)
                        ? "bg-gray-400 cursor-not-allowed"
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

        
      </div>
      <Footer/>
    </>
  );
};

export default JobPortal;