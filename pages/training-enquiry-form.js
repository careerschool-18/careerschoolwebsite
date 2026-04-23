"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState, useMemo } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import toast from "react-hot-toast";
import { isValidPhoneNumber } from "libphonenumber-js";
import Select from "react-select";
import { State, City } from "country-state-city";
import { Send } from "lucide-react";
import Swal from "sweetalert2";

export default function Form() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    whatsappNumber: "",
    countryCode: "+91",
    enquiryType: "COURSE_INTERNSHIP",
    courseName: "",
    preferredRole: "",
    currentEmployer: "",
    state: "",
    city: "",
    totalExperience: "",
    trainingMode: "ONLINE",
    degree: "",
    specialization: "",
    source: "",
  });

  const [errors, setErrors] = useState({});

  // Unified Select Styles
  const customSelectStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      border: "none",
      borderRadius: "12px",
      padding: "6px",
      color: "#1e40af",
      fontWeight: "500",
      boxShadow: "none",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      zIndex: 9999,
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#eff6ff" : "transparent",
      color: "#1e40af",
      padding: "10px 20px",
    }),
    placeholder: (base) => ({ ...base, color: "#64748b" }),
    singleValue: (base) => ({ ...base, color: "#1e40af" }),
  };

  // --- Data Options ---
  const states = useMemo(
    () =>
      State.getStatesOfCountry("IN").map((s) => ({
        label: s.name,
        value: s.isoCode,
      })),
    [],
  );

  const filteredCities = useMemo(() => {
    if (!formData.state) return [];
    return City.getCitiesOfState("IN", formData.state).map((city) => ({
      label: city.name,
      value: city.name,
    }));
  }, [formData.state]);

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

  const specializationOptions = [
    {
      label: "Engineering / Technology",
      options: [
        { label: "Computer Science Engineering (CSE)", value: "CSE" },
        { label: "Information Technology (IT)", value: "IT" },
        { label: "Electronics & Communication (ECE)", value: "ECE" },
        { label: "Electrical & Electronics (EEE)", value: "EEE" },
        { label: "Mechanical Engineering", value: "MECH" },
        { label: "Civil Engineering", value: "CIVIL" },
        { label: "Chemical Engineering", value: "CHEMICAL" },
        { label: "Artificial Intelligence (AI)", value: "AI" },
        { label: "AI & Machine Learning", value: "AI_ML" },
        { label: "Data Science", value: "DATA_SCIENCE" },
        { label: "Cyber Security", value: "CYBER_SECURITY" },
        { label: "Cloud Computing", value: "CLOUD" },
        { label: "Software Engineering", value: "SOFTWARE" },
        { label: "Mechatronics", value: "MECHATRONICS" },
        { label: "Robotics", value: "ROBOTICS" },
        { label: "Automobile Engineering", value: "AUTO" },
        { label: "Aerospace Engineering", value: "AEROSPACE" },
        { label: "Aeronautical Engineering", value: "AERONAUTICAL" },
        { label: "Blockchain Technology", value: "BLOCKCHAIN" },
        { label: "Internet of Things (IoT)", value: "IOT" },
        { label: "Big Data Engineering", value: "BIG_DATA" },
        { label: "Other Engineering Stream", value: "OTHER_ENGG" },
      ],
    },
    {
      label: "Commerce",
      options: [
        { label: "Accounting & Finance", value: "ACCOUNTS_FINANCE" },
        { label: "Banking & Insurance", value: "BANKING_INSURANCE" },
        { label: "Corporate Accounting", value: "CORPORATE_ACC" },
        { label: "Taxation", value: "TAXATION" },
        { label: "Auditing", value: "AUDITING" },
        { label: "Business Analytics", value: "BUSINESS_ANALYTICS" },
        { label: "E-Commerce", value: "ECOMMERCE" },
        { label: "Financial Markets", value: "FIN_MARKETS" },
        { label: "Investment Banking", value: "INVESTMENT_BANKING" },
        { label: "International Business", value: "INTL_BUSINESS" },
        { label: "Business Administration", value: "BUSINESS_ADMIN" },
        { label: "Entrepreneurship", value: "ENTREPRENEURSHIP" },
        { label: "Chartered Accountant (CA)", value: "CA" },
        { label: "Company Secretary (CS)", value: "CS" },
        { label: "Cost & Management Accounting (CMA)", value: "CMA" },
        { label: "Other Commerce Stream", value: "OTHER_COMMERCE" },
      ],
    },
    {
      label: "Arts / Humanities",
      options: [
        { label: "English Literature", value: "ENGLISH" },
        { label: "History", value: "HISTORY" },
        { label: "Political Science", value: "POLITICAL_SCIENCE" },
        { label: "Sociology", value: "SOCIOLOGY" },
        { label: "Psychology", value: "PSYCHOLOGY" },
        { label: "Economics", value: "ECONOMICS" },
        { label: "Public Administration", value: "PUBLIC_ADMIN" },
        { label: "Philosophy", value: "PHILOSOPHY" },
        { label: "Journalism & Mass Communication", value: "JOURNALISM" },
        { label: "Media Studies", value: "MEDIA" },
        { label: "Visual Communication", value: "VISCOM" },
        { label: "Fine Arts", value: "FINE_ARTS" },
        { label: "Performing Arts", value: "PERFORMING_ARTS" },
        { label: "Social Work (BSW/MSW)", value: "SOCIAL_WORK" },
        { label: "Linguistics", value: "LINGUISTICS" },
        { label: "Other Arts Stream", value: "OTHER_ARTS" },
      ],
    },
  ];

  const experienceOptions = [
    { label: "Fresher", value: "FRESHER" },
    { label: "6 Months - 1 Year", value: "ONE_TO_TWO" },
    { label: "1 Year - 3 Years", value: "ONE_TO_TWO" },
    { label: "3 Years - 5 Years", value: "THREE_TO_FIVE" },
    { label: "5+ Years", value: "FIVE_PLUS" },
  ];

  const courseOptions = [
    {
      label: "Combo Course",
      options: [
        { label: "Gen AI", value: "GEN_AI" },
        { label: "Crash Course in Nellore", value: "CRASH_COURSE_NELLORE" },

        { label: "Python + AI + Analytics", value: "PYTHON_COMBO" },
        { label: "Java + AI + Analytics", value: "JAVA_COMBO" },
        {
          label: "Digital Marketing + AI + Analytics",
          value: "MARKETING_COMBO",
        },
        { label: "HR + AI + Analytics", value: "HR_COMBO" },
        { label: "Finance + AI + Analytics", value: "FINANCE_COMBO" },
      ],
    },
    {
      label: "ZOHO Certification",
      options: [{ label: "ZOHO Payroll", value: "ZOHO_PAYROLL" }],
    },
    {
      label: "IT / Software",
      options: [
        { label: "Python Full Stack + AI", value: "PYTHON_FULL_STACK" },
        { label: "Java Full Stack + AI", value: "JAVA_FULL_STACK" },
        { label: "Web Development", value: "WEB_DEVELOPMENT" },
        { label: "Data Analytics", value: "DATA_ANALYTICS" },
        { label: "Business Analytics", value: "BA" },
        { label: "Digital Marketing", value: "DIGITAL_MARKETING" },
        { label: "UI/UX", value: "UIUX" },
        { label: ".NET", value: "DOTNET" },
      ],
    },
    {
      label: "HR / Operations",
      options: [
        { label: "HR Analytics", value: "HR_ANALYTICS" },
        { label: "Finance", value: "FINANCE" },
        { label: "Accounting", value: "ACCOUNTING" },
      ],
    },
    {
      label: "Internships / Project Support",
      options: [
        { label: "Internships", value: "INTERNSHIPS" },
        { label: "Project Support", value: "PROJECT_SUPPORT" },
      ],
    },
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

  // Helper to filter Specializations based on Degree
  const getFilteredSpecs = () => {
    if (formData.degree === "BTECH")
      return specializationOptions.filter((s) =>
        s.label.includes("Engineering"),
      );
    if (formData.degree === "BCOM")
      return specializationOptions.filter((s) => s.label.includes("Commerce"));
    if (formData.degree === "BA")
      return specializationOptions.filter((s) => s.label.includes("Arts"));
    return specializationOptions; // Show all if no direct match
  };

  // --- Validation Logic (FIXED - removed preferredRole requirement) ---
  const validate = (data) => {
    let err = {};

    // Only validate essential fields that are actually used
    if (!data.fullName) err.fullName = "Required";
    if (!data.email) err.email = "Required";
    if (!data.whatsappNumber) err.whatsappNumber = "Required";
    if (!data.currentEmployer) err.currentEmployer = "Required";
    if (!data.state) err.state = "Required";
    if (!data.city) err.city = "Required";
    if (!data.courseName) err.courseName = "Required";

    if (data.whatsappNumber && !isValidPhoneNumber(data.whatsappNumber)) {
      err.whatsappNumber = "Invalid number";
    }

    return err;
  };

  const updateForm = (updated) => {
    setFormData(updated);
    setErrors(validate(updated));
  };

  const handleStateChange = (selected) => {
    updateForm({
      ...formData,
      state: selected?.value || "",
      city: "", // Clear city when state changes
    });
  };

  // Handle course selection - automatically set preferredRole
  const handleCourseChange = (selected) => {
    updateForm({
      ...formData,
      courseName: selected?.value || "",
      preferredRole: selected?.value || "", // Auto-set preferredRole same as course
    });
  };

  // --- Submit Handler ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      toast.error("Please fill all required fields");
      return;
    }

    // Prepare payload with proper data
    const payload = {
      ...formData,
      enquiryType: "COURSE_INTERNSHIP",
      trainingMode: "ONLINE",
      countryCode: "+91",
    };

    console.log("Submitting payload:", payload);

    try {
      const res = await fetch(
        "https://career-school.co.in/api/v1/course-enquiries", // Changed back to original endpoint
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await res.json();

      if (res.ok && data.success) {
        await Swal.fire({
          title: "Success!",
          text: "Form submitted successfully",
          icon: "success",
        });

        // Reset form
        setFormData({
          fullName: "",
          email: "",
          whatsappNumber: "",
          countryCode: "+91",
          enquiryType: "COURSE_INTERNSHIP",
          courseName: "",
          preferredRole: "",
          currentEmployer: "",
          state: "",
          city: "",
          totalExperience: "",
          trainingMode: "ONLINE",
          degree: "",
          specialization: "",
          source: "",
        });
      } else {
        toast.error(data.message || "Submission failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error. Please try again.");
    }
  };

  const isValid = Object.keys(validate(formData)).length === 0;

  return (
    <>
      <Header />

      <div className="min-h-screen w-full flex items-center justify-center bg-[#0a0a0a] p-4 font-sans">
        <div className="w-full max-w-6xl bg-[#121212] rounded-[2.5rem] shadow-2xl overflow-visible flex flex-col lg:flex-row border border-white/5">
          {/* LEFT CONTENT */}
          <div className="lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center space-y-8">
            <h1 className="text-4xl lg:text-7xl font-black text-white leading-tight">
              Elevate Your <br />
              <span className="text-yellow-400">Skills Today</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-md">
              Take the next step in your professional journey. Fill out the form
              to browse our courses.
            </p>
          </div>

          {/* RIGHT FORM */}
          <div className="lg:w-1/2 bg-[#002B7F] p-8 lg:p-12">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <input
                  placeholder="Full Name *"
                  className="w-full p-4 rounded-xl bg-white/90 text-[#1e40af] font-medium outline-none"
                  value={formData.fullName}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                    updateForm({ ...formData, fullName: value });
                  }}
                />

                <input
                  type="email"
                  placeholder="Email Address *"
                  className="w-full p-4 rounded-xl bg-white/90 text-[#1e40af] font-medium outline-none"
                  value={formData.email}
                  onChange={(e) =>
                    updateForm({ ...formData, email: e.target.value })
                  }
                />

                {/* Styled Phone Input Wrapper */}
                <div className="phone-container">
                  <PhoneInput
                    defaultCountry="IN"
                    value={formData.whatsappNumber}
                    onChange={(v) =>
                      updateForm({ ...formData, whatsappNumber: v || "" })
                    }
                    className="custom-phone-input"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Select
                    styles={customSelectStyles}
                    options={degreeOptions}
                    placeholder="Degree (Optional)"
                    value={
                      degreeOptions.find((d) => d.value === formData.degree) ||
                      null
                    }
                    onChange={(s) =>
                      updateForm({
                        ...formData,
                        degree: s?.value,
                        specialization: "",
                      })
                    }
                  />
                  <input
                    placeholder="College / Company *"
                    className="w-full p-4 rounded-xl bg-white/90 text-[#1e40af] font-medium outline-none"
                    value={formData.currentEmployer}
                    onChange={(e) =>
                      updateForm({
                        ...formData,
                        currentEmployer: e.target.value,
                      })
                    }
                  />
                </div>

                <Select
                  styles={customSelectStyles}
                  options={getFilteredSpecs()}
                  placeholder="Specialization (Optional)"
                  value={
                    getFilteredSpecs()
                      .flatMap((g) => g.options)
                      .find((o) => o.value === formData.specialization) || null
                  }
                  onChange={(s) =>
                    updateForm({ ...formData, specialization: s?.value })
                  }
                />

                {/* State then City */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Select
                    styles={customSelectStyles}
                    options={states}
                    placeholder="State *"
                    value={
                      states.find((s) => s.value === formData.state) || null
                    }
                    onChange={handleStateChange}
                  />
                  <Select
                    styles={customSelectStyles}
                    options={filteredCities}
                    placeholder="City *"
                    isDisabled={!formData.state}
                    value={
                      filteredCities.find((c) => c.value === formData.city) ||
                      null
                    }
                    onChange={(s) =>
                      updateForm({ ...formData, city: s?.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Select
                    styles={customSelectStyles}
                    options={experienceOptions}
                    placeholder="Experience (Optional)"
                    value={
                      experienceOptions.find(
                        (e) => e.value === formData.totalExperience,
                      ) || null
                    }
                    onChange={(s) =>
                      updateForm({ ...formData, totalExperience: s?.value })
                    }
                  />
                  <Select
                    styles={customSelectStyles}
                    options={courseOptions}
                    placeholder="Course *"
                    value={
                      courseOptions
                        .flatMap((g) => g.options)
                        .find((o) => o.value === formData.courseName) || null
                    }
                    onChange={handleCourseChange}
                  />
                </div>

                <Select
                  styles={customSelectStyles}
                  options={sourceOptions}
                  placeholder="Where did you hear about us? (Optional)"
                  value={
                    sourceOptions.find((s) => s.value === formData.source) ||
                    null
                  }
                  onChange={(s) =>
                    updateForm({ ...formData, source: s?.value })
                  }
                />

                <button
                  type="submit"
                  disabled={!isValid}
                  className={`w-full group mt-4 py-5 rounded-2xl flex items-center justify-center gap-3 text-lg font-black transition-all duration-300 ${
                    isValid
                      ? "bg-black text-white hover:scale-[1.02] cursor-pointer"
                      : "bg-black/20 text-black/40 cursor-not-allowed"
                  }`}
                >
                  <Send size={18} />
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .phone-container {
          background-color: rgba(255, 255, 255, 0.9);
          border-radius: 12px;
          padding: 6px 16px;
          display: flex;
          align-items: center;
        }

        .custom-phone-input {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .PhoneInputInput {
          background: transparent !important;
          border: none !important;
          outline: none !important;
          font-weight: 500;
          color: #1e40af;
          font-size: 16px;
          padding: 10px 0;
          width: 100%;
        }

        .PhoneInputCountry {
          border-right: 1px solid #cbd5e1;
          padding-right: 10px;
          margin-right: 5px;
        }

        .PhoneInputCountrySelect {
          cursor: pointer;
        }

        .PhoneInputCountryIcon {
          width: 24px;
          height: auto;
          box-shadow: none !important;
        }
      `}</style>

      <Footer />
    </>
  );
}
