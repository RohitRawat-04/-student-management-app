 import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ClipboardDocumentListIcon,
  BookOpenIcon,
  AcademicCapIcon,
  TrophyIcon,
  MagnifyingGlassIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

export default function StudentMarksPanel() {
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchMarks();
  }, []);

  const fetchMarks = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/student/marks`,
        { withCredentials: true }
      );
      console.log(res.data);
      setMarks(res.data);
    } catch (err) {
      console.error("Marks fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  /* helpers */
  const getGrade = (marks, total = 100) => {
    const pct = (marks / total) * 100;
    if (pct >= 90) return { label: "A+", color: "text-emerald-400", bg: "bg-emerald-500/15 border-emerald-500/25" };
    if (pct >= 80) return { label: "A",  color: "text-cyan-400",    bg: "bg-cyan-500/15 border-cyan-500/25" };
    if (pct >= 70) return { label: "B",  color: "text-blue-400",    bg: "bg-blue-500/15 border-blue-500/25" };
    if (pct >= 60) return { label: "C",  color: "text-amber-400",   bg: "bg-amber-500/15 border-amber-500/25" };
    if (pct >= 50) return { label: "D",  color: "text-orange-400",  bg: "bg-orange-500/15 border-orange-500/25" };
    return             { label: "F",  color: "text-red-400",     bg: "bg-red-500/15 border-red-500/25" };
  };

  const getBarColor = (marks, total = 100) => {
    const pct = (marks / total) * 100;
    if (pct >= 80) return "bg-emerald-400";
    if (pct >= 60) return "bg-blue-400";
    if (pct >= 50) return "bg-amber-400";
    return "bg-red-400";
  };

  const filtered = marks.filter((m) =>
    (m.subject?.Subjectname ?? "").toLowerCase().includes(search.toLowerCase()) ||
    (m.exam ?? "").toLowerCase().includes(search.toLowerCase())
  );

  /* summary stats */
  const avg = marks.length
    ? (marks.reduce((s, m) => s + Number(m.marks || 0), 0) / marks.length).toFixed(1)
    : "—";
  const highest = marks.length
    ? Math.max(...marks.map((m) => Number(m.marks || 0)))
    : "—";
  const passed = marks.filter((m) => Number(m.marks || 0) >= 50).length;

  return (
    <div className="min-h-screen bg-[#070B17] text-white relative overflow-hidden">
      {/* Ambient blobs */}
      <div className="pointer-events-none fixed -top-32 -left-32 w-[420px] h-[420px] bg-blue-700/20 rounded-full blur-[160px] z-0" />
      <div className="pointer-events-none fixed -bottom-32 -right-32 w-[420px] h-[420px] bg-cyan-600/15 rounded-full blur-[160px] z-0" />

      <div className="relative z-10 p-4 md:p-8 max-w-[1000px] mx-auto space-y-6">

        {/* ── Page Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">My Exam Results</h1>
            <p className="text-[13px] text-white/40 mt-1">
              View your marks and performance across all subjects.
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg
            bg-white/[0.04] border border-white/[0.08] text-[12px] text-white/40 self-start">
            <ClipboardDocumentListIcon className="w-3.5 h-3.5" />
            {marks.length} results
          </div>
        </div>

        {/* ── Summary stat cards ── */}
        {marks.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                label: "Average Score",
                value: avg,
                Icon: ChartBarIcon,
                colorClass: "from-blue-500/20 to-blue-600/5",
                border: "border-blue-500/25",
                text: "text-blue-300",
                iconBg: "bg-blue-500/15 border-blue-500/25",
                glow: "rgba(59,130,246,0.18)",
              },
              {
                label: "Highest Marks",
                value: highest,
                Icon: TrophyIcon,
                colorClass: "from-amber-500/20 to-amber-600/5",
                border: "border-amber-500/25",
                text: "text-amber-300",
                iconBg: "bg-amber-500/15 border-amber-500/25",
                glow: "rgba(245,158,11,0.18)",
              },
              {
                label: "Subjects Passed",
                value: `${passed} / ${marks.length}`,
                Icon: AcademicCapIcon,
                colorClass: "from-emerald-500/20 to-emerald-600/5",
                border: "border-emerald-500/25",
                text: "text-emerald-300",
                iconBg: "bg-emerald-500/15 border-emerald-500/25",
                glow: "rgba(52,211,153,0.18)",
              },
            ].map(({ label, value, Icon, colorClass, border, text, iconBg, glow }) => (
              <div key={label}
                className={`relative overflow-hidden group bg-gradient-to-br ${colorClass}
                  border ${border} rounded-2xl p-5 hover:-translate-y-1 transition-all duration-300
                  hover:shadow-[0_16px_48px_var(--glow)] cursor-default`}
                style={{ "--glow": glow }}>
                <div className={`absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl
                  bg-gradient-to-br ${colorClass} opacity-60 group-hover:opacity-100 transition-opacity`} />
                <div className="relative flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-semibold text-white/40 uppercase tracking-[0.18em] mb-2">
                      {label}
                    </p>
                    <p className={`text-3xl font-bold tabular-nums leading-none ${text}`}>{value}</p>
                  </div>
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${iconBg}`}>
                    <Icon className={`w-5 h-5 ${text}`} />
                  </div>
                </div>
                <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r ${colorClass}`} />
              </div>
            ))}
          </div>
        )}

        {/* ── Table card ── */}
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden
          shadow-[0_0_60px_rgba(0,0,0,0.4)]">

          {/* toolbar */}
          <div className="px-5 py-4 border-b border-white/[0.07] flex flex-col sm:flex-row
            sm:items-center gap-4">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-9 h-9 rounded-xl bg-blue-500/15 border border-blue-500/25
                flex items-center justify-center shrink-0">
                <ClipboardDocumentListIcon className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <h2 className="text-[14px] font-bold text-white leading-none">Marks Sheet</h2>
                <p className="text-[11px] text-white/35 mt-0.5">
                  {filtered.length} of {marks.length} results shown
                </p>
              </div>
            </div>

            {/* search */}
            <div className="flex items-center gap-2 bg-white/[0.05] border border-white/[0.09]
              rounded-xl px-3 py-2.5 sm:w-60 focus-within:border-blue-500/40
              focus-within:bg-blue-500/[0.05] transition-all duration-200">
              <MagnifyingGlassIcon className="w-4 h-4 text-white/30 shrink-0" />
              <input
                type="text"
                placeholder="Search subject or exam…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none text-white text-[13px] w-full placeholder:text-white/25"
              />
              {search && (
                <button onClick={() => setSearch("")}
                  className="text-white/30 hover:text-white/60 transition-colors text-xs shrink-0">✕</button>
              )}
            </div>
          </div>

          {/* table */}
          <div className="overflow-x-auto
            [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb]:bg-white/10">

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-white/20">
                <div className="w-8 h-8 border-2 border-white/10 border-t-blue-400
                  rounded-full animate-spin mb-4" />
                <p className="text-sm">Loading your results…</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-white/20">
                <ClipboardDocumentListIcon className="w-14 h-14 mb-4" />
                <p className="text-sm font-medium">
                  {search ? "No results match your search" : "No marks available yet"}
                </p>
                <p className="text-[12px] mt-1">
                  {search ? "Try a different keyword" : "Results will appear here once published"}
                </p>
              </div>
            ) : (
              <table className="w-full text-sm min-w-[500px]">
                <thead>
                  <tr className="border-b border-white/[0.07] bg-white/[0.03]">
                    {["#", "Subject", "Exam Name", "Score", "Grade"].map((h) => (
                      <th key={h} className="text-left px-5 py-3.5 text-[11px] font-semibold
                        text-white/35 uppercase tracking-widest whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.05]">
                  {filtered.map((m, i) => {
                    const grade = getGrade(Number(m.marks || 0));
                    const barColor = getBarColor(Number(m.marks || 0));
                    const pct = Math.min((Number(m.marks || 0) / 100) * 100, 100);
                    return (
                      <tr key={m._id}
                        className="group hover:bg-white/[0.04] transition-colors duration-150">

                        {/* index */}
                        <td className="px-5 py-4">
                          <span className="text-[11px] text-white/25 font-medium">{i + 1}</span>
                        </td>

                        {/* subject */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-lg bg-blue-500/15 border border-blue-500/20
                              flex items-center justify-center shrink-0">
                              <BookOpenIcon className="w-3.5 h-3.5 text-blue-400" />
                            </div>
                            <span className="text-[13px] font-semibold text-white whitespace-nowrap">
                              {m.subject?.Subjectname || "—"}
                            </span>
                          </div>
                        </td>

                        {/* exam */}
                        <td className="px-5 py-4">
                          <span className="text-[13px] text-white/60 whitespace-nowrap">
                            {m.exam || "—"}
                          </span>
                        </td>

                        {/* score + mini bar */}
                        <td className="px-5 py-4 min-w-[130px]">
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-2">
                              <span className="text-[14px] font-bold text-white tabular-nums">
                                {m.marks}
                              </span>
                              <span className="text-[11px] text-white/30">/ 100</span>
                            </div>
                            <div className="w-full h-1.5 bg-white/[0.07] rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all duration-700 ${barColor}`}
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                        </td>

                        {/* grade */}
                        <td className="px-5 py-4">
                          <span className={`inline-flex items-center justify-center
                            w-10 h-8 rounded-lg border text-[13px] font-bold
                            ${grade.bg} ${grade.color}`}>
                            {grade.label}
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
          {filtered.length > 0 && !loading && (
            <div className="px-5 py-3.5 border-t border-white/[0.07] bg-white/[0.02]
              flex items-center justify-between gap-4">
              <p className="text-[11px] text-white/25">
                Average score:{" "}
                <span className="text-white/50 font-semibold">{avg} / 100</span>
              </p>
              <div className="flex items-center gap-3 text-[10px] text-white/25">
                {[
                  { label: "A+", color: "bg-emerald-400" },
                  { label: "A",  color: "bg-cyan-400" },
                  { label: "B",  color: "bg-blue-400" },
                  { label: "C",  color: "bg-amber-400" },
                  { label: "F",  color: "bg-red-400" },
                ].map(({ label, color }) => (
                  <span key={label} className="flex items-center gap-1">
                    <span className={`w-2 h-2 rounded-full ${color}`} />
                    {label}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}