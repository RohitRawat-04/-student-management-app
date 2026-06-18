 import React, { useEffect, useState } from "react";
import {
  ClipboardDocumentListIcon,
  PlusCircleIcon,
  CalendarDaysIcon,
  BookOpenIcon,
  AcademicCapIcon,
  CheckCircleIcon,
  TrophyIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";

function Exam() {
  const [courses, setCourses] = useState([]);
  const [exams, setExams] = useState([]);
  const [search, setSearch] = useState("");

  const [exam, setExam] = useState({
    Examname: "",
    Date: "",
    Subject: "",
    Course: "",
    Semester: "",
    TotalMarks: "",
  });

  useEffect(() => {
    fetchCourses();
    fetchExams();
  }, []);

  const fetchCourses = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/course`);
    const data = await res.json();
    setCourses(data);
  };

  const fetchExams = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/exam`);
    const data = await res.json();
    console.log(data);
    setExams(data);
  };

  const handleChange = (e) => {
    setExam({ ...exam, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${import.meta.env.VITE_API_URL}/api/exam`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(exam),
    });
    fetchExams();
  };

  /* shared input field styles */
  const fieldWrap =
    "flex items-center gap-3 bg-white/[0.05] border border-white/[0.09] rounded-xl px-4 py-3 focus-within:border-purple-500/50 focus-within:bg-purple-500/[0.06] transition-all duration-200";
  const inputBase =
    "bg-transparent outline-none text-white text-sm w-full placeholder:text-white/25";

  /* semester colour palette */
  const semColors = [
    "bg-cyan-500/15 text-cyan-400 border-cyan-500/25",
    "bg-purple-500/15 text-purple-400 border-purple-500/25",
    "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
    "bg-amber-500/15 text-amber-400 border-amber-500/25",
    "bg-rose-500/15 text-rose-400 border-rose-500/25",
    "bg-indigo-500/15 text-indigo-400 border-indigo-500/25",
    "bg-teal-500/15 text-teal-400 border-teal-500/25",
    "bg-orange-500/15 text-orange-400 border-orange-500/25",
  ];

  const filtered = exams.filter(
    (e) =>
      e.Examname?.toLowerCase().includes(search.toLowerCase()) ||
      e.Subject?.toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    return isNaN(d)
      ? dateStr
      : d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  };

  return (
    <div className="min-h-screen bg-[#070B17] text-white relative overflow-hidden">
      {/* Ambient blobs */}
      <div className="pointer-events-none fixed -top-32 -left-32 w-[420px] h-[420px] bg-purple-700/20 rounded-full blur-[160px] z-0" />
      <div className="pointer-events-none fixed -bottom-32 -right-32 w-[420px] h-[420px] bg-cyan-600/15 rounded-full blur-[160px] z-0" />

      <div className="relative z-10 p-4 md:p-8 space-y-8 max-w-[1400px] mx-auto">

        {/* ── Page Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Exam Management</h1>
            <p className="text-[13px] text-white/40 mt-1">
              Schedule and manage all examinations across courses and semesters.
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg
            bg-white/[0.04] border border-white/[0.08] text-[12px] text-white/40 self-start">
            <ClipboardDocumentListIcon className="w-3.5 h-3.5" />
            {exams.length} exams scheduled
          </div>
        </div>

        {/* ── ADD EXAM FORM ── */}
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden
          shadow-[0_0_60px_rgba(0,0,0,0.3)]">

          {/* form header */}
          <div className="px-6 py-5 border-b border-white/[0.07] bg-indigo-500/[0.04]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/25
                flex items-center justify-center shrink-0">
                <PlusCircleIcon className="w-4 h-4 text-indigo-400" />
              </div>
              <div>
                <h2 className="text-[15px] font-bold text-white leading-none">Schedule New Exam</h2>
                <p className="text-[11px] text-white/35 mt-0.5">Fill in all fields to create an exam entry</p>
              </div>
            </div>
          </div>

          {/* fields */}
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Exam Name */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-white/40 uppercase tracking-widest">
                  Exam Name
                </label>
                <div className={fieldWrap}>
                  <ClipboardDocumentListIcon className="w-4 h-4 text-white/30 shrink-0" />
                  <input
                    className={inputBase}
                    type="text"
                    name="Examname"
                    placeholder="e.g. Mid-Term Examination"
                    value={exam.Examname}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Date */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-white/40 uppercase tracking-widest">
                  Exam Date
                </label>
                <div className={fieldWrap}>
                  <CalendarDaysIcon className="w-4 h-4 text-white/30 shrink-0" />
                  <input
                    className={`${inputBase} [color-scheme:dark]`}
                    type="date"
                    name="Date"
                    value={exam.Date}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-white/40 uppercase tracking-widest">
                  Subject
                </label>
                <div className={fieldWrap}>
                  <BookOpenIcon className="w-4 h-4 text-white/30 shrink-0" />
                  <input
                    className={inputBase}
                    type="text"
                    name="Subject"
                    placeholder="e.g. Data Structures"
                    value={exam.Subject}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Course */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-white/40 uppercase tracking-widest">
                  Course
                </label>
                <div className={`${fieldWrap} relative`}>
                  <AcademicCapIcon className="w-4 h-4 text-white/30 shrink-0" />
                  <select
                    className={`${inputBase} appearance-none cursor-pointer [&>option]:bg-[#0D1221] [&>option]:text-white`}
                    name="Course"
                    value={exam.Course}
                    onChange={handleChange}
                  >
                    <option value="">Select Course</option>
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

              {/* Semester */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-white/40 uppercase tracking-widest">
                  Semester
                </label>
                <div className={fieldWrap}>
                  <CheckCircleIcon className="w-4 h-4 text-white/30 shrink-0" />
                  <input
                    className={inputBase}
                    type="text"
                    name="Semester"
                    placeholder="e.g. 4"
                    value={exam.Semester}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Total Marks */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-white/40 uppercase tracking-widest">
                  Total Marks
                </label>
                <div className={fieldWrap}>
                  <TrophyIcon className="w-4 h-4 text-white/30 shrink-0" />
                  <input
                    className={`${inputBase} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                    type="number"
                    name="TotalMarks"
                    placeholder="e.g. 100"
                    value={exam.TotalMarks}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="md:col-span-2 w-full py-3 rounded-xl text-[14px] font-semibold
                  bg-gradient-to-r from-indigo-600 to-purple-600
                  hover:from-indigo-500 hover:to-purple-500
                  active:scale-[0.98] shadow-lg shadow-indigo-500/25
                  transition-all duration-200 flex items-center justify-center gap-2 mt-1"
              >
                <PlusCircleIcon className="w-4 h-4" />
                Schedule Exam
              </button>
            </div>
          </form>
        </div>

        {/* ── EXAM LIST ── */}
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden
          shadow-[0_0_60px_rgba(0,0,0,0.3)]">

          {/* list header */}
          <div className="px-6 py-5 border-b border-white/[0.07] flex flex-col sm:flex-row
            sm:items-center gap-4">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/25
                flex items-center justify-center shrink-0">
                <ClipboardDocumentListIcon className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <h2 className="text-[15px] font-bold text-white leading-none">Exam Schedule</h2>
                <p className="text-[11px] text-white/35 mt-0.5">
                  {filtered.length} of {exams.length} exams shown
                </p>
              </div>
            </div>

            {/* search */}
            <div className="flex items-center gap-2 bg-white/[0.05] border border-white/[0.09]
              rounded-xl px-3 py-2 focus-within:border-purple-500/40
              focus-within:bg-purple-500/[0.05] transition-all duration-200 sm:w-64">
              <MagnifyingGlassIcon className="w-4 h-4 text-white/30 shrink-0" />
              <input
                type="text"
                placeholder="Search exams…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none text-white text-[13px] w-full
                  placeholder:text-white/25"
              />
              {search && (
                <button onClick={() => setSearch("")}
                  className="text-white/30 hover:text-white/60 transition-colors text-xs">✕</button>
              )}
            </div>
          </div>

          {/* cards */}
          <div className="p-6">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16
                text-white/20">
                <ClipboardDocumentListIcon className="w-14 h-14 mb-4" />
                <p className="text-sm font-medium">
                  {search ? "No exams match your search" : "No exams scheduled yet"}
                </p>
                <p className="text-[12px] mt-1">
                  {search ? "Try a different keyword" : "Use the form above to add an exam"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map((e, idx) => {
                  const semBadge =
                    semColors[(Number(e.Semester) - 1) % semColors.length] ||
                    semColors[idx % semColors.length];
                  return (
                    <div
                      key={e._id}
                      className="group relative bg-white/[0.03] border border-white/[0.08]
                        rounded-2xl p-5 hover:bg-white/[0.06] hover:border-white/[0.15]
                        hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]
                        transition-all duration-200 overflow-hidden"
                    >
                      {/* top accent */}
                      <div className="absolute top-0 left-0 right-0 h-px
                        bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

                      {/* index chip */}
                      <span className="absolute top-4 right-4 w-6 h-6 rounded-lg
                        bg-white/[0.06] border border-white/[0.09]
                        flex items-center justify-center text-[10px] font-bold text-white/30">
                        {idx + 1}
                      </span>

                      {/* exam name */}
                      <div className="flex items-start gap-3 mb-4 pr-8">
                        <div className="w-9 h-9 rounded-xl bg-indigo-500/15 border border-indigo-500/20
                          flex items-center justify-center shrink-0">
                          <ClipboardDocumentListIcon className="w-4 h-4 text-indigo-400" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-[14px] font-semibold text-white leading-snug truncate">
                            {e.Examname}
                          </h3>
                          <p className="text-[12px] text-white/40 mt-0.5 flex items-center gap-1">
                            <CalendarDaysIcon className="w-3 h-3" />
                            {formatDate(e.Date)}
                          </p>
                        </div>
                      </div>

                      {/* info rows */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-[12px] text-white/55">
                          <BookOpenIcon className="w-3.5 h-3.5 text-white/30 shrink-0" />
                          <span className="truncate">{e.Subject || "—"}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[12px] text-white/55">
                          <AcademicCapIcon className="w-3.5 h-3.5 text-white/30 shrink-0" />
                          <span className="truncate">{e.Course?.Coursename || e.Course || "—"}</span>
                        </div>
                      </div>

                      {/* badges row */}
                      <div className="flex items-center gap-2 pt-3 border-t border-white/[0.07]">
                        <span className={`inline-flex items-center gap-1 text-[11px] font-medium
                          px-2.5 py-1 rounded-lg border ${semBadge}`}>
                          Sem {e.Semester}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium
                          px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 ml-auto">
                          <TrophyIcon className="w-3 h-3" />
                          {e.TotalMarks} Marks
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Exam;