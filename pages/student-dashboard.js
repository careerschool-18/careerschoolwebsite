import React, { useState, useEffect } from "react";
import Head from "next/head";
import { FiUser, FiPhone, FiMail, FiBook, FiCalendar, FiCheckCircle, FiClock, FiExternalLink, FiLock } from "react-icons/fi";

const student = {
  fullName: "Aghamarsh Kuppachi",
  initials: "AK",
  phone: "+91 98765 43210",
  email: "aghamarsh.kuppachi@email.com",
  batch: "Python 4",
  mentor: "Krishna Kumar",
  joiningDate: "12 Jan 2025",
  fee: {
    total: 45000,
    paid: 30000,
  },
  isBlocked: false, // Set to true to view the blocked state
  blockedReason: "Outstanding fees of ₹15,000 need to be cleared.",
};

const payments = [
  { date: "12 Jan 2025", amount: 15000, note: "Enrollment fee", status: "paid" },
  { date: "10 Mar 2025", amount: 10000, note: "Instalment 2", status: "paid" },
  { date: "15 May 2025", amount: 5000, note: "Instalment 3", status: "paid" },
  { date: "10 Jul 2025", amount: 15000, note: "Final instalment", status: "due" },
];

const fmt = (n) => "₹" + n.toLocaleString("en-IN");

export default function StudentProfile() {
  const [activeTab, setActiveTab] = useState("overview");
  const balance = student.fee.total - student.fee.paid;
  const pct = Math.round((student.fee.paid / student.fee.total) * 100);

  const [isBlocked, setIsBlocked] = useState(student.isBlocked);
  const [blockedReason, setBlockedReason] = useState(student.blockedReason);

  useEffect(() => {
    const localBlocked = localStorage.getItem("mock_student_isBlocked");
    const localReason = localStorage.getItem("mock_student_blockedReason");
    if (localBlocked !== null) {
      setIsBlocked(localBlocked === "true");
    }
    if (localReason !== null) {
      setBlockedReason(localReason);
    }
  }, []);

  const getRestrictionMessage = (reason) => {
    const mapping = {
      "not paid fee": "Your access has been restricted because your course/registration fees have not been paid. Please clear your dues or contact the admin team.",
      "Inactive": "Your dashboard access has been restricted because your student account is inactive. Please reach out to administration to reactivate your profile.",
      "Course dropped": "Your access has been restricted because your course status is marked as dropped. Contact support if you believe this is an error."
    };
    return mapping[reason] || reason || "Access restricted by the administration. Please contact support.";
  };

  if (isBlocked) {
    return (
      <>
        <Head>
          <title>Access Restricted | Careerschool</title>
        </Head>
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-6 font-sans">
          <div className="bg-white max-w-md w-full rounded-3xl border border-red-100 shadow-2xl p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 to-orange-500"></div>
            
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 mx-auto mb-6 shadow-md shadow-red-50">
              <FiLock size={32} />
            </div>
            
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-2">
              Dashboard Access Restricted
            </h1>
            
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Your access to the Careerschool Student Dashboard has been temporarily restricted by the administration.
            </p>
            
            {blockedReason && (
              <div className="bg-red-50/50 border border-red-100/50 rounded-2xl p-5 mb-8 text-left">
                <span className="text-[10px] font-bold text-red-700 uppercase tracking-wider block mb-1">
                  Reason for Restriction
                </span>
                <p className="text-sm font-semibold text-gray-800 leading-relaxed">
                  {getRestrictionMessage(blockedReason)}
                </p>
              </div>
            )}
            
            <div className="space-y-3">
              <a
                href="mailto:support@careerschool.com"
                className="w-full inline-flex justify-center items-center py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-sm shadow-md shadow-blue-100 transition-all hover:scale-[1.01]"
              >
                Contact Administration
              </a>
              <button
                onClick={() => window.location.href = "/"}
                className="w-full py-3.5 bg-gray-50 hover:bg-gray-100 border border-gray-200/80 text-gray-700 rounded-2xl font-semibold text-sm transition-all"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Student Dashboard | Careerschool</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
        {/* Navbar */}
        <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-5xl mx-auto flex justify-between items-center px-6 py-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.location.href="/"}>
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
                <FiUser size={20} />
              </div>
              <span className="font-bold text-xl tracking-tight text-gray-800">Careerschool</span>
            </div>
            <a 
              href="https://lms.example.com" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-lg transition-all shadow-sm"
            >
              Take me to LMS
              <FiExternalLink size={16} />
            </a>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-6 py-8">
          
          {/* Profile Header Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 mb-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>
            
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-800 to-gray-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg flex-shrink-0 ring-4 ring-gray-50">
                {student.initials}
              </div>
              <div className="text-center sm:text-left flex-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{student.fullName}</h1>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-6 text-sm text-gray-600 font-medium">
                  <div className="flex items-center gap-1.5 bg-gray-100 px-3 py-1 rounded-full"><FiBook className="text-blue-600"/> {student.batch}</div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 overflow-x-auto hide-scrollbar">
              {["overview", "fees", "Payment History"].map(t => (
                <button 
                  key={t} 
                  className={`px-6 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === t 
                      ? "border-blue-600 text-blue-600" 
                      : "border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300"
                  }`}
                  onClick={() => setActiveTab(t)}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="animate-fade-in-up">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Personal Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                  {[
                    { label: "Full Name", value: student.fullName, icon: FiUser },
                    { label: "Phone Number", value: student.phone, icon: FiPhone },
                    { label: "Email Address", value: student.email, icon: FiMail },
                    { label: "Batch Details", value: student.batch, icon: FiBook },
                    { label: "Assigned Mentor", value: student.mentor, icon: FiUser },
                    { label: "Joining Date", value: student.joiningDate, icon: FiCalendar },
                  ].map(({ label, value, icon: Icon }) => (
                    <div key={label} className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                      <div className="mt-1 w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                        <Icon size={18} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{label}</p>
                        <p className="text-base font-medium text-gray-900">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Fees Tab */}
            {activeTab === "fees" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col items-center justify-center text-center">
                    <p className="text-sm font-medium text-gray-500 mb-2">Total Fee</p>
                    <p className="text-3xl font-bold text-gray-900">{fmt(student.fee.total)}</p>
                  </div>
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col items-center justify-center text-center border-b-4 border-b-green-500">
                    <p className="text-sm font-medium text-gray-500 mb-2">Paid Amount</p>
                    <p className="text-3xl font-bold text-green-600">{fmt(student.fee.paid)}</p>
                  </div>
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col items-center justify-center text-center border-b-4 border-b-orange-500">
                    <p className="text-sm font-medium text-gray-500 mb-2">Balance Due</p>
                    <p className="text-3xl font-bold text-orange-600">{fmt(balance)}</p>
                    <p className="text-sm font-medium text-gray-500 mt-2">Due date: 30/06/2026</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Payment Progress</h3>
                      <p className="text-sm text-gray-500 mt-1">Track your course fee status</p>
                    </div>
                    <span className="text-2xl font-bold text-blue-600">{pct}%</span>
                  </div>
                  <div className="h-4 bg-gray-100 rounded-full overflow-hidden mb-4">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-green-600 bg-green-50 px-3 py-1 rounded-full">Paid: {fmt(student.fee.paid)}</span>
                    <span className="text-orange-600 bg-orange-50 px-3 py-1 rounded-full">Pending: {fmt(balance)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Payment History Tab */}
            {activeTab === "Payment History" && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                {/* <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="text-lg font-semibold text-gray-900">Transaction History</h3>
                </div> */}
                <div className="divide-y divide-gray-100">
                  {payments.filter(p => p.status === "paid").map((p, i) => (
                    <div key={i} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 bg-green-100 text-green-600">
                          <FiCheckCircle size={24} />
                        </div>
                        <div>
                          <p className="text-base font-semibold text-gray-900 mb-1">{p.note}</p>
                          <p className="text-sm text-gray-500 font-medium">{p.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900 mb-1">{fmt(p.amount)}</p>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide bg-green-100 text-green-700">
                          paid
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>

        <style jsx>{`
          .animate-fade-in-up {
            animation: fadeInUp 0.4s ease-out forwards;
          }
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </div>
    </>
  );
}
