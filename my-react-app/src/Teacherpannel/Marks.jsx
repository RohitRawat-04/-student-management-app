 import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ChartBarIcon,
  BookOpenIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  MagnifyingGlassIcon,
  CheckCircleIcon,
  AcademicCapIcon,
  HashtagIcon,
  PlayCircleIcon,
} from "@heroicons/react/24/outline";

function TeacherMarks() {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [semester, setSemester] = useState("");
  const [selectedExam, setSelectedExam] = useState("");
  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/subject`);
    const data = await res.json();
    setSubjects(data);
  };

  const loadStudents = async () => {
    if (!selectedSubject) { alert("Please select subject"); return; }
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/mark`, {
      subjectid: selectedSubject,
    });
    setStudents(res.data);
    setMarks({});
  };

  const handleMarksChange = (studentId, value) => {
    setMarks({ ...marks, [studentId]: value });
  };

  const saveMarks = async () => {
    if (!selectedExam) { alert("Please select exam"); return; }
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/marks`, {
        subject: selectedSubject,
        exam: selectedExam,
        marks,
      });
      console.log(res.data);
      alert("Marks saved successfully ✅");
    } catch (err) {
      console.error(err);
      alert("Error saving marks ❌");
    }
  };

  /* helpers */
  const avatarGradients = [
    "from-purple-500 to-indigo-600",
    "from-emerald-500 to-teal-600",
    "from-cyan-500 to-blue-600",
    "from-amber-500 to-orange-600",
    "from-rose-500 to-pink-600",
  ];
  const initials = (name = "") =>
    name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase() || "?";

  const getMarkColor = (v) => {
    const n = Number(v);
    if (!v || isNaN(n)) return "";
    if (n >= 80) return "text-emerald-400";
    if (n >= 60) return "text-blue-400";
    if (n >= 50) return "text-amber-400";
    return "text-red-400";
  };

  const selectedSubjectName = subjects.find((s) => s._id === selectedSubject)?.Subjectname;
  const enteredCount = Object.values(marks).filter((v) => v !== "" && v !== undefined).length;

  const filtered = students.filter((s) =>
    (s.Name ?? "").toLowerCase().includes(search.toLowerCase()) ||
    (s.Rollno ?? "").toLowerCase().includes(search.toLowerCase())
  );

  const fieldWrap =
    "flex items-center gap-3 bg-white/[0.05] border border-white/[0.09] rounded-xl px-4 py-3 focus-within:border-purple-500/50 focus-within:bg-purple-500/[0.06] transition-all duration-200";
  const inputBase =
    "bg-transparent outline-none text-white text-sm w-full placeholder:text-white/25 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

  return (
    <div className="min-h-screen bg-[#070B17] text-white relative overflow-hidden">
      {/* Ambient blobs */}
      <div className="pointer-events-none fixed -top-32 -left-32 w-[420px] h-[420px] bg-purple-700/20 rounded-full blur-[160px] z-0" />
      <div className="pointer-events-none fixed -bottom-32 -right-32 w-[420px] h-[420px] bg-cyan-600/15 rounded-full blur-[160px] z-0" />

      <div className="relative z-10 p-4 md:p-8 max-w-[1100px] mx-auto space-y-6">

        {/* ── Page Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Marks Entry Panel</h1>
            <p className="text-[13px] text-white/40 mt-1">
              Select subject → load students → enter and save marks.
            </p>
          </div>
          {students.length > 0 && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg
              bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[12px] self-start">
              <CheckCircleIcon className="w-3.5 h-3.5" />
              {enteredCount} / {students.length} filled
            </div>
          )}
        </div>

        {/* ── FILTER CARD ── */}
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden
          shadow-[0_0_60px_rgba(0,0,0,0.3)]">

          <div className="px-6 py-5 border-b border-white/[0.07] bg-purple-500/[0.04]
            flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/25
              flex items-center justify-center shrink-0">
              <ClipboardDocumentListIcon className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <h2 className="text-[15px] font-bold text-white leading-none">Session Setup</h2>
              <p className="text-[11px] text-white/35 mt-0.5">
                Configure subject and exam before loading students
              </p>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

              {/* Subject */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-white/40 uppercase tracking-widest">
                  Subject
                </label>
                <div className={`${fieldWrap} relative`}>
                  <BookOpenIcon className="w-4 h-4 text-white/30 shrink-0" />
                  <select
                    value={selectedSubject}
                    onChange={(e) => {
                      const subId = e.target.value;
                      setSelectedSubject(subId);
                      const found = subjects.find((s) => s._id === subId);
                      if (found) setSemester(found.Semester);
                    }}
                    className="bg-transparent outline-none text-white text-sm w-full
                      appearance-none cursor-pointer [&>option]:bg-[#0D1221] [&>option]:text-white"
                  >
                    <option value="">Select Subject</option>
                    {subjects.map((s) => (
                      <option key={s._id} value={s._id}>{s.Subjectname}</option>
                    ))}
                  </select>
                  <svg className="w-4 h-4 text-white/30 shrink-0 pointer-events-none"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {selectedSubjectName && (
                  <p className="text-[11px] text-purple-400/70 pl-1">✓ {selectedSubjectName}</p>
                )}
              </div>

              {/* Semester (read-only) */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-white/40 uppercase tracking-widest">
                  Semester
                </label>
                <div className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.07]
                  rounded-xl px-4 py-3 opacity-70 cursor-not-allowed">
                  <AcademicCapIcon className="w-4 h-4 text-white/20 shrink-0" />
                  <span className="text-sm text-white/40">
                    {semester ? `Semester ${semester}` : "Auto-filled"}
                  </span>
                </div>
              </div>

              {/* Exam */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-white/40 uppercase tracking-widest">
                  Exam Type
                </label>
                <div className={`${fieldWrap} relative`}>
                  <ClipboardDocumentListIcon className="w-4 h-4 text-white/30 shrink-0" />
                  <select
                    value={selectedExam}
                    onChange={(e) => setSelectedExam(e.target.value)}
                    className="bg-transparent outline-none text-white text-sm w-full
                      appearance-none cursor-pointer [&>option]:bg-[#0D1221] [&>option]:text-white"
                  >
                    <option value="">Select Exam</option>
                    <option value="Internal">Internal Test</option>
                    <option value="Mid">Mid Term</option>
                    <option value="Final">Final Exam</option>
                  </select>
                  <svg className="w-4 h-4 text-white/30 shrink-0 pointer-events-none"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {selectedExam && (
                  <p className="text-[11px] text-cyan-400/70 pl-1">✓ {selectedExam}</p>
                )}
              </div>

              {/* Load Button */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-white/40 uppercase tracking-widest opacity-0 select-none">
                  Action
                </label>
                <button
                  onClick={loadStudents}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl
                    text-[14px] font-semibold
                    bg-gradient-to-r from-purple-600 to-indigo-600
                    hover:from-purple-500 hover:to-indigo-500
                    active:scale-[0.98] shadow-lg shadow-purple-500/25
                    transition-all duration-200"
                >
                  <PlayCircleIcon className="w-4 h-4" />
                  Load Students
                </button>
              </div>
            </div>

            {/* session summary chip */}
            {(selectedSubjectName || selectedExam) && (
              <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-white/[0.07]">
                <span className="text-[11px] text-white/30 mr-1">Session:</span>
                {selectedSubjectName && (
                  <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5
                    rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-400">
                    <BookOpenIcon className="w-3 h-3" />{selectedSubjectName}
                  </span>
                )}
                {semester && (
                  <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5
                    rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                    <AcademicCapIcon className="w-3 h-3" />Sem {semester}
                  </span>
                )}
                {selectedExam && (
                  <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5
                    rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                    <ClipboardDocumentListIcon className="w-3 h-3" />{selectedExam}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ── STUDENTS MARKS TABLE ── */}
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden
          shadow-[0_0_60px_rgba(0,0,0,0.4)]">

          {/* toolbar */}
          <div className="px-5 py-4 border-b border-white/[0.07] flex flex-col sm:flex-row
            sm:items-center gap-4">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-500/25
                flex items-center justify-center shrink-0">
                <UserGroupIcon className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <h2 className="text-[14px] font-bold text-white leading-none">Student Marks</h2>
                <p className="text-[11px] text-white/35 mt-0.5">
                  {students.length === 0
                    ? "Load students to begin entry"
                    : `${filtered.length} of ${students.length} students`}
                </p>
              </div>
            </div>

            {students.length > 0 && (
              <div className="flex items-center gap-2 bg-white/[0.05] border border-white/[0.09]
                rounded-xl px-3 py-2.5 sm:w-56 focus-within:border-purple-500/40
                focus-within:bg-purple-500/[0.05] transition-all duration-200">
                <MagnifyingGlassIcon className="w-4 h-4 text-white/30 shrink-0" />
                <input
                  type="text"
                  placeholder="Search student…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-transparent outline-none text-white text-[13px] w-full placeholder:text-white/25"
                />
                {search && (
                  <button onClick={() => setSearch("")}
                    className="text-white/30 hover:text-white/60 transition-colors text-xs shrink-0">✕</button>
                )}
              </div>
            )}
          </div>

          {/* table */}
          <div className="overflow-x-auto
            [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb]:bg-white/10">

            {students.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-white/20">
                <ChartBarIcon className="w-14 h-14 mb-4" />
                <p className="text-sm font-medium">No students loaded yet</p>
                <p className="text-[12px] mt-1">Select a subject above and click "Load Students"</p>
              </div>
            ) : (
              <table className="w-full text-sm min-w-[500px]">
                <thead>
                  <tr className="border-b border-white/[0.07] bg-white/[0.03]">
                    {["#", "Student", "Roll No", "Marks / 100"].map((h) => (
                      <th key={h} className="text-left px-5 py-3.5 text-[11px] font-semibold
                        text-white/35 uppercase tracking-widest whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/[0.05]">
                  {filtered.map((stu, i) => {
                    const markVal = marks[stu._id] || "";
                    const markColor = getMarkColor(markVal);
                    const pct = markVal ? Math.min((Number(markVal) / 100) * 100, 100) : 0;

                    return (
                      <tr key={stu._id}
                        className="group hover:bg-white/[0.04] transition-colors duration-150">

                        {/* index */}
                        <td className="px-5 py-4">
                          <span className="text-[11px] text-white/25 font-medium">{i + 1}</span>
                        </td>

                        {/* student */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-xl bg-gradient-to-br
                              ${avatarGradients[i % avatarGradients.length]}
                              flex items-center justify-center text-[11px] font-bold shrink-0 shadow-md`}>
                              {initials(stu.Name)}
                            </div>
                            <span className="text-[13px] font-semibold text-white whitespace-nowrap">
                              {stu.Name || "—"}
                            </span>
                          </div>
                        </td>

                        {/* roll no */}
                        <td className="px-5 py-4">
                          <span className="inline-flex items-center gap-1.5 text-[12px] font-mono
                            px-2.5 py-1 rounded-lg bg-white/[0.05] border border-white/[0.09]
                            text-white/55">
                            <HashtagIcon className="w-3 h-3 text-white/30" />
                            {stu.Rollno || "—"}
                          </span>
                        </td>

                        {/* marks input */}
                        <td className="px-5 py-4 min-w-[200px]">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 bg-white/[0.05] border border-white/[0.09]
                              rounded-xl px-3 py-2 focus-within:border-purple-500/50
                              focus-within:bg-purple-500/[0.06] transition-all duration-200 w-28">
                              <input
                                type="number"
                                min="0"
                                max="100"
                                value={markVal}
                                onChange={(e) => handleMarksChange(stu._id, e.target.value)}
                                placeholder="—"
                                className={`bg-transparent outline-none text-sm w-full
                                  font-semibold tabular-nums placeholder:text-white/20
                                  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none
                                  [&::-webkit-inner-spin-button]:appearance-none
                                  ${markColor || "text-white"}`}
                              />
                              <span className="text-[11px] text-white/25 shrink-0">/100</span>
                            </div>

                            {/* mini bar */}
                            {markVal && (
                              <div className="flex-1 max-w-[80px]">
                                <div className="w-full h-1.5 bg-white/[0.07] rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full transition-all duration-500
                                      ${Number(markVal) >= 80 ? "bg-emerald-400"
                                      : Number(markVal) >= 60 ? "bg-blue-400"
                                      : Number(markVal) >= 50 ? "bg-amber-400"
                                      : "bg-red-400"}`}
                                    style={{ width: `${pct}%` }}
                                  />
                                </div>
                                <p className={`text-[10px] mt-0.5 font-medium ${markColor}`}>
                                  {pct.toFixed(0)}%
                                </p>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>

          {/* footer / save */}
          {students.length > 0 && (
            <div className="px-5 py-4 border-t border-white/[0.07] bg-white/[0.02]
              flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-[11px] text-white/25">
                <span className="text-white/40 font-medium">{enteredCount}</span> of{" "}
                <span className="text-white/40 font-medium">{students.length}</span> marks entered
              </p>
              <button
                onClick={saveMarks}
                className="w-full sm:w-auto flex items-center justify-center gap-2
                  px-8 py-2.5 rounded-xl text-[14px] font-semibold
                  bg-gradient-to-r from-emerald-600 to-teal-600
                  hover:from-emerald-500 hover:to-teal-500
                  active:scale-[0.98] shadow-lg shadow-emerald-500/25
                  transition-all duration-200"
              >
                <CheckCircleIcon className="w-4 h-4" />
                Save All Marks
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TeacherMarks;