//   import React, { useState } from "react";
// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
//  import Subject from "./Subjects";
//   import Classes from "./Classes"
 

// function Admin() {
//   const [isopen, setisopen] = useState(false);
//   const [active,setactive]=useState("student")

//   return ( <>
//  {/* outerdiv*/}
//   <div className="flex">
//     {/* slidebar*/ }
// <div className={`fixed top-0 left-0 h-full w-60 ${
//     isopen?"translate-x-0":"-translate-x-full"
// } transition-transform duration-300`}>
// <div className="bg-gray-400 w-full">
//     <h3>Admin Panel</h3>
//     <ul className="flex flex-col">
//         <li className="cursor-pointer">home</li>
//         <li onClick={()=>setactive("student")}>course</li>
//         <li onClick={()=>setactive("subject")}>subjects</li>
//         <li>Add Subject</li>
//         <li> Add Student</li>
//         <li>view Attendace</li>
//         <li>student feedback</li>
//         <li>teacher feedback</li>
//         <li>logout</li>
//     </ul>
// </div>
// {isopen&&(<div className="inset-0 fixed bg-black opacity-40" onClick={()=>setisopen(false)}></div>)}
  
// </div>
// <div className="w-full"> 
//  {/* navbar */}
//  <div className="bg-blue-400 h-15 w-full flex p-3 place-content-between">
// <button onClick={()=>setisopen(!isopen)}>
//     {isopen?<Bars3Icon/>:<XMarkIcon/>}
// </button>
// <h1>admin dashord</h1>

//  </div>
//  <div className="pl-60">
     
//     <div className="pl-60 p-4">
 
//   {active === "student" && <Classes />}
//   {active === "subject" && <Subject />}
// </div>

//  </div>
//  </div>
//   </div>
  
//   </>
//   );
// }

// export default Admin;
 
import React, { useEffect, useState } from "react";
import {
  Bars3Icon,
  XMarkIcon,
  BellIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

import Classes from "./Classes";
import Managestudent from "./Adminpannel/Managestudent";
import Addstudent from "./Add-student";
import StudentFeedback from "./Adminpannel/Studentfeedback";
import StaffFeedback from "./Adminpannel/Stafffeedback";
import Addstaff from "./Adminpannel/Addteacher";
import Managestaff from "./Adminpannel/Managestaff";
import Pie from "./Piechart";
import Studentpie from "./Studentpie";
import Subjects from "./Adminpannel/Subjects";
import Exams from "./Adminpannel/Exam";
import Notice from "./Adminpannel/Notice";
import Notify from "./Adminpannel/Notify";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const navItems = [
  { key: "home", label: "Home", icon: "🏠" },
  { key: "classes", label: "Classes", icon: "🏫" },
  { key: "subjects", label: "Subjects", icon: "📚" },
  { key: "addstudent", label: "Add Student", icon: "➕" },
  { key: "managestudent", label: "Manage Students", icon: "👨‍🎓" },
  { key: "addstaff", label: "Add Staff", icon: "👤" },
  { key: "managestaff", label: "Manage Staff", icon: "👥" },
  { key: "exam", label: "Exams", icon: "📝" },
  { key: "studentfeedback", label: "Student Feedback", icon: "💬" },
  { key: "stafffeedback", label: "Staff Feedback", icon: "🗣️" },
  { key: "notice", label: "Notify Students", icon: "📢" },
  { key: "notify", label: "Notifications", icon: "🔔" },
];

function Admin() {
  const [totalcourse, settotalcourse] = useState([]);
  const [total, settotal] = useState([]);
  const [subjectcount, setsubjectcount] = useState([]);
  const [isopen, setisopen] = useState(false);
  const [active, setactive] = useState("home");
  const navigate = useNavigate();

  useEffect(() => {
    fetchstudent();
    fetchcourse();
    fetchsubject();
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/authcheck`, {
        withCredentials: true,
      })
      .catch(() => {
        navigate("/login");
      });
  }, []);

  const fetchsubject = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/subject/stats`,
      { credentials: "include" }
    );
    const data = await res.json();
    console.log(data);
    setsubjectcount(data);
  };

  const fetchstudent = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/stats/type`,
      { credentials: "include" }
    );
    const data = await res.json();
    settotal(data);
    console.log(total);
  };

  const fetchcourse = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/course/stats`,
      { credentials: "include" }
    );
    const sdata = await res.json();
    settotalcourse(sdata);
    console.log(totalcourse);
  };

  const handlelogout = async () => {
    axios.post(
      `${import.meta.env.VITE_API_URL}/api/logout`,
      {},
      { withCredentials: true }
    );
    navigate("/login");
  };

  const activeLabel =
    navItems.find((i) => i.key === active)?.label ||
    (active === "home" ? "Dashboard" : active);

  return (
    <div className="min-h-screen bg-[#080C1A] text-white relative overflow-hidden font-sans">
      {/* Ambient blobs */}
      <div className="pointer-events-none fixed top-[-120px] left-[-120px] w-[480px] h-[480px] bg-purple-700/20 rounded-full blur-[160px] z-0" />
      <div className="pointer-events-none fixed bottom-[-120px] right-[-120px] w-[480px] h-[480px] bg-cyan-500/15 rounded-full blur-[160px] z-0" />
      <div className="pointer-events-none fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-600/10 rounded-full blur-[180px] z-0" />

      {/* ──────────── SIDEBAR ──────────── */}
      <aside
        className={`fixed top-0 left-0 h-screen w-72 flex flex-col
          bg-white/[0.04] backdrop-blur-3xl border-r border-white/[0.08]
          shadow-[4px_0_40px_rgba(0,0,0,0.5)]
          transition-transform duration-300 ease-in-out z-50
          ${isopen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Brand */}
        <div className="px-6 py-7 border-b border-white/[0.07] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <span className="text-sm font-bold">A</span>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight leading-none">
                Admin<span className="text-purple-400">Panel</span>
              </h1>
              <p className="text-[11px] text-white/40 mt-0.5 tracking-widest uppercase">
                Control Center
              </p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 scrollbar-thin scrollbar-thumb-white/10">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                setactive(item.key);
                setisopen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium
                transition-all duration-200 text-left group
                ${
                  active === item.key
                    ? "bg-purple-600/30 border border-purple-500/50 text-white shadow-lg shadow-purple-500/10"
                    : "text-white/60 hover:text-white hover:bg-white/[0.06] border border-transparent hover:border-white/10 hover:translate-x-0.5"
                }`}
            >
              <span
                className={`text-base transition-transform duration-200 group-hover:scale-110 ${
                  active === item.key ? "scale-110" : ""
                }`}
              >
                {item.icon}
              </span>
              <span>{item.label}</span>
              {active === item.key && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-400" />
              )}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 pb-5 pt-3 border-t border-white/[0.07] shrink-0">
          <button
            onClick={handlelogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium
              text-red-400/80 hover:text-red-400 hover:bg-red-500/10 border border-transparent
              hover:border-red-500/20 transition-all duration-200"
          >
            <span className="text-base">🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {isopen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setisopen(false)}
        />
      )}

      {/* ──────────── MAIN ──────────── */}
      <div
        className={`relative z-10 min-h-screen flex flex-col transition-all duration-300 ${
          isopen ? "lg:ml-72" : "ml-0"
        }`}
      >
        {/* NAVBAR */}
        <header
          className="h-16 px-4 md:px-8 flex items-center justify-between
            bg-white/[0.03] backdrop-blur-2xl border-b border-white/[0.08]
            sticky top-0 z-40 gap-4"
        >
          {/* Left */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setisopen(!isopen)}
              className="p-2 rounded-xl hover:bg-white/10 border border-transparent hover:border-white/10 transition-all duration-200"
            >
              {isopen ? (
                <XMarkIcon className="h-5 w-5" />
              ) : (
                <Bars3Icon className="h-5 w-5" />
              )}
            </button>
            <div>
              <h2 className="text-base font-semibold leading-none text-white">
                {activeLabel === "home" ? "Dashboard" : activeLabel}
              </h2>
              <p className="text-[11px] text-white/40 mt-0.5">
                Admin Panel
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            {/* Search — hidden on mobile */}
            <div className="hidden md:flex items-center gap-2 bg-white/[0.06] border border-white/10 rounded-xl px-3 py-2 w-56 focus-within:border-purple-500/50 focus-within:bg-white/[0.08] transition-all duration-200">
              <MagnifyingGlassIcon className="h-4 w-4 text-white/40 shrink-0" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none text-white text-sm w-full placeholder:text-white/30"
              />
            </div>

            {/* Bell */}
            <button className="relative p-2.5 rounded-xl bg-white/[0.06] border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200">
              <BellIcon className="h-4.5 w-4.5 text-white/70" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-purple-500 rounded-full" />
            </button>

            {/* Avatar */}
            <div className="flex items-center gap-2.5 pl-3 border-l border-white/10">
              <img
                src="https://i.pravatar.cc/100"
                className="w-8 h-8 rounded-full border border-purple-500/60 shadow-lg shadow-purple-500/20"
                alt="Admin avatar"
              />
              <div className="hidden md:block">
                <p className="text-sm font-semibold leading-none">Admin</p>
                <p className="text-[11px] text-white/40 mt-0.5">
                  Administrator
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-4 md:p-8 space-y-8 overflow-y-auto">
          {active === "home" && (
            <div className="flex flex-col gap-8">

              {/* STATS CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                {/* Students */}
                <div className="relative overflow-hidden bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl p-6
                  hover:border-cyan-500/40 hover:bg-white/[0.07] hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(34,211,238,0.15)]
                  transition-all duration-300 group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all" />
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-medium text-white/40 uppercase tracking-widest mb-2">
                        Total Students
                      </p>
                      <h2 className="text-4xl font-bold text-cyan-400 tabular-nums">
                        {total.Student ?? "—"}
                      </h2>
                    </div>
                    <div className="w-11 h-11 rounded-xl bg-cyan-500/15 border border-cyan-500/20 flex items-center justify-center text-xl">
                      👨‍🎓
                    </div>
                  </div>
                  <div className="mt-4 h-px bg-gradient-to-r from-cyan-500/30 to-transparent" />
                </div>

                {/* Staff */}
                <div className="relative overflow-hidden bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl p-6
                  hover:border-emerald-500/40 hover:bg-white/[0.07] hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(52,211,153,0.15)]
                  transition-all duration-300 group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all" />
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-medium text-white/40 uppercase tracking-widest mb-2">
                        Total Staff
                      </p>
                      <h2 className="text-4xl font-bold text-emerald-400 tabular-nums">
                        {total.Teachers ?? "—"}
                      </h2>
                    </div>
                    <div className="w-11 h-11 rounded-xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center text-xl">
                      👩‍🏫
                    </div>
                  </div>
                  <div className="mt-4 h-px bg-gradient-to-r from-emerald-500/30 to-transparent" />
                </div>

                {/* Subjects */}
                <div className="relative overflow-hidden bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl p-6
                  hover:border-orange-500/40 hover:bg-white/[0.07] hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(251,146,60,0.15)]
                  transition-all duration-300 group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl group-hover:bg-orange-500/20 transition-all" />
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-medium text-white/40 uppercase tracking-widest mb-2">
                        Total Subjects
                      </p>
                      <h2 className="text-4xl font-bold text-orange-400 tabular-nums">
                        {subjectcount ?? "—"}
                      </h2>
                    </div>
                    <div className="w-11 h-11 rounded-xl bg-orange-500/15 border border-orange-500/20 flex items-center justify-center text-xl">
                      📚
                    </div>
                  </div>
                  <div className="mt-4 h-px bg-gradient-to-r from-orange-500/30 to-transparent" />
                </div>

                {/* Courses */}
                <div className="relative overflow-hidden bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl p-6
                  hover:border-rose-500/40 hover:bg-white/[0.07] hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(244,63,94,0.15)]
                  transition-all duration-300 group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/10 rounded-full blur-2xl group-hover:bg-rose-500/20 transition-all" />
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-medium text-white/40 uppercase tracking-widest mb-2">
                        Total Courses
                      </p>
                      <h2 className="text-4xl font-bold text-rose-400 tabular-nums">
                        {totalcourse ?? "—"}
                      </h2>
                    </div>
                    <div className="w-11 h-11 rounded-xl bg-rose-500/15 border border-rose-500/20 flex items-center justify-center text-xl">
                      🎓
                    </div>
                  </div>
                  <div className="mt-4 h-px bg-gradient-to-r from-rose-500/30 to-transparent" />
                </div>
              </div>

              {/* CHARTS */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl p-6
                  hover:border-white/20 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-5">
                    <span className="text-base">📊</span>
                    <h3 className="text-sm font-semibold text-white/90 uppercase tracking-widest">
                      Students Overview
                    </h3>
                  </div>
                  <Pie />
                </div>

                <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl p-6
                  hover:border-white/20 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-5">
                    <span className="text-base">👥</span>
                    <h3 className="text-sm font-semibold text-white/90 uppercase tracking-widest">
                      Gender Distribution
                    </h3>
                  </div>
                  <Studentpie />
                </div>
              </div>

              {/* NOTICE BOARD */}
              <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl p-6
                hover:border-purple-500/30 hover:shadow-[0_4px_40px_rgba(168,85,247,0.08)]
                transition-all duration-300">
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-base">📋</span>
                  <h3 className="text-sm font-semibold text-white/90 uppercase tracking-widest">
                    Notice Board
                  </h3>
                </div>
                <Notice />
              </div>
            </div>
          )}

          {active === "classes" && <Classes />}
          {active === "subjects" && <Subjects />}
          {active === "addstudent" && <Addstudent />}
          {active === "managestudent" && <Managestudent />}
          {active === "addstaff" && <Addstaff />}
          {active === "managestaff" && <Managestaff />}
          {active === "studentfeedback" && <StudentFeedback />}
          {active === "stafffeedback" && <StaffFeedback />}
          {active === "exam" && <Exams />}
          {active === "notice" && <Notice />}
          {active === "notify" && <Notify />}
        </main>
      </div>
    </div>
  );
}

export default Admin;