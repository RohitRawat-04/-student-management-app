//  import React, { useEffect, useState } from "react";

// function Managestudent() {
//   const [update, setupdate] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:5001/api/student")
//       .then((res) => res.json())
//       .then((data) => setupdate(data))
//       .catch((err) => console.log(err));
//   }, []);

//   return (
//     <div className="flex  ">
//       <div className="border-2 flex flex-col gap-6 p-4">
//         {update.map((item, id) => (
//           <div key={id}>
//             <div  className="text-black border rounded w-screen pointer-courser border-black shadow-2xl"><h1>{item.Username}</h1>
//             <h1>{item.Password}</h1> </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Managestudent;
//  import React, { useEffect, useState } from "react";
// import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
 

// function Managestudent() {
//   const [students, setStudents] = useState([]);
//   const [editStudent, setEditStudent] = useState(null);

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const fetchStudents = async () => {
//     const res = await fetch("http://localhost:5001/api/student");
//     const data = await res.json();
//     setStudents(data);
//   };

//   const handleEdit = (student) => {
//     setEditStudent(student);
//   };
//  const handleDelete = (student) => {
//     setEditStudent(student);
//   };

//   const handleChange = (e) => {
//     setEditStudent({ ...editStudent, [e.target.name]: e.target.value });
//   };

//   const handleUpdate = async () => {
//     await fetch(`http://localhost:5001/api/student/${editStudent._id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(editStudent),
//     });
//     setEditStudent(null);
//     fetchStudents();
//   };

//   return (
//     <div className="p-6">
//       {/* TABLE */}
//       <table className="w-full border">
//         <thead className="bg-gray-200">
//           <tr>
//             <th>Name</th>
//             <th>Roll No</th>
//             <th>Course</th>
//             <th>Paid Fee</th>
//             <th>Total Fee</th>
//             <th>Gender</th>
//             <th>Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {students.map((s) => (
//             <tr key={s._id} className="border bg-amber-200">
//               <td>{s.Name}</td>
//               <td>{s.Rollno}</td>
//               <td>{s.Course}</td>
//               <td>{s.Paidfee}</td>
//               <td>{s.Totalfee}</td>
//               <td>{s.Gender}</td>
//               <td>
//                 <button
//                   onClick={() => handleEdit(s)}
//                   className="bg-blue-500 text-white px-3 py-1 rounded bg-white"
//                 >
//                   <PencilIcon className="h-5 w-5"/>
//                 </button>
//               </td>
//               {/* delete icon */}
//                 <td>
//                 <button
//                   onClick={() => handleDelete(s)}
//                   className="bg-blue-500 text-white px-3 py-1 rounded bg-white"
//                 >
//                   < TrashIcon className="h-5 w-5"/>
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* EDIT FORM */}
//       {editStudent && (
//         <div className="bg-gradient-to-b from-blue-400 to-pink-200 p-4 mt-6">
//           <div className="grid gap-4 grid-cols-2 md:grid-cols-4">

//             <Input label="Username" name="Username" value={editStudent.Username} onChange={handleChange} />
//             <Input label="Password" name="Password" value={editStudent.Password} onChange={handleChange} />
//             <Input label="Name" name="Name" value={editStudent.Name} onChange={handleChange} />
//             <Input label="Rollno" name="Rollno" value={editStudent.Rollno} onChange={handleChange} />
//             <Input label="Course" name="Course" value={editStudent.Course} onChange={handleChange} />
//             <Input label="Paidfee" name="Paidfee" value={editStudent.Paidfee} onChange={handleChange} />
//             <Input label="Totalfee" name="Totalfee" value={editStudent.Totalfee} onChange={handleChange} />
//             <Input label="Gender" name="Gender" value={editStudent.Gender} onChange={handleChange} />
//             <Input label="Role" name="Role" value={editStudent.Role} onChange={handleChange} />

//           </div>

//           <button
//             onClick={handleUpdate}
//             className="bg-green-600 text-white px-6 py-2 mt-4 rounded"
//           >
//             Update Student
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// /* Reusable Input Component */
// const Input = ({ label, name, value, onChange }) => (
//   <div>
//     <h2 className="text-black">{label}</h2>
//     <input
//       className="border-2 border-black rounded w-full"
//       name={name}
//       value={value}
//       onChange={onChange}
//     />
//   </div>
// );

// export default Managestudent;

//chatgpt 
import React, { useEffect, useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  UsersIcon,
  MagnifyingGlassIcon,
  AcademicCapIcon,
  CurrencyRupeeIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  UserCircleIcon,
  HashtagIcon,
  EnvelopeIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";

/* ── Reusable dark input ── */
const Input = ({ label, name, value, onChange, Icon, type = "text" }) => (
  <div className="space-y-1.5">
    <label className="text-[11px] font-semibold text-white/40 uppercase tracking-widest">
      {label}
    </label>
    <div className="flex items-center gap-3 bg-white/[0.05] border border-white/[0.09]
      rounded-xl px-4 py-3 focus-within:border-purple-500/50 focus-within:bg-purple-500/[0.06]
      transition-all duration-200">
      {Icon && <Icon className="w-4 h-4 text-white/30 shrink-0" />}
      <input
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        className="bg-transparent outline-none text-white text-sm w-full placeholder:text-white/25"
      />
    </div>
  </div>
);

/* ── Gender / fee helpers ── */
const genderBadge = (g = "") => {
  const v = g.toLowerCase();
  if (v === "male")   return "bg-blue-500/15 text-blue-400 border-blue-500/25";
  if (v === "female") return "bg-pink-500/15 text-pink-400 border-pink-500/25";
  return "bg-white/[0.06] text-white/40 border-white/[0.09]";
};

const semBadgeColors = [
  "bg-cyan-500/15 text-cyan-400 border-cyan-500/25",
  "bg-purple-500/15 text-purple-400 border-purple-500/25",
  "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  "bg-amber-500/15 text-amber-400 border-amber-500/25",
  "bg-rose-500/15 text-rose-400 border-rose-500/25",
  "bg-indigo-500/15 text-indigo-400 border-indigo-500/25",
  "bg-teal-500/15 text-teal-400 border-teal-500/25",
  "bg-orange-500/15 text-orange-400 border-orange-500/25",
];

const avatarGradients = [
  "from-purple-500 to-indigo-600",
  "from-emerald-500 to-teal-600",
  "from-cyan-500 to-blue-600",
  "from-amber-500 to-orange-600",
  "from-rose-500 to-pink-600",
];

const initials = (name = "") =>
  name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase() || "?";

/* ════════════════════════════════════════════════════════════════ */
function Managestudent() {
  const [students, setStudents] = useState([]);
  const [editStudent, setEditStudent] = useState(null);
  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => { fetchStudents(); }, [page]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/course`);
        setCourses(res.data);
      } catch (err) { console.error(err); }
    };
    fetchCourses();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/student?page=${page}`);
      setStudents(res.data);
    } catch (err) { console.error(err); }
  };

  const handleEdit = (student) => {
    setEditStudent({ ...student, Course: student.Course?._id || "" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    await axios.delete(`${import.meta.env.VITE_API_URL}/api/student/${id}`);
    fetchStudents();
  };

  const handleChange = (e) => {
    setEditStudent({ ...editStudent, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/student/${editStudent._id}`, editStudent);
      setEditStudent(null);
      fetchStudents();
    } catch (err) {
      console.error(err);
      alert("Update failed ❌");
    }
  };

  const filtered = students.filter((s) =>
    [s.Name, s.Email, s.Rollno, s.Course?.Coursename].some((v) =>
      (v ?? "").toLowerCase().includes(search.toLowerCase())
    )
  );

  /* fee progress */
  const feePercent = (paid, total) => {
    const p = parseFloat(paid) || 0;
    const t = parseFloat(total) || 0;
    return t > 0 ? Math.min((p / t) * 100, 100) : 0;
  };

  return (
    <div className="min-h-screen bg-[#070B17] text-white relative overflow-hidden">
      {/* Ambient blobs */}
      <div className="pointer-events-none fixed -top-32 -left-32 w-[420px] h-[420px] bg-purple-700/20 rounded-full blur-[160px] z-0" />
      <div className="pointer-events-none fixed -bottom-32 -right-32 w-[420px] h-[420px] bg-cyan-600/15 rounded-full blur-[160px] z-0" />

      <div className="relative z-10 p-4 md:p-8 max-w-[1500px] mx-auto space-y-6">

        {/* ── Page Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Manage Students</h1>
            <p className="text-[13px] text-white/40 mt-1">
              View, edit and remove student records.
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg
            bg-white/[0.04] border border-white/[0.08] text-[12px] text-white/40 self-start">
            <UsersIcon className="w-3.5 h-3.5" />
            {students.length} students · Page {page}
          </div>
        </div>

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
                <h2 className="text-[14px] font-bold text-white leading-none">Student Records</h2>
                <p className="text-[11px] text-white/35 mt-0.5">
                  {filtered.length} of {students.length} shown
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
                placeholder="Search by name, roll, email…"
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
                  {search ? "No students match your search" : "No students found"}
                </p>
                <p className="text-[12px] mt-1">
                  {search ? "Try a different keyword" : "Add students via the Add Student form"}
                </p>
              </div>
            ) : (
              <table className="w-full text-sm min-w-[1000px]">
                <thead>
                  <tr className="border-b border-white/[0.07] bg-white/[0.03]">
                    {["#", "Student", "Email", "Roll No", "Course", "Fee", "Semester", "Gender", "Actions"].map((h) => (
                      <th key={h} className="text-left px-5 py-3.5 text-[11px] font-semibold
                        text-white/35 uppercase tracking-widest whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.05]">
                  {filtered.map((s, i) => {
                    const pct = feePercent(s.Paidfee, s.Totalfee);
                    const semColor = semBadgeColors[(Number(s.Semester) - 1) % semBadgeColors.length]
                      || semBadgeColors[i % semBadgeColors.length];
                    return (
                      <tr key={s._id}
                        className="group hover:bg-white/[0.04] transition-colors duration-150">

                        {/* index */}
                        <td className="px-5 py-4">
                          <span className="text-[11px] text-white/25 font-medium">{(page - 1) * 10 + i + 1}</span>
                        </td>

                        {/* student */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-xl bg-gradient-to-br
                              ${avatarGradients[i % avatarGradients.length]}
                              flex items-center justify-center text-[11px] font-bold shrink-0 shadow-md`}>
                              {initials(s.Name)}
                            </div>
                            <span className="text-[13px] font-semibold text-white whitespace-nowrap">
                              {s.Name || "—"}
                            </span>
                          </div>
                        </td>

                        {/* email */}
                        <td className="px-5 py-4">
                          <span className="text-[13px] text-cyan-400/80 whitespace-nowrap">
                            {s.Email || "—"}
                          </span>
                        </td>

                        {/* roll */}
                        <td className="px-5 py-4">
                          <span className="inline-flex items-center gap-1 text-[12px]
                            px-2 py-0.5 rounded-md bg-white/[0.06] border border-white/[0.09]
                            text-white/50 font-mono">
                            {s.Rollno || "—"}
                          </span>
                        </td>

                        {/* course */}
                        <td className="px-5 py-4">
                          <span className="inline-flex items-center gap-1.5 text-[12px]
                            px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20
                            text-indigo-400 whitespace-nowrap">
                            <AcademicCapIcon className="w-3 h-3" />
                            {s.Course?.Coursename || "N/A"}
                          </span>
                        </td>

                        {/* fee */}
                        <td className="px-5 py-4 min-w-[120px]">
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="text-emerald-400 font-medium">
                                ₹{Number(s.Paidfee || 0).toLocaleString("en-IN")}
                              </span>
                              <span className={`font-semibold text-[10px] ${pct >= 100 ? "text-emerald-400" : "text-amber-400"}`}>
                                {pct.toFixed(0)}%
                              </span>
                            </div>
                            <div className="w-full h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all duration-500
                                  ${pct >= 100 ? "bg-emerald-400" : "bg-gradient-to-r from-amber-400 to-orange-500"}`}
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <p className="text-[10px] text-white/25">
                              of ₹{Number(s.Totalfee || 0).toLocaleString("en-IN")}
                            </p>
                          </div>
                        </td>

                        {/* semester */}
                        <td className="px-5 py-4">
                          <span className={`inline-flex items-center text-[12px] font-medium
                            px-2.5 py-1 rounded-lg border ${semColor}`}>
                            Sem {s.Semester || "—"}
                          </span>
                        </td>

                        {/* gender */}
                        <td className="px-5 py-4">
                          <span className={`inline-flex items-center text-[12px] font-medium
                            px-2.5 py-1 rounded-lg border whitespace-nowrap ${genderBadge(s.Gender)}`}>
                            {s.Gender || "—"}
                          </span>
                        </td>

                        {/* actions */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <button onClick={() => handleEdit(s)}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px]
                                font-medium text-amber-400 bg-amber-500/10 border border-amber-500/20
                                hover:bg-amber-500/20 hover:border-amber-500/35
                                transition-all duration-150 active:scale-95">
                              <PencilIcon className="w-3.5 h-3.5" />
                              Edit
                            </button>
                            <button onClick={() => handleDelete(s._id)}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px]
                                font-medium text-red-400 bg-red-500/10 border border-red-500/20
                                hover:bg-red-500/20 hover:border-red-500/35
                                transition-all duration-150 active:scale-95">
                              <TrashIcon className="w-3.5 h-3.5" />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>

          {/* footer / pagination */}
          <div className="px-5 py-4 border-t border-white/[0.07] bg-white/[0.02]
            flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[11px] text-white/25">
              Showing <span className="text-white/40 font-medium">{filtered.length}</span> records
              on page <span className="text-white/40 font-medium">{page}</span>
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-medium
                  bg-white/[0.05] border border-white/[0.09] text-white/60
                  hover:bg-white/[0.09] hover:text-white disabled:opacity-30
                  disabled:cursor-not-allowed transition-all duration-150">
                <ChevronLeftIcon className="w-4 h-4" />
                Prev
              </button>

              <div className="px-4 py-2 rounded-xl text-[13px] font-semibold
                bg-purple-600/25 border border-purple-500/40 text-purple-300 min-w-[44px] text-center">
                {page}
              </div>

              <button
                onClick={() => setPage(page + 1)}
                disabled={students.length === 0}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-medium
                  bg-white/[0.05] border border-white/[0.09] text-white/60
                  hover:bg-white/[0.09] hover:text-white disabled:opacity-30
                  disabled:cursor-not-allowed transition-all duration-150">
                Next
                <ChevronRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ════ EDIT MODAL ════ */}
      {editStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && setEditStudent(null)}>
          {/* backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

          <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto
            bg-[#0D1221] border border-white/[0.1] rounded-2xl shadow-[0_0_100px_rgba(0,0,0,0.8)]
            [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb]:bg-white/10">

            {/* modal header */}
            <div className="sticky top-0 z-10 px-6 py-5 border-b border-white/[0.07]
              bg-[#0D1221]/95 backdrop-blur-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/25
                  flex items-center justify-center shrink-0">
                  <PencilIcon className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <h2 className="text-[15px] font-bold text-white leading-none">Edit Student</h2>
                  <p className="text-[11px] text-white/35 mt-0.5">
                    Updating record for <span className="text-white/60">{editStudent.Name}</span>
                  </p>
                </div>
              </div>
              <button onClick={() => setEditStudent(null)}
                className="p-2 rounded-xl hover:bg-white/[0.08] border border-transparent
                  hover:border-white/10 transition-all duration-150 text-white/50 hover:text-white">
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            {/* modal body */}
            <div className="p-6 space-y-6">

              {/* Personal */}
              <div className="bg-white/[0.02] border border-white/[0.07] rounded-2xl overflow-hidden">
                <div className="px-5 py-3 border-b border-white/[0.07] bg-purple-500/[0.05]
                  flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-purple-400/70">
                    Personal Details
                  </p>
                </div>
                <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Full Name"  name="Name"   value={editStudent.Name}   onChange={handleChange} Icon={UserCircleIcon} />
                  <Input label="Email"      name="Email"  value={editStudent.Email}  onChange={handleChange} Icon={EnvelopeIcon} />
                  <Input label="Roll No"    name="Rollno" value={editStudent.Rollno} onChange={handleChange} Icon={HashtagIcon} />
                  <Input label="Gender"     name="Gender" value={editStudent.Gender} onChange={handleChange} Icon={UsersIcon} />
                </div>
              </div>

              {/* Academic */}
              <div className="bg-white/[0.02] border border-white/[0.07] rounded-2xl overflow-hidden">
                <div className="px-5 py-3 border-b border-white/[0.07] bg-indigo-500/[0.05]
                  flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-400/70">
                    Academic Details
                  </p>
                </div>
                <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Semester" name="Semester" value={editStudent.Semester} onChange={handleChange} Icon={AcademicCapIcon} />

                  {/* Course select */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-white/40 uppercase tracking-widest">
                      Course
                    </label>
                    <div className="flex items-center gap-3 bg-white/[0.05] border border-white/[0.09]
                      rounded-xl px-4 py-3 focus-within:border-purple-500/50
                      focus-within:bg-purple-500/[0.06] transition-all duration-200">
                      <AcademicCapIcon className="w-4 h-4 text-white/30 shrink-0" />
                      <select
                        name="Course"
                        value={editStudent.Course}
                        onChange={handleChange}
                        className="bg-transparent outline-none text-white text-sm w-full
                          appearance-none cursor-pointer [&>option]:bg-[#0D1221] [&>option]:text-white">
                        <option value="">Select course</option>
                        {courses.map((c) => (
                          <option key={c._id} value={c._id}>{c.Coursename}</option>
                        ))}
                      </select>
                      <svg className="w-4 h-4 text-white/30 shrink-0 pointer-events-none"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fee */}
              <div className="bg-white/[0.02] border border-white/[0.07] rounded-2xl overflow-hidden">
                <div className="px-5 py-3 border-b border-white/[0.07] bg-emerald-500/[0.05]
                  flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-400/70">
                    Fee Information
                  </p>
                </div>
                <div className="p-5 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label="Paid Fee"  name="Paidfee"  value={editStudent.Paidfee}  onChange={handleChange} Icon={CurrencyRupeeIcon} type="number" />
                    <Input label="Total Fee" name="Totalfee" value={editStudent.Totalfee} onChange={handleChange} Icon={CurrencyRupeeIcon} type="number" />
                  </div>
                  {/* live fee bar */}
                  {(editStudent.Paidfee || editStudent.Totalfee) && (() => {
                    const pct = feePercent(editStudent.Paidfee, editStudent.Totalfee);
                    return (
                      <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-4 space-y-2">
                        <div className="flex justify-between text-[12px]">
                          <span className="text-white/40">Fee Progress</span>
                          <span className={`font-semibold ${pct >= 100 ? "text-emerald-400" : "text-amber-400"}`}>
                            {pct.toFixed(0)}% Paid
                          </span>
                        </div>
                        <div className="w-full h-2 bg-white/[0.08] rounded-full overflow-hidden">
                          <div className={`h-full rounded-full transition-all duration-500
                            ${pct >= 100 ? "bg-emerald-400" : "bg-gradient-to-r from-amber-400 to-orange-500"}`}
                            style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* action buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-end gap-3
                pt-2 border-t border-white/[0.07]">
                <button onClick={() => setEditStudent(null)}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-[13px] font-medium
                    text-white/50 hover:text-white/80 bg-white/[0.04] hover:bg-white/[0.07]
                    border border-white/[0.08] hover:border-white/[0.15] transition-all duration-150">
                  Cancel
                </button>
                <button onClick={handleUpdate}
                  className="w-full sm:w-auto px-8 py-2.5 rounded-xl text-[13px] font-semibold
                    bg-gradient-to-r from-emerald-600 to-teal-600
                    hover:from-emerald-500 hover:to-teal-500
                    active:scale-[0.98] shadow-lg shadow-emerald-500/25
                    transition-all duration-200 flex items-center justify-center gap-2">
                  <CheckCircleIcon className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Managestudent;