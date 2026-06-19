  import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  MegaphoneIcon,
  UserCircleIcon,
  PaperAirplaneIcon,
  PlusCircleIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  BellAlertIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

function Notify() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");

  const [notice, setNotice] = useState({
    Title: "",
    Description: "",
    Level: "",
  });

  const [specific, setSpecific] = useState({
    title: "",
    description: "",
    level: "",
  });

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/student`)
      .then((res) => setStudents(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNotice((prev) => ({ ...prev, [name]: value }));
  };

  const handleSpecificChange = (e) => {
    const { name, value } = e.target;
    setSpecific((prev) => ({ ...prev, [name]: value }));
  };

  const submitNotice = async () => {
    await axios.post(`${import.meta.env.VITE_API_URL}/api/notice`, notice);
    setNotice({ Title: "", Description: "", Level: "" });
    alert("Notice added");
  };

  const submitSpecificNotice = async () => {
    if (!selectedStudent) {
      alert("Select a student first");
      return;
    }
    await axios.post(`${import.meta.env.VITE_API_URL}/api/specific`, {
      Studentid: selectedStudent,
      title: specific.title,
      description: specific.description,
    });
    setSpecific({ title: "", description: "", level: "" });
    setSelectedStudent("");
    alert("Email sent");
  };

  /* level config */
  const levelConfig = {
    Normal: {
      icon: <CheckCircleIcon className="w-4 h-4" />,
      badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    },
    Important: {
      icon: <InformationCircleIcon className="w-4 h-4" />,
      badge: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    },
    Urgent: {
      icon: <ExclamationTriangleIcon className="w-4 h-4" />,
      badge: "bg-red-500/15 text-red-400 border-red-500/30",
    },
  };

  const selectedStudentName = students.find((s) => s._id === selectedStudent);

  const fieldWrap =
    "flex items-start gap-3 bg-white/[0.05] border border-white/[0.09] rounded-xl px-4 py-3 focus-within:border-purple-500/50 focus-within:bg-purple-500/[0.06] transition-all duration-200";
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
            <h1 className="text-2xl font-bold tracking-tight text-white">Notifications</h1>
            <p className="text-[13px] text-white/40 mt-1">
              Broadcast notices to all students or send targeted emails to individuals.
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg
            bg-white/[0.04] border border-white/[0.08] text-[12px] text-white/40 self-start">
            <BellAlertIcon className="w-3.5 h-3.5" />
            {students.length} students registered
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* ════ GENERAL NOTICE ════ */}
          <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden
            shadow-[0_0_60px_rgba(0,0,0,0.3)]">

            {/* panel header */}
            <div className="px-6 py-5 border-b border-white/[0.07] bg-purple-500/[0.05]
              flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/25
                flex items-center justify-center shrink-0">
                <MegaphoneIcon className="w-4 h-4 text-purple-400" />
              </div>
              <div>
                <h2 className="text-[15px] font-bold text-white leading-none">Create Notice</h2>
                <p className="text-[11px] text-white/35 mt-0.5">
                  Broadcast to all students on the notice board
                </p>
              </div>
            </div>

            <div className="p-6 space-y-4">

              {/* Title */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-white/40 uppercase tracking-widest">
                  Notice Title
                </label>
                <div className={fieldWrap}>
                  <DocumentTextIcon className="w-4 h-4 text-white/30 shrink-0 mt-0.5" />
                  <input
                    type="text"
                    name="Title"
                    placeholder="e.g. Exam Schedule Released"
                    value={notice.Title}
                    onChange={handleChange}
                    className={inputBase}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-white/40 uppercase tracking-widest">
                  Description
                </label>
                <div className={fieldWrap}>
                  <DocumentTextIcon className="w-4 h-4 text-white/30 shrink-0 mt-0.5" />
                  <textarea
                    name="Description"
                    placeholder="Write the full notice content here…"
                    value={notice.Description}
                    onChange={handleChange}
                    rows={4}
                    className={`${inputBase} resize-none`}
                  />
                </div>
              </div>

              {/* Level */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-white/40 uppercase tracking-widest">
                  Priority Level
                </label>
                <div className={fieldWrap}>
                  <ExclamationTriangleIcon className="w-4 h-4 text-white/30 shrink-0 mt-0.5" />
                  <select
                    name="Level"
                    value={notice.Level}
                    onChange={handleChange}
                    className={`${inputBase} appearance-none cursor-pointer
                      [&>option]:bg-[#0D1221] [&>option]:text-white`}
                  >
                    <option value="">Select priority level</option>
                    <option>Normal</option>
                    <option>Important</option>
                    <option>Urgent</option>
                  </select>
                  <svg className="w-4 h-4 text-white/30 shrink-0 pointer-events-none mt-0.5"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {/* level preview badge */}
                {notice.Level && levelConfig[notice.Level] && (
                  <div className={`inline-flex items-center gap-1.5 text-[11px] font-medium
                    px-2.5 py-1 rounded-lg border ${levelConfig[notice.Level].badge}`}>
                    {levelConfig[notice.Level].icon}
                    {notice.Level} priority
                  </div>
                )}
              </div>

              {/* Submit */}
              <button
                onClick={submitNotice}
                className="w-full py-3 rounded-xl text-[14px] font-semibold mt-1
                  bg-gradient-to-r from-purple-600 to-indigo-600
                  hover:from-purple-500 hover:to-indigo-500
                  active:scale-[0.98] shadow-lg shadow-purple-500/25
                  transition-all duration-200 flex items-center justify-center gap-2"
              >
                <PlusCircleIcon className="w-4 h-4" />
                Publish Notice
              </button>
            </div>
          </div>

          {/* ════ SPECIFIC STUDENT NOTICE ════ */}
          <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden
            shadow-[0_0_60px_rgba(0,0,0,0.3)]">

            {/* panel header */}
            <div className="px-6 py-5 border-b border-white/[0.07] bg-emerald-500/[0.04]
              flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/25
                flex items-center justify-center shrink-0">
                <EnvelopeIcon className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <h2 className="text-[15px] font-bold text-white leading-none">
                  Student Direct Email
                </h2>
                <p className="text-[11px] text-white/35 mt-0.5">
                  Send a targeted notice to a specific student
                </p>
              </div>
            </div>

            <div className="p-6 space-y-4">

              {/* Student select */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-white/40 uppercase tracking-widest">
                  Select Student
                </label>
                <div className={fieldWrap}>
                  <UserCircleIcon className="w-4 h-4 text-white/30 shrink-0 mt-0.5" />
                  <select
                    value={selectedStudent}
                    onChange={(e) => setSelectedStudent(e.target.value)}
                    className={`${inputBase} appearance-none cursor-pointer
                      [&>option]:bg-[#0D1221] [&>option]:text-white`}
                  >
                    <option value="">Choose a student…</option>
                    {students.map((stu) => (
                      <option key={stu._id} value={stu._id}>
                        {stu.Name} ({stu.Rollno})
                      </option>
                    ))}
                  </select>
                  <svg className="w-4 h-4 text-white/30 shrink-0 pointer-events-none mt-0.5"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {/* selected student chip */}
                {selectedStudentName && (
                  <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl
                    bg-emerald-500/10 border border-emerald-500/20">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600
                      flex items-center justify-center text-[11px] font-bold shrink-0">
                      {selectedStudentName.Name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[13px] font-semibold text-white truncate">
                        {selectedStudentName.Name}
                      </p>
                      <p className="text-[11px] text-white/40 truncate">
                        Roll: {selectedStudentName.Rollno} · {selectedStudentName.Email}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Title */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-white/40 uppercase tracking-widest">
                  Email Subject
                </label>
                <div className={fieldWrap}>
                  <DocumentTextIcon className="w-4 h-4 text-white/30 shrink-0 mt-0.5" />
                  <input
                    type="text"
                    name="title"
                    placeholder="e.g. Fee Payment Reminder"
                    value={specific.title}
                    onChange={handleSpecificChange}
                    className={inputBase}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-white/40 uppercase tracking-widest">
                  Message Body
                </label>
                <div className={fieldWrap}>
                  <DocumentTextIcon className="w-4 h-4 text-white/30 shrink-0 mt-0.5" />
                  <textarea
                    name="description"
                    placeholder="Write the email message here…"
                    value={specific.description}
                    onChange={handleSpecificChange}
                    rows={4}
                    className={`${inputBase} resize-none`}
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                onClick={submitSpecificNotice}
                className="w-full py-3 rounded-xl text-[14px] font-semibold mt-1
                  bg-gradient-to-r from-emerald-600 to-teal-600
                  hover:from-emerald-500 hover:to-teal-500
                  active:scale-[0.98] shadow-lg shadow-emerald-500/25
                  transition-all duration-200 flex items-center justify-center gap-2"
              >
                <PaperAirplaneIcon className="w-4 h-4" />
                Send Email
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Notify;