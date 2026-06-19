 import React, { useEffect, useState } from "react";
import {
  UsersIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  PhoneIcon,
  EnvelopeIcon,
  CurrencyRupeeIcon,
  ShieldCheckIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";

function Staff() {
  const [staff, setstaff] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => { fetchteacher(); }, []);

  const fetchteacher = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/teacher`);
      const data = await response.json();
      setstaff(data);
    } catch (err) {
      console.log(err);
    }
  };

  const columns = [
    { key: "Username", label: "Username",  Icon: UserCircleIcon },
    { key: "Password", label: "Password",  Icon: ShieldCheckIcon },
    { key: "Name",     label: "Name",      Icon: UserCircleIcon },
    { key: "Salary",   label: "Salary",    Icon: CurrencyRupeeIcon },
    { key: "Phone",    label: "Phone",     Icon: PhoneIcon },
    { key: "Email",    label: "Email",     Icon: EnvelopeIcon },
    { key: "Course",   label: "Course",    Icon: AcademicCapIcon },
    { key: "Role",     label: "Role",      Icon: ShieldCheckIcon },
    { key: "Gender",   label: "Gender",    Icon: UsersIcon },
  ];

  const genderColor = (g = "") => {
    const v = g.toLowerCase();
    if (v === "male")   return "bg-blue-500/15 text-blue-400 border-blue-500/25";
    if (v === "female") return "bg-pink-500/15 text-pink-400 border-pink-500/25";
    return "bg-white/[0.06] text-white/50 border-white/[0.09]";
  };

  const roleColor = (r = "") => {
    const v = r.toLowerCase();
    if (v.includes("head") || v.includes("principal"))
      return "bg-amber-500/15 text-amber-400 border-amber-500/25";
    if (v.includes("lecturer") || v.includes("teacher") || v.includes("professor"))
      return "bg-emerald-500/15 text-emerald-400 border-emerald-500/25";
    return "bg-indigo-500/15 text-indigo-400 border-indigo-500/25";
  };

  const initials = (name = "") =>
    name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase() || "?";

  const avatarGradients = [
    "from-purple-500 to-indigo-600",
    "from-emerald-500 to-teal-600",
    "from-cyan-500 to-blue-600",
    "from-amber-500 to-orange-600",
    "from-rose-500 to-pink-600",
  ];

  const filtered = staff.filter((s) =>
    [s.Username, s.Name, s.Email, s.Role, s.Course].some((v) =>
      (v ?? "").toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-[#070B17] text-white relative overflow-hidden">
      {/* Ambient blobs */}
      <div className="pointer-events-none fixed -top-32 -left-32 w-[420px] h-[420px] bg-purple-700/20 rounded-full blur-[160px] z-0" />
      <div className="pointer-events-none fixed -bottom-32 -right-32 w-[420px] h-[420px] bg-cyan-600/15 rounded-full blur-[160px] z-0" />

      <div className="relative z-10 p-4 md:p-8 max-w-[1400px] mx-auto space-y-6">

        {/* ── Page Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Staff Directory</h1>
            <p className="text-[13px] text-white/40 mt-1">
              Overview of all registered staff members.
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg
            bg-white/[0.04] border border-white/[0.08] text-[12px] text-white/40 self-start">
            <UsersIcon className="w-3.5 h-3.5" />
            {staff.length} staff members
          </div>
        </div>

        {/* ── Table Card ── */}
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden
          shadow-[0_0_60px_rgba(0,0,0,0.4)]">

          {/* toolbar */}
          <div className="px-5 py-4 border-b border-white/[0.07] flex flex-col sm:flex-row
            sm:items-center gap-4">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-500/25
                flex items-center justify-center shrink-0">
                <UsersIcon className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <h2 className="text-[14px] font-bold text-white leading-none">All Staff</h2>
                <p className="text-[11px] text-white/35 mt-0.5">
                  {filtered.length} of {staff.length} shown
                </p>
              </div>
            </div>

            {/* search */}
            <div className="flex items-center gap-2 bg-white/[0.05] border border-white/[0.09]
              rounded-xl px-3 py-2.5 sm:w-72 focus-within:border-purple-500/40
              focus-within:bg-purple-500/[0.05] transition-all duration-200">
              <MagnifyingGlassIcon className="w-4 h-4 text-white/30 shrink-0" />
              <input
                type="text"
                placeholder="Search by name, role, email…"
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
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-white/20">
                <UsersIcon className="w-14 h-14 mb-4" />
                <p className="text-sm font-medium">
                  {search ? "No staff match your search" : "No staff members found"}
                </p>
                <p className="text-[12px] mt-1">
                  {search ? "Try a different keyword" : "Add staff using the Add Staff form"}
                </p>
              </div>
            ) : (
              <table className="w-full text-sm min-w-[900px]">
                <thead>
                  <tr className="border-b border-white/[0.07] bg-white/[0.03]">
                    <th className="text-left px-5 py-3.5 text-[11px] font-semibold text-white/35
                      uppercase tracking-widest whitespace-nowrap">#</th>
                    {columns.map(({ key, label }) => (
                      <th key={key}
                        className="text-left px-5 py-3.5 text-[11px] font-semibold text-white/35
                          uppercase tracking-widest whitespace-nowrap">
                        {label}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/[0.05]">
                  {filtered.map((s, i) => (
                    <tr key={s._id || i}
                      className="group hover:bg-white/[0.04] transition-colors duration-150">

                      {/* row index */}
                      <td className="px-5 py-4">
                        <span className="text-[11px] text-white/25 font-medium">{i + 1}</span>
                      </td>

                      {/* Username */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-xl bg-gradient-to-br
                            ${avatarGradients[i % avatarGradients.length]}
                            flex items-center justify-center text-[11px] font-bold shrink-0
                            shadow-md`}>
                            {initials(s.Name || s.Username)}
                          </div>
                          <span className="text-[13px] font-medium text-white/80 whitespace-nowrap">
                            {s.Username}
                          </span>
                        </div>
                      </td>

                      {/* Password — masked */}
                      <td className="px-5 py-4">
                        <span className="text-[13px] text-white/30 tracking-widest">
                          {"•".repeat(Math.min(s.Password?.length || 8, 8))}
                        </span>
                      </td>

                      {/* Name */}
                      <td className="px-5 py-4">
                        <span className="text-[13px] font-semibold text-white whitespace-nowrap">
                          {s.Name || "—"}
                        </span>
                      </td>

                      {/* Salary */}
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-1 text-[12px] font-medium
                          text-emerald-400">
                          <CurrencyRupeeIcon className="w-3.5 h-3.5" />
                          {s.Salary ? Number(s.Salary).toLocaleString("en-IN") : "—"}
                        </span>
                      </td>

                      {/* Phone */}
                      <td className="px-5 py-4">
                        <span className="text-[13px] text-white/55 whitespace-nowrap">
                          {s.Phone || "—"}
                        </span>
                      </td>

                      {/* Email */}
                      <td className="px-5 py-4">
                        <span className="text-[13px] text-cyan-400/80 whitespace-nowrap">
                          {s.Email || "—"}
                        </span>
                      </td>

                      {/* Course */}
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-1.5 text-[12px]
                          px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20
                          text-indigo-400 whitespace-nowrap">
                          <AcademicCapIcon className="w-3 h-3" />
                          {s.Course?.Coursename || s.Course || "—"}
                        </span>
                      </td>

                      {/* Role */}
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1 text-[12px] font-medium
                          px-2.5 py-1 rounded-lg border whitespace-nowrap ${roleColor(s.Role)}`}>
                          {s.Role || "—"}
                        </span>
                      </td>

                      {/* Gender */}
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center text-[12px] font-medium
                          px-2.5 py-1 rounded-lg border whitespace-nowrap ${genderColor(s.Gender)}`}>
                          {s.Gender || "—"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* footer */}
          {filtered.length > 0 && (
            <div className="px-5 py-3.5 border-t border-white/[0.07] bg-white/[0.02]
              flex items-center justify-between gap-4">
              <p className="text-[11px] text-white/25">
                Showing <span className="text-white/40 font-medium">{filtered.length}</span> of{" "}
                <span className="text-white/40 font-medium">{staff.length}</span> staff members
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

export default Staff;