import { useState, useEffect } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import toast from "react-hot-toast";
import { isValidPhoneNumber } from "libphonenumber-js";
import Select from "react-select";
import { State, City } from "country-state-city";
import AnimatedWrapper from "../components/AnimatedWrapper";

// ✅ District → State mapping
const districtStateMap = [];

State.getStatesOfCountry("IN").forEach((state) => {
  const cities = City.getCitiesOfState("IN", state.isoCode);

  cities.forEach((city) => {
    districtStateMap.push({
      district: city.name,
      state: state.name,
      stateCode: state.isoCode,
    });
  });
});

const districtOptions = districtStateMap.map((item) => ({
  label: item.district,
  value: item.district,
}));

export default function Form() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    degree: "",
    college: "",
    state: "",
    city: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [courseOptions, setCourseOptions] = useState([]);

  useEffect(() => {
  const courses = [
    "ZOHO Payroll",
    " Python/Java Full Stack Development",
    "Data Analytics",
    "UI/UX Design",
    "Web Development",
    "DevOps",
    ".NET",
    "Digital Marketing",
    "AI/Machine Learning",
    "ios/Android App Development",
    "Azure/AWS",
    "HR Analytics",
    "Internet Of Things",
    "Cyber Security",
    "Node.js/Vue.js",
    "React/Angular",
    "SAP",
    "Blockchain Technology",
    "Networking",
    "Software Testing",
    "Big Data and Hadoop",
  ];

  setCourseOptions(
    courses.map((course) => ({
      label: course,
      value: course,
    }))
  );
}, []);

  // ✅ Scroll to first error
  const scrollToFirstError = (errors) => {
    const firstErrorField = Object.keys(errors)[0];
    const el = document.querySelector(`[name="${firstErrorField}"]`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.focus();
    }
  };

  const handleDistrictChange = (selected) => {
    const selectedDistrict = selected?.value || "";

    const found = districtStateMap.find(
      (item) => item.district === selectedDistrict
    );

    updateForm({
      ...formData,
      city: selectedDistrict,
      state: found?.state || "",
    });
  };

  const customSelectStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: "#f9fafb",
      borderColor: errors.city ? "#ef4444" : state.isFocused ? "#3b82f6" : "#e5e7eb",
      boxShadow: errors.city
        ? "0 0 0 1px #ef4444"
        : state.isFocused
        ? "0 0 0 2px #dbeafe"
        : "none",
      borderRadius: "8px",
      padding: "2px",
      minHeight: "48px",
    }),
  };

  const validate = (data) => {
    let newErrors = {};

    if (!data.name) newErrors.name = "Name required";
    else if (!/^[A-Za-z.\s]+$/.test(data.name))
      newErrors.name = "Only alphabets allowed";

    if (!data.email) newErrors.email = "Email required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      newErrors.email = "Invalid email";

    if (!data.mobile) newErrors.mobile = "Mobile required";
    else if (!isValidPhoneNumber(data.mobile))
      newErrors.mobile = "Invalid phone";

    if (!data.degree) newErrors.degree = "Degree required";
    if (!data.college) newErrors.college = "College required";
    if (!data.state) newErrors.state = "State required";
    if (!data.city) newErrors.city = "District required";

    return newErrors;
  };

  const updateForm = (updated) => {
    const validationErrors = validate(updated);
    setFormData(updated);
    setErrors(validationErrors);
  };

  const handleYearChange = (e) => {
    const val = e.target.value.replace(/\D/g, "");
    if (val.length <= 4)
      updateForm({ ...formData, year: val });
  };


  const handleChange = (e) => {
    updateForm({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (value) => {
    updateForm({ ...formData, mobile: value || "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Fix errors before submitting");
      scrollToFirstError(validationErrors);
      return;
    }

    try {
      setLoading(true);

      // simulate API delay
      await new Promise((res) => setTimeout(res, 1500));

      console.log("Form Data:", formData);
      toast.success("Form submitted successfully 🎉");

      setFormData({
        name: "",
        email: "",
        mobile: "",
        degree: "",
        college: "",
        state: "",
        city: "",
      });

      setErrors({});
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    Object.keys(errors).length === 0 &&
    Object.values(formData).every(Boolean);

  return (
    <div className="min-h-screen flex items-start sm:items-center justify-center bg-[#f7f9fc] px-3 sm:px-4 py-6">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl p-5 sm:p-8 border border-gray-100">

        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 text-center mb-6 sm:mb-8">
          Enroll Now
        </h2>

        <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
          <AnimatedWrapper>
            <div className="space-y-4 sm:space-y-5">

              {/* Name */}
              <div>
                <label className="text-sm text-gray-600 mb-1 block font-medium">Full Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-gray-50 border ${
                    errors.name ? "border-red-500" : ""
                  }`}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="text-sm text-gray-600 mb-1 block font-medium">Email</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-gray-50 border ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="text-sm text-gray-600 mb-1 block font-medium">WhatsApp Number</label>
                <div className={`border rounded-lg px-3 py-2 bg-gray-50 ${errors.mobile ? "border-red-500" : ""}`}>
                  <PhoneInput
                    international
                    defaultCountry="IN"
                    value={formData.mobile}
                    onChange={handlePhoneChange}
                  />
                </div>
                {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
              </div>
{/* Degree */}
<div>
  <label className="text-sm text-gray-600 mb-1 block font-medium">Qualifications</label>
  <input
    name="degree"
    value={formData.degree}
    onChange={handleChange}
    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-gray-50 border ${
      errors.degree ? "border-red-500" : ""
    }`}
  />
  {errors.degree && <p className="text-red-500 text-sm">{errors.degree}</p>}
</div>

{/* College */}
<div>
  <label className="text-sm text-gray-600 mb-1 block font-medium">College Name</label>
  <input
    name="college"
    value={formData.college}
    onChange={handleChange}
    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-gray-50 border ${
      errors.college ? "border-red-500" : ""
    }`}
  />
  {errors.college && <p className="text-red-500 text-sm">{errors.college}</p>}
</div>

{/* ✅ Year of Passing */}
<div>
  <label className="text-sm text-gray-600 mb-1 block font-medium">Year of Passing</label>
  <input
    name="year"
    value={formData.year}
    onChange={handleYearChange}
    maxLength={4}
    placeholder="YYYY"
    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-gray-50 border ${
      errors.year ? "border-red-500" : ""
    }`}
  />
  {errors.year && <p className="text-red-500 text-sm">{errors.year}</p>}
</div>

{/* ✅ Experience */}
<div>
  <label className="text-sm text-gray-600 mb-1 block font-medium">Total Years of Experience</label>
  <select
    name="experience"
    value={formData.experience}
    onChange={handleChange}
    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-gray-50 border ${
      errors.experience ? "border-red-500" : ""
    }`}
  >
    <option value="">Select Experience</option>
    <option>FRESHER</option>
    <option>6 MONTHS - 1 YEAR</option>
    <option>1 YEAR - 2 YEARS</option>
    <option>2 YEARS - 4 YEARS</option>
    <option>4+ YEARS</option>
  </select>
  {errors.experience && <p className="text-red-500 text-sm">{errors.experience}</p>}
</div>

{/* ✅ Course (Multi Select) */}
<div>
  <label className="text-sm text-gray-600 mb-1 block font-medium">Course Looking For</label>
  <Select
    isMulti
    options={courseOptions}
    placeholder="Select Courses"
    value={formData.courses}
    onChange={(val) => updateForm({ ...formData, courses: val })}
  />
  {errors.courses && <p className="text-red-500 text-sm">{errors.courses}</p>}
</div>


{/* District */}
<div>
  <label className="text-sm text-gray-600 mb-1 block font-medium">City</label>
  <Select
    options={districtOptions}
    styles={customSelectStyles}
    isSearchable
    placeholder="Search District..."
    value={districtOptions.find((d) => d.value === formData.city)}
    onChange={handleDistrictChange}
  />
  {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
</div>

{/* State */}
<div>
  <label className="text-sm text-gray-600 mb-1 block font-medium">State</label>
  <input
    value={formData.state}
    readOnly
    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-gray-100 border"
  />
</div>

<div>
  <label className="text-sm text-gray-600 mb-1 block font-medium">How did you hear about Careerschool Training Program?</label>
  <select
    name="experience"
    value={formData.experience}
    onChange={handleChange}
    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-gray-50 border ${
      errors.experience ? "border-red-500" : ""
    }`}
  >
    <option value="">Select Source</option>
    <option>Instagram</option>
    <option>Facebook</option>
    <option>Twitter</option>
    <option>WhatsApp</option>
    <option>LinkedIn</option>
    <option>Google</option>
    <option>YouTube</option>
    <option>Friends</option>
  </select>
  {errors.experience && <p className="text-red-500 text-sm">{errors.experience}</p>}
</div>

              {/* Sticky Submit */}
              <div className="sticky bottom-0 bg-white pt-3">
                <button
                  type="submit"
                  disabled={!isFormValid || loading}
                  className={`w-full py-3 rounded-lg text-white flex justify-center items-center gap-2
                    ${
                      isFormValid && !loading
                        ? "bg-blue-600"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                >
                  {loading && (
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  )}
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>

            </div>
          </AnimatedWrapper>
        </form>

      </div>
    </div>
  );
}