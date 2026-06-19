 import React, { useEffect, useState } from "react";
import {
  UserCircleIcon,
  EnvelopeIcon,
  HashtagIcon,
  UsersIcon,
  AcademicCapIcon,
  CurrencyRupeeIcon,
  IdentificationIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

function PersonalDetails() {
  const [pdata, setpdata] = useState(null);

  useEffect(() => {
    fetchdetails();
  }, []);

  const fetchdetails = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/me`, {
      credentials: "include",
    });
    const data = await res.json();
    console.log(data);
    setpdata(data);
  };

  /* fee progress */
  const feePercent =
    pdata && Number(pdata.Totalfee) > 0
      ? Math.min((Number(pdata.Paidfee) / Number(pdata.Totalfee)) * 100, 100)
      : 0;

  const pendingFee = pdata
    ? Math.max(0, Number(pdata.Totalfee) - Number(pdata.Paidfee))
    : 0;

  const genderBadge = (g = "") => {
    const v = g.toLowerCase();
    if (v === "male")   return "bg-blue-500/15 text-blue-400 border-blue-500/25";
    if (v === "female") return "bg-pink-500/15 text-pink-400 border-pink-500/25";
    return "bg-white/[0.06] text-white/40 border-white/[0.09]";
  };

  if (!pdata)
    return (
      <div className="min-h-screen bg-[#070B17] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-white/30">
          <div className="w-10 h-10 border-2 border-white/10 border-t-blue-400 rounded-full animate-spin" />
          <p className="text-sm">Loading your details…</p>
        </div>
      </div>
    );

  const fields = [
    { label: "Username",   value: pdata.Username,          Icon: UserCircleIcon,      accent: "blue" },
    { label: "Email",      value: pdata.Email,             Icon: EnvelopeIcon,        accent: "cyan" },
    { label: "Roll No",    value: pdata.Rollno,            Icon: HashtagIcon,         accent: "purple" },
    { label: "Gender",     value: pdata.Gender,            Icon: UsersIcon,           accent: "pink" },
    { label: "Course",     value: pdata.Course?.Coursename,Icon: AcademicCapIcon,     accent: "indigo" },
    { label: "Role",       value: pdata.Role,              Icon: ShieldCheckIcon,     accent: "emerald" },
  ];

  const accentMap = {
    blue:    { icon: "bg-blue-500/15 border-blue-500/25 text-blue-400",    label: "text-blue-400/60" },
    cyan:    { icon: "bg-cyan-500/15 border-cyan-500/25 text-cyan-400",    label: "text-cyan-400/60" },
    purple:  { icon: "bg-purple-500/15 border-purple-500/25 text-purple-400", label: "text-purple-400/60" },
    pink:    { icon: "bg-pink-500/15 border-pink-500/25 text-pink-400",    label: "text-pink-400/60" },
    indigo:  { icon: "bg-indigo-500/15 border-indigo-500/25 text-indigo-400", label: "text-indigo-400/60" },
    emerald: { icon: "bg-emerald-500/15 border-emerald-500/25 text-emerald-400", label: "text-emerald-400/60" },
    amber:   { icon: "bg-amber-500/15 border-amber-500/25 text-amber-400", label: "text-amber-400/60" },
  };

  return (
    <div className="min-h-screen bg-[#070B17] text-white relative overflow-hidden">
      {/* Ambient blobs */}
      <div className="pointer-events-none fixed -top-32 -left-32 w-[420px] h-[420px] bg-blue-700/20 rounded-full blur-[160px] z-0" />
      <div className="pointer-events-none fixed -bottom-32 -right-32 w-[420px] h-[420px] bg-cyan-600/15 rounded-full blur-[160px] z-0" />

      <div className="relative z-10 p-4 md:p-8 max-w-[900px] mx-auto space-y-6">

        {/* ── Page Header ── */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Personal Details</h1>
          <p className="text-[13px] text-white/40 mt-1">
            Your registered profile information.
          </p>
        </div>

        {/* ── Profile Hero Card ── */}
        <div className="relative overflow-hidden bg-white/[0.03] border border-white/[0.08]
          rounded-2xl p-6 shadow-[0_0_60px_rgba(0,0,0,0.4)]">
          {/* top accent */}
          <div className="absolute top-0 left-0 right-0 h-px
            bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
          {/* bg blob */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-5">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600
                flex items-center justify-center text-3xl font-bold shadow-xl shadow-blue-500/30
                border border-blue-400/30">
                {pdata.Name?.charAt(0).toUpperCase()}
              </div>
              <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full
                bg-emerald-400 border-2 border-[#070B17]" title="Online" />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 text-center sm:text-left">
              <h2 className="text-xl font-bold text-white leading-none">{pdata.Name}</h2>
              <p className="text-[13px] text-white/40 mt-1">Student · {pdata.Course?.Coursename || "—"}</p>

              {/* badges */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-3">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium
                  px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
                  <AcademicCapIcon className="w-3 h-3" />
                  Sem {pdata.Semester || "—"}
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium
                  px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400">
                  <HashtagIcon className="w-3 h-3" />
                  {pdata.Rollno || "—"}
                </span>
                {pdata.Gender && (
                  <span className={`inline-flex items-center text-[11px] font-medium
                    px-2.5 py-1 rounded-lg border ${genderBadge(pdata.Gender)}`}>
                    {pdata.Gender}
                  </span>
                )}
              </div>
            </div>

            {/* Role chip */}
            <div className="hidden sm:flex flex-col items-end gap-2 shrink-0">
              <span className="text-[11px] px-3 py-1.5 rounded-xl
                bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-medium">
                {pdata.Role || "Student"}
              </span>
            </div>
          </div>
        </div>

        {/* ── Detail Fields Grid ── */}
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden
          shadow-[0_0_60px_rgba(0,0,0,0.3)]">
          <div className="px-6 py-4 border-b border-white/[0.07] bg-white/[0.02] flex items-center gap-2">
            <IdentificationIcon className="w-4 h-4 text-white/30" />
            <p className="text-[12px] font-semibold text-white/40 uppercase tracking-widest">
              Profile Information
            </p>
          </div>

          <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fields.map(({ label, value, Icon, accent }) => {
              const a = accentMap[accent];
              return (
                <div key={label}
                  className="group flex items-center gap-4 bg-white/[0.02] border border-white/[0.07]
                    rounded-xl p-4 hover:bg-white/[0.05] hover:border-white/[0.12]
                    transition-all duration-200">
                  <div className={`w-9 h-9 rounded-xl border flex items-center justify-center
                    shrink-0 ${a.icon}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={`text-[10px] font-semibold uppercase tracking-widest ${a.label}`}>
                      {label}
                    </p>
                    <p className="text-[14px] font-semibold text-white mt-0.5 truncate">
                      {value || "—"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Fee Card ── */}
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden
          shadow-[0_0_60px_rgba(0,0,0,0.3)]">
          <div className="px-6 py-4 border-b border-white/[0.07] bg-emerald-500/[0.03]
            flex items-center gap-2">
            <CurrencyRupeeIcon className="w-4 h-4 text-emerald-400/60" />
            <p className="text-[12px] font-semibold text-emerald-400/60 uppercase tracking-widest">
              Fee Status
            </p>
          </div>

          <div className="p-6 space-y-5">
            {/* fee stats row */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Total Fee",   value: `₹${Number(pdata.Totalfee || 0).toLocaleString("en-IN")}`,  color: "text-white" },
                { label: "Paid",        value: `₹${Number(pdata.Paidfee  || 0).toLocaleString("en-IN")}`,  color: "text-emerald-400" },
                { label: "Pending",     value: `₹${pendingFee.toLocaleString("en-IN")}`,                    color: pendingFee > 0 ? "text-amber-400" : "text-emerald-400" },
              ].map(({ label, value, color }) => (
                <div key={label} className="text-center">
                  <p className="text-[11px] text-white/35 uppercase tracking-widest mb-1">{label}</p>
                  <p className={`text-lg font-bold tabular-nums ${color}`}>{value}</p>
                </div>
              ))}
            </div>

            {/* progress bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-[12px]">
                <span className="text-white/40">Payment Progress</span>
                <span className={`font-semibold ${feePercent >= 100 ? "text-emerald-400" : "text-amber-400"}`}>
                  {feePercent.toFixed(0)}% Paid
                </span>
              </div>
              <div className="w-full h-2.5 bg-white/[0.07] rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700
                    ${feePercent >= 100 ? "bg-emerald-400" : "bg-gradient-to-r from-amber-400 to-orange-500"}`}
                  style={{ width: `${feePercent}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-white/25">
                <span>₹{Number(pdata.Paidfee || 0).toLocaleString("en-IN")} paid</span>
                <span>₹{Number(pdata.Totalfee || 0).toLocaleString("en-IN")} total</span>
              </div>
            </div>

            {/* status pill */}
            <div className="flex justify-center">
              <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[12px]
                font-semibold border
                ${feePercent >= 100
                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                  : "bg-amber-500/10 border-amber-500/20 text-amber-400"}`}>
                <span className={`w-1.5 h-1.5 rounded-full
                  ${feePercent >= 100 ? "bg-emerald-400" : "bg-amber-400 animate-pulse"}`} />
                {feePercent >= 100 ? "Fees Fully Paid" : `₹${pendingFee.toLocaleString("en-IN")} remaining`}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default PersonalDetails;