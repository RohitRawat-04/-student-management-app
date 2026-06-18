 import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  UserPlusIcon,
  UserIcon,
  LockClosedIcon,
  IdentificationIcon,
  CurrencyRupeeIcon,
  PhoneIcon,
  EnvelopeIcon,
  AcademicCapIcon,
  ShieldCheckIcon,
  UsersIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

function Addstaff() {
  const [courses, setCourses] = useState([]);

  const [data, setData] = useState({
    Username: "",
    Password: "",
    Name: "",
    Salary: "",
    Phone: "",
    Email: "",
    Course: "",
    Role: "",
    Gender: "",
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/course`);
      setCourses(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load courses");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/teacher`,
        data,
        { withCredentials: true }
      );
      alert("Staff Added Successfully ✅");
      setData({
        Username: "",
        Password: "",
        Name: "",
        Salary: "",
        Phone: "",
        Email: "",
        Course: "",
        Role: "",
        Gender: "",
      });
    } catch (error) {
      console.error(error);
      alert("Error while adding staff ❌");
    }
  };

  /* ── Field sections config ── */
  const fieldGroups = [
    {
      section: "Account Credentials",
      color: "purple",
      fields: [
        { label: "Username", name: "Username", type: "text",     Icon: UserIcon,       placeholder: "e.g. jane_smith" },
        { label: "Password", name: "Password", type: "password", Icon: LockClosedIcon, placeholder: "Min. 8 characters" },
      ],
    },
    {
      section: "Personal Information",
      color: "cyan",
      fields: [
        { label: "Full Name", name: "Name",   type: "text",  Icon: IdentificationIcon, placeholder: "e.g. Jane Smith" },
        { label: "Phone",     name: "Phone",  type: "text",  Icon: PhoneIcon,          placeholder: "e.g. +91 98765 43210" },
        { label: "Email",     name: "Email",  type: "email", Icon: EnvelopeIcon,       placeholder: "staff@school.edu" },
        { label: "Gender",    name: "Gender", type: "text",  Icon: UsersIcon,          placeholder: "Male / Female / Other" },
      ],
    },
    {
      section: "Professional Details",
      color: "emerald",
      fields: [
        { label: "Role",   name: "Role",   type: "text",   Icon: ShieldCheckIcon,  placeholder: "e.g. Lecturer" },
        { label: "Salary", name: "Salary", type: "number", Icon: CurrencyRupeeIcon,placeholder: "Monthly salary" },
      ],
    },
  ];

  const sectionAccent = {
    purple:  { header: "bg-purple-500/[0.06]",  iconBg: "bg-purple-500/20 border-purple-500/25",  iconColor: "text-purple-400",  label: "text-purple-400/70",  dot: "bg-purple-400" },
    cyan:    { header: "bg-cyan-500/[0.06]",    iconBg: "bg-cyan-500/20 border-cyan-500/25",      iconColor: "text-cyan-400",    label: "text-cyan-400/70",    dot: "bg-cyan-400" },
    emerald: { header: "bg-emerald-500/[0.06]", iconBg: "bg-emerald-500/20 border-emerald-500/25",iconColor: "text-emerald-400", label: "text-emerald-400/70", dot: "bg-emerald-400" },
    indigo:  { header: "bg-indigo-500/[0.06]",  iconBg: "bg-indigo-500/20 border-indigo-500/25",  iconColor: "text-indigo-400",  label: "text-indigo-400/70",  dot: "bg-indigo-400" },
  };

  const fieldWrap =
    "flex items-center gap-3 bg-white/[0.05] border border-white/[0.09] rounded-xl px-4 py-3 focus-within:border-purple-500/50 focus-within:bg-purple-500/[0.06] transition-all duration-200";
  const inputBase =
    "bg-transparent outline-none text-white text-sm w-full placeholder:text-white/25";

  return (
    <div className="min-h-screen bg-[#070B17] text-white relative overflow-hidden">
      {/* Ambient blobs */}
      <div className="pointer-events-none fixed -top-32 -left-32 w-[420px] h-[420px] bg-purple-700/20 rounded-full blur-[160px] z-0" />
      <div className="pointer-events-none fixed -bottom-32 -right-32 w-[420px] h-[420px] bg-cyan-600/15 rounded-full blur-[160px] z-0" />

      <div className="relative z-10 p-4 md:p-8 max-w-[1100px] mx-auto space-y-8">

        {/* ── Page Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Add New Staff</h1>
            <p className="text-[13px] text-white/40 mt-1">
              Register a new staff member by completing all sections below.
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg
            bg-white/[0.04] border border-white/[0.08] text-[12px] text-white/40 self-start">
            <UserPlusIcon className="w-3.5 h-3.5" />
            New Staff Registration
          </div>
        </div>

        {/* ── Main Form Card ── */}
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden
          shadow-[0_0_80px_rgba(0,0,0,0.4)]">

          {/* card banner */}
          <div className="px-6 py-5 border-b border-white/[0.07] bg-emerald-500/[0.04]
            flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600
              flex items-center justify-center shadow-lg shadow-emerald-500/30 shrink-0">
              <UserPlusIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-[16px] font-bold text-white leading-none">Staff Registration Form</h2>
              <p className="text-[12px] text-white/40 mt-1">
                Complete all sections to successfully add a staff member
              </p>
            </div>
            {/* section dots */}
            <div className="ml-auto hidden md:flex items-center gap-2">
              {["purple", "cyan", "emerald", "indigo"].map((c) => (
                <div key={c} className={`w-2 h-2 rounded-full ${sectionAccent[c].dot} opacity-60`} />
              ))}
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-6">

            {/* ── GROUPED FIELD SECTIONS ── */}
            {fieldGroups.map((group) => {
              const a = sectionAccent[group.color];
              return (
                <div key={group.section}
                  className="bg-white/[0.02] border border-white/[0.07] rounded-2xl overflow-hidden">
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

            {/* ── COURSE ENROLLMENT SECTION ── */}
            <div className="bg-white/[0.02] border border-white/[0.07] rounded-2xl overflow-hidden">
              <div className="px-5 py-3.5 border-b border-white/[0.07] bg-indigo-500/[0.05] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-400/70">
                  Course Assignment
                </p>
              </div>

              <div className="p-5">
                <div className="space-y-1.5 max-w-sm">
                  <label className="text-[11px] font-semibold text-white/40 uppercase tracking-widest">
                    Assigned Course
                  </label>
                  <div className={`${fieldWrap} relative`}>
                    <AcademicCapIcon className="w-4 h-4 text-white/30 shrink-0" />
                    <select
                      name="Course"
                      value={data.Course}
                      onChange={handleChange}
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

                {/* selected course confirmation chip */}
                {data.Course && (
                  <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg
                    bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[12px] font-medium">
                    <AcademicCapIcon className="w-3.5 h-3.5" />
                    {courses.find((c) => c._id === data.Course)?.Coursename ?? "Course selected"}
                  </div>
                )}
              </div>
            </div>

            {/* ── PREVIEW STRIP ── */}
            {(data.Name || data.Role || data.Email) && (
              <div className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-5
                flex flex-wrap items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600
                  flex items-center justify-center shrink-0 text-[15px] font-bold shadow-md shadow-emerald-500/20">
                  {data.Name ? data.Name.charAt(0).toUpperCase() : "?"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold text-white truncate">
                    {data.Name || "—"}
                  </p>
                  <p className="text-[12px] text-white/40 truncate">
                    {data.Role || "No role"} · {data.Email || "No email"}
                  </p>
                </div>
                <span className="text-[11px] px-2.5 py-1 rounded-lg
                  bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
                  Preview
                </span>
              </div>
            )}

            {/* ── SUBMIT ── */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4
              pt-4 border-t border-white/[0.07]">
              <p className="text-[12px] text-white/25 hidden sm:block">
                All fields are required unless marked optional.
              </p>
              <button
                onClick={submit}
                className="w-full sm:w-auto px-10 py-3 rounded-xl text-[14px] font-semibold
                  bg-gradient-to-r from-emerald-600 to-teal-600
                  hover:from-emerald-500 hover:to-teal-500
                  active:scale-[0.98] shadow-lg shadow-emerald-500/25
                  transition-all duration-200 flex items-center justify-center gap-2"
              >
                <CheckCircleIcon className="w-5 h-5" />
                Register Staff Member
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Addstaff;