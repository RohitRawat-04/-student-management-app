  
  import React, { useEffect, useState } from "react";
import Axios from "axios";
import {
  AcademicCapIcon,
  PlusCircleIcon,
  ClockIcon,
  BookOpenIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/outline";

function Course() {
  const [coursedata, setcoursedata] = useState({
    Coursename: "",
    Duration: "",
    Totalsubject: "",
  });
  const [countcourse, setcountcourse] = useState([]);
  const [course, setcourse] = useState([]);

  useEffect(() => {
    fetchcountcourse();
    fetchcourse();
  }, []);

  const fetchcountcourse = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/course/stats`);
    const data = await res.json();
    setcountcourse(data);
  };

  const fetchcourse = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/Courses`);
    const coursedata = await res.json();
    setcourse(coursedata);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setcoursedata((prev) => ({ ...prev, [name]: value }));
  };

  const submit = () => {
    Axios.post(`${import.meta.env.VITE_API_URL}/api/courses`, coursedata);
    setcoursedata({ Coursename: "", Duration: "", Totalsubject: "" });
  };

  return (
    <div className="min-h-screen bg-[#070B17] text-white p-4 md:p-8 space-y-8 relative overflow-hidden">
      {/* Ambient blobs */}
      <div className="pointer-events-none fixed -top-32 -left-32 w-[420px] h-[420px] bg-purple-700/20 rounded-full blur-[160px] z-0" />
      <div className="pointer-events-none fixed -bottom-32 -right-32 w-[420px] h-[420px] bg-cyan-600/15 rounded-full blur-[160px] z-0" />

      {/* ── Page Header ── */}
      <div className="relative z-10">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Course Management
        </h1>
        <p className="text-[13px] text-white/40 mt-1">
          Add and manage academic courses offered by your institution.
        </p>
      </div>

      {/* ── Stat Card ── */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="relative overflow-hidden group bg-gradient-to-br from-violet-500/20 to-violet-600/5
          border border-violet-500/25 rounded-2xl p-5
          hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(139,92,246,0.2)]
          transition-all duration-300 cursor-default">
          <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full blur-2xl
            bg-violet-500/20 opacity-60 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-start justify-between gap-3 relative">
            <div>
              <p className="text-[11px] font-semibold text-white/40 uppercase tracking-[0.18em] mb-3">
                Total Courses
              </p>
              <p className="text-4xl font-bold tabular-nums text-violet-300 leading-none">
                {countcourse ?? "—"}
              </p>
              <p className="text-[11px] text-white/25 mt-3">Registered programmes</p>
            </div>
            <div className="w-11 h-11 rounded-xl border bg-violet-500/15 border-violet-500/25
              flex items-center justify-center shrink-0">
              <AcademicCapIcon className="w-5 h-5 text-violet-300" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-violet-500/30 to-transparent" />
        </div>
      </div>

      {/* ── Main Grid ── */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* ADD COURSE FORM */}
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6
          shadow-[0_0_60px_rgba(0,0,0,0.3)]">
          <div className="flex items-center gap-3 mb-7">
            <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/25
              flex items-center justify-center shrink-0">
              <PlusCircleIcon className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h2 className="text-[15px] font-bold text-white leading-none">Add New Course</h2>
              <p className="text-[11px] text-white/35 mt-0.5">Fill in the details below</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Course Name */}
            <div className="space-y-1.5">
              <label className="text-[12px] font-medium text-white/50 uppercase tracking-widest">
                Course Name
              </label>
              <div className="flex items-center gap-3 bg-white/[0.05] border border-white/[0.09]
                rounded-xl px-4 py-3 focus-within:border-purple-500/50 focus-within:bg-purple-500/[0.06]
                transition-all duration-200">
                <AcademicCapIcon className="w-4 h-4 text-white/30 shrink-0" />
                <input
                  type="text"
                  name="Coursename"
                  value={coursedata.Coursename}
                  placeholder="e.g. Bachelor of Computer Science"
                  onChange={handleChange}
                  className="bg-transparent outline-none text-white text-sm w-full
                    placeholder:text-white/25"
                />
              </div>
            </div>

            {/* Duration */}
            <div className="space-y-1.5">
              <label className="text-[12px] font-medium text-white/50 uppercase tracking-widest">
                Duration
              </label>
              <div className="flex items-center gap-3 bg-white/[0.05] border border-white/[0.09]
                rounded-xl px-4 py-3 focus-within:border-purple-500/50 focus-within:bg-purple-500/[0.06]
                transition-all duration-200">
                <ClockIcon className="w-4 h-4 text-white/30 shrink-0" />
                <input
                  type="text"
                  name="Duration"
                  value={coursedata.Duration}
                  onChange={handleChange}
                  placeholder="e.g. 3 Years"
                  className="bg-transparent outline-none text-white text-sm w-full
                    placeholder:text-white/25"
                />
              </div>
            </div>

            {/* Total Subjects */}
            <div className="space-y-1.5">
              <label className="text-[12px] font-medium text-white/50 uppercase tracking-widest">
                Total Subjects
              </label>
              <div className="flex items-center gap-3 bg-white/[0.05] border border-white/[0.09]
                rounded-xl px-4 py-3 focus-within:border-purple-500/50 focus-within:bg-purple-500/[0.06]
                transition-all duration-200">
                <BookOpenIcon className="w-4 h-4 text-white/30 shrink-0" />
                <input
                  type="text"
                  name="Totalsubject"
                  value={coursedata.Totalsubject}
                  onChange={handleChange}
                  placeholder="e.g. 24"
                  className="bg-transparent outline-none text-white text-sm w-full
                    placeholder:text-white/25"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              onClick={submit}
              className="w-full mt-2 py-3 rounded-xl text-[14px] font-semibold
                bg-gradient-to-r from-purple-600 to-indigo-600
                hover:from-purple-500 hover:to-indigo-500
                active:scale-[0.98] shadow-lg shadow-purple-500/25
                transition-all duration-200 flex items-center justify-center gap-2"
            >
              <PlusCircleIcon className="w-4 h-4" />
              Add Course
            </button>
          </div>
        </div>

        {/* COURSE LIST TABLE */}
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden
          shadow-[0_0_60px_rgba(0,0,0,0.3)] flex flex-col">
          {/* table header bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.07]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/15 border border-cyan-500/25
                flex items-center justify-center shrink-0">
                <Square3Stack3DIcon className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <h2 className="text-[14px] font-bold text-white leading-none">Course List</h2>
                <p className="text-[11px] text-white/35 mt-0.5">{course.length} courses registered</p>
              </div>
            </div>
            <span className="text-[11px] px-2.5 py-1 rounded-lg bg-cyan-500/10
              border border-cyan-500/20 text-cyan-400">
              All Courses
            </span>
          </div>

          {/* table */}
          <div className="flex-1 overflow-y-auto
            [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb]:bg-white/10">
            {course.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-white/20">
                <AcademicCapIcon className="w-12 h-12 mb-3" />
                <p className="text-sm font-medium">No courses added yet</p>
                <p className="text-[12px] mt-1">Add your first course using the form</p>
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.07] bg-white/[0.03]">
                    <th className="text-left px-5 py-3 text-[11px] font-semibold text-white/35
                      uppercase tracking-widest">
                      Course
                    </th>
                    <th className="text-left px-5 py-3 text-[11px] font-semibold text-white/35
                      uppercase tracking-widest">
                      Duration
                    </th>
                    <th className="text-left px-5 py-3 text-[11px] font-semibold text-white/35
                      uppercase tracking-widest">
                      Subjects
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.05]">
                  {course.map((c, idx) => (
                    <tr
                      key={c._id}
                      className="group hover:bg-white/[0.04] transition-colors duration-150"
                    >
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-lg bg-purple-500/15 border border-purple-500/20
                            flex items-center justify-center text-[10px] font-bold text-purple-400 shrink-0">
                            {idx + 1}
                          </span>
                          <span className="text-[13px] font-medium text-white/85 truncate max-w-[140px]">
                            {c.Coursename}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="inline-flex items-center gap-1.5 text-[12px] text-white/60">
                          <ClockIcon className="w-3.5 h-3.5 text-white/30" />
                          {c.Duration}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="inline-flex items-center gap-1 text-[12px]
                          px-2 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                          <BookOpenIcon className="w-3 h-3" />
                          {c.Totalsubject}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Course;