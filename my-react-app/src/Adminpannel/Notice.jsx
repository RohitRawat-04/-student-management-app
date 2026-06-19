 import React, { useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import {
  MegaphoneIcon,
  CalendarDaysIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";

function Notice() {
  const [noticedata, setNoticedata] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchnotice();
  }, []);

  const fetchnotice = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/notice`, {
        credentials: "include",
      });
      const data = await response.json();
      setNoticedata(data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteNotice = async (id) => {
    const ok = window.confirm("Delete this notice?");
    if (!ok) return;
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/notice/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      fetchnotice();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  /* level config */
  const levelConfig = {
    Urgent: {
      badge: "bg-red-500/15 text-red-400 border-red-500/30",
      accent: "from-red-500/30 to-transparent",
      border: "border-red-500/30",
      glow: "hover:shadow-[0_8px_32px_rgba(239,68,68,0.12)]",
      Icon: ExclamationTriangleIcon,
      iconBg: "bg-red-500/15 border-red-500/25",
      iconColor: "text-red-400",
      dot: "bg-red-400",
    },
    Important: {
      badge: "bg-amber-500/15 text-amber-400 border-amber-500/30",
      accent: "from-amber-500/30 to-transparent",
      border: "border-amber-500/30",
      glow: "hover:shadow-[0_8px_32px_rgba(245,158,11,0.12)]",
      Icon: InformationCircleIcon,
      iconBg: "bg-amber-500/15 border-amber-500/25",
      iconColor: "text-amber-400",
      dot: "bg-amber-400",
    },
    General: {
      badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
      accent: "from-emerald-500/20 to-transparent",
      border: "border-emerald-500/25",
      glow: "hover:shadow-[0_8px_32px_rgba(52,211,153,0.10)]",
      Icon: CheckCircleIcon,
      iconBg: "bg-emerald-500/15 border-emerald-500/25",
      iconColor: "text-emerald-400",
      dot: "bg-emerald-400",
    },
  };

  const getConfig = (level) => levelConfig[level] || levelConfig["General"];

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    return isNaN(d)
      ? dateStr
      : d.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
  };

  const levels = ["All", "Urgent", "Important", "General"];
  const filtered =
    filter === "All" ? noticedata : noticedata.filter((n) => n.Level === filter);

  /* counts */
  const counts = levels.reduce((acc, l) => {
    acc[l] = l === "All" ? noticedata.length : noticedata.filter((n) => n.Level === l).length;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#070B17] text-white relative overflow-hidden">
      {/* Ambient blobs */}
      <div className="pointer-events-none fixed -top-32 -left-32 w-[420px] h-[420px] bg-purple-700/20 rounded-full blur-[160px] z-0" />
      <div className="pointer-events-none fixed -bottom-32 -right-32 w-[420px] h-[420px] bg-cyan-600/15 rounded-full blur-[160px] z-0" />

      <div className="relative z-10 p-4 md:p-8 max-w-[1200px] mx-auto space-y-6">

        {/* ── Page Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Notice Board</h1>
            <p className="text-[13px] text-white/40 mt-1">
              All announcements and notices for students and staff.
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg
            bg-white/[0.04] border border-white/[0.08] text-[12px] text-white/40 self-start">
            <MegaphoneIcon className="w-3.5 h-3.5" />
            {noticedata.length} notices
          </div>
        </div>

        {/* ── Stat strip ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Total",     count: counts.All,       dot: "bg-purple-400",  bg: "bg-purple-500/10 border-purple-500/20" },
            { label: "Urgent",    count: counts.Urgent,    dot: "bg-red-400",     bg: "bg-red-500/10 border-red-500/20" },
            { label: "Important", count: counts.Important, dot: "bg-amber-400",   bg: "bg-amber-500/10 border-amber-500/20" },
            { label: "General",   count: counts.General,   dot: "bg-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
          ].map(({ label, count, dot, bg }) => (
            <div key={label}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${bg}
                bg-white/[0.02]`}>
              <span className={`w-2 h-2 rounded-full shrink-0 ${dot}`} />
              <div>
                <p className="text-[11px] text-white/40 uppercase tracking-widest">{label}</p>
                <p className="text-lg font-bold text-white leading-none mt-0.5">{count}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Filter tabs ── */}
        <div className="flex items-center gap-2 flex-wrap">
          <FunnelIcon className="w-4 h-4 text-white/30 shrink-0" />
          {levels.map((l) => (
            <button
              key={l}
              onClick={() => setFilter(l)}
              className={`px-3.5 py-1.5 rounded-xl text-[12px] font-medium border
                transition-all duration-150
                ${filter === l
                  ? "bg-purple-600/30 border-purple-500/40 text-purple-300"
                  : "bg-white/[0.04] border-white/[0.08] text-white/50 hover:text-white/80 hover:bg-white/[0.07]"
                }`}
            >
              {l}
              <span className="ml-1.5 text-[10px] opacity-60">({counts[l]})</span>
            </button>
          ))}
        </div>

        {/* ── Notice grid ── */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24
            bg-white/[0.02] border border-white/[0.07] rounded-2xl text-white/20">
            <MegaphoneIcon className="w-14 h-14 mb-4" />
            <p className="text-sm font-medium">No notices found</p>
            <p className="text-[12px] mt-1">
              {filter === "All" ? "No notices have been posted yet" : `No ${filter} notices`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filtered.map((n, idx) => {
              const cfg = getConfig(n.Level);
              const { Icon } = cfg;
              return (
                <div
                  key={n._id}
                  className={`group relative bg-white/[0.03] border ${cfg.border}
                    rounded-2xl overflow-hidden
                    hover:-translate-y-0.5 ${cfg.glow}
                    transition-all duration-200`}
                >
                  {/* top gradient accent line */}
                  <div className={`absolute top-0 left-0 right-0 h-px
                    bg-gradient-to-r ${cfg.accent}`} />

                  {/* left accent bar */}
                  <div className={`absolute top-0 left-0 bottom-0 w-0.5
                    bg-gradient-to-b ${cfg.accent}`} />

                  <div className="p-5 pl-6">
                    {/* header row */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        {/* icon */}
                        <div className={`w-9 h-9 rounded-xl border flex items-center
                          justify-center shrink-0 mt-0.5 ${cfg.iconBg}`}>
                          <Icon className={`w-4 h-4 ${cfg.iconColor}`} />
                        </div>
                        {/* title */}
                        <div className="min-w-0">
                          <h3 className="text-[15px] font-semibold text-white leading-snug
                            truncate">
                            {n.Title}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`inline-flex items-center gap-1 text-[11px]
                              font-semibold px-2 py-0.5 rounded-lg border ${cfg.badge}`}>
                              <span className={`w-1 h-1 rounded-full ${cfg.dot}`} />
                              {n.Level || "General"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* index chip */}
                      <span className="w-6 h-6 rounded-lg bg-white/[0.06] border
                        border-white/[0.09] flex items-center justify-center
                        text-[10px] font-bold text-white/25 shrink-0">
                        {idx + 1}
                      </span>
                    </div>

                    {/* description */}
                    <p className="text-[13px] text-white/55 leading-relaxed pl-12">
                      {n.Description}
                    </p>

                    {/* footer */}
                    <div className="flex items-center justify-between mt-4 pt-3
                      border-t border-white/[0.07] pl-12">
                      <div className="flex items-center gap-1.5 text-[11px] text-white/30">
                        <CalendarDaysIcon className="w-3.5 h-3.5" />
                        {formatDate(n.createdAt)}
                      </div>
                      <button
                        onClick={() => deleteNotice(n._id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                          text-[12px] font-medium text-red-400/60
                          hover:text-red-400 hover:bg-red-500/10
                          border border-transparent hover:border-red-500/20
                          transition-all duration-150 active:scale-95"
                      >
                        <TrashIcon className="w-3.5 h-3.5" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Notice;