  import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  UserPlusIcon,
  UserIcon,
  LockClosedIcon,
  EnvelopeIcon,
  IdentificationIcon,
  HashtagIcon,
  AcademicCapIcon,
  BookOpenIcon,
  CurrencyRupeeIcon,
  UsersIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

function Addstudent() {
  const [data, setData] = useState({
    Username: "",
    Password: "",
    Email: "",
    Name: "",
    Rollno: "",
    Course: "",
    Semester: "",
    Paidfee: "",
    Totalfee: "",
    Gender: "",
    Role: "",
  });

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/course`);
        setCourses(res.data);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      }
    };
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCourseChange = (e) => {
    setData((prev) => ({ ...prev, Course: e.target.value }));
  };

  const submit = async () => {
    if (!data.Course) return alert("Please select a course");
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/student`, data);
      alert("Student Added Successfully ✅");
      setData({
        Username: "",
        Password: "",
        Email: "",
        Name: "",
        Rollno: "",
        Course: "",
        Semester: "",
        Paidfee: "",
        Totalfee: "",
        Gender: "",
        Role: "",
      });
    } catch (error) {
      console.error(error);
      alert("Something went wrong ❌");
    }
  };

  /* field config — icon + label + field meta */
  const fieldGroups = [
    {
      section: "Account Credentials",
      color: "purple",
      fields: [
        { label: "Username",  name: "Username",  type: "text",     Icon: UserIcon,          placeholder: "e.g. john_doe" },
        { label: "Password",  name: "Password",  type: "password", Icon: LockClosedIcon,    placeholder: "Min. 8 characters" },
        { label: "Email",     name: "Email",     type: "email",    Icon: EnvelopeIcon,      placeholder: "student@email.com" },
      ],
    },
    {
      section: "Personal Information",
      color: "cyan",
      fields: [
        { label: "Full Name", name: "Name",   type: "text", Icon: IdentificationIcon, placeholder: "e.g. John Doe" },
        { label: "Roll No",   name: "Rollno", type: "text", Icon: HashtagIcon,         placeholder: "e.g. CS-2024-001" },
        { label: "Gender",    name: "Gender", type: "text", Icon: UsersIcon,           placeholder: "Male / Female / Other" },
      ],
    },
    {
      section: "Academic Details",
      color: "emerald",
      fields: [
        { label: "Semester", name: "Semester", type: "text", Icon: BookOpenIcon,    placeholder: "e.g. 4" },
        { label: "Role",     name: "Role",     type: "text", Icon: ShieldCheckIcon, placeholder: "Student" },
      ],
    },
    {
      section: "Fee Information",
      color: "amber",
      fields: [
        { label: "Paid Fee",  name: "Paidfee",  type: "number", Icon: CurrencyRupeeIcon, placeholder: "Amount paid" },
        { label: "Total Fee", name: "Totalfee", type: "number", Icon: CurrencyRupeeIcon, placeholder: "Total fee amount" },
      ],
    },
  ];

  const sectionAccent = {
    purple:  { header: "bg-purple-500/[0.06]",  icon: "bg-purple-500/20 border-purple-500/25",  iconColor: "text-purple-400",  label: "text-purple-400/70",  dot: "bg-purple-400" },
    cyan:    { header: "bg-cyan-500/[0.06]",    icon: "bg-cyan-500/20 border-cyan-500/25",      iconColor: "text-cyan-400",    label: "text-cyan-400/70",    dot: "bg-cyan-400" },
    emerald: { header: "bg-emerald-500/[0.06]", icon: "bg-emerald-500/20 border-emerald-500/25",iconColor: "text-emerald-400", label: "text-emerald-400/70", dot: "bg-emerald-400" },
    amber:   { header: "bg-amber-500/[0.06]",   icon: "bg-amber-500/20 border-amber-500/25",    iconColor: "text-amber-400",   label: "text-amber-400/70",   dot: "bg-amber-400" },
  };

  const fieldWrap = "flex items-center gap-3 bg-white/[0.05] border border-white/[0.09] rounded-xl px-4 py-3 focus-within:border-purple-500/50 focus-within:bg-purple-500/[0.06] transition-all duration-200";
  const inputBase = "bg-transparent outline-none text-white text-sm w-full placeholder:text-white/25";

  /* fee progress */
  const paidNum  = parseFloat(data.Paidfee)  || 0;
  const totalNum = parseFloat(data.Totalfee) || 0;
  const feePct   = totalNum > 0 ? Math.min((paidNum / totalNum) * 100, 100) : 0;

  return (
    <div className="min-h-screen bg-[#070B17] text-white relative overflow-hidden">
      {/* Ambient blobs */}
      <div className="pointer-events-none fixed -top-32 -left-32 w-[420px] h-[420px] bg-purple-700/20 rounded-full blur-[160px] z-0" />
      <div className="pointer-events-none fixed -bottom-32 -right-32 w-[420px] h-[420px] bg-cyan-600/15 rounded-full blur-[160px] z-0" />

      <div className="relative z-10 p-4 md:p-8 max-w-[1200px] mx-auto space-y-8">

        {/* ── Page Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Add New Student</h1>
            <p className="text-[13px] text-white/40 mt-1">
              Fill in the details below to register a new student in the system.
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg
            bg-white/[0.04] border border-white/[0.08] text-[12px] text-white/40 self-start">
            <UserPlusIcon className="w-3.5 h-3.5" />
            New Registration
          </div>
        </div>

        {/* ── Form Card ── */}
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden
          shadow-[0_0_80px_rgba(0,0,0,0.4)]">

          {/* top banner */}
          <div className="px-6 py-5 border-b border-white/[0.07] bg-purple-500/[0.05]
            flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600
              flex items-center justify-center shadow-lg shadow-purple-500/30 shrink-0">
              <UserPlusIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-[16px] font-bold text-white leading-none">Student Registration</h2>
              <p className="text-[12px] text-white/40 mt-1">
                Complete all sections to successfully add a student
              </p>
            </div>

            {/* step dots */}
            <div className="ml-auto hidden md:flex items-center gap-2">
              {fieldGroups.map((g) => (
                <div key={g.color}
                  className={`w-2 h-2 rounded-full ${sectionAccent[g.color].dot} opacity-60`} />
              ))}
              <div className="w-2 h-2 rounded-full bg-white/20" />
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-8">

            {/* ── FIELD SECTIONS ── */}
            {fieldGroups.map((group) => {
              const a = sectionAccent[group.color];
              return (
                <div key={group.section}
                  className="bg-white/[0.02] border border-white/[0.07] rounded-2xl overflow-hidden">
                  {/* section header */}
                  <div className={`px-5 py-3.5 border-b border-white/[0.07] ${a.header} flex items-center gap-2`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${a.dot}`} />
                    <p className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${a.label}`}>
                      {group.section}
                    </p>
                  </div>

                  <div className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {group.fields.map(({ label, name, type, Icon, placeholder }) => (
                      <div key={name} className="space-y-1.5">
                        <label className="text-[11px] font-semibold text-white/40 uppercase tracking-widest">
                          {label}
                        </label>
                        <div className={fieldWrap}>
                          <Icon className="w-4 h-4 text-white/30 shrink-0" />
                          <input
                            type={type}
                            name={name}
                            value={data[name]}
                            onChange={handleChange}
                            placeholder={placeholder}
                            className={`${inputBase} ${
                              type === "number"
                                ? "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                : ""
                            }`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* ── COURSE + FEE SECTION ── */}
            <div className="bg-white/[0.02] border border-white/[0.07] rounded-2xl overflow-hidden">
              <div className="px-5 py-3.5 border-b border-white/[0.07] bg-indigo-500/[0.05] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-400/70">
                  Course Enrollment
                </p>
              </div>

              <div className="p-5 space-y-5">
                {/* course select */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-white/40 uppercase tracking-widest">
                    Course
                  </label>
                  <div className={`${fieldWrap} relative`}>
                    <AcademicCapIcon className="w-4 h-4 text-white/30 shrink-0" />
                    <select
                      value={data.Course}
                      onChange={handleCourseChange}
                      className={`${inputBase} appearance-none cursor-pointer
                        [&>option]:bg-[#0D1221] [&>option]:text-white`}
                    >
                      <option value="">Select a course</option>
                      {courses.map((c) => (
                        <option key={c._id} value={c._id}>
                          {c.Coursename}
                        </option>
                      ))}
                    </select>
                    <svg className="w-4 h-4 text-white/30 shrink-0 pointer-events-none"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* fee progress */}
                {(data.Paidfee || data.Totalfee) && (
                  <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between text-[12px]">
                      <span className="text-white/40">Fee Progress</span>
                      <span className={`font-semibold ${feePct >= 100 ? "text-emerald-400" : "text-amber-400"}`}>
                        {feePct.toFixed(0)}% Paid
                      </span>
                    </div>
                    <div className="w-full h-2 bg-white/[0.08] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500
                          ${feePct >= 100 ? "bg-emerald-400" : "bg-gradient-to-r from-amber-400 to-orange-500"}`}
                        style={{ width: `${feePct}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[11px] text-white/30">
                      <span>Paid: ₹{paidNum.toLocaleString()}</span>
                      <span>Total: ₹{totalNum.toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ── SUBMIT ── */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4
              pt-4 border-t border-white/[0.07]">
              <p className="text-[12px] text-white/25 hidden sm:block">
                All fields are required unless marked optional.
              </p>
              <button
                onClick={submit}
                className="w-full sm:w-auto px-10 py-3 rounded-xl text-[14px] font-semibold
                  bg-gradient-to-r from-purple-600 to-indigo-600
                  hover:from-purple-500 hover:to-indigo-500
                  active:scale-[0.98] shadow-lg shadow-purple-500/30
                  transition-all duration-200 flex items-center justify-center gap-2"
              >
                <CheckCircleIcon className="w-5 h-5" />
                Register Student
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Addstudent;