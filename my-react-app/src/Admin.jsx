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
  HomeIcon,
  AcademicCapIcon,
  BookOpenIcon,
  UserPlusIcon,
  UsersIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
  ChatBubbleLeftRightIcon,
  ChatBubbleBottomCenterTextIcon,
  MegaphoneIcon,
  BellAlertIcon,
  ArrowRightOnRectangleIcon,
  ChevronRightIcon,
  BuildingLibraryIcon,
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

/* ─── Nav config ─────────────────────────────────────────────── */
const navGroups = [
  {
    label: "Overview",
    items: [{ key: "home", label: "Dashboard", Icon: HomeIcon }],
  },
  {
    label: "Academic",
    items: [
      { key: "classes",  label: "Classes",  Icon: BuildingLibraryIcon },
      { key: "subjects", label: "Subjects", Icon: BookOpenIcon },
      { key: "exam",     label: "Exams",    Icon: ClipboardDocumentListIcon },
    ],
  },
  {
    label: "Students",
    items: [
      { key: "addstudent",    label: "Add Student",     Icon: UserPlusIcon },
      { key: "managestudent", label: "Manage Students", Icon: AcademicCapIcon },
    ],
  },
  {
    label: "Staff",
    items: [
      { key: "addstaff",   label: "Add Staff",    Icon: UserPlusIcon },
      { key: "managestaff",label: "Manage Staff", Icon: UserGroupIcon },
    ],
  },
  {
    label: "Communication",
    items: [
      { key: "studentfeedback", label: "Student Feedback", Icon: ChatBubbleLeftRightIcon },
      { key: "stafffeedback",   label: "Staff Feedback",   Icon: ChatBubbleBottomCenterTextIcon },
      { key: "notice",          label: "Notify Students",  Icon: MegaphoneIcon },
      { key: "notify",          label: "Notifications",    Icon: BellAlertIcon },
    ],
  },
];

const allNavItems = navGroups.flatMap((g) => g.items);

/* ─── Stat card data builder ──────────────────────────────────── */
function buildStats(total, subjectcount, totalcourse) {
  return [
    {
      label: "Total Students",
      value: total.Student ?? "—",
      Icon: AcademicCapIcon,
      color: "cyan",
      ring: "rgba(34,211,238,0.18)",
      bg: "from-cyan-500/20 to-cyan-600/5",
      border: "border-cyan-500/25",
      text: "text-cyan-300",
      iconBg: "bg-cyan-500/15 border-cyan-500/25",
      trend: "+4.2%",
      trendUp: true,
    },
    {
      label: "Total Staff",
      value: total.Teachers ?? "—",
      Icon: UsersIcon,
      color: "emerald",
      ring: "rgba(52,211,153,0.18)",
      bg: "from-emerald-500/20 to-emerald-600/5",
      border: "border-emerald-500/25",
      text: "text-emerald-300",
      iconBg: "bg-emerald-500/15 border-emerald-500/25",
      trend: "+1.8%",
      trendUp: true,
    },
    {
      label: "Total Subjects",
      value: subjectcount ?? "—",
      Icon: BookOpenIcon,
      color: "violet",
      ring: "rgba(167,139,250,0.18)",
      bg: "from-violet-500/20 to-violet-600/5",
      border: "border-violet-500/25",
      text: "text-violet-300",
      iconBg: "bg-violet-500/15 border-violet-500/25",
      trend: "Stable",
      trendUp: null,
    },
    {
      label: "Total Courses",
      value: totalcourse ?? "—",
      Icon: BuildingLibraryIcon,
      color: "amber",
      ring: "rgba(251,191,36,0.18)",
      bg: "from-amber-500/20 to-amber-600/5",
      border: "border-amber-500/25",
      text: "text-amber-300",
      iconBg: "bg-amber-500/15 border-amber-500/25",
      trend: "+2 new",
      trendUp: true,
    },
  ];
}

/* ════════════════════════════════════════════════════════════════ */
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
      .get(`${import.meta.env.VITE_API_URL}/api/authcheck`, { withCredentials: true })
      .catch(() => navigate("/login"));
  }, []);

  const fetchsubject = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/subject/stats`, { credentials: "include" });
    const data = await res.json();
    console.log(data);
    setsubjectcount(data);
  };

  const fetchstudent = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/stats/type`, { credentials: "include" });
    const data = await res.json();
    settotal(data);
    console.log(total);
  };

  const fetchcourse = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/course/stats`, { credentials: "include" });
    const sdata = await res.json();
    settotalcourse(sdata);
    console.log(totalcourse);
  };

  const handlelogout = async () => {
    axios.post(`${import.meta.env.VITE_API_URL}/api/logout`, {}, { withCredentials: true });
    navigate("/login");
  };

  const activeLabel = allNavItems.find((i) => i.key === active)?.label ?? "Dashboard";
  const stats = buildStats(total, subjectcount, totalcourse);

  /* ── nav handler ── */
  const handleNav = (key) => {
    setactive(key);
    setisopen(false);
  };

  return (
    <div className="min-h-screen bg-[#070B17] text-white flex overflow-hidden">

      {/* ░░ AMBIENT LAYER ░░ */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[560px] h-[560px] bg-purple-700/20 rounded-full blur-[180px]" />
        <div className="absolute -bottom-40 -right-40 w-[560px] h-[560px] bg-cyan-600/15 rounded-full blur-[180px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-indigo-700/10 rounded-full blur-[200px]" />
        {/* subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.3) 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* ░░░░░░░░░░░░░░ SIDEBAR ░░░░░░░░░░░░░░ */}
      {/* Desktop: always visible; Mobile: drawer */}
      <aside
        className={`
          fixed lg:sticky lg:top-0 top-0 left-0 z-50
          h-screen w-[260px] shrink-0
          flex flex-col
          bg-[#0D1221]/90 backdrop-blur-2xl
          border-r border-white/[0.07]
          shadow-[6px_0_60px_rgba(0,0,0,0.6)]
          transition-transform duration-300 ease-in-out
          ${isopen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Brand */}
        <div className="px-5 py-5 border-b border-white/[0.06] shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-indigo-700 rounded-2xl shadow-lg shadow-purple-500/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <AcademicCapIcon className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="overflow-hidden">
              <h1 className="text-[15px] font-bold tracking-tight text-white leading-none">
                Admin<span className="text-purple-400">Panel</span>
              </h1>
              <p className="text-[10px] text-white/35 mt-1 tracking-[0.2em] uppercase font-medium">
                School Management
              </p>
            </div>
          </div>
        </div>

        {/* Nav groups */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-4
          [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-white/10">
          {navGroups.map((group) => (
            <div key={group.label}>
              <p className="px-3 mb-1.5 text-[9px] font-semibold text-white/25 uppercase tracking-[0.22em]">
                {group.label}
              </p>
              <div className="space-y-0.5">
                {group.items.map(({ key, label, Icon }) => {
                  const isActive = active === key;
                  return (
                    <button
                      key={key}
                      onClick={() => handleNav(key)}
                      className={`
                        group w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                        text-[13px] font-medium transition-all duration-150 text-left
                        ${isActive
                          ? "bg-purple-600/25 text-white border border-purple-500/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                          : "text-white/50 hover:text-white/90 hover:bg-white/[0.05] border border-transparent"
                        }
                      `}
                    >
                      {/* icon container */}
                      <span className={`
                        flex items-center justify-center w-7 h-7 rounded-lg shrink-0
                        transition-all duration-150
                        ${isActive
                          ? "bg-purple-500/30 text-purple-300"
                          : "bg-white/[0.05] text-white/40 group-hover:bg-white/[0.09] group-hover:text-white/70"
                        }
                      `}>
                        <Icon className="w-4 h-4" />
                      </span>
                      <span className="flex-1">{label}</span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* User card + logout */}
        <div className="px-3 py-4 border-t border-white/[0.06] shrink-0 space-y-2">
          {/* mini profile */}
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06]">
            <img
              src="https://i.pravatar.cc/100"
              alt="Admin"
              className="w-8 h-8 rounded-full border border-purple-500/50 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold leading-none text-white truncate">Administrator</p>
              <p className="text-[10px] text-white/35 mt-0.5 truncate">admin@school.edu</p>
            </div>
          </div>
          {/* logout */}
          <button
            onClick={handlelogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
              text-[13px] font-medium text-red-400/70
              hover:text-red-400 hover:bg-red-500/10 border border-transparent
              hover:border-red-500/20 transition-all duration-150"
          >
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-white/[0.05] shrink-0">
              <ArrowRightOnRectangleIcon className="w-4 h-4" />
            </span>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Overlay (mobile) */}
      {isopen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setisopen(false)}
        />
      )}

      {/* ░░░░░░░░░░░░░░ MAIN AREA ░░░░░░░░░░░░░░ */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10 overflow-hidden">

        {/* ── TOP BAR ── */}
        <header className="h-16 px-4 md:px-6 flex items-center justify-between gap-4
          bg-[#0A0F1E]/80 backdrop-blur-2xl border-b border-white/[0.07] sticky top-0 z-30 shrink-0">

          {/* Left */}
          <div className="flex items-center gap-3 min-w-0">
            {/* hamburger */}
            <button
              onClick={() => setisopen(!isopen)}
              className="lg:hidden p-2 rounded-xl hover:bg-white/[0.08] border border-transparent
                hover:border-white/10 transition-all duration-150 shrink-0"
            >
              {isopen
                ? <XMarkIcon className="w-5 h-5" />
                : <Bars3Icon className="w-5 h-5" />
              }
            </button>

            {/* breadcrumb */}
            <div className="flex items-center gap-1.5 text-white/40 text-[13px] min-w-0">
              <span className="hidden sm:inline">Admin</span>
              <ChevronRightIcon className="hidden sm:inline w-3 h-3 shrink-0" />
              <span className="font-semibold text-white truncate">{activeLabel}</span>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2 shrink-0">
            {/* search */}
            <label className="hidden md:flex items-center gap-2 bg-white/[0.05] hover:bg-white/[0.08]
              border border-white/[0.08] hover:border-white/[0.14] rounded-xl px-3 py-2
              focus-within:border-purple-500/50 focus-within:bg-purple-500/[0.06]
              transition-all duration-200 cursor-text w-52">
              <MagnifyingGlassIcon className="w-4 h-4 text-white/35 shrink-0" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none text-white text-[13px] w-full placeholder:text-white/30"
              />
            </label>

            {/* bell */}
            <button className="relative p-2.5 rounded-xl bg-white/[0.05] border border-white/[0.08]
              hover:bg-white/[0.09] hover:border-white/[0.15] transition-all duration-150">
              <BellIcon className="w-4.5 h-4.5 text-white/60" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-purple-500
                ring-2 ring-[#0A0F1E]" />
            </button>

            {/* divider */}
            <div className="w-px h-7 bg-white/[0.08] mx-1 hidden sm:block" />

            {/* avatar */}
            <div className="flex items-center gap-2.5 hidden sm:flex">
              <img
                src="https://i.pravatar.cc/100"
                alt="Admin"
                className="w-8 h-8 rounded-full border border-purple-500/50 shadow-md shadow-purple-500/20"
              />
              <div>
                <p className="text-[13px] font-semibold leading-none">Admin</p>
                <p className="text-[10px] text-white/35 mt-0.5">Administrator</p>
              </div>
            </div>
          </div>
        </header>

        {/* ── PAGE ── */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8
          [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-white/10">

          {/* ════ HOME / DASHBOARD ════ */}
          {active === "home" && (
            <div className="space-y-6 max-w-[1400px] mx-auto">

              {/* Page heading */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">Dashboard</h2>
                  <p className="text-[13px] text-white/40 mt-0.5">
                    Welcome back — here's what's happening today.
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg
                  bg-white/[0.04] border border-white/[0.08] text-[12px] text-white/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live data
                </div>
              </div>

              {/* ── STAT CARDS ── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {stats.map(({ label, value, Icon, ring, bg, border, text, iconBg, trend, trendUp }) => (
                  <div
                    key={label}
                    className={`
                      relative overflow-hidden group
                      bg-gradient-to-br ${bg}
                      border ${border}
                      rounded-2xl p-5
                      hover:-translate-y-1 hover:shadow-[0_16px_48px_var(--ring)]
                      transition-all duration-300 cursor-default
                    `}
                    style={{ "--ring": ring }}
                  >
                    {/* glow orb */}
                    <div className={`absolute -top-6 -right-6 w-28 h-28 rounded-full blur-2xl
                      bg-gradient-to-br ${bg} opacity-60 group-hover:opacity-100 transition-opacity`} />

                    <div className="relative flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-semibold text-white/40 uppercase tracking-[0.18em] leading-none mb-3">
                          {label}
                        </p>
                        <p className={`text-4xl font-bold tabular-nums leading-none ${text}`}>
                          {value}
                        </p>
                        <div className="mt-3 flex items-center gap-1.5">
                          <span className={`text-[11px] font-medium px-1.5 py-0.5 rounded-md
                            ${trendUp === true  ? "text-emerald-400 bg-emerald-500/15"
                            : trendUp === false ? "text-red-400 bg-red-500/15"
                            :                    "text-white/30 bg-white/[0.06]"}`}>
                            {trend}
                          </span>
                          <span className="text-[11px] text-white/25">vs last month</span>
                        </div>
                      </div>
                      <div className={`w-11 h-11 rounded-xl border ${iconBg} flex items-center justify-center shrink-0`}>
                        <Icon className={`w-5 h-5 ${text}`} />
                      </div>
                    </div>

                    {/* bottom accent line */}
                    <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r ${bg}`} />
                  </div>
                ))}
              </div>

              {/* ── CHARTS ── */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {[
                  { title: "Students Overview", Sub: Pie },
                  { title: "Gender Distribution", Sub: Studentpie },
                ].map(({ title, Sub }) => (
                  <div
                    key={title}
                    className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5
                      hover:border-white/[0.14] hover:bg-white/[0.05] transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="text-[13px] font-semibold text-white/80">{title}</h3>
                      <span className="text-[11px] text-white/30 px-2 py-1 rounded-lg bg-white/[0.04]
                        border border-white/[0.07]">This term</span>
                    </div>
                    <Sub />
                  </div>
                ))}
              </div>

              {/* ── NOTICE BOARD ── */}
              <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5
                hover:border-purple-500/25 hover:bg-white/[0.05] transition-all duration-300">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-[13px] font-semibold text-white/80">Notice Board</h3>
                  <span className="inline-flex items-center gap-1.5 text-[11px] text-purple-400/80
                    px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <MegaphoneIcon className="w-3 h-3" />
                    Announcements
                  </span>
                </div>
                <Notice />
              </div>

            </div>
          )}

          {/* ════ OTHER PAGES ════ */}
          {active !== "home" && (
            <div className="max-w-[1400px] mx-auto">
              {/* sub-page header strip */}
              <div className="mb-6">
                <div className="flex items-center gap-2 text-white/30 text-[12px] mb-1">
                  <button onClick={() => setactive("home")}
                    className="hover:text-white/60 transition-colors">Dashboard</button>
                  <ChevronRightIcon className="w-3 h-3" />
                  <span className="text-white/70 font-medium">{activeLabel}</span>
                </div>
                <h2 className="text-xl font-bold text-white tracking-tight">{activeLabel}</h2>
              </div>

              {/* content card wrapper */}
              <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl
                overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.3)]">
                <div className="p-5 md:p-7">
                  {active === "classes"         && <Classes />}
                  {active === "subjects"        && <Subjects />}
                  {active === "addstudent"      && <Addstudent />}
                  {active === "managestudent"   && <Managestudent />}
                  {active === "addstaff"        && <Addstaff />}
                  {active === "managestaff"     && <Managestaff />}
                  {active === "studentfeedback" && <StudentFeedback />}
                  {active === "stafffeedback"   && <StaffFeedback />}
                  {active === "exam"            && <Exams />}
                  {active === "notice"          && <Notice />}
                  {active === "notify"          && <Notify />}
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

export default Admin;