 import React, { useEffect, useState } from "react";
import {
  ChatBubbleBottomCenterTextIcon,
  UserCircleIcon,
  PlusCircleIcon,
  MagnifyingGlassIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

function StaffFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [newFeedback, setNewFeedback] = useState({ staffName: "", message: "" });
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/feedback`);
      const data = await res.json();
      setFeedbacks(data);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newFeedback.staffName || !newFeedback.message) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFeedback),
      });
      const data = await res.json();
      setFeedbacks([...feedbacks, data]);
      setNewFeedback({ staffName: "", message: "" });
    } catch (error) {
      console.error("Error adding feedback:", error);
    }
  };

  const avatarGradients = [
    "from-purple-500 to-indigo-600",
    "from-emerald-500 to-teal-600",
    "from-cyan-500 to-blue-600",
    "from-amber-500 to-orange-600",
    "from-rose-500 to-pink-600",
  ];

  const initials = (name = "") =>
    name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase() || "?";

  const filtered = feedbacks.filter(
    (f) =>
      (f.staffName ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (f.message ?? "").toLowerCase().includes(search.toLowerCase())
  );

  const fieldWrap =
    "flex items-center gap-3 bg-white/[0.05] border border-white/[0.09] rounded-xl px-4 py-3 focus-within:border-purple-500/50 focus-within:bg-purple-500/[0.06] transition-all duration-200";
  const inputBase =
    "bg-transparent outline-none text-white text-sm w-full placeholder:text-white/25";

  return (
    <div className="min-h-screen bg-[#070B17] text-white relative overflow-hidden">
      {/* Ambient blobs */}
      <div className="pointer-events-none fixed -top-32 -left-32 w-[420px] h-[420px] bg-purple-700/20 rounded-full blur-[160px] z-0" />
      <div className="pointer-events-none fixed -bottom-32 -right-32 w-[420px] h-[420px] bg-cyan-600/15 rounded-full blur-[160px] z-0" />

      <div className="relative z-10 p-4 md:p-8 max-w-[1100px] mx-auto space-y-8">

        {/* ── Page Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Staff Feedback</h1>
            <p className="text-[13px] text-white/40 mt-1">
              Submit and review feedback from staff members.
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg
            bg-white/[0.04] border border-white/[0.08] text-[12px] text-white/40 self-start">
            <ChatBubbleBottomCenterTextIcon className="w-3.5 h-3.5" />
            {feedbacks.length} feedback entries
          </div>
        </div>

        {/* ── Add Feedback Form ── */}
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden
          shadow-[0_0_60px_rgba(0,0,0,0.3)]">

          {/* header */}
          <div className="px-6 py-5 border-b border-white/[0.07] bg-purple-500/[0.05]
            flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/25
              flex items-center justify-center shrink-0">
              <PlusCircleIcon className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <h2 className="text-[15px] font-bold text-white leading-none">Add Staff Feedback</h2>
              <p className="text-[11px] text-white/35 mt-0.5">
                Record a new feedback entry for a staff member
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* Staff Name */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-white/40 uppercase tracking-widest">
                  Staff Name
                </label>
                <div className={fieldWrap}>
                  <UserCircleIcon className="w-4 h-4 text-white/30 shrink-0" />
                  <input
                    type="text"
                    placeholder="e.g. Dr. Jane Smith"
                    value={newFeedback.staffName}
                    onChange={(e) =>
                      setNewFeedback({ ...newFeedback, staffName: e.target.value })
                    }
                    className={inputBase}
                  />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-white/40 uppercase tracking-widest">
                  Feedback Message
                </label>
                <div className={fieldWrap}>
                  <DocumentTextIcon className="w-4 h-4 text-white/30 shrink-0" />
                  <input
                    type="text"
                    placeholder="Write feedback here…"
                    value={newFeedback.message}
                    onChange={(e) =>
                      setNewFeedback({ ...newFeedback, message: e.target.value })
                    }
                    className={inputBase}
                  />
                </div>
              </div>
            </div>

            {/* preview strip */}
            {(newFeedback.staffName || newFeedback.message) && (
              <div className="mt-4 flex items-center gap-3 px-4 py-3 rounded-xl
                bg-white/[0.03] border border-white/[0.07]">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600
                  flex items-center justify-center text-[11px] font-bold shrink-0">
                  {initials(newFeedback.staffName)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-semibold text-white truncate leading-none">
                    {newFeedback.staffName || "Staff name…"}
                  </p>
                  <p className="text-[11px] text-white/40 mt-0.5 truncate">
                    {newFeedback.message || "No message yet"}
                  </p>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-lg bg-purple-500/15
                  border border-purple-500/20 text-purple-400 shrink-0">Preview</span>
              </div>
            )}

            <div className="mt-5 flex justify-end">
              <button
                type="submit"
                className="px-8 py-3 rounded-xl text-[14px] font-semibold
                  bg-gradient-to-r from-purple-600 to-indigo-600
                  hover:from-purple-500 hover:to-indigo-500
                  active:scale-[0.98] shadow-lg shadow-purple-500/25
                  transition-all duration-200 flex items-center gap-2"
              >
                <PlusCircleIcon className="w-4 h-4" />
                Submit Feedback
              </button>
            </div>
          </form>
        </div>

        {/* ── Feedback Table ── */}
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden
          shadow-[0_0_60px_rgba(0,0,0,0.3)]">

          {/* toolbar */}
          <div className="px-5 py-4 border-b border-white/[0.07] flex flex-col sm:flex-row
            sm:items-center gap-4">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-500/25
                flex items-center justify-center shrink-0">
                <ChatBubbleBottomCenterTextIcon className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <h2 className="text-[14px] font-bold text-white leading-none">
                  Feedback Records
                </h2>
                <p className="text-[11px] text-white/35 mt-0.5">
                  {filtered.length} of {feedbacks.length} entries
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
                placeholder="Search feedbacks…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none text-white text-[13px] w-full
                  placeholder:text-white/25"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="text-white/30 hover:text-white/60 transition-colors text-xs shrink-0"
                >✕</button>
              )}
            </div>
          </div>

          {/* table */}
          <div className="overflow-x-auto
            [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb]:bg-white/10">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-white/20">
                <ChatBubbleBottomCenterTextIcon className="w-14 h-14 mb-4" />
                <p className="text-sm font-medium">
                  {search ? "No feedback matches your search" : "No feedback submitted yet"}
                </p>
                <p className="text-[12px] mt-1">
                  {search ? "Try a different keyword" : "Use the form above to add staff feedback"}
                </p>
              </div>
            ) : (
              <table className="w-full text-sm min-w-[500px]">
                <thead>
                  <tr className="border-b border-white/[0.07] bg-white/[0.03]">
                    <th className="text-left px-5 py-3.5 text-[11px] font-semibold
                      text-white/35 uppercase tracking-widest w-10">#</th>
                    <th className="text-left px-5 py-3.5 text-[11px] font-semibold
                      text-white/35 uppercase tracking-widest">Staff Member</th>
                    <th className="text-left px-5 py-3.5 text-[11px] font-semibold
                      text-white/35 uppercase tracking-widest">Feedback Message</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.05]">
                  {filtered.map((f, i) => (
                    <tr
                      key={f._id}
                      className="group hover:bg-white/[0.04] transition-colors duration-150"
                    >
                      {/* index */}
                      <td className="px-5 py-4">
                        <span className="text-[11px] text-white/25 font-medium">{i + 1}</span>
                      </td>

                      {/* staff name */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-xl bg-gradient-to-br
                              ${avatarGradients[i % avatarGradients.length]}
                              flex items-center justify-center text-[11px] font-bold shrink-0 shadow-md`}
                          >
                            {initials(f.staffName)}
                          </div>
                          <span className="text-[13px] font-semibold text-white whitespace-nowrap">
                            {f.staffName || "—"}
                          </span>
                        </div>
                      </td>

                      {/* message */}
                      <td className="px-5 py-4">
                        <div className="flex items-start gap-2">
                          <ChatBubbleBottomCenterTextIcon
                            className="w-3.5 h-3.5 text-white/25 shrink-0 mt-0.5"
                          />
                          <span className="text-[13px] text-white/60 leading-relaxed">
                            {f.message || "—"}
                          </span>
                        </div>
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
                Showing{" "}
                <span className="text-white/40 font-medium">{filtered.length}</span>{" "}
                of{" "}
                <span className="text-white/40 font-medium">{feedbacks.length}</span>{" "}
                feedback entries
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

export default StaffFeedback;