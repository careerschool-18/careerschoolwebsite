import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import toast from "react-hot-toast";

export default function Form() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    age: "",
    degree: "",
  });

  const [errors, setErrors] = useState({});

  // ✅ Validators
  const validate = (data) => {
    let newErrors = {};

    // Name (only alphabets, space, dot)
    if (!/^[A-Za-z.\s]+$/.test(data.name)) {
      newErrors.name = "Only alphabets and dot allowed";
    }

    // Email (must contain @)
    if (!data.email.includes("@")) {
      newErrors.email = "Enter valid email (must include @)";
    }

    // Age (1–90)
    if (!data.age || data.age < 1 || data.age > 90) {
      newErrors.age = "Age must be between 1 and 90";
    }

    // Mobile (10 digit India)
    if (!data.mobile) {
      newErrors.mobile = "Mobile required";
    } else {
      const cleaned = data.mobile.replace("+91", "").replace(/\s/g, "");
      if (!/^[6-9]\d{9}$/.test(cleaned)) {
        newErrors.mobile = "Enter valid 10-digit Indian number";
      }
    }

    return newErrors;
  };

  // Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedData = {
      ...formData,
      [name]: value,
    };

    setFormData(updatedData);
    setErrors(validate(updatedData)); // live validation
  };

  // Handle phone change
  const handlePhoneChange = (value) => {
    const updatedData = {
      ...formData,
      mobile: value,
    };

    setFormData(updatedData);
    setErrors(validate(updatedData));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate(formData);

    if (Object.keys(validationErrors).length > 0) {
      toast.error("Please fix errors before submitting");
      return;
    }

    console.log("Form Data:", formData);
    toast.success("Form submitted successfully 🎉");

    setFormData({
      name: "",
      email: "",
      mobile: "",
      age: "",
      degree: "",
    });

    setErrors({});
  };

  // ✅ Check if form is valid
  const isFormValid =
    Object.keys(errors).length === 0 &&
    formData.name &&
    formData.email &&
    formData.mobile &&
    formData.age &&
    formData.degree;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
      
      <div className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-md">
        
        <h2 className="text-3xl font-bold text-center mb-6">
          Enroll Now
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">

          {/* Name */}
          <div>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="text"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Mobile */}
          <div>
            <PhoneInput
              international
              defaultCountry="IN"
              value={formData.mobile}
              onChange={handlePhoneChange}
              className="w-full border p-2 rounded-lg"
            />
            {errors.mobile && (
              <p className="text-red-500 text-sm">{errors.mobile}</p>
            )}
          </div>

          {/* Age */}
          <div>
            <input
              type="number"
              name="age"
              placeholder="Age (1–90)"
              value={formData.age}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />
            {errors.age && (
              <p className="text-red-500 text-sm">{errors.age}</p>
            )}
          </div>

          {/* Degree */}
          <input
            type="text"
            name="degree"
            placeholder="Degree"
            value={formData.degree}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-3 rounded-lg text-white font-semibold transition 
              ${
                isFormValid
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
          >
            Submit
          </button>

        </form>
      </div>
    </div>
  );
}