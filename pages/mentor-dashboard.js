import React, { useState, useEffect } from "react";
import Head from "next/head";
import {
  FiShield,
  FiUsers,
  FiBook,
  FiLock,
  FiArrowLeft,
  FiChevronLeft,
  FiChevronRight,
  FiMail,
  FiPhone,
  FiCalendar,
  FiEye,
  FiEyeOff,
  FiCopy,
  FiCheck,
  FiChevronDown,
  FiChevronUp,
  FiCreditCard,
  FiUnlock,
  FiX,
  FiBell,
  FiExternalLink,
} from "react-icons/fi";
import SuccessToast from "../components/SuccessToast";

const initialAdmin = {
  name: "Mentor",
  email: "mentor@careerschool.com",
};

const mockEmployees = [];

const mockBatches = [
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

const mockStudents = {
  B1: [
    { id: 101, name: "Aghamarsh Kuppachi", email: "aghamarsh.k@email.com", phone: "+91 98765 43210", enrollDate: "12 Jan 2025", password: "stud101@CS" },
    { id: 102, name: "Bhavana Sen", email: "bhavana.s@email.com", phone: "+91 98765 43211", enrollDate: "12 Jan 2025", password: "stud102@CS" },
    { id: 103, name: "Chaitanya Rao", email: "chaitanya.r@email.com", phone: "+91 98765 43212", enrollDate: "13 Jan 2025", password: "stud103@CS" },
    { id: 104, name: "Divya Teja", email: "divya.t@email.com", phone: "+91 98765 43213", enrollDate: "13 Jan 2025", password: "stud104@CS" },
    { id: 105, name: "Eshwar Goud", email: "eshwar.g@email.com", phone: "+91 98765 43214", enrollDate: "14 Jan 2025", password: "stud105@CS" },
    { id: 106, name: "Farhan Akhtar", email: "farhan.a@email.com", phone: "+91 98765 43215", enrollDate: "14 Jan 2025", password: "stud106@CS" },
    { id: 107, name: "Gouthami K", email: "gouthami.k@email.com", phone: "+91 98765 43216", enrollDate: "15 Jan 2025", password: "stud107@CS" },
    { id: 108, name: "Hari Prasad", email: "hari.p@email.com", phone: "+91 98765 43217", enrollDate: "15 Jan 2025", password: "stud108@CS" },
    { id: 109, name: "Indira Devi", email: "indira.d@email.com", phone: "+91 98765 43218", enrollDate: "16 Jan 2025", password: "stud109@CS" },
    { id: 110, name: "Jatin Kumar", email: "jatin.k@email.com", phone: "+91 98765 43219", enrollDate: "16 Jan 2025", password: "stud110@CS" },
    { id: 111, name: "Kavitha Reddy", email: "kavitha.r@email.com", phone: "+91 98765 43220", enrollDate: "17 Jan 2025", password: "stud111@CS" },
    { id: 112, name: "Lokesh Naidu", email: "lokesh.n@email.com", phone: "+91 98765 43221", enrollDate: "17 Jan 2025", password: "stud112@CS" },
    { id: 113, name: "Manoj Swamy", email: "manoj.s@email.com", phone: "+91 98765 43222", enrollDate: "18 Jan 2025", password: "stud113@CS" },
    { id: 114, name: "Navya Sri", email: "navya.s@email.com", phone: "+91 98765 43223", enrollDate: "18 Jan 2025", password: "stud114@CS" },
    { id: 115, name: "Om Prakash", email: "om.p@email.com", phone: "+91 98765 43224", enrollDate: "19 Jan 2025", password: "stud115@CS" },
  ],
  B2: [
    { id: 201, name: "Rahul Dravid", email: "rahul.d@email.com", phone: "+91 99999 11111", enrollDate: "05 Feb 2025", password: "stud201@CS" },
    { id: 202, name: "Sachin Tendulkar", email: "sachin.t@email.com", phone: "+91 99999 22222", enrollDate: "05 Feb 2025", password: "stud202@CS" },
    { id: 203, name: "Sourav Ganguly", email: "sourav.g@email.com", phone: "+91 99999 33333", enrollDate: "06 Feb 2025", password: "stud203@CS" },
    { id: 204, name: "VVS Laxman", email: "vvs.l@email.com", phone: "+91 99999 44444", enrollDate: "06 Feb 2025", password: "stud204@CS" },
    { id: 205, name: "Anil Kumble", email: "anil.k@email.com", phone: "+91 99999 55555", enrollDate: "07 Feb 2025", password: "stud205@CS" },
    { id: 206, name: "Javagal Srinath", email: "javagal.s@email.com", phone: "+91 99999 66666", enrollDate: "07 Feb 2025", password: "stud206@CS" },
    { id: 207, name: "Harbhajan Singh", email: "harbhajan.s@email.com", phone: "+91 99999 77777", enrollDate: "08 Feb 2025", password: "stud207@CS" },
    { id: 208, name: "Zaheer Khan", email: "zaheer.k@email.com", phone: "+91 99999 88888", enrollDate: "08 Feb 2025", password: "stud208@CS" },
    { id: 209, name: "Yuvraj Singh", email: "yuvraj.s@email.com", phone: "+91 99999 99999", enrollDate: "09 Feb 2025", password: "stud209@CS" },
    { id: 210, name: "MS Dhoni", email: "ms.dhoni@email.com", phone: "+91 99999 00000", enrollDate: "09 Feb 2025", password: "stud210@CS" },
    { id: 211, name: "Virat Kohli", email: "virat.k@email.com", phone: "+91 98888 12345", enrollDate: "10 Feb 2025", password: "stud211@CS" },
    { id: 212, name: "Rohit Sharma", email: "rohit.s@email.com", phone: "+91 98888 54321", enrollDate: "10 Feb 2025", password: "stud212@CS" },
  ],
  B3: [
    { id: 301, name: "Steve Smith", email: "steve.s@email.com", phone: "+91 97777 00001", enrollDate: "20 Feb 2025", password: "stud301@CS" },
    { id: 302, name: "David Warner", email: "david.w@email.com", phone: "+91 97777 00002", enrollDate: "20 Feb 2025", password: "stud302@CS" },
    { id: 303, name: "Pat Cummins", email: "pat.c@email.com", phone: "+91 97777 00003", enrollDate: "21 Feb 2025", password: "stud303@CS" },
    { id: 304, name: "Glenn Maxwell", email: "glenn.m@email.com", phone: "+91 97777 00004", enrollDate: "21 Feb 2025", password: "stud304@CS" },
    { id: 305, name: "Mitchell Starc", email: "mitchell.s@email.com", phone: "+91 97777 00005", enrollDate: "22 Feb 2025", password: "stud305@CS" },
    { id: 306, name: "Travis Head", email: "travis.h@email.com", phone: "+91 97777 00006", enrollDate: "22 Feb 2025", password: "stud306@CS" },
    { id: 307, name: "Josh Hazlewood", email: "josh.h@email.com", phone: "+91 97777 00007", enrollDate: "23 Feb 2025", password: "stud307@CS" },
    { id: 308, name: "Marnus Labuschagne", email: "marnus.l@email.com", phone: "+91 97777 00008", enrollDate: "23 Feb 2025", password: "stud308@CS" },
  ],
  B4: [
    { id: 401, name: "Nellore Student 1", email: "n1@email.com", phone: "+91 96666 00001", enrollDate: "01 Mar 2025", password: "stud401@CS" },
    { id: 402, name: "Nellore Student 2", email: "n2@email.com", phone: "+91 96666 00002", enrollDate: "01 Mar 2025", password: "stud402@CS" },
    { id: 403, name: "Nellore Student 3", email: "n3@email.com", phone: "+91 96666 00003", enrollDate: "02 Mar 2025", password: "stud403@CS" },
    { id: 404, name: "Nellore Student 4", email: "n4@email.com", phone: "+91 96666 00004", enrollDate: "02 Mar 2025", password: "stud404@CS" },
    { id: 405, name: "Nellore Student 5", email: "n5@email.com", phone: "+91 96666 00005", enrollDate: "03 Mar 2025", password: "stud405@CS" },
    { id: 406, name: "Nellore Student 6", email: "n6@email.com", phone: "+91 96666 00006", enrollDate: "03 Mar 2025", password: "stud406@CS" },
    { id: 407, name: "Nellore Student 7", email: "n7@email.com", phone: "+91 96666 00007", enrollDate: "04 Mar 2025", password: "stud407@CS" },
    { id: 408, name: "Nellore Student 8", email: "n8@email.com", phone: "+91 96666 00008", enrollDate: "04 Mar 2025", password: "stud408@CS" },
    { id: 409, name: "Nellore Student 9", email: "n9@email.com", phone: "+91 96666 00009", enrollDate: "05 Mar 2025", password: "stud409@CS" },
    { id: 410, name: "Nellore Student 10", email: "n10@email.com", phone: "+91 96666 00010", enrollDate: "05 Mar 2025", password: "stud410@CS" },
    { id: 411, name: "Nellore Student 11", email: "n11@email.com", phone: "+91 96666 00011", enrollDate: "06 Mar 2025", password: "stud411@CS" },
    { id: 412, name: "Nellore Student 12", email: "n12@email.com", phone: "+91 96666 00012", enrollDate: "06 Mar 2025", password: "stud412@CS" },
    { id: 413, name: "Nellore Student 13", email: "n13@email.com", phone: "+91 96666 00013", enrollDate: "07 Mar 2025", password: "stud413@CS" },
    { id: 414, name: "Nellore Student 14", email: "n14@email.com", phone: "+91 96666 00014", enrollDate: "07 Mar 2025", password: "stud414@CS" },
    { id: 415, name: "Nellore Student 15", email: "n15@email.com", phone: "+91 96666 00015", enrollDate: "08 Mar 2025", password: "stud415@CS" },
    { id: 416, name: "Nellore Student 16", email: "n16@email.com", phone: "+91 96666 00016", enrollDate: "08 Mar 2025", password: "stud416@CS" },
    { id: 417, name: "Nellore Student 17", email: "n17@email.com", phone: "+91 96666 00017", enrollDate: "09 Mar 2025", password: "stud417@CS" },
    { id: 418, name: "Nellore Student 18", email: "n18@email.com", phone: "+91 96666 00018", enrollDate: "09 Mar 2025", password: "stud418@CS" },
  ]
};

// Populate students for remaining batches B5-B12 dynamically
mockBatches.forEach(b => {
  if (!mockStudents[b.id]) {
    mockStudents[b.id] = Array.from({ length: b.studentCount }, (_, idx) => ({
      id: `${b.id}-${100 + idx}`,
      name: `Student ${idx + 1} (${b.name})`,
      email: `student${idx + 1}.${b.id.toLowerCase()}@email.com`,
      phone: `+91 95555 ${10000 + idx}`,
      enrollDate: b.startDate,
      password: `stud${b.id}${idx + 1}`
    }));
  }
});

// Ensure every student in mockStudents has fees details (total, paid) matching structure in student-dashboard.js
Object.keys(mockStudents).forEach(batchId => {
  mockStudents[batchId] = mockStudents[batchId].map(student => {
    // Determine mock paid amount based on student ID to have variation
    const idNum = parseInt(String(student.id).replace(/\D/g, "")) || 100;
    const totalFee = 45000;
    const paidAmount = idNum % 3 === 0 ? 45000 : idNum % 3 === 1 ? 30000 : 15000;
    return {
      ...student,
      isBlocked: false,
      blockedReason: "",
      fee: student.fee || {
        total: totalFee,
        paid: paidAmount,
      }
    };
  });
});

export default function MentorDashboard() {
  const [admin, setAdmin] = useState(initialAdmin);
  const [activeTab, setActiveTab] = useState("overview");
  const [overviewSubView, setOverviewSubView] = useState("main"); // "main" | "batches" | "students"
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [studentPage, setStudentPage] = useState(1);

  const [students, setStudents] = useState(mockStudents);
  const [batches, setBatches] = useState(mockBatches);
  const [pendingSignups, setPendingSignups] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [viewFeesTarget, setViewFeesTarget] = useState(null); // { id: string|number, name: string, fee: { total: number, paid: number } }

  const getApiUrl = (path) => {
    if (typeof window !== "undefined" && window.location.hostname === "localhost") {
      return `http://localhost:8080${path}`;
    }
    return `https://career-school.co.in${path}`;
  };

  useEffect(() => {
    // Initial load from localStorage
    const localStudents = localStorage.getItem("mock_students");
    if (localStudents) {
      setStudents(JSON.parse(localStudents));
    } else {
      localStorage.setItem("mock_students", JSON.stringify(mockStudents));
    }

    const fetchBatches = async () => {
      try {
        const response = await fetch(getApiUrl("/api/batches"));
        if (response.ok) {
          const data = await response.json();
          setBatches(data);
          localStorage.setItem("mock_batches", JSON.stringify(data));
        } else {
          throw new Error(`HTTP error ${response.status}`);
        }
      } catch (e) {
        console.warn("Failed to fetch batches from backend API on init:", e);
        const localBatches = localStorage.getItem("mock_batches");
        if (localBatches) {
          setBatches(JSON.parse(localBatches));
        } else {
          localStorage.setItem("mock_batches", JSON.stringify(mockBatches));
        }
      }
    };
    fetchBatches();

    const localPending = localStorage.getItem("mock_pending_signups");
    if (localPending) {
      setPendingSignups(JSON.parse(localPending));
    }

    // Sync from localStorage & API periodically
    const syncFromLocalStorage = async () => {
      const updatedPending = localStorage.getItem("mock_pending_signups");
      if (updatedPending) {
        setPendingSignups(JSON.parse(updatedPending));
      } else {
        setPendingSignups([]);
      }

      const updatedStudents = localStorage.getItem("mock_students");
      if (updatedStudents) {
        setStudents(JSON.parse(updatedStudents));
      }

      try {
        const response = await fetch(getApiUrl("/api/batches"));
        if (response.ok) {
          const data = await response.json();
          setBatches(data);
          localStorage.setItem("mock_batches", JSON.stringify(data));
        }
      } catch (e) {
        const updatedBatches = localStorage.getItem("mock_batches");
        if (updatedBatches) {
          setBatches(JSON.parse(updatedBatches));
        }
      }
    };

    window.addEventListener("storage", syncFromLocalStorage);
    const interval = setInterval(syncFromLocalStorage, 3000);

    return () => {
      window.removeEventListener("storage", syncFromLocalStorage);
      clearInterval(interval);
    };
  }, []);

  const handleAdmitStudent = async (signupId) => {
    const studentToAdmit = pendingSignups.find(s => s.id === signupId);
    if (!studentToAdmit) return;

    // Resolve which batch to admit to (case insensitive)
    let matchedBatch = batches.find(b => b.name.toLowerCase().trim() === studentToAdmit.batch.toLowerCase().trim());
    if (!matchedBatch) {
      matchedBatch = batches.find(b => b.course.toLowerCase().includes(studentToAdmit.batch.toLowerCase())) || batches[0];
    }

    if (!matchedBatch) {
      setToast("Error: No active batches found to admit the student.");
      return;
    }

    const newStudent = {
      id: Date.now(),
      name: studentToAdmit.name,
      email: studentToAdmit.email,
      phone: studentToAdmit.phone,
      enrollDate: studentToAdmit.enrollDate || new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      password: `stud${Date.now().toString().slice(-4)}@CS`,
      isBlocked: false,
      blockedReason: "",
      fee: {
        total: studentToAdmit.courseFee || 45000,
        paid: studentToAdmit.registrationFee || 5000
      }
    };

    try {
      // Update batch student count in the database
      const response = await fetch(getApiUrl(`/api/batches/${matchedBatch.id}`), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...matchedBatch, studentCount: matchedBatch.studentCount + 1 })
      });
      
      let updatedBatch = matchedBatch;
      if (response.ok) {
        updatedBatch = await response.json();
      }

      // Update students state & localStorage
      setStudents(prev => {
        const updatedBatchStudents = [newStudent, ...(prev[matchedBatch.id] || [])];
        const updated = {
          ...prev,
          [matchedBatch.id]: updatedBatchStudents
        };
        localStorage.setItem("mock_students", JSON.stringify(updated));
        return updated;
      });

      // Update batches state
      setBatches(prev => {
        const updated = prev.map(b => b.id === matchedBatch.id ? updatedBatch : b);
        localStorage.setItem("mock_batches", JSON.stringify(updated));
        return updated;
      });

      // Remove from pending signups & localStorage
      setPendingSignups(prev => {
        const updated = prev.filter(s => s.id !== signupId);
        localStorage.setItem("mock_pending_signups", JSON.stringify(updated));
        return updated;
      });

      setToast(`Admitted ${studentToAdmit.name} successfully into batch "${matchedBatch.name}"!`);
    } catch (err) {
      console.error("Failed to admit student:", err);
      setToast(`Error admitting student: ${err.message}`);
    }
  };

  const handleToggleBatchStatus = async (batch, e) => {
    e.stopPropagation();

    if (batch.status === "Active") {
      try {
        const updatedBatch = { ...batch, status: "Inactive" };
        const response = await fetch(getApiUrl(`/api/batches/${batch.id}`), {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedBatch)
        });
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        const savedBatch = await response.json();
        const updated = batches.map(b => b.id === batch.id ? savedBatch : b);
        setBatches(updated);
        localStorage.setItem("mock_batches", JSON.stringify(updated));
        setToast(`Batch "${batch.name}" is now Inactive.`);
      } catch (err) {
        console.error("Failed to toggle batch status:", err);
        setToast(`Error deactivating batch: ${err.message}`);
      }
    } else {
      setActivateBatchTarget(batch);
      setNewBatchNameInput(batch.name);
    }
  };

  const handleConfirmActivateBatch = async (e) => {
    e.preventDefault();
    if (!activateBatchTarget) return;

    const newName = newBatchNameInput.trim();
    if (!newName) return;

    try {
      const updatedBatch = { ...activateBatchTarget, name: newName, status: "Active", studentCount: 0 };
      const response = await fetch(getApiUrl(`/api/batches/${activateBatchTarget.id}`), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBatch)
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error ${response.status}`);
      }
      const savedBatch = await response.json();

      const updated = batches.map(b => b.id === activateBatchTarget.id ? savedBatch : b);
      setBatches(updated);
      localStorage.setItem("mock_batches", JSON.stringify(updated));

      setStudents(prev => {
        const next = { ...prev, [activateBatchTarget.id]: [] };
        localStorage.setItem("mock_students", JSON.stringify(next));
        return next;
      });

      setToast(`Batch activated as "${newName}" with 0 students.`);
      setActivateBatchTarget(null);
      setNewBatchNameInput("");
    } catch (err) {
      console.error("Failed to activate batch:", err);
      setToast(`Error activating batch: ${err.message}`);
    }
  };

  const [password, setPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  // State variables for changing student passwords
  const [changePasswordTarget, setChangePasswordTarget] = useState(null); // { type: 'student', id: string|number, name: string, password: string }
  const [targetPassword, setTargetPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [validationError, setValidationError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showChangeForm, setShowChangeForm] = useState(false);
  const [copied, setCopied] = useState(false);

  // State variables for activating inactive batches
  const [activateBatchTarget, setActivateBatchTarget] = useState(null);
  const [newBatchNameInput, setNewBatchNameInput] = useState("");

  // State variables for creating new batches
  const [showCreateBatchModal, setShowCreateBatchModal] = useState(false);
  const [newBatchData, setNewBatchData] = useState({ name: "", course: "", startDate: "" });

  const handleCreateBatch = async (e) => {
    e.preventDefault();
    if (!newBatchData.name || !newBatchData.course || !newBatchData.startDate) {
      setToast("Please fill all fields to create a batch.");
      return;
    }

    const payload = {
      name: newBatchData.name,
      course: newBatchData.course,
      studentCount: 0,
      status: "Active",
      startDate: newBatchData.startDate
    };

    try {
      const response = await fetch(getApiUrl("/api/batches"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error ${response.status}`);
      }
      const newBatch = await response.json();

      setBatches(prev => {
        const updated = [...prev, newBatch];
        localStorage.setItem("mock_batches", JSON.stringify(updated));
        return updated;
      });

      setStudents(prev => {
        const next = { ...prev, [newBatch.id]: [] };
        localStorage.setItem("mock_students", JSON.stringify(next));
        return next;
      });

      setToast(`Batch "${newBatch.name}" created successfully.`);
      setShowCreateBatchModal(false);
      setNewBatchData({ name: "", course: "", startDate: "" });
    } catch (err) {
      console.error("Failed to create batch:", err);
      setToast(`Error creating batch: ${err.message}`);
    }
  };

  // State variables for blocking/restricting student access
  const [blockStudentTarget, setBlockStudentTarget] = useState(null); // { id: string|number, name: string, batchId: string }
  const [blockReason, setBlockReason] = useState("");
  const [isBlockingSubmit, setIsBlockingSubmit] = useState(false);
  const [blockError, setBlockError] = useState("");

  const handleTargetPasswordSubmit = (e) => {
    e.preventDefault();
    if (!targetPassword.newPassword) {
      setValidationError("Password cannot be empty");
      return;
    }
    if (targetPassword.newPassword.length < 6) {
      setValidationError("Password must be at least 6 characters long");
      return;
    }
    if (targetPassword.newPassword !== targetPassword.confirmPassword) {
      setValidationError("Passwords do not match");
      return;
    }

    setValidationError("");
    setIsSubmitting(true);

    // Mock API call to simulate password change on backend
    setTimeout(() => {
      setIsSubmitting(false);

      // Update local state
      setStudents(prev => {
        const updatedBatchStudents = (prev[selectedBatch.id] || []).map(stud =>
          stud.id === changePasswordTarget.id
            ? { ...stud, password: targetPassword.newPassword }
            : stud
        );
        const updated = {
          ...prev,
          [selectedBatch.id]: updatedBatchStudents
        };
        localStorage.setItem("mock_students", JSON.stringify(updated));
        return updated;
      });

      setToast(`Password updated successfully for ${changePasswordTarget.name}!`);
      setChangePasswordTarget(null);
      setTargetPassword({ newPassword: "", confirmPassword: "" });
      setShowChangeForm(false);
      setShowCurrentPassword(false);
    }, 1200);
  };

  const handleBlockStudentSubmit = (e) => {
    e.preventDefault();
    if (!blockReason) {
      setBlockError("Please select a reason for restricting access.");
      return;
    }

    setBlockError("");
    setIsBlockingSubmit(true);

    // ==========================================
    // BACKEND INTEGRATION NOTE:
    // To connect this to your backend, perform an API request:
    //
    // fetch(`/api/students/${blockStudentTarget.id}/restrict`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ reason: blockReason })
    // })
    // .then(res => res.json())
    // .then(data => { ... })
    // ==========================================

    // Simulating backend response timeout
    setTimeout(() => {
      setIsBlockingSubmit(false);

      // If blocking the mockup student, save to localStorage for demo
      if (blockStudentTarget.id === 101) {
        localStorage.setItem("mock_student_isBlocked", "true");
        localStorage.setItem("mock_student_blockedReason", blockReason);
      }

      // Update local state to reflect access restriction
      setStudents((prev) => {
        const updatedBatchStudents = (prev[blockStudentTarget.batchId] || []).map((stud) =>
          stud.id === blockStudentTarget.id
            ? { ...stud, isBlocked: true, blockedReason: blockReason }
            : stud
        );
        const updated = {
          ...prev,
          [blockStudentTarget.batchId]: updatedBatchStudents,
        };
        localStorage.setItem("mock_students", JSON.stringify(updated));
        return updated;
      });

      setToast(`Restricted access for ${blockStudentTarget.name} successfully.`);
      setBlockStudentTarget(null);
      setBlockReason("");
    }, 1000);
  };

  const handleUnblockStudent = (studentId, studentName, batchId) => {
    // ==========================================
    // BACKEND INTEGRATION NOTE:
    // To connect this to your backend, perform an API request:
    //
    // fetch(`/api/students/${studentId}/restore`, {
    //   method: "POST"
    // })
    // .then(res => res.json())
    // .then(data => { ... })
    // ==========================================

    // If unblocking the mockup student, clear localStorage
    if (studentId === 101) {
      localStorage.setItem("mock_student_isBlocked", "false");
      localStorage.removeItem("mock_student_blockedReason");
    }

    // Instantly update state or handle loading indicator as required.
    setStudents((prev) => {
      const updatedBatchStudents = (prev[batchId] || []).map((stud) =>
        stud.id === studentId
          ? { ...stud, isBlocked: false, blockedReason: "" }
          : stud
      );
      const updated = {
        ...prev,
        [batchId]: updatedBatchStudents,
      };
      localStorage.setItem("mock_students", JSON.stringify(updated));
      return updated;
    });

    setToast(`Restored access for ${studentName} successfully.`);
  };

  const itemsPerPage = 10;
  
  const [studentFeeFilter, setStudentFeeFilter] = useState("all"); // "all" | "paid" | "due" | "restricted"

  const currentStudents = selectedBatch ? (students[selectedBatch.id] || []) : [];

  // Filter students dynamically based on payment status
  const filteredStudents = currentStudents.filter(stud => {
    const total = stud.fee?.total || 0;
    const paid = stud.fee?.paid || 0;
    const due = total - paid;
    if (studentFeeFilter === "paid") return due === 0;
    if (studentFeeFilter === "due") return due > 0;
    if (studentFeeFilter === "restricted") return stud.isBlocked === true;
    return true; // "all"
  });

  const totalStudentPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const studentStartIndex = (studentPage - 1) * itemsPerPage;
  const paginatedStudents = filteredStudents.slice(
    studentStartIndex,
    studentStartIndex + itemsPerPage
  );

  // Compute batch fee summary metrics
  const batchMetrics = (() => {
    if (!selectedBatch) return { totalFee: 0, totalPaid: 0, totalDue: 0 };
    let totalFee = 0;
    let totalPaid = 0;
    currentStudents.forEach(stud => {
      totalFee += stud.fee?.total || 0;
      totalPaid += stud.fee?.paid || 0;
    });
    return {
      totalFee,
      totalPaid,
      totalDue: totalFee - totalPaid,
    };
  })();

  return (
    <>
      <Head>
        <title>Mentor Dashboard</title>
      </Head>

      <div className="min-h-screen bg-gray-50">

        {/* Navbar */}
        <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center relative">

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                <FiShield size={20} />
              </div>

              <h1 className="font-bold text-xl">
                Careerschool Mentor
              </h1>
            </div>

            {/* Header Action Buttons & Notification Bell */}
            <div className="flex items-center gap-3">
              <a 
                href="https://example.com/lms-placeholder" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white text-xs font-medium rounded-lg transition-all shadow-sm"
              >
                LMS
                <FiExternalLink size={14} />
              </a>

              <a 
                href="https://example.com/job-portal-placeholder" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white text-xs font-medium rounded-lg transition-all shadow-sm"
              >
                Job Portal
                <FiExternalLink size={14} />
              </a>

              <a 
                href="https://example.com/hrms-placeholder" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white text-xs font-medium rounded-lg transition-all shadow-sm"
              >
                HRMS
                <FiExternalLink size={14} />
              </a>

              {/* Notification Bell */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-all relative focus:outline-none"
                >
                  <FiBell size={20} />
                  {pendingSignups.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] font-extrabold shadow-sm animate-pulse">
                      {pendingSignups.length}
                    </span>
                  )}
                </button>
              </div>
            </div>

          </div>
        </nav>

        {/* ── Admissions Modal (centered popup) ─────────────────────────── */}
        {showNotifications && (
          <div
            className="fixed inset-0 z-[200] flex items-center justify-center px-4"
            style={{ backdropFilter: "blur(2px)", backgroundColor: "rgba(0,0,0,0.45)" }}
            onClick={() => setShowNotifications(false)}
          >
            <div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col"
              style={{ maxHeight: "80vh", animation: "modalIn 0.22s cubic-bezier(.4,0,.2,1)" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b bg-gradient-to-r from-blue-600 to-indigo-600">
                <div className="flex items-center gap-3">
                  <FiBell className="text-white" size={20} />
                  <span className="font-bold text-white text-base">Admissions Requests</span>
                  {pendingSignups.length > 0 && (
                    <span className="text-xs font-extrabold px-2.5 py-0.5 bg-white/20 text-white rounded-full">
                      {pendingSignups.length} Pending
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white font-bold text-lg transition-all"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              {/* Scrollable List */}
              <div className="overflow-y-auto flex-1 divide-y divide-gray-100">
                {pendingSignups.length > 0 ? (
                  pendingSignups.map((signup) => (
                    <div key={signup.id} className="p-5 hover:bg-blue-50/40 transition-colors">
                      {/* Student Info */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
                          {signup.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-gray-900 text-sm truncate">{signup.name}</p>
                          <p className="text-xs text-gray-500 mt-0.5 truncate">{signup.email}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{signup.phone}</p>
                        </div>
                        <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap shrink-0 pt-1">{signup.enrollDate}</span>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-700 uppercase tracking-wide">
                          📚 {signup.batch}
                        </span>
                        <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-teal-50 text-teal-700 uppercase tracking-wide">
                          🎓 {signup.degree}
                        </span>
                      </div>

                      {/* Fee Row */}
                      <div className="flex gap-4 mb-4">
                        <div className="flex-1 bg-gray-50 rounded-xl px-4 py-2 text-center">
                          <p className="text-[10px] text-gray-400 font-semibold uppercase">Course Fee</p>
                          <p className="text-sm font-bold text-gray-800 mt-0.5">₹{signup.courseFee?.toLocaleString()}</p>
                        </div>
                        <div className="flex-1 bg-gray-50 rounded-xl px-4 py-2 text-center">
                          <p className="text-[10px] text-gray-400 font-semibold uppercase">Reg. Fee</p>
                          <p className="text-sm font-bold text-gray-800 mt-0.5">₹{signup.registrationFee?.toLocaleString()}</p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <button
                          onClick={() => { handleAdmitStudent(signup.id); }}
                          className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-xl text-sm font-bold transition-all shadow-md shadow-blue-100"
                        >
                          ✓ Admit Student
                        </button>
                        <button
                          onClick={() => {
                            setPendingSignups(prev => {
                              const updated = prev.filter(s => s.id !== signup.id);
                              localStorage.setItem("mock_pending_signups", JSON.stringify(updated));
                              return updated;
                            });
                          }}
                          className="px-5 py-2.5 bg-red-50 hover:bg-red-100 active:scale-95 text-red-500 rounded-xl text-sm font-bold transition-colors border border-red-100"
                        >
                          ✕ Reject
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-16 px-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                      <FiBell className="text-gray-300" size={28} />
                    </div>
                    <p className="text-gray-500 font-semibold">No pending admissions</p>
                    <p className="text-gray-400 text-sm mt-1">New signup requests will appear here.</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              {pendingSignups.length > 0 && (
                <div className="px-6 py-3 border-t bg-gray-50 text-center">
                  <p className="text-xs text-gray-400 font-medium">
                    Scroll to see all {pendingSignups.length} pending request{pendingSignups.length !== 1 ? "s" : ""}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        <style jsx global>{`
          @keyframes modalIn {
            from { opacity: 0; transform: scale(0.92) translateY(16px); }
            to   { opacity: 1; transform: scale(1) translateY(0); }
          }
        `}</style>



        <main className="max-w-5xl mx-auto px-6 py-8">

          {/* Header */}
          <div className="bg-white rounded-2xl border shadow-sm p-8 mb-6 relative overflow-hidden">

            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>

            <div className="flex items-center gap-5">

              <div className="w-20 h-20 rounded-full bg-gray-800 text-white flex items-center justify-center text-2xl font-bold">
                M
              </div>

              <div>
                <h2 className="text-3xl font-bold">
                  {admin.name}
                </h2>

                <p className="text-gray-500 mt-1">
                  Mentor
                </p>
              </div>

            </div>

            {/* Tabs */}

            <div className="flex border-b mt-8">

              {["overview", "profile"].map((tab) => (

                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    if (tab !== "overview") {
                      setOverviewSubView("main");
                    }
                  }}
                  className={`px-6 py-3 border-b-2 font-medium capitalize ${
                    activeTab === tab
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500"
                  }`}
                >
                  {tab}
                </button>

              ))}
            </div>

          </div>

          {/* Overview */}

          {activeTab === "overview" && (
            <>
              {overviewSubView === "main" && (
                 <div className="grid md:grid-cols-2 gap-5 animate-fade-in">
                  <div
                    onClick={() => {
                      setOverviewSubView("batches");
                      setStudentPage(1);
                    }}
                    className="bg-white p-6 rounded-2xl shadow-sm border cursor-pointer hover:shadow-md hover:border-blue-400 hover:scale-[1.01] transition-all duration-200 group"
                  >
                    <FiUsers className="text-blue-600 mb-4 group-hover:scale-110 transition-transform" size={28} />
                    <p className="text-gray-500 font-medium">Students</p>
                    <h3 className="text-3xl font-bold mt-2 text-gray-900 group-hover:text-blue-600 transition-colors">
                      {Object.values(students).reduce((acc, curr) => acc + curr.length, 0)}
                    </h3>
                    <p className="text-xs text-blue-500 mt-2 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      View Batches &rarr;
                    </p>
                  </div>

                  <div
                    onClick={() => {
                      setOverviewSubView("batches");
                      setStudentPage(1);
                    }}
                    className="bg-white p-6 rounded-2xl shadow-sm border cursor-pointer hover:shadow-md hover:border-blue-400 hover:scale-[1.01] transition-all duration-200 group"
                  >
                    <FiBook className="text-blue-600 mb-4 group-hover:scale-110 transition-transform" size={28} />
                    <p className="text-gray-500 font-medium">Active Batches</p>
                    <h3 className="text-3xl font-bold mt-2 text-gray-900 group-hover:text-blue-600 transition-colors">
                      {batches.length}
                    </h3>
                    <p className="text-xs text-blue-500 mt-2 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      View Batches &rarr;
                    </p>
                  </div>
                </div>
              )}

              {overviewSubView === "batches" && (
                <div className="bg-white rounded-2xl shadow-sm border p-6 md:p-8 animate-fade-in">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setOverviewSubView("main")}
                        className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-900 transition-colors flex items-center justify-center border"
                        title="Back to Overview"
                      >
                        <FiArrowLeft size={18} />
                      </button>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Active Batches</h3>
                        <p className="text-sm text-gray-500 mt-1">Select a batch to view its students</p>
                      </div>
                    </div>
                    <div className="flex gap-2 self-start sm:self-auto">
                      <button
                        onClick={() => setShowCreateBatchModal(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-1"
                      >
                        + Create Batch
                      </button>
                      <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-sm font-semibold flex items-center">
                        Total: {batches.length} Batches
                      </div>
                    </div>
                  </div>

                  {/* Grid */}
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
                    {batches.map((batch) => (
                      <div
                        key={batch.id}
                        onClick={() => {
                          setSelectedBatch(batch);
                          setOverviewSubView("students");
                          setStudentPage(1);
                          setStudentFeeFilter("all");
                        }}
                        className="border hover:border-blue-400 hover:shadow-md rounded-2xl p-5 cursor-pointer transition-all bg-white relative overflow-hidden group"
                      >
                        <div className="absolute top-0 left-0 w-2 h-full bg-blue-500 group-hover:bg-blue-600 transition-colors"></div>
                        <div className="pl-2">
                          <div className="flex justify-between items-start">
                            <h4 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                              {batch.name}
                            </h4>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                                batch.status === "Active"
                                  ? "bg-green-50 text-green-700"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {batch.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1 font-medium">{batch.course}</p>
                          
                          <div className="flex items-center justify-between gap-4 mt-6 pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-3 text-xs text-gray-400 font-medium">
                              <div className="flex items-center gap-1">
                                <FiUsers className="text-blue-500" />
                                <span>{batch.studentCount} Students</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <FiCalendar className="text-purple-500" />
                                <span>{batch.startDate}</span>
                              </div>
                            </div>
                            <button
                              onClick={(e) => handleToggleBatchStatus(batch, e)}
                              className={`text-[11px] font-bold px-2.5 py-1.5 rounded-xl transition-all active:scale-95 ${
                                batch.status === "Active"
                                  ? "bg-red-50 text-red-600 hover:bg-red-100"
                                  : "bg-green-50 text-green-600 hover:bg-green-100"
                              }`}
                            >
                              {batch.status === "Active" ? "Deactivate" : "Activate"}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {overviewSubView === "students" && (
                <div className="bg-white rounded-2xl shadow-sm border p-6 md:p-8 animate-fade-in">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          setOverviewSubView("batches");
                          setSelectedBatch(null);
                          setStudentFeeFilter("all");
                        }}
                        className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-900 transition-colors flex items-center justify-center border"
                        title="Back to Batches"
                      >
                        <FiArrowLeft size={18} />
                      </button>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          Students in {selectedBatch?.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {selectedBatch?.course} • Started on {selectedBatch?.startDate}
                        </p>
                      </div>
                    </div>
                    <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-sm font-semibold self-start sm:self-auto">
                      Total: {currentStudents.length} Students
                    </div>
                  </div>

                  {/* Batch Fee Summary Analytics Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
                    <div className="bg-gradient-to-br from-white to-gray-50/50 p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Potential Value</p>
                        <h4 className="text-xl font-extrabold text-gray-900 mt-1">{"₹" + batchMetrics.totalFee.toLocaleString("en-IN")}</h4>
                      </div>
                      <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                        B
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-white to-green-50/10 p-5 rounded-2xl shadow-sm border border-green-100/30 flex items-center justify-between border-b-4 border-b-green-500/70">
                      <div>
                        <p className="text-[10px] font-bold text-green-700 uppercase tracking-wider">Total Collected</p>
                        <h4 className="text-xl font-extrabold text-green-600 mt-1">{"₹" + batchMetrics.totalPaid.toLocaleString("en-IN")}</h4>
                      </div>
                      <div className="w-9 h-9 rounded-xl bg-green-50 text-green-600 flex items-center justify-center font-bold text-xs">
                        P
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-white to-orange-50/10 p-5 rounded-2xl shadow-sm border border-orange-100/30 flex items-center justify-between border-b-4 border-b-orange-500/70">
                      <div>
                        <p className="text-[10px] font-bold text-orange-700 uppercase tracking-wider">Outstanding Due</p>
                        <h4 className="text-xl font-extrabold text-orange-600 mt-1">{"₹" + batchMetrics.totalDue.toLocaleString("en-IN")}</h4>
                      </div>
                      <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold text-xs">
                        D
                      </div>
                    </div>
                  </div>

                  {/* Payment Filter Buttons */}
                  <div className="flex flex-wrap items-center gap-2 mb-6 border-b pb-4">
                    {[
                      { id: "all", label: `All Students (${currentStudents.length})` },
                      { id: "paid", label: `Fully Paid (${currentStudents.filter(s => ((s.fee?.total || 0) - (s.fee?.paid || 0)) === 0).length})` },
                      { id: "due", label: `Pending Due (${currentStudents.filter(s => ((s.fee?.total || 0) - (s.fee?.paid || 0)) > 0).length})` },
                      { id: "restricted", label: `Restricted (${currentStudents.filter(s => s.isBlocked).length})` },
                    ].map(tab => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => {
                          setStudentFeeFilter(tab.id);
                          setStudentPage(1);
                        }}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold tracking-wide uppercase transition-all ${
                          studentFeeFilter === tab.id
                            ? "bg-blue-600 text-white shadow-sm"
                            : "bg-gray-50 text-gray-500 hover:text-gray-900 border hover:bg-gray-100/80"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Table */}
                  {filteredStudents.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b text-gray-400 text-xs font-semibold uppercase tracking-wider">
                            <th className="py-3 px-4">Name</th>
                            <th className="py-3 px-4">Email</th>
                            <th className="py-3 px-4">Phone</th>
                            <th className="py-3 px-4">Due Balance</th>
                            <th className="py-3 px-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y text-sm text-gray-700">
                          {paginatedStudents.map((stud) => {
                            const total = stud.fee?.total || 0;
                            const paid = stud.fee?.paid || 0;
                            const due = total - paid;
                            const fmt = (n) => "₹" + n.toLocaleString("en-IN");

                            return (
                              <tr key={stud.id} className="hover:bg-gray-50/70 transition-colors">
                                <td className="py-4 px-4 font-semibold text-gray-900">
                                  <div className="flex items-center gap-2">
                                    {stud.name}
                                    {stud.isBlocked && (
                                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-600 uppercase tracking-wide">
                                        Restricted
                                      </span>
                                    )}
                                  </div>
                                </td>
                                <td className="py-4 px-4 text-gray-500">{stud.email}</td>
                                <td className="py-4 px-4 text-gray-500">{stud.phone}</td>
                                <td className="py-4 px-4">
                                  {due === 0 ? (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-50 text-green-700 uppercase tracking-wide">
                                      Paid
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-50 text-orange-700 uppercase tracking-wide">
                                      {fmt(due)} Due
                                    </span>
                                  )}
                                </td>
                                <td className="py-4 px-4 text-right">
                                  <div className="inline-flex items-center gap-2">
                                    <button
                                      onClick={() => {
                                        setChangePasswordTarget({
                                          type: "student",
                                          id: stud.id,
                                          name: stud.name,
                                        });
                                        setShowChangeForm(false);
                                        setShowCurrentPassword(false);
                                      }}
                                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-600 hover:text-white bg-blue-50 hover:bg-blue-600 rounded-lg border border-blue-200 transition-all shadow-sm"
                                    >
                                      <FiEye size={12} />
                                      View PW
                                    </button>
                                    <button
                                      onClick={() => setViewFeesTarget(stud)}
                                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-green-600 hover:text-white bg-green-50 hover:bg-green-600 rounded-lg border border-green-200 transition-all shadow-sm"
                                    >
                                      <FiCreditCard size={12} />
                                      View Fees
                                    </button>
                                    {stud.isBlocked ? (
                                      <button
                                        onClick={() => handleUnblockStudent(stud.id, stud.name, selectedBatch.id)}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-600 hover:text-white bg-emerald-50 hover:bg-emerald-600 rounded-lg border border-emerald-200 transition-all shadow-sm"
                                      >
                                        <FiUnlock size={12} />
                                        Restore
                                      </button>
                                    ) : (
                                      <button
                                        onClick={() => {
                                          setBlockStudentTarget({
                                            id: stud.id,
                                            name: stud.name,
                                            batchId: selectedBatch.id,
                                          });
                                          setBlockReason("");
                                          setBlockError("");
                                        }}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-600 hover:text-white bg-red-50 hover:bg-red-600 rounded-lg border border-red-200 transition-all shadow-sm"
                                      >
                                        <FiSlash size={12} />
                                        Restrict
                                      </button>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500 font-medium bg-gray-50 rounded-xl border border-dashed">
                      No students found matching this status filter.
                    </div>
                  )}

                  {/* Pagination */}
                  {totalStudentPages > 1 && (
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-6 border-t text-sm text-gray-500">
                      <div>
                        Showing <span className="font-medium text-gray-900">{studentStartIndex + 1}</span> to{" "}
                        <span className="font-medium text-gray-900">
                          {Math.min(studentStartIndex + itemsPerPage, filteredStudents.length)}
                        </span>{" "}
                        of <span className="font-medium text-gray-900">{filteredStudents.length}</span> students
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setStudentPage(prev => Math.max(prev - 1, 1))}
                          disabled={studentPage === 1}
                          className="p-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                        >
                          <FiChevronLeft size={16} />
                        </button>
                        {Array.from({ length: totalStudentPages }, (_, idx) => (
                          <button
                            key={idx + 1}
                            onClick={() => setStudentPage(idx + 1)}
                            className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                              studentPage === idx + 1
                                ? "bg-blue-600 text-white"
                                : "border hover:bg-gray-50 text-gray-700"
                            }`}
                          >
                            {idx + 1}
                          </button>
                        ))}
                        <button
                          onClick={() => setStudentPage(prev => Math.min(prev + 1, totalStudentPages))}
                          disabled={studentPage === totalStudentPages}
                          className="p-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                        >
                          <FiChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {/* Profile */}

          {activeTab === "profile" && (

            <div className="bg-white rounded-2xl shadow-sm border p-8">

              <div className="space-y-6">

                <div>
                  <p className="text-sm text-gray-500">
                    Name
                  </p>

                  <h3 className="text-lg font-semibold">
                    {admin.name}
                  </h3>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Email
                  </p>

                  <h3 className="text-lg font-semibold">
                    {admin.email}
                  </h3>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Role
                  </p>

                  <h3 className="text-lg font-semibold">
                    Mentor
                  </h3>
                </div>

              </div>

            </div>

          )}

        </main>

        {/* Activate Batch Modal */}
        {activateBatchTarget && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            style={{ animation: "fadeIn 0.2s ease-out" }}
          >
            <div 
              className="bg-white rounded-3xl border border-gray-100 shadow-2xl w-full max-w-md overflow-hidden"
              style={{ animation: "successPop 0.3s cubic-bezier(0.34,1.56,0.64,1) both" }}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 px-6 py-5 flex justify-between items-center text-white">
                <div className="flex items-center gap-2.5">
                  <div className="bg-white/10 p-1.5 rounded-lg">
                    <FiBook size={18} />
                  </div>
                  <h3 className="font-bold text-lg tracking-wide">Activate Batch</h3>
                </div>
                <button 
                  onClick={() => {
                    setActivateBatchTarget(null);
                    setNewBatchNameInput("");
                  }}
                  className="text-white hover:text-gray-200 text-2xl font-medium focus:outline-none transition-colors"
                >
                  &times;
                </button>
              </div>

              {/* Form Body */}
              <form onSubmit={handleConfirmActivateBatch} className="p-6 space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-4 font-medium">
                    Activating <strong>{activateBatchTarget.name}</strong> will create a new instance of this batch with a new name and a clean student slate.
                  </p>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    New Batch Name / Number
                  </label>
                  <input
                    type="text"
                    value={newBatchNameInput}
                    onChange={(e) => setNewBatchNameInput(e.target.value)}
                    placeholder="e.g. Python 5"
                    className="w-full border rounded-xl p-3.5 outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 placeholder-slate-400 font-medium"
                    required
                    autoFocus
                  />
                </div>

                <div className="flex gap-3 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setActivateBatchTarget(null);
                      setNewBatchNameInput("");
                    }}
                    className="px-4 py-2 border rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition active:scale-95 text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition active:scale-95 text-sm"
                  >
                    Confirm & Activate
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Create Batch Modal */}
        {showCreateBatchModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in" onClick={() => setShowCreateBatchModal(false)}></div>
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md relative z-10 overflow-hidden animate-slide-up">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <FiBook size={20} />
                  <h3 className="font-bold text-lg tracking-wide">Create New Batch</h3>
                </div>
                <button
                  onClick={() => setShowCreateBatchModal(false)}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                  <FiX size={24} />
                </button>
              </div>
              <form onSubmit={handleCreateBatch} className="p-6 space-y-4">
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Batch Name *</label>
                    <input
                      type="text"
                      required
                      value={newBatchData.name}
                      onChange={(e) => setNewBatchData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium"
                      placeholder="e.g. Python FastTrack"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Course Name *</label>
                    <input
                      type="text"
                      required
                      value={newBatchData.course}
                      onChange={(e) => setNewBatchData(prev => ({ ...prev, course: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium"
                      placeholder="e.g. Python Programming"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Start Date *</label>
                    <input
                      type="text"
                      required
                      value={newBatchData.startDate}
                      onChange={(e) => setNewBatchData(prev => ({ ...prev, startDate: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium"
                      placeholder="e.g. 01 Aug 2025"
                    />
                  </div>
                </div>
                <div className="pt-4 flex items-center justify-end gap-3 border-t">
                  <button
                    type="button"
                    onClick={() => setShowCreateBatchModal(false)}
                    className="px-4 py-2 border rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition active:scale-95 text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition active:scale-95 text-sm flex items-center gap-2"
                  >
                    <FiCheck size={16} />
                    Create Batch
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* View Password Card Modal */}
        {changePasswordTarget && (() => {
          const targetUser = (students[selectedBatch?.id] || []).find(s => s.id === changePasswordTarget.id);
          const currentPasswordVal = targetUser?.password || "cshr@2026";

          const handleCopyPassword = () => {
            navigator.clipboard.writeText(currentPasswordVal);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          };

          return (
            <div 
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
              style={{ animation: "fadeIn 0.2s ease-out" }}
            >
              <div 
                className="bg-white rounded-3xl border border-gray-100 shadow-2xl w-full max-w-md overflow-hidden"
                style={{ animation: "successPop 0.3s cubic-bezier(0.34,1.56,0.64,1) both" }}
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 px-6 py-5 flex justify-between items-center text-white">
                  <div className="flex items-center gap-2.5">
                    <div className="bg-white/10 p-1.5 rounded-lg">
                      <FiEye size={18} />
                    </div>
                    <h3 className="font-bold text-lg tracking-wide">Security Details</h3>
                  </div>
                  <button 
                    onClick={() => {
                      setChangePasswordTarget(null);
                      setTargetPassword({ newPassword: "", confirmPassword: "" });
                      setValidationError("");
                      setShowChangeForm(false);
                      setShowCurrentPassword(false);
                    }}
                    className="text-white hover:text-gray-200 text-2xl font-medium focus:outline-none transition-colors"
                  >
                    &times;
                  </button>
                </div>
                
                <div className="p-6 space-y-6">
                  {/* User Profile Card */}
                  <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-lg font-bold shadow-md shadow-blue-200 flex-shrink-0">
                      {changePasswordTarget.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Account Profile</p>
                      <p className="text-base font-bold text-gray-900 truncate leading-tight">
                        {changePasswordTarget.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 uppercase tracking-wide">
                          {changePasswordTarget.type}
                        </span>
                        <span className="text-[10px] font-bold text-gray-400">
                          ID: {changePasswordTarget.id}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Password Display Box */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                      Current Password
                    </label>
                    <div className="relative flex items-center">
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        readOnly
                        value={currentPasswordVal}
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-4 pr-24 py-3.5 text-sm font-mono text-gray-800 focus:outline-none select-all"
                      />
                      <div className="absolute right-2.5 flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-all"
                          title={showCurrentPassword ? "Hide password" : "Show password"}
                        >
                          {showCurrentPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                        </button>
                        <button
                          type="button"
                          onClick={handleCopyPassword}
                          className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-all flex items-center justify-center gap-1"
                          title="Copy to clipboard"
                        >
                          {copied ? (
                            <FiCheck className="text-green-500 animate-scale-up" size={16} />
                          ) : (
                            <FiCopy size={16} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Expandable Change Password Accordion */}
                  <div className="border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300">
                    <button
                      type="button"
                      onClick={() => setShowChangeForm(!showChangeForm)}
                      className={`w-full px-5 py-4 flex justify-between items-center text-left transition-all ${
                        showChangeForm ? "bg-blue-50/40 text-blue-900 border-b border-gray-100" : "bg-white text-gray-700 hover:bg-gray-50/50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <FiLock size={15} className={showChangeForm ? "text-blue-600" : "text-gray-400"} />
                        <span className="font-semibold text-sm">Update Password</span>
                      </div>
                      {showChangeForm ? (
                        <FiChevronUp size={16} className="text-blue-600" />
                      ) : (
                        <FiChevronDown size={16} className="text-gray-400" />
                      )}
                    </button>

                    {showChangeForm && (
                      <div className="p-5 bg-white space-y-4 animate-slide-down">
                        {validationError && (
                          <div className="bg-red-50 text-red-600 border border-red-100 px-4 py-2.5 rounded-xl text-xs font-semibold">
                            {validationError}
                          </div>
                        )}

                        <form onSubmit={handleTargetPasswordSubmit} className="space-y-4">
                          <div>
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                              New Password
                            </label>
                            <input
                              type="password"
                              required
                              placeholder="Enter new password"
                              className="w-full border border-gray-200 hover:border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3 text-sm transition-colors outline-none font-mono"
                              value={targetPassword.newPassword}
                              onChange={(e) =>
                                setTargetPassword({
                                  ...targetPassword,
                                  newPassword: e.target.value,
                                })
                              }
                            />
                          </div>

                          <div>
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                              Confirm Password
                            </label>
                            <input
                              type="password"
                              required
                              placeholder="Confirm new password"
                              className="w-full border border-gray-200 hover:border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3 text-sm transition-colors outline-none font-mono"
                              value={targetPassword.confirmPassword}
                              onChange={(e) =>
                                setTargetPassword({
                                  ...targetPassword,
                                  confirmPassword: e.target.value,
                                })
                              }
                            />
                          </div>

                          <div className="flex gap-3 pt-3 border-t">
                            <button
                              type="button"
                              onClick={() => {
                                setShowChangeForm(false);
                                setTargetPassword({ newPassword: "", confirmPassword: "" });
                                setValidationError("");
                              }}
                              className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-600 py-3 rounded-xl font-semibold text-xs transition-colors border border-gray-200/60"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-2"
                            >
                              {isSubmitting ? (
                                <>
                                  <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                  </svg>
                                  Updating...
                                </>
                              ) : (
                                "Update Password"
                              )}
                            </button>
                          </div>
                        </form>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* View Fees Card Modal */}
        {viewFeesTarget && (() => {
          const totalFee = viewFeesTarget.fee?.total || 0;
          const paidFee = viewFeesTarget.fee?.paid || 0;
          const dueFee = totalFee - paidFee;
          const pct = totalFee > 0 ? Math.round((paidFee / totalFee) * 100) : 0;
          const fmt = (n) => "₹" + n.toLocaleString("en-IN");

          return (
            <div 
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
              style={{ animation: "fadeIn 0.2s ease-out" }}
            >
              <div 
                className="bg-white rounded-3xl border border-gray-100 shadow-2xl w-full max-w-md overflow-hidden"
                style={{ animation: "successPop 0.3s cubic-bezier(0.34,1.56,0.64,1) both" }}
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-green-600 via-teal-600 to-green-700 px-6 py-5 flex justify-between items-center text-white">
                  <div className="flex items-center gap-2.5">
                    <div className="bg-white/10 p-1.5 rounded-lg">
                      <FiCreditCard size={18} />
                    </div>
                    <h3 className="font-bold text-lg tracking-wide">Fee Details</h3>
                  </div>
                  <button 
                    onClick={() => setViewFeesTarget(null)}
                    className="text-white hover:text-gray-200 text-2xl font-medium focus:outline-none transition-colors"
                  >
                    &times;
                  </button>
                </div>
                
                <div className="p-6 space-y-6">
                  {/* Student Profile Card */}
                  <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-green-600 to-teal-600 text-white flex items-center justify-center text-lg font-bold shadow-md shadow-green-100 flex-shrink-0">
                      {viewFeesTarget.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Student Profile</p>
                      <p className="text-base font-bold text-gray-900 truncate leading-tight">
                        {viewFeesTarget.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-50 text-green-700 uppercase tracking-wide">
                          Student
                        </span>
                        <span className="text-[10px] font-bold text-gray-400">
                          ID: {viewFeesTarget.id}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Fee Grid Details */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-gray-50/70 border border-gray-100/80 rounded-2xl p-3.5 flex flex-col items-center justify-center text-center">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Total Fee</span>
                      <span className="text-base font-extrabold text-gray-900">{fmt(totalFee)}</span>
                    </div>
                    <div className="bg-green-50/40 border border-green-100/50 rounded-2xl p-3.5 flex flex-col items-center justify-center text-center">
                      <span className="text-[10px] font-bold text-green-700 uppercase tracking-wider mb-1.5 font-semibold">Paid</span>
                      <span className="text-base font-extrabold text-green-600">{fmt(paidFee)}</span>
                    </div>
                    <div className="bg-orange-50/40 border border-orange-100/50 rounded-2xl p-3.5 flex flex-col items-center justify-center text-center">
                      <span className="text-[10px] font-bold text-orange-700 uppercase tracking-wider mb-1.5 font-semibold">Due</span>
                      <span className="text-base font-extrabold text-orange-600">{fmt(dueFee)}</span>
                    </div>
                  </div>

                  {/* Progress Indicator */}
                  <div className="bg-gray-50/50 border border-gray-100 rounded-2xl p-5">
                    <div className="flex justify-between items-center mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                      <span>Payment Progress</span>
                      <span className="text-sm text-blue-600 font-extrabold">{pct}%</span>
                    </div>
                    <div className="h-3.5 bg-gray-200/70 rounded-full overflow-hidden mb-3.5">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[11px] font-bold tracking-wide">
                      <span className="text-green-600 bg-green-50 px-2.5 py-1 rounded-full">Paid: {fmt(paidFee)}</span>
                      <span className="text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full">Pending: {fmt(dueFee)}</span>
                    </div>
                  </div>

                  {/* Action/Close Button */}
                  <button
                    type="button"
                    onClick={() => setViewFeesTarget(null)}
                    className="w-full bg-gray-50 hover:bg-gray-100 border border-gray-200/80 py-3 rounded-2xl font-bold text-sm transition-all focus:outline-none text-gray-700"
                  >
                    Close Details
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Restrict Student Modal */}
        {blockStudentTarget && (() => {
          return (
            <div 
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
              style={{ animation: "fadeIn 0.2s ease-out" }}
            >
              <div 
                className="bg-white rounded-3xl border border-gray-100 shadow-2xl w-full max-w-md overflow-hidden"
                style={{ animation: "successPop 0.3s cubic-bezier(0.34,1.56,0.64,1) both" }}
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 px-6 py-5 flex justify-between items-center text-white">
                  <div className="flex items-center gap-2.5">
                    <div className="bg-white/10 p-1.5 rounded-lg">
                      <FiSlash size={18} />
                    </div>
                    <h3 className="font-bold text-lg tracking-wide">Restrict Dashboard Access</h3>
                  </div>
                  <button 
                    onClick={() => {
                      setBlockStudentTarget(null);
                      setBlockReason("");
                      setBlockError("");
                    }}
                    className="text-white hover:text-gray-200 text-2xl font-medium focus:outline-none transition-colors"
                  >
                    &times;
                  </button>
                </div>
                
                <div className="p-6 space-y-6">
                  {/* Warning Notice */}
                  <div className="bg-red-50 border border-red-100/50 rounded-2xl p-4 flex items-start gap-3">
                    <FiLock className="text-red-600 mt-0.5 flex-shrink-0" size={18} />
                    <div>
                      <p className="text-xs font-bold text-red-800 uppercase tracking-wider">Warning</p>
                      <p className="text-xs text-red-600 font-semibold mt-0.5 leading-relaxed">
                        Restricting student dashboard access blocks them from viewing details, courses, and LMS redirects.
                      </p>
                    </div>
                  </div>

                  {/* Student Profile Detail Card */}
                  <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-red-600 to-rose-600 text-white flex items-center justify-center text-lg font-bold shadow-md shadow-red-100 flex-shrink-0">
                      {blockStudentTarget.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Student Name</p>
                      <p className="text-base font-bold text-gray-900 truncate leading-tight">
                        {blockStudentTarget.name}
                      </p>
                      <span className="text-[10px] font-bold text-gray-400 block mt-1">
                        ID: {blockStudentTarget.id}
                      </span>
                    </div>
                  </div>

                  <form onSubmit={handleBlockStudentSubmit} className="space-y-4">
                    {blockError && (
                      <div className="bg-red-50 text-red-600 border border-red-100 px-4 py-2.5 rounded-xl text-xs font-semibold">
                        {blockError}
                      </div>
                    )}

                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                        Reason for Restriction
                      </label>
                      <select
                        required
                        className="w-full border border-gray-200 hover:border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-xl px-4 py-3.5 text-sm transition-colors outline-none font-medium bg-white cursor-pointer"
                        value={blockReason}
                        onChange={(e) => {
                          setBlockReason(e.target.value);
                          localStorage.setItem("lastBlockReason", e.target.value);
                        }}
                      >
                        <option value="">Select a reason</option>
                        <option value="not paid fee">not paid fee</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Course dropped">Course dropped</option>
                      </select>
                    </div>

                    <div className="flex gap-3 pt-3 border-t">
                      <button
                        type="button"
                        onClick={() => {
                          setBlockStudentTarget(null);
                          setBlockReason("");
                          setBlockError("");
                        }}
                        className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-600 py-3 rounded-xl font-semibold text-xs transition-colors border border-gray-200/60"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isBlockingSubmit}
                        className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white py-3 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-2"
                      >
                        {isBlockingSubmit ? (
                          <>
                            <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Restricting...
                          </>
                        ) : (
                          "Confirm Restrict"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Success Notification */}
        {toast && (
          <SuccessToast message={toast} onClose={() => setToast("")} />
        )}

        <style jsx>{`
          .animate-fade-in {
            animation: fadeIn 0.35s ease-out forwards;
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(6px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes successPop {
            0%   { opacity: 0; transform: scale(0.92); }
            100% { opacity: 1; transform: scale(1); }
          }
          @keyframes scaleUp {
            0%   { transform: scale(0.85); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
          .animate-scale-up {
            animation: scaleUp 0.15s ease-out forwards;
          }
          @keyframes slideDown {
            0%   { opacity: 0; transform: translateY(-8px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-slide-down {
            animation: slideDown 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
        `}</style>
      </div>
    </>
  );
}