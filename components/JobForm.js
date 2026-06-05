import React, { useState, useEffect } from "react";
import Select from "react-select";
import { qualifications } from "../constants/qualifications";
import { indianCities } from "../constants/locations";

const JobForm = ({ editJobId, initialData, onSubmitSuccess, onCancelEdit, onClose, statusNode }) => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    domain: "",
    qualification: [],
    location: [],
    employmentType: "",
    jobDescription: "",
    skills: "",
    salaryRange: "",
    experience: "",
    applicationDeadline: ""
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        jobTitle: "",
        domain: "",
        qualification: [],
        location: [],
        employmentType: "",
        jobDescription: "",
        skills: "",
        salaryRange: "",
        experience: "",
        applicationDeadline: ""
      });
    }
  }, [initialData, editJobId]);

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
        qualification: formData.qualification.map((q) => q.value).join(", "),
        location: formData.location.map((loc) => loc.value).join(", ")
      };

      const response = await fetch(
        editJobId
          ? `http://localhost:8080/api/jobs/${editJobId}`
          : "http://localhost:8080/api/jobs",
        {
          method: editJobId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }
      );

      if (response.ok) {
        onSubmitSuccess(editJobId ? "Job updated successfully" : "Job posted successfully");
      } else {
        alert("Failed to save job");
      }
    } catch (error) {
      console.error(error);
      alert("Error saving job");
    }
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-xl">
      <div className="flex justify-between items-center mb-6 gap-3">
        {/* Left: title + status badge */}
        <div className="flex items-center gap-3 flex-wrap">
          <h2 className="text-2xl font-bold text-blue-700">
            {editJobId ? "Edit Job Posting" : "Post New Job"}
          </h2>
          {statusNode}
        </div>
        {/* Right: cancel + close */}
        <div className="flex items-center gap-2 shrink-0">
          {editJobId && (
            <button type="button" onClick={onCancelEdit} className="text-sm font-semibold text-red-500 hover:text-red-700">
              Cancel Edit
            </button>
          )}
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 text-xl font-bold transition"
              title="Close"
            >
              ✕
            </button>
          )}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-semibold mb-2">Job Title</label>
          <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} placeholder="Frontend Developer" className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500" required />
        </div>
        <div>
          <label className="block font-semibold mb-2">Qualification</label>
          <Select isMulti options={qualifications} value={formData.qualification} onChange={(selectedOptions) => setFormData({ ...formData, qualification: selectedOptions })} className="text-black" placeholder="Select Qualifications" />
        </div>
        <div>
          <label className="block font-semibold mb-2">Location</label>
          <Select isMulti options={indianCities} value={formData.location} onChange={(selectedOptions) => setFormData({ ...formData, location: selectedOptions })} className="text-black" placeholder="Select Locations" />
        </div>
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
        <div>
          <label className="block font-semibold mb-2">Job Description</label>
          <textarea name="jobDescription" value={formData.jobDescription} onChange={handleChange} rows="5" placeholder="Describe the role..." className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500" required></textarea>
        </div>
        <div>
          <label className="block font-semibold mb-2">Skills</label>
          <input type="text" name="skills" value={formData.skills} onChange={handleChange} placeholder="React, Java, Spring Boot" className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500" required />
        </div>
        <div>
          <label className="block font-semibold mb-2">Salary Range</label>
          <input type="text" name="salaryRange" value={formData.salaryRange} onChange={handleChange} placeholder="6 LPA - 10 LPA" className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block font-semibold mb-2">Experience Required</label>
          <input type="text" name="experience" value={formData.experience} onChange={handleChange} placeholder="e.g. 2+ Years, Fresher" className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500" required />
        </div>
        <div>
          <label className="block font-semibold mb-2">Application Deadline</label>
          <input type="date" name="applicationDeadline" value={formData.applicationDeadline} onChange={handleChange} className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500" required />
        </div>
        <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white py-4 rounded-2xl text-lg font-bold transition">
          {editJobId ? "Update Job" : "Publish Job"}
        </button>
      </form>
    </div>
  );
};

export default JobForm;