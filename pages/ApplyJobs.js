// app/jobs/page.jsx
"use client";

import { useState } from "react";

const HERO_SRC = "/mnt/data/Screenshot 2025-11-25 151317.png";

const FREE_JOBS = [
  { id: 1, title: "International - Voice Support", location: "Ambattur, Chennai", description: "Handle inbound/outbound international calls, resolve customer queries, and log interactions in CRM. Fluent English required. Shift: Rotational." },
  { id: 2, title: "Hindi - Customer Support", location: "Ambattur, Chennai", description: "Provide voice & chat support in Hindi for domestic customers. Good problem solving and typing speed required. Freshers welcome." },
  { id: 3, title: "AML Analyst", location: "Ambattur, Chennai", description: "Monitor transactions to detect suspicious activity, prepare reports, and escalate alerts. Requires attention to detail and basic Excel skills." },
  { id: 4, title: "Tamil Customer Support - Voice", location: "Ambattur, Chennai", description: "Handle Tamil-language customer calls, update CRM tickets, and assist with local enquiries. Strong Tamil communication required." },
  { id: 5, title: "International - Voice Support", location: "Ambattur, Chennai", description: "Assist overseas customers with product/service queries. Soft skills and clear pronunciation essential. Training provided." },
  { id: 6, title: "International - Voice Support", location: "Ambattur, Chennai", description: "Inbound voice role supporting various geographies. Must be comfortable with rotational shifts and targets." },
  { id: 7, title: "International - Voice Support", location: "Ambattur, Chennai", description: "Resolve customer issues on calls, ensure high CSAT, and follow SOPs. Prior BPO experience preferred but not mandatory." },
  { id: 8, title: "International - Voice Support", location: "Ambattur, Chennai", description: "Voice support role focused on troubleshooting and empathy-driven customer care. Good listening skills required." },
  { id: 9, title: "International - Voice Support", location: "Ambattur, Chennai", description: "Work with international customers across channels, maintain call quality, and meet SLA targets." },
  { id: 10, title: "International - Voice Support", location: "Ambattur, Chennai", description: "Provide timely resolutions for customer inquiries, escalate issues when necessary, and maintain accurate call notes." },
  { id: 11, title: "International - Voice Support", location: "Ambattur, Chennai", description: "Handle high-volume inbound calls, follow scripts where applicable, and ensure first-call resolution whenever possible." },
  { id: 12, title: "International - Voice Support", location: "Ambattur, Chennai", description: "Engage with customers professionally, adapt to varying accents, and contribute to team KPIs. Freshers with good English encouraged." },
];

const PLACEMENT_JOBS = [
  { id: 101, title: "Java Fullstack Developer", location: "Ambattur, Chennai", description: "Develop and maintain Java-based web applications. Java, Spring Boot, basic frontend (React/Angular)." },
  { id: 102, title: "Digital Marketing Executive", location: "Ambattur, Chennai", description: "Run campaigns, manage social channels, analyze KPIs. SEO & Ads experience preferred." },
  { id: 103, title: "Business Analyst", location: "Ambattur, Chennai", description: "Gather requirements, produce documentation, liaise with stakeholders." },
  { id: 104, title: "Data Analyst", location: "Ambattur, Chennai", description: "Analyze datasets, build dashboards. SQL & Excel required." },
  { id: 105, title: "HR Executive", location: "Ambattur, Chennai", description: "Coordinate recruitment, onboarding and employee communication." },
  { id: 106, title: "Technical Support Engineer", location: "Ambattur, Chennai", description: "Provide L1/L2 support, troubleshoot, document resolutions." },
];

export default function JobsPage() {
  const [tab, setTab] = useState("free");
  const [descJob, setDescJob] = useState(null);
  const [applyFor, setApplyFor] = useState(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    altPhone: "",
    email: "",
    locationAreaCity: "",
    language: "English",
    followings: "No",
    highestEducation: "",
    collegeName: "",
    stream: "",
    yearOfPassing: "",
    anyArrears: "No",
    fresherOrExp: "Fresher",
    locationApplyingFor: "IT",
    positionApplyingFor: "",
    currentWork: "",
    experienceYears: "",
    howDidYouKnow: "",
    referenceName: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const jobsToShow = tab === "free" ? FREE_JOBS : PLACEMENT_JOBS;

  function openDesc(job) {
    setDescJob(job);
  }
  function closeDesc() {
    setDescJob(null);
  }

  function openApply(job) {
    setApplyFor(job);
    setForm((s) => ({
      ...s,
      positionApplyingFor: job?.title || "",
      // keep other fields blank
    }));
    setSubmitted(false);
    setErrors({});
  }
  function closeModal() {
    setApplyFor(null);
    setSubmitted(false);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    // keep only digits for phone fields
    if (name === "phone" || name === "altPhone") {
      const digits = value.replace(/\D/g, "").slice(0, 10);
      setForm((s) => ({ ...s, [name]: digits }));
      return;
    }
    setForm((s) => ({ ...s, [name]: value }));
  }

  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = "Enter full name";
    if (!/^\d{10}$/.test(form.phone)) errs.phone = "Enter 10-digit primary phone";
    if (form.altPhone && !/^\d{10}$/.test(form.altPhone)) errs.altPhone = "Enter 10-digit alternate phone or leave blank";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Enter a valid email";
    if (!form.locationAreaCity.trim()) errs.locationAreaCity = "Enter area & city";
    if (!form.highestEducation.trim()) errs.highestEducation = "Select highest education";
    if (!form.yearOfPassing.trim()) errs.yearOfPassing = "Enter year of passing";
    // experience requirements: if Experienced, ensure experienceYears is provided
    if (form.fresherOrExp === "Experienced" && !form.experienceYears.trim()) errs.experienceYears = "Enter experience in years";
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;

    // simulate submit action (replace with real API call)
    console.log("Submitting application:", { applyFor, form });

    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-[#FFD500] font-sans">
      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* HERO SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <div className="md:col-span-2 pt-6">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-[#0b2447]">
              <span className="block">Find the job that fits</span>
              <span className="block text-blue-600">your future</span>
            </h1>
          </div>

          <div className="flex justify-end pt-4 md:pt-0">
            <div className="w-44 h-44 md:w-60 md:h-60 rounded-sm overflow-hidden bg-blue-700 flex items-center justify-center">
              <img src={HERO_SRC} alt="hero" className="object-cover w-full h-full" />
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="mt-8 flex justify-center">
          <div className="w-full max-w-3xl bg-blue-800 rounded-full p-1 flex items-center">
            <button
              onClick={() => setTab("free")}
              className={`flex-1 py-3 rounded-full font-semibold transition flex items-center justify-center ${tab === "free" ? "bg-white text-black" : "text-white"}`}
              style={{ minWidth: 160 }}
            >
              Free Jobs
            </button>

            <button
              onClick={() => setTab("placement")}
              className={`flex-1 py-3 rounded-full font-semibold transition flex items-center justify-center ${tab === "placement" ? "bg-white text-black" : "text-white"}`}
              style={{ minWidth: 160 }}
            >
              Placement Jobs
            </button>
          </div>
        </div>

        {/* JOB CARDS: 3 per row */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {jobsToShow.map((job) => (
            <div key={job.id} className="w-full">
              <div
                className="flex items-center justify-between rounded-[40px] px-4 py-3 shadow-md"
                style={{
                  background: "#0b4090",
                  border: "4px solid #FFD500",
                }}
              >
                <div className="flex flex-col min-w-0">
                  <div className="text-white font-semibold text-sm md:text-base truncate">
                    {job.title}
                  </div>

                  <div className="mt-2 flex items-center gap-2">
                    <span className="inline-flex items-center gap-2 bg-[#FFD500] text-[#0b2447] text-xs font-medium px-2 py-1 rounded-full">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path
                          d="M12 2C8.13 2 5 4.9 5 8.5C5 13.48 12 22 12 22C12 22 19 13.48 19 8.5C19 4.9 15.87 2 12 2Z"
                          fill="#0B2447"
                        />
                        <circle cx="12" cy="8.5" r="2.5" fill="#FFD500" />
                      </svg>

                      <span className="truncate max-w-[12rem]">{job.location}</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 ml-4">
                  <button
                    onClick={() => openDesc(job)}
                    className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow"
                    aria-label="View description"
                    title="View description"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M7 10l5 5 5-5" stroke="#0B2447" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  <button
                    onClick={() => openApply(job)}
                    className="flex items-center gap-3 bg-white text-[#0B2447] font-semibold px-4 py-2 rounded-full shadow"
                    aria-label={`Apply for ${job.title}`}
                  >
                    <span className="text-sm">Apply</span>
                    <span className="w-7 h-7 bg-[#0b2447] rounded-full flex items-center justify-center text-white">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER NOTE */}
        <div className="mt-8 text-center">
          <p className="text-sm text-black/80"></p>
        </div>
      </div>

      {/* DESCRIPTION POPUP */}
      {descJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/60" onClick={closeDesc} />
          <div className="relative bg-white rounded-xl w-full max-w-lg mx-auto p-6 z-10">
            <button onClick={closeDesc} className="absolute top-3 right-3 text-gray-700 text-lg">✕</button>
            <h3 className="text-xl font-bold mb-2 text-gray-800">{descJob.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{descJob.location}</p>
            <div className="text-sm text-gray-700 leading-relaxed">{descJob.description}</div>

            <ul className="mt-4 text-sm text-gray-600 list-disc list-inside">
              <li>Experience: Freshers to 2 years</li>
              <li>Shift: Rotational (may include weekends)</li>
              <li>Salary: Depends on role (discussed on interview)</li>
            </ul>

            <div className="mt-6 flex gap-3 justify-end">
              <button onClick={closeDesc} className="px-4 py-2 border rounded">Close</button>
              <button onClick={() => { openApply(descJob); closeDesc(); }} className="px-4 py-2 bg-blue-700 text-white rounded">Apply</button>
            </div>
          </div>
        </div>
      )}

      {/* APPLY POPUP - expanded form with requested fields */}
      {applyFor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/50" onClick={closeModal} />
          <div className="relative bg-white rounded-xl w-full max-w-3xl mx-auto p-6 z-10 overflow-auto" style={{ maxHeight: "90vh" }}>
            <button onClick={closeModal} className="absolute top-3 right-3 text-gray-700 text-lg">✕</button>

            {!submitted ? (
              <>
                <h3 className="text-xl font-bold mb-1 text-gray-800">Apply for {applyFor.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{applyFor.location}</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="text-sm font-medium block mb-1">Full name</label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Full name" className="w-full border rounded px-3 py-2 text-sm outline-none" />
                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                  </div>

                  {/* Phone - primary and alternate */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium block mb-1">Phone number</label>
                      <div className="flex items-center">
                        <div className="px-3 py-2 bg-gray-100 rounded-l text-sm">+91</div>
                        <input name="phone" value={form.phone} onChange={handleChange} placeholder="10-digit mobile" inputMode="numeric" className="flex-1 border rounded-r px-3 py-2 text-sm outline-none" maxLength={10} />
                      </div>
                      {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="text-sm font-medium block mb-1">Alternate phone (optional)</label>
                      <div className="flex items-center">
                        <div className="px-3 py-2 bg-gray-100 rounded-l text-sm">+91</div>
                        <input name="altPhone" value={form.altPhone} onChange={handleChange} placeholder="Alternate mobile" inputMode="numeric" className="flex-1 border rounded-r px-3 py-2 text-sm outline-none" maxLength={10} />
                      </div>
                      {errors.altPhone && <p className="text-xs text-red-500 mt-1">{errors.altPhone}</p>}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-sm font-medium block mb-1">Email</label>
                    <input name="email" value={form.email} onChange={handleChange} placeholder="name@example.com" className="w-full border rounded px-3 py-2 text-sm outline-none" />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                  </div>

                  {/* Current location */}
                  <div>
                    <label className="text-sm font-medium block mb-1">Current location (Area & city)</label>
                    <input name="locationAreaCity" value={form.locationAreaCity} onChange={handleChange} placeholder="Eg: Porur, Chennai" className="w-full border rounded px-3 py-2 text-sm outline-none" />
                    {errors.locationAreaCity && <p className="text-xs text-red-500 mt-1">{errors.locationAreaCity}</p>}
                  </div>

                  {/* Language & Followings */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="text-sm font-medium block mb-1">Language you speak</label>
                      <select name="language" value={form.language} onChange={handleChange} className="w-full border rounded px-3 py-2 text-sm">
                        <option>English</option>
                        <option>Tamil</option>
                        <option>Both</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium block mb-1">I have followings</label>
                      <select name="followings" value={form.followings} onChange={handleChange} className="w-full border rounded px-3 py-2 text-sm">
                        <option>No</option>
                        <option>Yes</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium block mb-1">Any arrears</label>
                      <select name="anyArrears" value={form.anyArrears} onChange={handleChange} className="w-full border rounded px-3 py-2 text-sm">
                        <option>No</option>
                        <option>Yes</option>
                      </select>
                    </div>
                  </div>

                  {/* Education block */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <div>
                      <label className="text-sm font-medium block mb-1">Highest Education</label>
                      <select name="highestEducation" value={form.highestEducation} onChange={handleChange} className="w-full border rounded px-3 py-2 text-sm">
                        <option value="">Select</option>
                        <option>10th</option>
                        <option>12th</option>
                        <option>Diploma</option>
                        <option>UG (B.Sc / BCom / BA)</option>
                        <option>UG (BTech / BE)</option>
                        <option>PG (MSc / MCom / MA)</option>
                        <option>PG (MTech / ME)</option>
                        <option>Other</option>
                      </select>
                      {errors.highestEducation && <p className="text-xs text-red-500 mt-1">{errors.highestEducation}</p>}
                    </div>

                    <div>
                      <label className="text-sm font-medium block mb-1">Name of the college</label>
                      <input name="collegeName" value={form.collegeName} onChange={handleChange} placeholder="College name" className="w-full border rounded px-3 py-2 text-sm outline-none" />
                    </div>

                    <div>
                      <label className="text-sm font-medium block mb-1">Stream / course of study</label>
                      <input name="stream" value={form.stream} onChange={handleChange} placeholder="Eg: BCom / CS / EEE" className="w-full border rounded px-3 py-2 text-sm outline-none" />
                    </div>

                    <div>
                      <label className="text-sm font-medium block mb-1">Year of passing</label>
                      <input name="yearOfPassing" value={form.yearOfPassing} onChange={handleChange} placeholder="Eg: 2023" className="w-full border rounded px-3 py-2 text-sm outline-none" />
                      {errors.yearOfPassing && <p className="text-xs text-red-500 mt-1">{errors.yearOfPassing}</p>}
                    </div>
                  </div>

                  {/* Fresher/Experienced, Experience years, Current work */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="text-sm font-medium block mb-1">Are you fresher or experienced?</label>
                      <select name="fresherOrExp" value={form.fresherOrExp} onChange={handleChange} className="w-full border rounded px-3 py-2 text-sm">
                        <option>Fresher</option>
                        <option>Experienced</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium block mb-1">Experience (years)</label>
                      <input name="experienceYears" value={form.experienceYears} onChange={handleChange} placeholder="Eg: 2" className="w-full border rounded px-3 py-2 text-sm outline-none" />
                      {errors.experienceYears && <p className="text-xs text-red-500 mt-1">{errors.experienceYears}</p>}
                    </div>

                    <div>
                      <label className="text-sm font-medium block mb-1">Current work (position/company)</label>
                      <input name="currentWork" value={form.currentWork} onChange={handleChange} placeholder="Eg: Customer Support - ABC Pvt Ltd" className="w-full border rounded px-3 py-2 text-sm outline-none" />
                    </div>
                  </div>

                  {/* Location applying for (IT/Non-IT), Position applying for */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium block mb-1">Location Applying For</label>
                      <select name="locationApplyingFor" value={form.locationApplyingFor} onChange={handleChange} className="w-full border rounded px-3 py-2 text-sm">
                        <option>IT</option>
                        <option>Non-IT</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium block mb-1">Position applying for</label>
                      <input name="positionApplyingFor" value={form.positionApplyingFor} onChange={handleChange} placeholder="Position" className="w-full border rounded px-3 py-2 text-sm outline-none" />
                    </div>
                  </div>

                  {/* How did you know & reference */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium block mb-1">How did you know about Career School?</label>
                      <input name="howDidYouKnow" value={form.howDidYouKnow} onChange={handleChange} placeholder="Eg: Social media / Friend / Walk-in" className="w-full border rounded px-3 py-2 text-sm outline-none" />
                    </div>

                    <div>
                      <label className="text-sm font-medium block mb-1">If reference, please mention name</label>
                      <input name="referenceName" value={form.referenceName} onChange={handleChange} placeholder="Reference name (optional)" className="w-full border rounded px-3 py-2 text-sm outline-none" />
                    </div>
                  </div>

                  {/* Buttons: Submit (blue) & Cancel */}
                  <div className="flex gap-3 justify-end mt-2">
                    <button type="button" onClick={closeModal} className="px-4 py-2 border rounded">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded font-semibold">Submit</button>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="mb-3">
                  <svg className="mx-auto" width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M9 12l2 2 4-4" stroke="#0B2447" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold mb-2">Thanks — we've got your application</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Our team will connect with you within <span className="font-bold text-yellow-500">24 hours</span>.
                </p>

                <div className="flex gap-3 justify-center">
                  <a
                    className="px-4 py-2 bg-green-600 text-white rounded"
                    href={`https://wa.me/91${form.phone || ""}?text=${encodeURIComponent(
                      `Hi, I'm ${form.name || ""} regarding ${applyFor.title}. My email: ${form.email || ""}.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Message on WhatsApp
                  </a>

                  <button onClick={closeModal} className="px-4 py-2 border rounded">Close</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
