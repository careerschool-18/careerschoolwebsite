"use client";

import { useEffect, useRef, useState } from "react";

/* ---------- CONFIG (tweak these) ---------- */
// Desktop navbar height
const NAVBAR_HEIGHT = "80px";
// Mobile navbar height (used when viewport < 640px)
const NAVBAR_HEIGHT_MOBILE = "64px";

// Space to reserve at bottom so chat doesn't overlap the floating bot icon.
const BOT_ICON_GAP = "140px";
const BOT_ICON_GAP_MOBILE = "120px";

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxyz123.../exec";

/* Avatar image paths — replace with your real asset paths */
const BOT_AVATAR = "/chatbot image/Simran last .png";
const USER_AVATAR = "/chatbot image/User PFP.png";

/* ---------- Flow (unchanged) ---------- */
const FLOW = {
  rootOptions: [
    { label: "💼 Job Seeker", key: "job_seeker" },
    { label: "🎓 Student / Learning", key: "student_learning" },
    { label: "🏫 Placement Officer / College Staff", key: "placement_officer" },
  ],

      job_seeker: {
      title: "Job Seeker",
      options: [
      { label: "🖥️ IT Jobs", key: "nonit_jobs", form: true, team: "HR Team" },
      { label: "🛠️ Non-IT Jobs", key: "work_with_us", form: true, team: "HR Team" },
  ],
},


  student_learning: {
    title: "Student / Learning",
    options: [
      { label: "💻 IT & Software Trainings", key: "it_training", form: true, team: "Training Team" },
      { label: "🧩 Non-IT Trainings", key: "nonit_training", form: true, team: "Training Team" },
      { label: "🧑‍💼 Internships", key: "internships", form: true, team: "Training Team" },
    ],
  },

  placement_officer: {
    title: "Placement Officer / College Staff",
    options: [
      { label: "🎯 Campus Drive / Placements", key: "campus_drive", form: true, team: "Campus Team" },
      { label: "📘 Campus Training & Placements", key: "campus_training", form: true, team: "Campus Team" },
    ],
  },
};

/* ---------- Main Component (responsive) ---------- */
export default function ChatbotFlow() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi, I’m Simran, your virtual assistant. Select who you are 👇" },
    { sender: "options", options: FLOW.rootOptions },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [showBot, setShowBot] = useState(false);
  const [ctx, setCtx] = useState({});
  const endRef = useRef(null);

  // responsive offsets (top and bottom) that update on resize
  const [topOffset, setTopOffset] = useState(NAVBAR_HEIGHT);
  const [bottomGap, setBottomGap] = useState(BOT_ICON_GAP);

  useEffect(() => {
    const applyOffsets = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setTopOffset(NAVBAR_HEIGHT_MOBILE);
        setBottomGap(BOT_ICON_GAP_MOBILE);
      } else {
        setTopOffset(NAVBAR_HEIGHT);
        setBottomGap(BOT_ICON_GAP);
      }
    };

    applyOffsets();
    window.addEventListener("resize", applyOffsets);
    return () => window.removeEventListener("resize", applyOffsets);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setShowBot(true), 1000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => setShowBot(true), 2000);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const push = (m) => setMessages((p) => [...p, m]);
  const pushBot = (t) => push({ sender: "bot", text: t });
  const pushUser = (t) => push({ sender: "user", text: t });
  const pushOptions = (o) => push({ sender: "options", options: o });
  const pushForm = (m) => push({ sender: "form", meta: m });

  const restart = () => {
    setMessages([
      { sender: "bot", text: "Hi, I’m Simran, your virtual assistant. Select who you are 👇" },
      { sender: "options", options: FLOW.rootOptions },
    ]);
    setCtx({});
    setIsOpen(true);
    setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const endChat = () => {
    pushBot("This chat has ended. Click Start New Chat to begin again.");
    setTimeout(() => setIsOpen(false), 400);
  };

  const keyToLabel = (key, list) => {
    const found = list.find((l) => l.key === key);
    return found ? found.label : key;
  };

  const handleRootSelect = (key) => {
    pushUser(keyToLabel(key, FLOW.rootOptions));
    if (!FLOW[key]) {
      pushBot("Sorry, wrong option.");
      return;
    }
    pushBot(`Please choose an option under "${FLOW[key].title}" 👇`);
    pushOptions(FLOW[key].options);
  };

  const handleSubOption = (opt) => {
    pushUser(opt.label);

    if (opt.redirect) {
      pushBot(`🔗 Opening ${opt.label}...`);
      push({ sender: "final", text: `${opt.label}`, meta: { action: "redirect", url: opt.redirect } });
      push({ sender: "endActions" });
      return;
    }

    if (opt.form) {
      setCtx({ lastChosen: opt });
      pushBot(`Please fill this form — our ${opt.team} team will contact you.`);
      pushForm({ team: opt.team, type: opt.label });
      return;
    }
  };

  const submitForm = async (formData) => {
    pushUser("✅ Form Submitted");
    pushBot("Saving your details...");

    const payload = {
      ...ctx.lastChosen,
      ...formData,
      timestamp: new Date().toISOString(),
    };

    try {
      if (!GOOGLE_SCRIPT_URL.includes("xyz123")) {
        await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      pushBot(`🎉 Thank you! Our ${ctx.lastChosen.team} will contact you soon.`);
    } catch {
      pushBot("❌ Failed to save. We will still contact you soon.");
    }

    push({ sender: "endActions" });
  };

  /* ---------- UI pieces ---------- */
  const ChatBubble = ({ sender, text }) => {
    const isBot = sender === "bot";
    return (
      <div className={`w-full flex ${isBot ? "justify-start" : "justify-end"} items-start gap-2`}>
        {isBot && (
          <img
            src="/chatbot image/Simran - 3.png"
            alt="Simran"
            className="w-8 h-8 rounded-full object-cover shadow-sm"
            style={{ flex: "0 0 36px" }}
          />
        )}
        <div
          className={
            "px-3 py-2 text-sm max-w-[78%] rounded-2xl shadow-sm " +
            (isBot ? "bg-blue-500 text-white rounded-bl-none" : "bg-gray-200 text-black rounded-br-none")
          }
        >
          {text}
        </div>
        {!isBot && (
          <img
            src={USER_AVATAR}
            alt="You"
            className="w-8 h-8 rounded-full object-cover shadow-sm"
            style={{ flex: "0 0 36px" }}
          />
        )}
      </div>
    );
  };

  const OptionsRow = ({ options }) => (
    <div className="flex flex-wrap gap-2 w-full">
      {options.map((o, i) => (
        <button
          key={i}
          onClick={() => {
            const rootKeys = FLOW.rootOptions.map((r) => r.key);
            if (rootKeys.includes(o.key)) handleRootSelect(o.key);
            else handleSubOption(o);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-xs"
        >
          {o.label}
        </button>
      ))}
    </div>
  );

  const EndActions = () => (
    <div className="flex gap-2 w-full justify-center">
      <button
        className="bg-gray-200 text-black px-3 py-1 rounded-md text-sm"
        onClick={() => setIsOpen(false)}
      >
        End Chat
      </button>
      <button className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm" onClick={restart}>
        Start New Chat
      </button>
    </div>
  );

  return (
    <>
      {/* Floating Bot Icon (responsive sizes / position) */}
      <div className="fixed bottom-4 right-4 z-[1300] flex flex-col items-center sm:bottom-6 sm:right-6">
        <img
          src={BOT_AVATAR}
          alt="bot"
          onClick={() => {
            const newState = !isOpen;
            setIsOpen(newState);
            if (newState) setShowBot(false);
            else setTimeout(() => setShowBot(true), 2000);
          }}
          className={`cursor-pointer mb-2 transition-all duration-700 ease-out hover:scale-110
            w-16 h-16 sm:w-24 sm:h-24 rounded-full shadow-lg`}
          style={{
            transformOrigin: "center",
            display: "block",
            // simple show/hide animation
            transform: showBot ? "translateY(0)" : "translateY(200%)",
            opacity: showBot ? 1 : 0,
          }}
        />
      </div>

      {/* Chat window fixed between NAVBAR and BOT_ICON_GAP */}
      {isOpen && (
        <div
          className="fixed right-4 sm:right-6 z-[1250] bg-[#f5f5f7] rounded-3xl shadow-xl border border-gray-300
            w-[94%] max-w-md sm:w-96"
          style={{
            top: topOffset,
            bottom: bottomGap,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <div
            className="bg-blue-600 text-white py-3 rounded-t-3xl px-4 flex items-center justify-between"
            style={{ height: 56 }}
          >
            <div className="flex items-center gap-3">
              <img
                src={BOT_AVATAR}
                alt="Simran"
                className="w-8 h-8 rounded-full object-cover border-2 border-white"
              />
              <div className="text-left">
                <div className="text-sm font-bold leading-tight">Simran</div>
                <div className="text-xs opacity-90">Virtual Assistant</div>
              </div>
            </div>
            <button className="text-white text-2xl leading-none" onClick={() => setIsOpen(false)} aria-label="Close chat">
              ×
            </button>
          </div>

          {/* Messages area */}
          <div className="p-3 sm:p-4 overflow-y-auto flex-1 flex flex-col gap-3">
            {messages.map((m, i) => {
              if (m.sender === "bot" || m.sender === "user")
                return <ChatBubble key={i} sender={m.sender} text={m.text} />;
              if (m.sender === "options") return <OptionsRow key={i} options={m.options} />;
              if (m.sender === "form") return <ContactForm key={i} meta={m.meta} onSubmit={submitForm} />;
              if (m.sender === "final")
                return (
                  <div key={i} className="bg-gray-100 p-3 rounded-xl text-sm">
                    {m.text}
                    <br />
                    <a className="text-blue-600 underline" href={m.meta.url} target="_blank" rel="noreferrer">
                      Open →
                    </a>
                  </div>
                );
              if (m.sender === "endActions") return <EndActions key={i} />;
              return null;
            })}
            <div ref={endRef} />
          </div>

          {/* Footer */}
          <div className="p-3 border-t bg-white rounded-b-3xl flex gap-2 justify-between" style={{ height: 64 }}>
            <button
              onClick={restart}
              className="flex-1 bg-blue-600 text-white py-2 rounded-md text-sm font-medium hover:bg-blue-700"
            >
              Start New Chat
            </button>
            <button
              onClick={endChat}
              className="flex-1 ml-2 bg-red-600 text-white py-2 rounded-md text-sm font-medium hover:bg-red-700"
            >
              End Chat
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* ---------- Contact form (responsive tweaks) ---------- */
function ContactForm({ meta, onSubmit }) {
  const [form, setForm] = useState({
    fullName: "",
    whatsapp: "",
    alternatePhone: "",
    email: "",
    location: "",
    college: "",
    degree: "",
    stream: "",
    passingYear: "",
    experience: "",
    trainingCourse: "",
    source: "",
    questions: "",
  });

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
      className="bg-white border p-3 sm:p-4 rounded-xl flex flex-col gap-3"
    >
      <div className="text-xs text-gray-600">
        Enroll Now for <b>{meta.type}</b>
      </div>

      <input
        name="fullName"
        placeholder="Full Name*"
        className="border p-2 rounded-md text-sm w-full"
        required
        onChange={update}
      />
      <input
        name="whatsapp"
        placeholder="Phone Number (WhatsApp)*"
        className="border p-2 rounded-md text-sm w-full"
        required
        onChange={update}
      />

      {/* two-column layout on wider screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <input name="alternatePhone" placeholder="Alternate Contact Number" className="border p-2 rounded-md text-sm" onChange={update} />
        <input name="email" placeholder="Email" className="border p-2 rounded-md text-sm" onChange={update} />
        <input name="location" placeholder="Location" className="border p-2 rounded-md text-sm" onChange={update} />
        <input name="college" placeholder="College Name" className="border p-2 rounded-md text-sm" onChange={update} />
        <input name="degree" placeholder="Highest Degree" className="border p-2 rounded-md text-sm" onChange={update} />
        <input name="stream" placeholder="Stream" className="border p-2 rounded-md text-sm" onChange={update} />
        <input name="passingYear" placeholder="Year of Passing" className="border p-2 rounded-md text-sm" onChange={update} />
        <input name="experience" placeholder="Experience" className="border p-2 rounded-md text-sm" onChange={update} />
      </div>

      <input name="trainingCourse" placeholder="Course Interested" className="border p-2 rounded-md text-sm" onChange={update} />
      <input name="source" placeholder="How did you hear about us?" className="border p-2 rounded-md text-sm" onChange={update} />

      <textarea name="questions" placeholder="Any Questions?" className="border p-2 rounded-md text-sm" onChange={update}></textarea>

      <button type="submit" className="bg-blue-600 text-white p-2 rounded-md text-sm">
        Submit
      </button>
    </form>
  );
}
