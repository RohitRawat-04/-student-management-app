import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  UsersIcon,
  MagnifyingGlassIcon,
  AcademicCapIcon,
  HashtagIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";

function Mystudent() {
  const [sdata, setsdata] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchmystudent();
  }, []);

  const fetchmystudent = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/mystudent`, {
        withCredentials: true,
      });
      setsdata(res.data);
    } catch (err) {
      console.error(err);
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

  const filtered = sdata.filter((s) =>
    [s.Name, s.Rollno, s.Course?.Coursename].some((v) =>
      (v ?? "").toLowerCase().includes(search.toLowerCase())
    )
  );

  /* group by semester for summary */
  const semGroups = sdata.reduce((acc, s) => {
    const sem = s.Semester || "?";
    acc[sem] = (acc[sem] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#070B17] text-white relative overflow-hidden">
      {/* Ambient blobs */}
      <div className="pointer-events-none fixed -top-32 -left-32 w-[420px] h-[420px] bg-purple-700/20 rounded-full blur-[160px] z-0" />
      <div className="pointer-events-none fixed -bottom-32 -right-32 w-[420px] h-[420px] bg-cyan-600/15 rounded-full blur-[160px] z-0" />

      <div className="relative z-10 p-4 md:p-8 max-w-[1100px] mx-auto space-y-6">

        {/* ── Page Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">My Students</h1>
            <p className="text-[13px] text-white/40 mt-1">
              All students enrolled in your assigned course.
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg
            bg-white/[0.04] border border-white/[0.08] text-[12px] text-white/40 self-start">
            <UsersIcon className="w-3.5 h-3.5" />
            {sdata.length} students
          </div>
        </div>

        {/* ── Semester summary chips ── */}
        {Object.keys(semGroups).length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] text-white/30 uppercase tracking-widest mr-1">
              Semesters:
            </span>
            {Object.entries(semGroups)
              .sort(([a], [b]) => Number(a) - Number(b))
              .map(([sem, count]) => {
                const color = semColors[(Number(sem) - 1) % semColors.length];
                return (
                  <span key={sem}
                    className={`inline-flex items-center gap-1.5 text-[11px] font-medium
                      px-2.5 py-1 rounded-lg border ${color}`}>
                    Sem {sem}
                    <span className="opacity-60">· {count}</span>
                  </span>
                );
              })}
          </div>
        )}

        {/* ── Table Card ── */}
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden
          shadow-[0_0_60px_rgba(0,0,0,0.4)]">

          {/* toolbar */}
          <div className="px-5 py-4 border-b border-white/[0.07] flex flex-col sm:flex-row
            sm:items-center gap-4">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/25
                flex items-center justify-center shrink-0">
                <UsersIcon className="w-4 h-4 text-purple-400" />
              </div>
              <div>
                <h2 className="text-[14px] font-bold text-white leading-none">Student Roster</h2>
                <p className="text-[11px] text-white/35 mt-0.5">
                  {filtered.length} of {sdata.length} students shown
                </p>
              </div>
            </div>

            {/* search */}
            <div className="flex items-center gap-2 bg-white/[0.05] border border-white/[0.09]
              rounded-xl px-3 py-2.5 sm:w-64 focus-within:border-purple-500/40
              focus-within:bg-purple-500/[0.05] transition-all duration-200">
              <MagnifyingGlassIcon className="w-4 h-4 text-white/30 shrink-0" />
              <input
                type="text"
                placeholder="Search by name, roll, course…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none text-white text-[13px] w-full
                  placeholder:text-white/25"
              />
              {search && (
                <button onClick={() => setSearch("")}
                  className="text-white/30 hover:text-white/60 transition-colors text-xs shrink-0">
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* table */}
          <div className="overflow-x-auto
            [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb]:bg-white/10">

            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-white/20">
                <UsersIcon className="w-14 h-14 mb-4" />
                <p className="text-sm font-medium">
                  {search ? "No students match your search" : "No students assigned yet"}
                </p>
                <p className="text-[12px] mt-1">
                  {search ? "Try a different keyword" : "Students will appear here once enrolled"}
                </p>
              </div>
            ) : (
              <table className="w-full text-sm min-w-[520px]">
                <thead>
                  <tr className="border-b border-white/[0.07] bg-white/[0.03]">
                    {["#", "Student", "Roll No", "Semester", "Course"].map((h) => (
                      <th key={h} className="text-left px-5 py-3.5 text-[11px] font-semibold
                        text-white/35 uppercase tracking-widest whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/[0.05]">
                  {filtered.map((s, i) => {
                    const semColor =
                      semColors[(Number(s.Semester) - 1) % semColors.length] ||
                      semColors[i % semColors.length];

                    return (
                      <tr key={s._id}
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
                              flex items-center justify-center text-[11px] font-bold
                              shrink-0 shadow-md`}>
                              {initials(s.Name)}
                            </div>
                            <span className="text-[13px] font-semibold text-white whitespace-nowrap">
                              {s.Name || "—"}
                            </span>
                          </div>
                        </td>

                        {/* roll no */}
                        <td className="px-5 py-4">
                          <span className="inline-flex items-center gap-1.5 text-[12px] font-mono
                            px-2.5 py-1 rounded-lg bg-white/[0.05] border border-white/[0.09]
                            text-white/55">
                            <HashtagIcon className="w-3 h-3 text-white/30" />
                            {s.Rollno || "—"}
                          </span>
                        </td>

                        {/* semester */}
                        <td className="px-5 py-4">
                          <span className={`inline-flex items-center text-[12px] font-medium
                            px-2.5 py-1 rounded-lg border ${semColor}`}>
                            Sem {s.Semester || "—"}
                          </span>
                        </td>

                        {/* course */}
                        <td className="px-5 py-4">
                          <span className="inline-flex items-center gap-1.5 text-[12px]
                            px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20
                            text-indigo-400 whitespace-nowrap">
                            <AcademicCapIcon className="w-3 h-3" />
                            {s.Course?.Coursename || "—"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>

          {/* footer */}
          {filtered.length > 0 && (
            <div className="px-5 py-3.5 border-t border-white/[0.07] bg-white/[0.02]
              flex items-center justify-between gap-4">
              <p className="text-[11px] text-white/25">
                Showing{" "}
                <span className="text-white/40 font-medium">{filtered.length}</span>{" "}
                of{" "}
                <span className="text-white/40 font-medium">{sdata.length}</span>{" "}
                students
              </p>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] text-white/25">Live data</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Mystudent;