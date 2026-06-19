 import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ClipboardDocumentCheckIcon,
  AcademicCapIcon,
  BookOpenIcon,
  ClockIcon,
  PlayCircleIcon,
  CheckCircleIcon,
  UserCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

function TeacherAttendanceUI() {
  const [subjects, setSubjects] = useState([]);
  const [courses, setCourses] = useState([]);
  const [duration, setDuration] = useState(5);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [attendanceWindow, setAttendanceWindow] = useState(null);
  const [teacher, setTeacher] = useState(null);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/subject`, { withCredentials: true })
      .then(res => setSubjects(res.data))
      .catch(err => console.log(err));

    axios.get(`${import.meta.env.VITE_API_URL}/api/course`, { withCredentials: true })
      .then(res => setCourses(res.data))
      .catch(err => console.log(err));

    axios.get(`${import.meta.env.VITE_API_URL}/api/me`, { withCredentials: true })
      .then(res => { if (res.data.role === "teacher") setTeacher(res.data); })
      .catch(err => console.log("Teacher fetch failed:", err));
  }, []);

  const openAttendance = async () => {
    if (!selectedCourse || !selectedSubject) return alert("Select course & subject");
    if (!teacher) return alert("Teacher not loaded yet");
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/attendancesession`,
        { courseId: selectedCourse, subjectId: selectedSubject, semester: "1", duration },
        { withCredentials: true }
      );
      setAttendanceWindow(res.data.session);
      alert("Attendance window opened!");
    } catch (err) {
      console.error("Attendance open failed:", err);
      alert("Failed to open attendance. Check console.");
    }
  };

  /* countdown ticker */
  useEffect(() => {
    if (!attendanceWindow) return;

    const tick = () => {
      const now = new Date();
      const end = new Date(attendanceWindow.endTime);
      const diff = end - now;

      if (diff <= 0) {
        setTimeLeft("00:00");
        setAttendanceWindow(null);
        alert("Attendance closed!");
        axios
          .put(
            ` ${import.meta.env.VITE_API_URL}/api/attendancesession/${attendanceWindow._id}/close`,
            {},
            { withCredentials: true }
          )
          .catch(err => console.error("Failed to close session:", err));
        return;
      }

      const mins = String(Math.floor((diff / 1000 / 60) % 60)).padStart(2, "0");
      const secs = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");
      setTimeLeft(`${mins}:${secs}`);
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [attendanceWindow]);

  const selectedCourseName  = courses.find(c => c._id === selectedCourse)?.Coursename;
  const selectedSubjectName = subjects.find(s => s._id === selectedSubject)?.Subjectname;

  const fieldWrap =
    "flex items-center gap-3 bg-white/[0.05] border border-white/[0.09] rounded-xl px-4 py-3 focus-within:border-purple-500/50 focus-within:bg-purple-500/[0.06] transition-all duration-200";
  const inputBase =
    "bg-transparent outline-none text-white text-sm w-full placeholder:text-white/25";

  return (
    <div className="min-h-screen bg-[#070B17] text-white relative overflow-hidden">
      {/* Ambient blobs */}
      <div className="pointer-events-none fixed -top-32 -left-32 w-[420px] h-[420px] bg-purple-700/20 rounded-full blur-[160px] z-0" />
      <div className="pointer-events-none fixed -bottom-32 -right-32 w-[420px] h-[420px] bg-cyan-600/15 rounded-full blur-[160px] z-0" />

      <div className="relative z-10 p-4 md:p-8 max-w-[900px] mx-auto space-y-6">

        {/* ── Page Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Attendance Panel
            </h1>
            <p className="text-[13px] text-white/40 mt-1">
              Open an attendance window for your class session.
            </p>
          </div>
          {/* teacher chip */}
          {teacher && (
            <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl
              bg-white/[0.04] border border-white/[0.08] self-start">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600
                flex items-center justify-center text-[11px] font-bold shrink-0">
                {teacher.Name?.charAt(0).toUpperCase() || "T"}
              </div>
              <div>
                <p className="text-[12px] font-semibold text-white leading-none">{teacher.Name}</p>
                <p className="text-[10px] text-white/35 mt-0.5">Teacher</p>
              </div>
            </div>
          )}
        </div>

        {/* ── ACTIVE SESSION ALERT ── */}
        {attendanceWindow && (
          <div className="relative overflow-hidden bg-emerald-500/[0.08] border border-emerald-500/30
            rounded-2xl p-5">
            <div className="absolute top-0 left-0 right-0 h-px
              bg-gradient-to-r from-emerald-500/40 to-transparent" />
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-11 h-11 rounded-xl bg-emerald-500/20 border border-emerald-500/30
                  flex items-center justify-center shrink-0">
                  <ClipboardDocumentCheckIcon className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-emerald-300 leading-none">
                    Attendance Window Open
                  </p>
                  <p className="text-[12px] text-white/50 mt-1">
                    Closes at{" "}
                    <span className="text-white/70 font-medium">
                      {new Date(attendanceWindow.endTime).toLocaleTimeString()}
                    </span>
                  </p>
                </div>
              </div>

              {/* countdown timer */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="flex flex-col items-center px-4 py-2.5 rounded-xl
                  bg-emerald-500/15 border border-emerald-500/25">
                  <span className="text-2xl font-bold text-emerald-400 tabular-nums leading-none font-mono">
                    {timeLeft}
                  </span>
                  <span className="text-[10px] text-emerald-400/60 mt-0.5 uppercase tracking-widest">
                    remaining
                  </span>
                </div>
              </div>
            </div>

            {/* subject + course info */}
            <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-white/[0.07]">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium
                px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                <AcademicCapIcon className="w-3 h-3" />
                {selectedCourseName || "—"}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium
                px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400">
                <BookOpenIcon className="w-3 h-3" />
                {selectedSubjectName || "—"}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium
                px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                <ClockIcon className="w-3 h-3" />
                {duration} min session
              </span>
            </div>
          </div>
        )}

        {/* ── CONFIG CARD ── */}
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden
          shadow-[0_0_60px_rgba(0,0,0,0.3)]">

          {/* header */}
          <div className="px-6 py-5 border-b border-white/[0.07] bg-purple-500/[0.04]
            flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/25
              flex items-center justify-center shrink-0">
              <PlayCircleIcon className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <h2 className="text-[15px] font-bold text-white leading-none">
                Open Attendance Window
              </h2>
              <p className="text-[11px] text-white/35 mt-0.5">
                Select class details and set the duration
              </p>
            </div>
          </div>

          <div className="p-6 space-y-5">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* Course */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-white/40 uppercase tracking-widest">
                  Course
                </label>
                <div className={`${fieldWrap} relative`}>
                  <AcademicCapIcon className="w-4 h-4 text-white/30 shrink-0" />
                  <select
                    onChange={e => setSelectedCourse(e.target.value)}
                    value={selectedCourse}
                    className={`${inputBase} appearance-none cursor-pointer
                      [&>option]:bg-[#0D1221] [&>option]:text-white`}
                  >
                    <option value="">Select Course</option>
                    {courses.map(c => (
                      <option key={c._id} value={c._id}>{c.Coursename}</option>
                    ))}
                  </select>
                  <svg className="w-4 h-4 text-white/30 shrink-0 pointer-events-none"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {selectedCourseName && (
                  <p className="text-[11px] text-indigo-400/70 pl-1">
                    ✓ {selectedCourseName}
                  </p>
                )}
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-white/40 uppercase tracking-widest">
                  Subject
                </label>
                <div className={`${fieldWrap} relative`}>
                  <BookOpenIcon className="w-4 h-4 text-white/30 shrink-0" />
                  <select
                    onChange={e => setSelectedSubject(e.target.value)}
                    value={selectedSubject}
                    className={`${inputBase} appearance-none cursor-pointer
                      [&>option]:bg-[#0D1221] [&>option]:text-white`}
                  >
                    <option value="">Select Subject</option>
                    {subjects.map(s => (
                      <option key={s._id} value={s._id}>{s.Subjectname}</option>
                    ))}
                  </select>
                  <svg className="w-4 h-4 text-white/30 shrink-0 pointer-events-none"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {selectedSubjectName && (
                  <p className="text-[11px] text-purple-400/70 pl-1">
                    ✓ {selectedSubjectName}
                  </p>
                )}
              </div>

              {/* Duration */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-[11px] font-semibold text-white/40 uppercase tracking-widest">
                  Duration (minutes)
                </label>
                <div className="flex items-center gap-4">
                  <div className={`${fieldWrap} flex-1`}>
                    <ClockIcon className="w-4 h-4 text-white/30 shrink-0" />
                    <input
                      type="number"
                      value={duration}
                      onChange={e => setDuration(Number(e.target.value))}
                      placeholder="e.g. 10"
                      className={`${inputBase} [appearance:textfield]
                        [&::-webkit-outer-spin-button]:appearance-none
                        [&::-webkit-inner-spin-button]:appearance-none`}
                    />
                    <span className="text-[12px] text-white/30 shrink-0">min</span>
                  </div>

                  {/* quick duration presets */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {[5, 10, 15, 30].map(d => (
                      <button
                        key={d}
                        onClick={() => setDuration(d)}
                        className={`px-3 py-2 rounded-xl text-[12px] font-medium border
                          transition-all duration-150
                          ${duration === d
                            ? "bg-purple-600/30 border-purple-500/40 text-purple-300"
                            : "bg-white/[0.04] border-white/[0.08] text-white/50 hover:text-white/80 hover:bg-white/[0.07]"
                          }`}
                      >
                        {d}m
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* selection summary */}
            {(selectedCourse || selectedSubject) && (
              <div className="flex flex-wrap items-center gap-2 px-4 py-3 rounded-xl
                bg-white/[0.03] border border-white/[0.07]">
                <span className="text-[11px] text-white/30 mr-1">Session:</span>
                {selectedCourseName && (
                  <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5
                    rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                    <AcademicCapIcon className="w-3 h-3" />{selectedCourseName}
                  </span>
                )}
                {selectedSubjectName && (
                  <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5
                    rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-400">
                    <BookOpenIcon className="w-3 h-3" />{selectedSubjectName}
                  </span>
                )}
                <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5
                  rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  <ClockIcon className="w-3 h-3" />{duration} min
                </span>
              </div>
            )}

            {/* warning if session already open */}
            {attendanceWindow && (
              <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl
                bg-amber-500/[0.08] border border-amber-500/25 text-amber-400 text-[12px]">
                <ExclamationTriangleIcon className="w-4 h-4 shrink-0" />
                A session is already active. Close the current session before opening a new one.
              </div>
            )}

            {/* submit */}
            <div className="pt-1 border-t border-white/[0.07]">
              <button
                onClick={openAttendance}
                disabled={!!attendanceWindow}
                className="w-full py-3 rounded-xl text-[14px] font-semibold
                  bg-gradient-to-r from-purple-600 to-indigo-600
                  hover:from-purple-500 hover:to-indigo-500
                  disabled:opacity-40 disabled:cursor-not-allowed
                  active:scale-[0.98] shadow-lg shadow-purple-500/25
                  transition-all duration-200 flex items-center justify-center gap-2"
              >
                {attendanceWindow
                  ? <><CheckCircleIcon className="w-4 h-4" />Session Active</>
                  : <><PlayCircleIcon className="w-4 h-4" />Open Attendance Window</>
                }
              </button>
            </div>

          </div>
        </div>

        {/* ── HOW IT WORKS ── */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5">
          <p className="text-[11px] font-semibold text-white/30 uppercase tracking-widest mb-4">
            How it works
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { step: "1", title: "Select Class",   desc: "Choose the course and subject for this session.",   color: "text-purple-400", bg: "bg-purple-500/15 border-purple-500/20" },
              { step: "2", title: "Set Duration",   desc: "Pick how long students can mark their attendance.", color: "text-cyan-400",   bg: "bg-cyan-500/15 border-cyan-500/20" },
              { step: "3", title: "Open Window",    desc: "Students see a live alert and mark themselves.",    color: "text-emerald-400",bg: "bg-emerald-500/15 border-emerald-500/20" },
            ].map(({ step, title, desc, color, bg }) => (
              <div key={step} className="flex items-start gap-3">
                <span className={`w-7 h-7 rounded-lg border flex items-center justify-center
                  text-[12px] font-bold shrink-0 ${bg} ${color}`}>
                  {step}
                </span>
                <div>
                  <p className={`text-[13px] font-semibold ${color} leading-none`}>{title}</p>
                  <p className="text-[11px] text-white/30 mt-1 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default TeacherAttendanceUI;