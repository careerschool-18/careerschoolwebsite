import { useState } from "react";
import { useRouter } from "next/router";

export default function Signup() {
  const router = useRouter();

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [role, setRole] = useState("student");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [alternate, setAlternate] = useState("");
  const [experience, setExperience] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");

  const [collegeSearch, setCollegeSearch] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [selectedState, setSelectedState] = useState("");

  // Frontend only submit
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({}); // Clear out previous validations

    // Align the payload keys exactly with SignupRequest.java fields
    const payload = {
      role,
      name,
      email,
      whatsapp: whatsapp ? Number(whatsapp) : null,
      alternate: alternate ? Number(alternate) : null,
      city: citySearch,       // Maps to backend 'city' variable
      state: selectedState,   // Maps to backend 'state' variable
      college: collegeSearch, // Maps to backend 'college' variable
      experience,
      dob,
      gender,
    };

    try {
      const response = await fetch("https://career-school.co.in/api/v1/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Server responded with an error status.");
      }

      const data = await response.json();

      // The backend returns a map containing { success: true/false, errors: {...} }
      if (data.success) {
        console.log(data.message);
        router.push("/login"); // Move to login page only on a valid registration
      } else {
        // Feed validation errors directly into our UI error state
        setErrors(data.errors || {});
      }
    } catch (error) {
      console.error("API Connection Error:", error);
      setErrors({ global: "Unable to connect to the server. Please check your network connection." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">

      <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-10 w-full max-w-lg">

        {/* ROLE SELECTOR */}
          <div className="flex justify-center mb-8 w-full">
            <div className="w-full">
              
              {errors.global && (
                <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm mb-4">
                  {errors.global}
                </div>
              )}

              <div className="flex w-full bg-yellow-400 p-1 rounded-full shadow-md overflow-hidden">

                {["student", "employee", "employer"].map((item) => (

                  <button
                    key={item}
                    onClick={() => setRole(item)}
                    className={`flex-1 min-w-0 py-2 text-[11px] sm:text-sm md:text-base font-semibold rounded-full transition-all duration-300
                      ${
                        role === item
                          ? "bg-blue-600 text-white shadow-md"
                          : "text-blue-800 hover:bg-yellow-300"
                      }`}
                  >
                    <span className="truncate block">
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </span>
                  </button>

                ))}

              </div>
            </div>
          </div>

        {/* FORM */}
        <form onSubmit={handleSignup} className="space-y-5">

          {/* NAME */}
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}

          <div className="grid grid-cols-2 gap-4">

            {/* WHATSAPP */}
            <input
              type="tel"
              placeholder="WhatsApp Number"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.whatsapp && <p className="text-sm text-red-500 mt-1">{errors.whatsapp}</p>}

            

            {/* ALTERNATE */}
            <input
              type="tel"
              placeholder="Alternate Number"
              value={alternate}
              onChange={(e) => setAlternate(e.target.value)}
              className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.alternate && <p className="text-sm text-red-500 mt-1">{errors.alternate}</p>}

          </div>

          <div className="grid grid-cols-2 gap-4">

          {/* CITY */}
          <input
            type="text"
            placeholder="Enter City"
            value={citySearch}
            onChange={(e) => setCitySearch(e.target.value)}
            className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* STATE */}
          <input
            type="text"
            placeholder="State"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          </div>  

          {/* COLLEGE */}
          <input
            type="text"
            placeholder="College / University"
            value={collegeSearch}
            onChange={(e) => setCollegeSearch(e.target.value)}
            className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* EXPERIENCE */}
          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Experience</option>
            <option>Fresher</option>
            <option>&lt; 1 year</option>
            <option>1 - 3 years</option>
            <option>3 - 5 years</option>
            <option>5+ years</option>
          </select>

          {/* DOB */}
          <div>

            <label className="block text-sm font-medium mb-1 pt-2">
              DOB
            </label>

            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* GENDER */}
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Prefer not to say</option>
          </select>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700 transition"
          >
            {loading ? "Registering..." : "Creating Account"}
          </button>

        </form>

      </div>

    </div>
  );
}