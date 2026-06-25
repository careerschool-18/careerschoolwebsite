import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Select from "react-select";
import { City, State } from "country-state-city";
import { motion } from "framer-motion";
import SuccessToast from "./SuccessToast";

const defaultMockBatches = [
  { id: "B1", name: "Python 4", course: "Python Full Stack", studentCount: 15, status: "Active", startDate: "12 Jan 2025" },
  { id: "B2", name: "React Web Dev", course: "Frontend Development", studentCount: 12, status: "Active", startDate: "05 Feb 2025" },
  { id: "B3", name: "Data Analytics A", course: "Data Analytics & AI", studentCount: 8, status: "Active", startDate: "20 Feb 2025" },
  { id: "B4", name: "Python Nellore", course: "Python Programming", studentCount: 18, status: "Active", startDate: "01 Mar 2025" },
  { id: "B5", name: "Full Stack Advanced", course: "MERN Stack Development", studentCount: 14, status: "Active", startDate: "15 Mar 2025" },
  { id: "B6", name: "Data Analytics B", course: "Data Analytics & AI", studentCount: 11, status: "Active", startDate: "01 Apr 2025" },
  { id: "B7", name: "Java Enterprise", course: "Java Backend Development", studentCount: 9, status: "Active", startDate: "10 Apr 2025" },
  { id: "B8", name: "UI/UX Design Master", course: "UI/UX Design", studentCount: 15, status: "Active", startDate: "01 May 2025" },
  { id: "B9", name: "AWS Cloud & DevOps", course: "Cloud Engineering", studentCount: 7, status: "Active", startDate: "15 May 2025" },
  { id: "B10", name: "Mobile App Dev", course: "React Native Development", studentCount: 6, status: "Inactive", startDate: "01 Jun 2025" },
  { id: "B11", name: "Cybersecurity Basics", course: "Cybersecurity", studentCount: 5, status: "Active", startDate: "15 Jun 2025" },
  { id: "B12", name: "Python FastTrack", course: "Python Programming", studentCount: 12, status: "Active", startDate: "01 Jul 2025" },
];

const fallbackBatchNames = defaultMockBatches.filter(b => b.status === "Active").map(b => b.name);

const indianCities = City.getCitiesOfCountry("IN").map((city) => ({
  value: city.name,
  label: city.name,
  stateCode: city.stateCode,
})).sort((a, b) => a.label.localeCompare(b.label));

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

const countryCodeOptions = [
  { label: "India +91", value: "+91", digits: 10 },
  { label: "United States +1", value: "+1", digits: 10 },
  { label: "United Kingdom +44", value: "+44", digits: 10 },
  { label: "Australia +61", value: "+61", digits: 9 },
  { label: "UAE +971", value: "+971", digits: 9 },
  { label: "Qatar +974", value: "+974", digits: 8 },
  { label: "Kuwait +965", value: "+965", digits: 8 },
  { label: "Saudi Arabia +966", value: "+966", digits: 9 },
  { label: "New Zealand +64", value: "+64", digits: 9 },
];

const getDigitLimit = (code) => {
  const country = countryCodeOptions.find((c) => c.value === code);
  return country ? country.digits : 10;
};

export default function Signup() {
  const router = useRouter();

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [role, setRole] = useState("student");

  const getApiUrl = (path) => {
    if (typeof window !== "undefined" && window.location.hostname === "localhost") {
      return `http://localhost:8080${path}`;
    }
    return `https://career-school.co.in${path}`;
  };

  const [batchesList, setBatchesList] = useState(fallbackBatchNames);

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await fetch(getApiUrl("/api/batches"));
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        const data = await response.json();
        const activeNames = data
          .filter((b) => b.status === "Active")
          .map((b) => b.name);
        if (activeNames.length > 0) {
          setBatchesList(activeNames);
        }
      } catch (e) {
        console.warn("Failed to fetch batches from backend API, using local fallback:", e);
        try {
          let localBatches = localStorage.getItem("mock_batches");
          if (!localBatches) {
            localStorage.setItem("mock_batches", JSON.stringify(defaultMockBatches));
            localBatches = JSON.stringify(defaultMockBatches);
          }
          const parsed = JSON.parse(localBatches);
          const activeNames = parsed
            .filter((b) => b.status === "Active")
            .map((b) => b.name);
          if (activeNames.length > 0) {
            setBatchesList(activeNames);
          }
        } catch (err) {
          console.warn("Failed to load local batches fallback:", err);
        }
      }
    };

    fetchBatches();
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [alternate, setAlternate] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [alternateCountryCode, setAlternateCountryCode] = useState("+91");
  const [experience, setExperience] = useState("");
  const [dob, setDob] = useState("");
  const [doj, setDoj] = useState("");
  const [gender, setGender] = useState("");
  const [branch, setBranch] = useState("");

  const [collegeSearch, setCollegeSearch] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [selectedState, setSelectedState] = useState("");

  // Student specific fields
  const [batch, setBatch] = useState("");
  const [degree, setDegree] = useState("");
  const [courseFee, setCourseFee] = useState("");
  const [registrationFee, setRegistrationFee] = useState("");

  const handleCityChange = (selectedOption) => {
    if (selectedOption) {
      setCitySearch(selectedOption.value);
      const stateObj = State.getStateByCodeAndCountry(selectedOption.stateCode, "IN");
      setSelectedState(stateObj ? stateObj.name : "");
    } else {
      setCitySearch("");
      setSelectedState("");
    }
  };

  const validateForm = () => {
    const errs = {};
    if (!name.trim()) {
      errs.name = "Name is required";
    } else if (!/^[A-Za-z ]+$/.test(name)) {
      errs.name = "Name must contain only alphabets";
    }

    if (!email.trim()) {
      errs.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "Invalid email format";
    }

    const whatsappLimit = getDigitLimit(countryCode);
    const whatsappDigits = whatsapp.replace(/\D/g, "");
    if (!whatsappDigits) {
      errs.whatsapp = "WhatsApp number is required";
    } else if (whatsappDigits.length !== whatsappLimit) {
      errs.whatsapp = `WhatsApp number must contain exactly ${whatsappLimit} digits`;
    }

    if (alternate) {
      const alternateLimit = getDigitLimit(alternateCountryCode);
      const alternateDigits = alternate.replace(/\D/g, "");
      if (alternateDigits.length !== alternateLimit) {
        errs.alternate = `Alternate number must contain exactly ${alternateLimit} digits`;
      } else if (whatsappDigits === alternateDigits && countryCode === alternateCountryCode) {
        errs.alternate = "Alternate phone number must be different from the primary phone number.";
      }
    }

    if (role === "student") {
      if (!batch.trim()) errs.batch = "Batch details are required";
      if (!degree) errs.degree = "Degree selection is required";
      if (!collegeSearch.trim()) errs.college = "College name is required";
      if (!citySearch) errs.city = "Current location is required";
      if (!selectedState) errs.state = "State is required";
      if (!dob) errs.dob = "Date of birth is required";
      if (!doj) errs.doj = "Date of joining is required";
      if (!branch) errs.branch = "Branch selection is required";
      if (!courseFee) errs.courseFee = "Course fee is required";
      if (!registrationFee) errs.registrationFee = "Registration fee is required";
      if (!gender) errs.gender = "Gender is required";
    } else {
      if (!citySearch.trim()) errs.city = "City is required";
      if (!selectedState.trim()) errs.state = "State is required";
      if (!gender) errs.gender = "Gender is required";
    }

    return errs;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const errs = validateForm();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setLoading(false);
      return;
    }

    // Client validation passed — save locally immediately.
    if (role === "student") {
      const pending = JSON.parse(localStorage.getItem("mock_pending_signups") || "[]");
      pending.push({
        id: Date.now(),
        name,
        email,
        phone: whatsapp ? `${countryCode} ${whatsapp}` : "",
        batch: batch || "Python 4",
        degree: degree || "BTECH",
        branch: branch || "Nellore",
        courseFee: courseFee ? Number(courseFee) : 45000,
        registrationFee: registrationFee ? Number(registrationFee) : 5000,
        enrollDate: doj ? new Date(doj).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
      });
      localStorage.setItem("mock_pending_signups", JSON.stringify(pending));
    }

    // Fire-and-forget: attempt API call in background, never block UX on server response.
    const payload = {
      role,
      name,
      email,
      whatsapp: whatsapp ? `${countryCode}${whatsapp}` : null,
      alternate: alternate ? `${alternateCountryCode}${alternate}` : null,
      city: citySearch,
      state: selectedState,
      college: collegeSearch || null,
      experience: role !== "student" ? experience : null,
      dob,
      doj: doj || null,
      gender,
      branch,
      batch: role === "student" ? batch : null,
      degree: role === "student" ? degree : null,
      courseFee: role === "student" && courseFee ? Number(courseFee) : null,
      registrationFee: role === "student" && registrationFee ? Number(registrationFee) : null,
    };

    fetch(getApiUrl("/api/signup"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch((err) => console.warn("Background signup API call failed:", err.message));

    setLoading(false);
    setToastMessage("Signup successful! Redirecting to login...");
    setTimeout(() => {
      router.push("/login");
    }, 2000);
  };


  const customSelectStyles = {
    control: (base, state) => ({
      ...base,
      border: state.isFocused ? "1px solid #6366f1" : "1px solid #e2e8f0",
      boxShadow: state.isFocused ? "0 0 0 4px rgba(99, 102, 241, 0.08)" : "none",
      borderRadius: "0.75rem",
      padding: "0.125rem 0.25rem",
      minHeight: "54px",
      display: "flex",
      alignItems: "center",
      transition: "all 0.2s ease",
      backgroundColor: "white",
      "&:hover": {
        borderColor: state.isFocused ? "#6366f1" : "#cbd5e1"
      }
    }),
    placeholder: (base) => ({
      ...base,
      color: "#94a3b8"
    }),
    singleValue: (base) => ({
      ...base,
      color: "#1e293b"
    })
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-50 via-indigo-50/20 to-blue-50/40 px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="bg-white shadow-[0_20px_50px_rgba(30,41,59,0.05)] border border-slate-100/80 rounded-3xl p-6 sm:p-10 w-full max-w-xl"
      >
        
        {/* HEADER */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">
            Create Student Account
          </h2>
          <p className="text-slate-500 mt-2 text-sm font-medium">
            Join Career School to start your professional journey
          </p>
        </div>

        {errors.global && (
          <div className="p-4 bg-red-50 border border-red-100 text-red-700 rounded-xl text-sm font-medium mb-6">
            {errors.global}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSignup} className="space-y-5">
          
          {/* NAME */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Full Name</label>
            <input
              type="text"
              placeholder="Enter full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-slate-200 py-3.5 px-4 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50/50 transition-all duration-200 text-slate-800 placeholder-slate-400"
            />
            {errors.name && <p className="text-xs text-red-500 mt-1.5 ml-1 font-medium">{errors.name}</p>}
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Email Address</label>
            <input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-slate-200 py-3.5 px-4 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50/50 transition-all duration-200 text-slate-800 placeholder-slate-400"
            />
            {errors.email && <p className="text-xs text-red-500 mt-1.5 ml-1 font-medium">{errors.email}</p>}
          </div>

          {/* WHATSAPP & ALTERNATE NUMBERS */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">WhatsApp Number</label>
            <div className="flex items-center border border-slate-200 rounded-xl focus-within:ring-4 focus-within:ring-indigo-50/50 focus-within:border-indigo-500 overflow-hidden bg-white transition-all duration-200">
              <select
                value={countryCode}
                onChange={(e) => {
                  setCountryCode(e.target.value);
                  setWhatsapp("");
                }}
                className="w-20 h-12 pl-3 pr-1 border-r border-slate-200 focus:outline-none bg-transparent text-sm text-slate-700 cursor-pointer font-medium"
              >
                {countryCodeOptions.map((country) => (
                  <option key={country.value} value={country.value}>
                    {country.value}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                inputMode="numeric"
                placeholder="WhatsApp Number"
                value={whatsapp}
                maxLength={getDigitLimit(countryCode)}
                onChange={(e) => {
                  const digitsOnly = e.target.value.replace(/\D/g, "");
                  const limit = getDigitLimit(countryCode);
                  setWhatsapp(digitsOnly.slice(0, limit));
                }}
                className="flex-1 min-w-0 h-12 px-4 focus:outline-none bg-transparent text-slate-800 placeholder-slate-400"
              />
            </div>
            {errors.whatsapp && <p className="text-xs text-red-500 mt-1.5 ml-1 font-medium">{errors.whatsapp}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Alternate Number (Optional)</label>
            <div className="flex items-center border border-slate-200 rounded-xl focus-within:ring-4 focus-within:ring-indigo-50/50 focus-within:border-indigo-500 overflow-hidden bg-white transition-all duration-200">
              <select
                value={alternateCountryCode}
                onChange={(e) => {
                  setAlternateCountryCode(e.target.value);
                  setAlternate("");
                }}
                className="w-20 h-12 pl-3 pr-1 border-r border-slate-200 focus:outline-none bg-transparent text-sm text-slate-700 cursor-pointer font-medium"
              >
                {countryCodeOptions.map((country) => (
                  <option key={country.value} value={country.value}>
                    {country.value}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                inputMode="numeric"
                placeholder="Alternate Number"
                value={alternate}
                maxLength={getDigitLimit(alternateCountryCode)}
                onChange={(e) => {
                  const digitsOnly = e.target.value.replace(/\D/g, "");
                  const limit = getDigitLimit(alternateCountryCode);
                  setAlternate(digitsOnly.slice(0, limit));
                }}
                className="flex-1 min-w-0 h-12 px-4 focus:outline-none bg-transparent text-slate-800 placeholder-slate-400"
              />
            </div>
            {errors.alternate && <p className="text-xs text-red-500 mt-1.5 ml-1 font-medium">{errors.alternate}</p>}
          </div>

          {/* DOB */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Date of Birth</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full border border-slate-200 py-3.5 px-4 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50/50 transition-all duration-200 text-slate-800 placeholder-slate-400 bg-white"
            />
            {errors.dob && <p className="text-xs text-red-500 mt-1.5 ml-1 font-medium">{errors.dob}</p>}
          </div>

          {/* LOCATION & STATE */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Location</label>
              {role === "student" ? (
                <Select
                  options={indianCities}
                  placeholder="Select Location"
                  value={citySearch ? { value: citySearch, label: citySearch } : null}
                  onChange={handleCityChange}
                  styles={customSelectStyles}
                  isClearable
                />
              ) : (
                <input
                  type="text"
                  placeholder="Enter City"
                  value={citySearch}
                  onChange={(e) => setCitySearch(e.target.value)}
                  className="w-full border border-slate-200 py-3.5 px-4 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50/50 transition-all duration-200 text-slate-800 placeholder-slate-400"
                />
              )}
              {errors.city && <p className="text-xs text-red-500 mt-1.5 ml-1 font-medium">{errors.city}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">State</label>
              <input
                type="text"
                placeholder="State"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                disabled={role === "student"}
                className={`w-full border border-slate-200 py-3.5 px-4 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50/50 transition-all duration-200 text-slate-800 ${
                  role === "student" ? "bg-slate-50 cursor-not-allowed text-slate-400 border-slate-200/60" : ""
                }`}
              />
              {errors.state && <p className="text-xs text-red-500 mt-1.5 ml-1 font-medium">{errors.state}</p>}
            </div>
          </div>

          {/* BATCH & DEGREE */}
          {role === "student" && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Batch</label>
                <select
                  value={batch}
                  onChange={(e) => setBatch(e.target.value)}
                  className="w-full border border-slate-200 py-3.5 px-4 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50/50 transition-all duration-200 text-slate-800 bg-white cursor-pointer font-medium"
                >
                  <option value="">Select Batch</option>
                  {batchesList.map((bName) => (
                    <option key={bName} value={bName}>
                      {bName}
                    </option>
                  ))}
                </select>
                {errors.batch && <p className="text-xs text-red-500 mt-1.5 ml-1 font-medium">{errors.batch}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Degree</label>
                <select
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  className="w-full border border-slate-200 py-3.5 px-4 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50/50 transition-all duration-200 text-slate-800 bg-white cursor-pointer"
                >
                  <option value="">Select Degree</option>
                  {degreeOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {errors.degree && <p className="text-xs text-red-500 mt-1.5 ml-1 font-medium">{errors.degree}</p>}
              </div>
            </div>
          )}

          {/* COLLEGE */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">College Name</label>
            <input
              type="text"
              placeholder="Enter college or university name"
              value={collegeSearch}
              onChange={(e) => setCollegeSearch(e.target.value)}
              className="w-full border border-slate-200 py-3.5 px-4 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50/50 transition-all duration-200 text-slate-800 placeholder-slate-400"
            />
            {errors.college && <p className="text-xs text-red-500 mt-1.5 ml-1 font-medium">{errors.college}</p>}
          </div>

          {/* EXPERIENCE (Only for non-student roles - hidden but styled) */}
          {role !== "student" && (
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Experience</label>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full border border-slate-200 py-3.5 px-4 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50/50 transition-all duration-200 text-slate-800 bg-white cursor-pointer"
              >
                <option value="">Select Experience</option>
                <option>Fresher</option>
                <option>&lt; 1 year</option>
                <option>1 - 3 years</option>
                <option>3 - 5 years</option>
                <option>5+ years</option>
              </select>
            </div>
          )}

          {/* COURSE FEE & REGISTRATION FEE */}
          {role === "student" && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Course Fee</label>
                <input
                  type="number"
                  placeholder="Enter Course Fee"
                  value={courseFee}
                  onChange={(e) => setCourseFee(e.target.value)}
                  className="w-full border border-slate-200 py-3.5 px-4 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50/50 transition-all duration-200 text-slate-800 placeholder-slate-400"
                />
                {errors.courseFee && <p className="text-xs text-red-500 mt-1.5 ml-1 font-medium">{errors.courseFee}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Registration Fee</label>
                <input
                  type="number"
                  placeholder="Enter Registration Fee"
                  value={registrationFee}
                  onChange={(e) => setRegistrationFee(e.target.value)}
                  className="w-full border border-slate-200 py-3.5 px-4 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50/50 transition-all duration-200 text-slate-800 placeholder-slate-400"
                />
                {errors.registrationFee && <p className="text-xs text-red-500 mt-1.5 ml-1 font-medium">{errors.registrationFee}</p>}
              </div>
            </div>
          )}

          {/* BRANCH & GENDER */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Branch</label>
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full border border-slate-200 py-3.5 px-4 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50/50 transition-all duration-200 text-slate-800 bg-white cursor-pointer font-medium"
              >
                <option value="">Select Branch</option>
                <option value="Nellore">Nellore</option>
                <option value="Chennai">Chennai</option>
              </select>
              {errors.branch && <p className="text-xs text-red-500 mt-1.5 ml-1 font-medium">{errors.branch}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full border border-slate-200 py-3.5 px-4 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50/50 transition-all duration-200 text-slate-800 bg-white cursor-pointer font-medium"
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Prefer not to say</option>
              </select>
              {errors.gender && <p className="text-xs text-red-500 mt-1.5 ml-1 font-medium">{errors.gender}</p>}
            </div>
          </div>

          {/* DATE OF JOINING */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Date of Joining</label>
            <input
              type="date"
              value={doj}
              onChange={(e) => setDoj(e.target.value)}
              className="w-full border border-slate-200 py-3.5 px-4 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50/50 transition-all duration-200 text-slate-800 placeholder-slate-400 bg-white"
            />
            {errors.doj && <p className="text-xs text-red-500 mt-1.5 ml-1 font-medium">{errors.doj}</p>}
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-[0.98] shadow-md shadow-indigo-100 hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none"
          >
            {loading ? "Registering..." : "Creating Account"}
          </button>
        </form>
      </motion.div>
      <SuccessToast message={toastMessage} onClose={() => setToastMessage("")} />
    </div>
  );
}