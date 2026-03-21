import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import toast from "react-hot-toast";
import { isValidPhoneNumber } from "libphonenumber-js";
import Select from "react-select";
import { State, City } from "country-state-city";

export default function Form() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    degree: "",
    college: "",
    state: "",
    city: "",
    date: "",
  });

  const [errors, setErrors] = useState({});

  // ✅ Get States
  const states = State.getStatesOfCountry("IN").map((s) => ({
    label: s.name,
    value: s.isoCode,
  }));

  // ✅ Get Cities based on selected state
  const cities = formData.state
    ? City.getCitiesOfState("IN", formData.state).map((c) => ({
        label: c.name,
        value: c.name,
      }))
    : [];

  // ✅ Validation
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
    if (!data.city) newErrors.city = "City required";
    if (!data.date) newErrors.date = "Date required";

    return newErrors;
  };

  // Handle input change
  const handleChange = (e) => {
    const updated = { ...formData, [e.target.name]: e.target.value };
    setFormData(updated);
    setErrors(validate(updated));
  };

  // Phone change
  const handlePhoneChange = (value) => {
    const updated = { ...formData, mobile: value || "" };
    setFormData(updated);
    setErrors(validate(updated));
  };

  // State change
  const handleStateChange = (selected) => {
    const updated = {
      ...formData,
      state: selected?.value || "",
      city: "",
    };
    setFormData(updated);
    setErrors(validate(updated));
  };

  // City change
  const handleCityChange = (selected) => {
    const updated = {
      ...formData,
      city: selected?.value || "",
    };
    setFormData(updated);
    setErrors(validate(updated));
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      toast.error("Fix errors before submitting");
      return;
    }

    console.log("Form Data:", formData);
    toast.success("Form submitted 🎉");

    setFormData({
      name: "",
      email: "",
      mobile: "",
      degree: "",
      college: "",
      state: "",
      city: "",
      date: "",
    });

    setErrors({});
  };

  const isFormValid =
    Object.keys(errors).length === 0 && Object.values(formData).every(Boolean);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-white to-blue-300">
      <div className="bg-white/30 backdrop-blur-xl shadow-2xl rounded-3xl p-8 w-full max-w-md border border-white/20">
        <h2 className="text-3xl font-bold text-center mb-6">Enroll Now</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full p-3 rounded-xl bg-white/40 border"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

          {/* Email */}
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-3 rounded-xl bg-white/40 border"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}

          {/* Phone */}
          <PhoneInput
            international
            defaultCountry="IN"
            value={formData.mobile}
            onChange={handlePhoneChange}
            className="w-full p-2 rounded-xl bg-white/40 border"
          />
          {errors.mobile && (
            <p className="text-red-500 text-sm">{errors.mobile}</p>
          )}

          {/* Degree */}
          <input
            name="degree"
            value={formData.degree}
            onChange={handleChange}
            placeholder="Degree"
            className="w-full p-3 rounded-xl bg-white/40 border"
          />

          {/* College */}
          <input
            name="college"
            value={formData.college}
            onChange={handleChange}
            placeholder="College"
            className="w-full p-3 rounded-xl bg-white/40 border"
          />

          {/* State */}
          <Select
            options={states}
            onChange={handleStateChange}
            placeholder="Select State"
          />
          {errors.state && (
            <p className="text-red-500 text-sm">{errors.state}</p>
          )}

          {/* City */}
          <Select
            options={cities}
            onChange={handleCityChange}
            placeholder="Select City"
            isDisabled={!formData.state}
          />
          {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}

          {/* Date */}
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/40 border"
          />
          {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}

          {/* Submit */}
          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-3 rounded-xl text-white ${
              isFormValid ? "bg-blue-600" : "bg-gray-400"
            }`}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
