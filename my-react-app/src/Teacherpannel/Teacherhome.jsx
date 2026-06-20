 // TeacherDashboard.jsx
import React, { useState, useEffect } from "react";
import Pie from "/src/Piechart";
import {
  Bars3Icon,
  XMarkIcon,
  ClipboardDocumentCheckIcon,
  AcademicCapIcon,
  UserGroupIcon,
  ChartBarIcon,
  ArrowRightOnRectangleIcon,
  MegaphoneIcon,
  HomeIcon,
  ChevronRightIcon,
  BookOpenIcon,
  UsersIcon,
  ClipboardDocumentListIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import Attendance from "./Attandance";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Marks from "./Marks";
import Mystudent from "./Mystudents";
import Notice from "../Adminpannel/Notice";

/* ── Nav config ── */
const navItems = [
  { key: "dashboard",  label: "Dashboard",   Icon: HomeIcon },
  { key: "attendance", label: "Attendance",   Icon: ClipboardDocumentCheckIcon },
  { key: "marks",      label: "Marks Entry",  Icon: ChartBarIcon },
  { key: "mystudent",  label: "My Students",  Icon: UserGroupIcon },
];

/* ── Stat card ── */
const StatCard = ({ title, value, Icon, colorClass, glowColor, borderColor, textColor, iconBg }) => (
  <div
    className={`relative overflow-hidden group bg-gradient-to-br ${colorClass}
      border ${borderColor} rounded-2xl p-5
      hover:-translate-y-1 transition-all duration-300 cursor-default
      hover:shadow-[0_16px_48px_var(--glow)]`}
    style={{ "--glow": glowColor }}
  >
    <div className={`absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl
      bg-gradient-to-br ${colorClass} opacity-50 group-hover:opacity-80 transition-opacity`} />
    <div className="relative flex items-start justify-between gap-3">
      <div>
        <p className="text-[11px] font-semibold text-white/40 uppercase tracking-[0.18em] mb-2">
          {title}
        </p>
        <p className={`text-3xl font-bold tabular-nums leading-none ${textColor}`}>{value}</p>
      </div>
      <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${iconBg}`}>
        <Icon className={`w-5 h-5 ${textColor}`} />
      </div>
    </div>
    <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r ${colorClass}`} />
  </div>
);

/* ════════════════════════════════════════════════════════════════ */
function TeacherDashboard() {
  const [open, setOpen] = useState(true);
  const [page, setPage] = useState("dashboard");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/authcheck`, { withCredentials: true })
      .catch(() => navigate("/login"));
  }, []);

  const handlelogout = async () => {
    axios.post(`${import.meta.env.VITE_API_URL}/api/logout`, {}, { withCredentials: true });
    navigate("/login");
  };

  const handleNav = (key) => { setPage(key); setOpen(false); };
  const activeLabel = navItems.find((i) => i.key === page)?.label ?? "Dashboard";

  const stats = [
    { title: "Total Classes",       value: "6",    Icon: BookOpenIcon,             colorClass: "from-purple-500/20 to-purple-600/5", glowColor: "rgba(168,85,247,0.18)",  borderColor: "border-purple-500/25", textColor: "text-purple-300",  iconBg: "bg-purple-500/15 border-purple-500/25" },
    { title: "Students",            value: "120",  Icon: UsersIcon,                colorClass: "from-blue-500/20 to-blue-600/5",    glowColor: "rgba(59,130,246,0.18)",   borderColor: "border-blue-500/25",   textColor: "text-blue-300",    iconBg: "bg-blue-500/15 border-blue-500/25" },
    { title: "Subjects",            value: "3",    Icon: ClipboardDocumentListIcon, colorClass: "from-emerald-500/20 to-emerald-600/5",glowColor:"rgba(52,211,153,0.18)", borderColor: "border-emerald-500/25",textColor: "text-emerald-300", iconBg: "bg-emerald-500/15 border-emerald-500/25" },
    { title: "Today's Attendance",  value: "85%",  Icon: ChartBarIcon,             colorClass: "from-orange-500/20 to-orange-600/5",glowColor: "rgba(251,146,60,0.18)",   borderColor: "border-orange-500/25", textColor: "text-orange-300",  iconBg: "bg-orange-500/15 border-orange-500/25" },
  ];

  const recentActivity = [
    { text: "Attendance marked for BCA Sem 3",  Icon: ClipboardDocumentCheckIcon, color: "text-emerald-400", bg: "bg-emerald-500/15 border-emerald-500/25" },
    { text: "Internal marks uploaded",           Icon: ChartBarIcon,              color: "text-blue-400",    bg: "bg-blue-500/15 border-blue-500/25" },
    { text: "Exam results updated",              Icon: CheckCircleIcon,            color: "text-purple-400",  bg: "bg-purple-500/15 border-purple-500/25" },
  ];

  return (
    <div className="min-h-screen bg-[#070B17] text-white flex overflow-hidden">

      {/* ░░ AMBIENT ░░ */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-purple-700/20 rounded-full blur-[180px]" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-cyan-600/15 rounded-full blur-[180px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-700/10 rounded-full blur-[200px]" />
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.3) 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }} />
      </div>

      {/* ░░░░░░░░░░░░ SIDEBAR ░░░░░░░░░░░░ */}
      <aside className={`
        fixed lg:sticky lg:top-0 top-0 left-0 z-50
        h-screen w-[260px] shrink-0 flex flex-col
        bg-[#0D1221]/90 backdrop-blur-2xl
        border-r border-white/[0.07]
        shadow-[6px_0_60px_rgba(0,0,0,0.6)]
        transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        {/* Brand */}
        <div className="px-5 py-5 border-b border-white/[0.06] shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-indigo-700 rounded-2xl shadow-lg shadow-purple-500/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <AcademicCapIcon className="w-5 h-5 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-[25px] font-bold tracking-tight text-white leading-none">
                Teacher<span className="text-purple-400">Panel</span>
              </h2>
              <p className="text-[10px] text-white/35 mt-1 tracking-[0.2em] uppercase font-medium">
                Academic Portal
              </p>
            </div>
          </div>
        </div>

        {/* Teacher mini-profile */}
        <div className="mx-3 mt-4 flex items-center gap-3 px-3 py-3 rounded-xl
          bg-purple-500/[0.08] border border-purple-500/20">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600
            flex items-center justify-center text-[13px] font-bold shrink-0 shadow-md">
            T
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold text-white truncate leading-none">Teacher</p>
            <p className="text-[10px] text-white/35 mt-0.5">Faculty Member</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5
          [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-white/10">
          {navItems.map(({ key, label, Icon }) => {
            const isActive = page === key;
            return (
              <button key={key} onClick={() => handleNav(key)}
                className={`group w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                  text-[13px] font-medium transition-all duration-150 text-left
                  ${isActive
                    ? "bg-purple-600/25 text-white border border-purple-500/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                    : "text-white/50 hover:text-white/90 hover:bg-white/[0.05] border border-transparent"
                  }`}>
                <span className={`flex items-center justify-center w-7 h-7 rounded-lg shrink-0
                  transition-all duration-150
                  ${isActive
                    ? "bg-purple-500/30 text-purple-300"
                    : "bg-white/[0.05] text-white/40 group-hover:bg-white/[0.09] group-hover:text-white/70"
                  }`}>
                  <Icon className="w-4 h-4" />
                </span>
                <span className="flex-1">{label}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 pb-5 pt-3 border-t border-white/[0.06] shrink-0">
          <button onClick={handlelogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
              text-[13px] font-medium text-red-400/70
              hover:text-red-400 hover:bg-red-500/10 border border-transparent
              hover:border-red-500/20 transition-all duration-150">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-white/[0.05] shrink-0">
              <ArrowRightOnRectangleIcon className="w-4 h-4" />
            </span>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Overlay mobile */}
      {open && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)} />
      )}

      {/* ░░░░░░░░░░░░ MAIN ░░░░░░░░░░░░ */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10 overflow-hidden">

        {/* ── TOP BAR ── */}
        <header className="h-16 px-4 md:px-6 flex items-center justify-between gap-4
          bg-[#0A0F1E]/80 backdrop-blur-2xl border-b border-white/[0.07] sticky top-0 z-30 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <button onClick={() => setOpen(!open)}
              className="lg:hidden p-2 rounded-xl hover:bg-white/[0.08] border border-transparent
                hover:border-white/10 transition-all duration-150 shrink-0">
              {open ? <XMarkIcon className="w-5 h-5" /> : <Bars3Icon className="w-5 h-5" />}
            </button>
            <div className="flex items-center gap-1.5 text-[13px] text-white/40 min-w-0">
              <span className="hidden sm:inline">Teacher</span>
              <ChevronRightIcon className="hidden sm:inline w-3 h-3 shrink-0" />
              <span className="font-semibold text-white truncate">{activeLabel}</span>
            </div>
          </div>

          {/* avatar */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="hidden sm:block text-right">
              <p className="text-[13px] font-semibold leading-none">Teacher</p>
              <p className="text-[10px] text-white/35 mt-0.5">Faculty Member</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600
              flex items-center justify-center text-[12px] font-bold shadow-md shadow-purple-500/20
              border border-purple-400/30">
              T
            </div>
          </div>
        </header>

        {/* ── PAGE ── */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8
          [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-white/10">

          {/* ════ DASHBOARD ════ */}
          {page === "dashboard" && (
            <div className="space-y-6 max-w-[1400px] mx-auto">

              {/* heading */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold tracking-tight">Welcome back 👋</h2>
                  <p className="text-[13px] text-white/40 mt-0.5">
                    Here's your teaching overview for today.
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
                {stats.map((s) => <StatCard key={s.title} {...s} />)}
              </div>

              {/* ── CHART + NOTICE ── */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5
                  hover:border-white/[0.14] transition-all duration-300">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-[13px] font-semibold text-white/80">Student Overview</h3>
                    <span className="text-[11px] text-white/30 px-2 py-1 rounded-lg
                      bg-white/[0.04] border border-white/[0.07]">This term</span>
                  </div>
                  <Pie />
                </div>

                <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5
                  hover:border-purple-500/25 transition-all duration-300">
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

              {/* ── RECENT ACTIVITY ── */}
              <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden">
                <div className="px-6 py-4 border-b border-white/[0.07] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  <p className="text-[12px] font-semibold text-white/50 uppercase tracking-widest">
                    Recent Activity
                  </p>
                </div>
                <div className="p-5 space-y-3">
                  {recentActivity.map(({ text, Icon, color, bg }, i) => (
                    <div key={i}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl
                        bg-white/[0.02] border border-white/[0.06]
                        hover:bg-white/[0.05] hover:border-white/[0.10]
                        transition-all duration-150">
                      <div className={`w-8 h-8 rounded-lg border flex items-center
                        justify-center shrink-0 ${bg}`}>
                        <Icon className={`w-4 h-4 ${color}`} />
                      </div>
                      <span className="text-[13px] text-white/70">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ════ SUB PAGES ════ */}
          {page !== "dashboard" && (
            <div className="max-w-[1400px] mx-auto">
              <div className="mb-6">
                <div className="flex items-center gap-2 text-white/30 text-[12px] mb-1">
                  <button onClick={() => setPage("dashboard")}
                    className="hover:text-white/60 transition-colors">Dashboard</button>
                  <ChevronRightIcon className="w-3 h-3" />
                  <span className="text-white/70 font-medium">{activeLabel}</span>
                </div>
                <h2 className="text-xl font-bold text-white tracking-tight">{activeLabel}</h2>
              </div>

              <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl
                overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.3)]">
                <div className="p-5 md:p-7">
                  {page === "attendance" && <Attendance />}
                  {page === "marks"      && <Marks />}
                  {page === "mystudent"  && <Mystudent />}
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

export default TeacherDashboard;