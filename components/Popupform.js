"use client";
import { useEffect, useState } from "react";

/**
 * CourseEnquiryPopup component
 *
 * Props:
 * - open?: boolean (controlled)
 * - onOpenChange?: (bool) => void
 * - showInlineTriggers?: boolean (default: false)
 * - initialEnquiry?: string (optional initial enquiry when parent opens)
 */
export default function CourseEnquiryPopup({
  open,
  onOpenChange,
  showInlineTriggers = false,
  initialEnquiry = "",
}) {
  // internal state
  const [internalOpen, setInternalOpen] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // new state for hover behaviour of the floating bubble/icon
  const [isHovered, setIsHovered] = useState(false);

  // form data + validation
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    enquiryFor: "", // "" | "Courses / Internship" | "Jobs"
    location: "",
    state: "",
    experience: "",
    branch: "",
    course: "",
    customCourse: "",
    preferredRole: "",
    currentEmployer: "",
    countryCode: "+91",
  });

  const [errors, setErrors] = useState({});

  const isControlled = typeof open === "boolean";
  const isOpen = isControlled ? open : internalOpen;

  // uncontrolled auto-open after 10s (one-time)
  useEffect(() => {
    if (isControlled) return;
    const timer = setTimeout(() => {
      setInternalOpen(true);
      setShowImage(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, [isControlled]);

  // sync parent's initialEnquiry into form when provided
  useEffect(() => {
    if (!initialEnquiry) return;
    setFormData((p) => {
      const next = { ...p, enquiryFor: initialEnquiry };
      if (initialEnquiry === "Courses / Internship") {
        next.preferredRole = "";
        next.currentEmployer = "";
      } else if (initialEnquiry === "Jobs") {
        next.course = "";
        next.customCourse = "";
      }
      return next;
    });
  }, [initialEnquiry]);

  // lock scrolling while modal open (prevent horizontal & vertical)
  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.overflowX = "hidden";
      document.body.style.overflow = "hidden";
      document.body.style.overflowX = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.documentElement.style.overflowX = "";
      document.body.style.overflow = "";
      document.body.style.overflowX = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.documentElement.style.overflowX = "";
      document.body.style.overflow = "";
      document.body.style.overflowX = "";
    };
  }, [isOpen]);

  const setOpen = (value) => {
    if (isControlled) {
      if (typeof onOpenChange === "function") onOpenChange(value);
    } else {
      setInternalOpen(value);
    }
  };

  // Note: no reopen timer — once closed it will not reopen until page refresh
  const handleClose = () => {
    setSubmitted(false);
    setOpen(false);
  };

  const openWith = (enquiryType) => {
    setFormData((p) => {
      const next = { ...p, enquiryFor: enquiryType ?? p.enquiryFor };
      if (enquiryType === "Courses / Internship") {
        next.preferredRole = "";
        next.currentEmployer = "";
      } else if (enquiryType === "Jobs") {
        next.course = "";
        next.customCourse = "";
      }
      return next;
    });
    setOpen(true);
    setShowImage(true);
  };

  // Country list for dropdown
  const countryList = [
    { code: "+91", name: "India" },
    { code: "+1", name: "United States" },
    { code: "+44", name: "United Kingdom" },
    { code: "+61", name: "Australia" },
    { code: "+971", name: "UAE" },
    { code: "+974", name: "Qatar" },
    { code: "+965", name: "Kuwait" },
    { code: "+966", name: "Saudi Arabia" },
    { code: "+64", name: "New Zealand" },
  ];

  const validateName = (value) => {
    if (!value.trim()) return "Name is required";
    if (!/^[A-Za-z\s]+$/.test(value)) return "Only alphabets and spaces allowed";
    return "";
  };

  const validatePhone = (value) => {
    if (!value) return "Phone is required";
    if (!/^\d{10}$/.test(value)) return "Enter a 10 digit phone number";
    return "";
  };

  const validateEmail = (value) => {
    if (!value.trim()) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email address";
    return "";
  };

  const handleChange = (e) => {
    const { name, value: rawValue } = e.target;
    let value = rawValue;

    if (name === "fullName") {
      value = rawValue.replace(/[^A-Za-z\s]/g, "");
      setFormData((p) => ({ ...p, [name]: value }));
      setErrors((p) => ({ ...p, fullName: validateName(value) }));
      return;
    }

    if (name === "phone") {
      value = rawValue.replace(/\D/g, "").slice(0, 10);
      setFormData((p) => ({ ...p, [name]: value }));
      setErrors((p) => ({ ...p, phone: validatePhone(value) }));
      return;
    }

    if (name === "email") {
      value = rawValue.trim().toLowerCase();
      setFormData((p) => ({ ...p, [name]: value }));
      setErrors((p) => ({ ...p, email: validateEmail(value) }));
      return;
    }

    if (name === "enquiryFor") {
  const next = { ...formData, enquiryFor: value };

  if (value === "Courses / Internship") {
    next.preferredRole = "";
    next.currentEmployer = "";
  } else if (value === "Jobs") {
    next.course = "";
    next.customCourse = "";
    next.branch = ""; // ✅ CLEAR TRAINING MODE FOR JOBS
  }

  setFormData(next);
  return;
}


    if (name === "countryCode") {
      setFormData((p) => ({ ...p, [name]: value }));
      return;
    }

    setFormData((p) => ({ ...p, [name]: value }));
  };

  // Helper function to map form values to backend enum values
  const mapToBackendFormat = (formData) => {
    // Map enquiry type
    let enquiryType = "INTERNSHIP"; // default
    if (formData.enquiryFor === "Jobs") {
      enquiryType = "JOB";
    } else if (formData.enquiryFor === "Courses / Internship") {
      enquiryType = "INTERNSHIP";
    }

    // Map experience level
    const experienceMapping = {
      "Fresher": "FRESHER",
      "1-2 Years": "ONE_TO_TWO",
      "3-5 Years": "THREE_TO_FIVE",
      "5+ Years": "FIVE_PLUS"
    };
    const totalExperience = experienceMapping[formData.experience] || "FRESHER";

    // Map training mode
    const trainingMode = formData.branch === "Online" ? "ONLINE" : "OFFLINE";

    // Determine course name
    let courseName = "";
    if (formData.enquiryFor === "Courses / Internship") {
      courseName = formData.course === "Other" ? formData.customCourse : formData.course;
    } else if (formData.enquiryFor === "Jobs") {
      courseName = formData.preferredRole; // For jobs, use preferred role as course name
    }

    return {
      fullName: formData.fullName,
      countryCode: formData.countryCode,
      whatsappNumber: formData.phone,
      email: formData.email,
      enquiryType: enquiryType,
      courseName: courseName,
      city: formData.location,
      state: formData.state,
      totalExperience: totalExperience,
      trainingMode: trainingMode,
    };
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  // --- VALIDATION ---
  const nameErr = validateName(formData.fullName);
  const phoneErr = validatePhone(formData.phone);
  const emailErr = validateEmail(formData.email);
  const stateErr = !formData.state ? "Please select your state" : "";

  let extraErr = {};
  if (formData.enquiryFor === "Courses / Internship") {
    if (!formData.course) extraErr.course = "Please select a course or internship";
    if (formData.course === "Other" && !formData.customCourse) extraErr.customCourse = "Please enter the course name";
  } else if (formData.enquiryFor === "Jobs") {
    if (!formData.preferredRole) extraErr.preferredRole = "Please enter your preferred role";
  } else {
    extraErr.enquiryFor = "Please select enquiry type";
  }

  setErrors({
    fullName: nameErr,
    phone: phoneErr,
    email: emailErr,
    state: stateErr,
    ...extraErr,
  });

  if (nameErr || phoneErr || emailErr || stateErr || Object.keys(extraErr).length) return;

  // --- SUBMIT ---
  setIsSubmitting(true);

  try {
    const apiPayload = mapToBackendFormat(formData);

   const res = await fetch("/api/v1/enquiries", {

  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(apiPayload),
});


    const result = await res.json(); // parse JSON here

    if (res.ok && result.success) {
      // Reset form
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        enquiryFor: "",
        location: "",
        state: "",
        experience: "",
        branch: "",
        course: "",
        customCourse: "",
        preferredRole: "",
        currentEmployer: "",
        countryCode: "+91",
      });
      setSubmitted(true);
      setShowSuccessPopup(true);
    } else {
      throw new Error(result.message || "Submission failed");
    }
  } catch (err) {
    console.error("Form submission error:", err);
    alert("Failed to submit form. Please try again.");
  } finally {
    setIsSubmitting(false);
  }
};


  useEffect(() => {
    if (isOpen) setShowImage(true);
  }, [isOpen]);

  return (
    <>
      {/* Inline triggers — off by default */}
      {showInlineTriggers && (
        <div className="fixed bottom-24 left-4 z-[99999] flex flex-col gap-2">
          <button
            onClick={() => openWith("Courses / Internship")}
            className="bg-blue-700 text-white px-3 py-2 rounded-md text-sm shadow hover:bg-blue-600"
          >
            Courses / Internship
          </button>
          <button
            onClick={() => openWith("Jobs")}
            className="bg-green-700 text-white px-3 py-2 rounded-md text-sm shadow hover:bg-green-600"
          >
            IT / Non-IT Jobs
          </button>
        </div>
      )}

      {/* Floating Enquiry Bubble */}
      {!isControlled && showImage && !isOpen && !showSuccessPopup && (
        <div
          onClick={() => setOpen(true)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          role="button"
          tabIndex={0}
          aria-label="Open enquiry form"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") setOpen(true);
          }}
          className="fixed bottom-32 right-6 z-[99999] cursor-pointer"
        >
          <div className="floating-bubble-container">
            <div className={`chat-bubble ${isHovered ? "bubble-hide" : "bubble-show"}`}>
              <div className="bubble-content">
                <span className="bubble-text">Enquire Now</span>
                <div className="bubble-pulse" aria-hidden="true"></div>
              </div>
              <div className="bubble-tail" aria-hidden="true"></div>
            </div>

            <div className={`form-icon ${isHovered ? "icon-show" : "icon-hide"}`}>
              <img src="/Popup images/Form Icon 2.png" alt="Enquiry Form" className="w-14 h-14 object-contain" />
            </div>
          </div>
        </div>
      )}

      {/* MAIN ENQUIRY FORM POPUP */}
      {isOpen && !showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-[999999] px-4 sm:px-0">
          <div className="bg-blue-800 rounded-xl shadow-2xl w-full max-w-sm sm:max-w-md p-4 sm:p-6 relative animate-fadeIn overflow-y-auto max-h-[85vh] text-white">
            <button onClick={handleClose} className="absolute top-2 right-3 text-white hover:text-gray-200 text-lg" disabled={isSubmitting}>
              ✕
            </button>

            {!submitted ? (
              <div className="flex justify-center mb-2 mt-2">
                <img src="/Popup images/Form Icon 2.png" alt="Form Public" className="w-14 h-14 sm:w-16 sm:h-16 object-contain" />
              </div>
            ) : (
              <div className="flex justify-center mb-2 mt-2">
                <img src="/Popup images/Form Submitted Icon.png" alt="Submission Public" className="w-12 h-12 sm:w-16 sm:h-16 object-contain" />
              </div>
            )}

            {!submitted ? (
              <>
                <h2 className="text-lg sm:text-xl font-semibold text-center mb-1 text-yellow-300">
                  Instant Enquiry for Jobs or Training
                </h2>

                <form onSubmit={handleSubmit} className="space-y-2">
                  <div>
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="Full Name"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none"
                      disabled={isSubmitting}
                    />
                    {errors.fullName && <p className="text-xs text-red-300 mt-1">{errors.fullName}</p>}
                  </div>

                  {/* Phone with country code dropdown */}
                  <div className="flex bg-white rounded-md items-center">
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleChange}
                      className="bg-transparent text-gray-700 px-2 outline-none text-sm w-28 border-r border-gray-300"
                      disabled={isSubmitting}
                    >
                      {countryList.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.name} {country.code}
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      name="phone"
                      required
                      maxLength="10"
                      inputMode="numeric"
                      placeholder="WhatsApp Number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="flex-1 outline-none py-2 px-2 text-sm bg-white text-black rounded-r-md"
                      disabled={isSubmitting}
                    />
                  </div>
                  {errors.phone && <p className="text-xs text-red-300 mt-1">{errors.phone}</p>}

                  <div>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none"
                      disabled={isSubmitting}
                    />
                    {errors.email && <p className="text-xs text-red-300 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <select
                      name="enquiryFor"
                      required
                      value={formData.enquiryFor}
                      onChange={handleChange}
                      className="w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none"
                      disabled={isSubmitting}
                    >
                      <option value="">Enquiring For</option>
                      <option value="Courses / Internship">Courses / Internship</option>
                      <option value="Jobs">IT / Non-IT Jobs</option>
                    </select>
                    {errors.enquiryFor && <p className="text-xs text-red-300 mt-1">{errors.enquiryFor}</p>}
                  </div>

                  <input
                    type="text"
                    name="location"
                    required
                    placeholder="Location (City)"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none"
                    disabled={isSubmitting}
                  />

                  <div>
                    <select
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none"
                      disabled={isSubmitting}
                    >
                      <option value="">Select State / Region</option>
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.state && <p className="text-xs text-red-300 mt-1">{errors.state}</p>}
                  </div>

                  <select
                    name="experience"
                    required
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none"
                    disabled={isSubmitting}
                  >
                    <option value="">Total Experience</option>
                    <option value="Fresher">Fresher</option>
                    <option value="1-2 Years">1–2 Years</option>
                    <option value="3-5 Years">3–5 Years</option>
                    <option value="5+ Years">5+ Years</option>
                  </select>

                  {formData.enquiryFor === "Courses / Internship" && (
  <select
    name="branch"
    required
    value={formData.branch}
    onChange={handleChange}
    className="w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none"
    disabled={isSubmitting}
  >
    <option value="">Mode of Training</option>
    <option value="Offline">Offline</option>
    <option value="Online">Online</option>
  </select>
)}

                  {/* Conditional fields based on enquiry type */}
                  {formData.enquiryFor === "Courses / Internship" ? (
                    <>
                      <select
                        name="course"
                        required
                        value={formData.course}
                        onChange={handleChange}
                        className="w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none"
                        disabled={isSubmitting}
                      >
                        <option value="">Select Course / Training</option>
                        <option value="Internship">Internship</option>
                        <option value="Data Analytics">Data Analytics</option>
                        <option value="HR Analytics">HR Analytics</option>
                        <option value="Python Fullstack + AI">Python Fullstack + AI</option>
                        <option value="Java Fullstack">Java Fullstack</option>
                        <option value="Zoho Payroll">Zoho Payroll Training</option>
                        <option value="Digital Marketing">Digital Marketing</option>
                        <option value="Business Analytics">Business Analytics</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.course && <p className="text-xs text-red-300 mt-1">{errors.course}</p>}

                      {formData.course === "Other" && (
                        <input
                          type="text"
                          name="customCourse"
                          required
                          placeholder="Enter your course name"
                          value={formData.customCourse}
                          onChange={handleChange}
                          className="w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none"
                          disabled={isSubmitting}
                        />
                      )}
                      {errors.customCourse && <p className="text-xs text-red-300 mt-1">{errors.customCourse}</p>}
                    </>
                  ) : formData.enquiryFor === "Jobs" ? (
                    <>
                      <input
                        type="text"
                        name="preferredRole"
                        required
                        placeholder="Preferred Role (e.g. Support Engineer, HR Executive)"
                        value={formData.preferredRole}
                        onChange={handleChange}
                        className="w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none"
                        disabled={isSubmitting}
                      />
                      {errors.preferredRole && <p className="text-xs text-red-300 mt-1">{errors.preferredRole}</p>}

                      <input
                        type="text"
                        name="currentEmployer"
                        placeholder="Current Employer (optional)"
                        value={formData.currentEmployer}
                        onChange={handleChange}
                        className="w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none"
                        disabled={isSubmitting}
                      />
                    </>
                  ) : null}

                  <div className="flex justify-center mt-4">
                    <button
                      type="submit"
                      className="w-1/2 bg-yellow-400 text-black py-2 rounded-md text-sm font-semibold hover:bg-yellow-300 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center py-6">
                <h2 className="text-lg sm:text-xl font-semibold mb-2 text-yellow-300">Thank you!</h2>
                <p className="text-gray-200 text-sm mb-4">Your enquiry has been submitted.</p>
                <p className="text-green-200 text-sm font-bold">Our team will connect with you within <span className="text-yellow-300">24 hours</span>.</p>
                <div className="flex justify-center mt-4">
                  <button
                    onClick={() => {
                      handleClose();
                      setSubmitted(false);
                    }}
                    className="px-4 py-2 bg-yellow-400 text-black rounded-md font-semibold hover:bg-yellow-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUCCESS POPUP MODAL */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-[999999] px-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-xs p-5 text-center animate-fadeIn">
            <div className="flex justify-center mb-4">
              <img src="/Popup images/Form Submitted Icon.png" alt="Success" className="w-16 h-16 object-contain" />
            </div>

            <h3 className="text-lg font-semibold text-blue-600 mb-2">Form Submitted Successfully!</h3>

            <p className="text-gray-700 mb-4 text-sm">Thank you for your enquiry. Our team will contact you within 24 hours.</p>

            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition w-full"
              onClick={() => {
                setShowSuccessPopup(false);
                setSubmitted(false);
                handleClose();
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Styles for floating bubble + form animation */}
      <style jsx>{`
        .floating-bubble-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .chat-bubble {
          position: relative;
          background: linear-gradient(135deg, #2E477D 0%, #184274 100%);
          padding: 12px 20px;
          border-radius: 25px;
          box-shadow: 0 10px 30px rgba(24, 66, 116, 0.18), 0 6px 18px rgba(14, 30, 60, 0.08);
          transition: all 0.36s cubic-bezier(0.22, 1, 0.36, 1);
          animation: floatBubble 3s ease-in-out infinite;
        }

        .bubble-content {
          position: relative;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .bubble-text {
          color: #FFCB0E;
          font-weight: 700;
          font-size: 15px;
          white-space: nowrap;
          text-shadow: 0 2px 6px rgba(6, 18, 36, 0.25);
        }

        .bubble-pulse {
          width: 8px;
          height: 8px;
          background: #FFCB0E;
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
          box-shadow: 0 0 10px rgba(255, 203, 14, 0.65);
        }

        .bubble-tail {
          position: absolute;
          bottom: -8px;
          right: 20px;
          width: 0;
          height: 0;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-top: 10px solid #184274;
          transition: all 0.32s ease;
        }

        .bubble-show {
          opacity: 1;
          transform: scale(1) translateY(0);
          pointer-events: auto;
        }

        .bubble-hide {
          opacity: 0;
          transform: scale(0.86) translateY(10px);
          pointer-events: none;
        }

        .form-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          transition: all 0.36s cubic-bezier(0.22, 1, 0.36, 1);
          background: linear-gradient(135deg, #184274 0%, #2E477D 100%);
          padding: 12px;
          border-radius: 50%;
          box-shadow: 0 10px 26px rgba(24, 66, 116, 0.18), 0 6px 18px rgba(6, 18, 36, 0.06);
        }

        .icon-show {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1) rotate(0deg);
          pointer-events: auto;
        }

        .icon-hide {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.5) rotate(-180deg);
          pointer-events: none;
        }

        @keyframes floatBubble {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.55;
            transform: scale(1.25);
          }
        }

        .floating-bubble-container:hover .chat-bubble {
          box-shadow: 0 20px 48px rgba(24, 66, 116, 0.28), 0 14px 34px rgba(6, 18, 36, 0.12);
          transform: scale(1.06);
        }

        .floating-bubble-container:hover .form-icon {
          box-shadow: 0 18px 44px rgba(24, 66, 116, 0.22), 0 12px 30px rgba(6, 18, 36, 0.08);
          transform: translate(-50%, -50%) scale(1.08) rotate(0deg);
    }

    .floating-bubble-container:focus-visible {
      outline: 3px solid rgba(255, 203, 14, 0.95);
      outline-offset: 4px;
      border-radius: 30px;
    }

    @media (prefers-reduced-motion: reduce) {
      .chat-bubble, .form-icon, .bubble-pulse {
        animation: none;
        transition: none;
      }
    }

    @media (max-width: 640px) {
      .bubble-text {
        font-size: 13px;
      }
      .chat-bubble {
        padding: 10px 16px;
      }
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
    .animate-fadeIn {
      animation: fadeIn 0.3s ease-out;
    }
  `}</style>
</>
);
}

