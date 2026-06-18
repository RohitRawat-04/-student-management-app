 import React, { useEffect, useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  BookOpenIcon,
  PlusCircleIcon,
  AcademicCapIcon,
  MagnifyingGlassIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

function Subjects() {
  const [course, setCourse] = useState([]);
  const [subjectName, setSubjectName] = useState("");
  const [Semester, setSemester] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [editSubject, setEditSubject] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCourses();
    fetchSubjects();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/course`);
      const data = await res.json();
      setCourse(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSubjects = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/subject`);
      const data = await res.json();
      setSubjects(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subjectName || !Semester || !selectedCourseId) {
      alert("Fill all fields");
      return;
    }
    try {
      const payload = {
        Subjectname: subjectName,
        Semester,
        Courseid: selectedCourseId,
      };
      if (editSubject) {
        await fetch(`${import.meta.env.VITE_API_URL}/api/subject/${editSubject._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        setEditSubject(null);
      } else {
        await fetch(`${import.meta.env.VITE_API_URL}/api/subject`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      setSubjectName("");
      setSemester("");
      setSelectedCourseId("");
      fetchSubjects();
    } catch (err) {
      console.error(err);
      alert("Save failed");
    }
  };

  const handleEdit = (s) => {
    setEditSubject(s);
    setSubjectName(s.Subjectname);
    setSemester(s.Semester);
    setSelectedCourseId(s.Courseid?._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete subject?")) return;
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/subject/${id}`, {
        method: "DELETE",
      });
      fetchSubjects();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancelEdit = () => {
    setEditSubject(null);
    setSubjectName("");
    setSemester("");
    setSelectedCourseId("");
  };

  const filtered = subjects.filter((s) =>
    s.Subjectname?.toLowerCase().includes(search.toLowerCase()) ||
    s.Courseid?.Coursename?.toLowerCase().includes(search.toLowerCase())
  );

  /* semester badge colours (cycles through 8 options) */
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

  return (
    <div className="min-h-screen bg-[#070B17] text-white relative overflow-hidden">
      {/* Ambient blobs */}
      <div className="pointer-events-none fixed -top-32 -left-32 w-[420px] h-[420px] bg-purple-700/20 rounded-full blur-[160px] z-0" />
      <div className="pointer-events-none fixed -bottom-32 -right-32 w-[420px] h-[420px] bg-cyan-600/15 rounded-full blur-[160px] z-0" />

      <div className="relative z-10 p-4 md:p-8 flex flex-col gap-8 max-w-[1400px] mx-auto">

        {/* ── Page Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Subject Management</h1>
            <p className="text-[13px] text-white/40 mt-1">
              Manage and organise subjects across all courses and semesters.
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg
            bg-white/[0.04] border border-white/[0.08] text-[12px] text-white/40 self-start">
            <BookOpenIcon className="w-3.5 h-3.5" />
            {subjects.length} subjects total
          </div>
        </div>

        {/* ── Main layout ── */}
        <div className="flex flex-col lg:flex-row gap-6">

          {/* ════ FORM PANEL ════ */}
          <div className="w-full lg:w-[340px] shrink-0">
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden
              shadow-[0_0_60px_rgba(0,0,0,0.3)] sticky top-6">

              {/* form header */}
              <div className={`px-6 py-5 border-b border-white/[0.07]
                ${editSubject
                  ? "bg-amber-500/[0.06] border-b-amber-500/20"
                  : "bg-emerald-500/[0.04]"}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0
                    ${editSubject
                      ? "bg-amber-500/20 border border-amber-500/25"
                      : "bg-emerald-500/20 border border-emerald-500/25"}`}>
                    {editSubject
                      ? <PencilIcon className="w-4 h-4 text-amber-400" />
                      : <PlusCircleIcon className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <div>
                    <h2 className="text-[15px] font-bold text-white leading-none">
                      {editSubject ? "Edit Subject" : "Add Subject"}
                    </h2>
                    <p className="text-[11px] text-white/35 mt-0.5">
                      {editSubject ? "Update the subject details" : "Create a new subject entry"}
                    </p>
                  </div>
                </div>
              </div>

              {/* fields */}
              <div className="p-6 space-y-4">
                {/* Subject Name */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-white/40 uppercase tracking-widest">
                    Subject Name
                  </label>
                  <div className="flex items-center gap-3 bg-white/[0.05] border border-white/[0.09]
                    rounded-xl px-4 py-3 focus-within:border-purple-500/50
                    focus-within:bg-purple-500/[0.06] transition-all duration-200">
                    <BookOpenIcon className="w-4 h-4 text-white/30 shrink-0" />
                    <input
                      type="text"
                      placeholder="e.g. Data Structures"
                      value={subjectName}
                      onChange={(e) => setSubjectName(e.target.value)}
                      className="bg-transparent outline-none text-white text-sm w-full
                        placeholder:text-white/25"
                    />
                  </div>
                </div>

                {/* Semester */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-white/40 uppercase tracking-widest">
                    Semester
                  </label>
                  <div className="flex items-center gap-3 bg-white/[0.05] border border-white/[0.09]
                    rounded-xl px-4 py-3 focus-within:border-purple-500/50
                    focus-within:bg-purple-500/[0.06] transition-all duration-200">
                    <CheckCircleIcon className="w-4 h-4 text-white/30 shrink-0" />
                    <input
                      type="number"
                      placeholder="e.g. 3"
                      value={Semester}
                      onChange={(e) => setSemester(e.target.value)}
                      className="bg-transparent outline-none text-white text-sm w-full
                        placeholder:text-white/25 [appearance:textfield]
                        [&::-webkit-outer-spin-button]:appearance-none
                        [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                </div>

                {/* Course Select */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-white/40 uppercase tracking-widest">
                    Course
                  </label>
                  <div className="relative bg-white/[0.05] border border-white/[0.09]
                    rounded-xl focus-within:border-purple-500/50 focus-within:bg-purple-500/[0.06]
                    transition-all duration-200">
                    <AcademicCapIcon className="absolute left-4 top-1/2 -translate-y-1/2
                      w-4 h-4 text-white/30 pointer-events-none" />
                    <select
                      value={selectedCourseId}
                      onChange={(e) => setSelectedCourseId(e.target.value)}
                      className="w-full bg-transparent outline-none text-white text-sm
                        pl-11 pr-4 py-3 appearance-none cursor-pointer
                        [&>option]:bg-[#0D1221] [&>option]:text-white"
                    >
                      <option value="">Select Course</option>
                      {course.map((c) => (
                        <option key={c._id} value={c._id}>
                          {c.Coursename}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-4 h-4 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-2 pt-1">
                  <button
                    onClick={handleSubmit}
                    className={`w-full py-3 rounded-xl text-[14px] font-semibold
                      active:scale-[0.98] shadow-lg transition-all duration-200
                      flex items-center justify-center gap-2
                      ${editSubject
                        ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 shadow-amber-500/25"
                        : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-emerald-500/25"
                      }`}
                  >
                    {editSubject
                      ? <><PencilIcon className="w-4 h-4" /> Update Subject</>
                      : <><PlusCircleIcon className="w-4 h-4" /> Add Subject</>}
                  </button>

                  {editSubject && (
                    <button
                      onClick={handleCancelEdit}
                      className="w-full py-3 rounded-xl text-[13px] font-medium
                        text-white/50 hover:text-white/80 bg-white/[0.04] hover:bg-white/[0.07]
                        border border-white/[0.08] hover:border-white/[0.14]
                        transition-all duration-200"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ════ SUBJECTS LIST ════ */}
          <div className="flex-1 min-w-0 flex flex-col gap-5">

            {/* search bar */}
            <div className="flex items-center gap-3 bg-white/[0.05] border border-white/[0.09]
              rounded-xl px-4 py-3 focus-within:border-purple-500/40
              focus-within:bg-purple-500/[0.05] transition-all duration-200">
              <MagnifyingGlassIcon className="w-4 h-4 text-white/30 shrink-0" />
              <input
                type="text"
                placeholder="Search subjects or courses…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none text-white text-sm w-full
                  placeholder:text-white/25"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="text-white/30 hover:text-white/60 transition-colors text-xs shrink-0"
                >
                  ✕
                </button>
              )}
            </div>

            {/* cards grid */}
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20
                bg-white/[0.02] border border-white/[0.07] rounded-2xl text-white/20">
                <BookOpenIcon className="w-14 h-14 mb-4" />
                <p className="text-sm font-medium">
                  {search ? "No subjects match your search" : "No subjects added yet"}
                </p>
                <p className="text-[12px] mt-1">
                  {search ? "Try a different keyword" : "Add your first subject using the form"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map((s, idx) => {
                  const semBadge = semColors[(Number(s.Semester) - 1) % semColors.length]
                    || semColors[idx % semColors.length];
                  return (
                    <div
                      key={s._id}
                      className="group relative bg-white/[0.03] border border-white/[0.08]
                        rounded-2xl p-5 hover:bg-white/[0.06] hover:border-white/[0.15]
                        hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]
                        transition-all duration-200 overflow-hidden"
                    >
                      {/* subtle top accent */}
                      <div className="absolute top-0 left-0 right-0 h-px
                        bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                      {/* index chip */}
                      <span className="absolute top-4 right-4 w-6 h-6 rounded-lg
                        bg-white/[0.06] border border-white/[0.09]
                        flex items-center justify-center text-[10px] font-bold text-white/30">
                        {idx + 1}
                      </span>

                      {/* icon + name */}
                      <div className="flex items-start gap-3 mb-4 pr-8">
                        <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/20
                          flex items-center justify-center shrink-0">
                          <BookOpenIcon className="w-4 h-4 text-purple-400" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-[14px] font-semibold text-white leading-snug truncate">
                            {s.Subjectname}
                          </h3>
                          <p className="text-[12px] text-white/40 mt-0.5 truncate">
                            {s.Courseid?.Coursename ?? "—"}
                          </p>
                        </div>
                      </div>

                      {/* meta row */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className={`inline-flex items-center gap-1 text-[11px] font-medium
                          px-2.5 py-1 rounded-lg border ${semBadge}`}>
                          Sem {s.Semester}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px]
                          px-2.5 py-1 rounded-lg bg-white/[0.05] border border-white/[0.09]
                          text-white/40">
                          <AcademicCapIcon className="w-3 h-3" />
                          {s.Courseid?.Coursename ?? "N/A"}
                        </span>
                      </div>

                      {/* action buttons */}
                      <div className="flex items-center gap-2 pt-3 border-t border-white/[0.07]">
                        <button
                          onClick={() => handleEdit(s)}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl
                            text-[12px] font-medium text-amber-400
                            bg-amber-500/10 border border-amber-500/20
                            hover:bg-amber-500/20 hover:border-amber-500/35
                            transition-all duration-150 active:scale-95"
                        >
                          <PencilIcon className="w-3.5 h-3.5" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(s._id)}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl
                            text-[12px] font-medium text-red-400
                            bg-red-500/10 border border-red-500/20
                            hover:bg-red-500/20 hover:border-red-500/35
                            transition-all duration-150 active:scale-95"
                        >
                          <TrashIcon className="w-3.5 h-3.5" />
                          Delete
                        </button>
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

export default Subjects;