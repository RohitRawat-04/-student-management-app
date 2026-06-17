//   import React, { useState } from "react";
// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
//  import Subject from "./Subjects";
//   import Classes from "./Classes"
 

// function Admin() {
//   const [isopen, setisopen] = useState(false);
//   const [active,setactive]=useState("student")

//   return ( <>
//  {/* outerdiv*/}
//   <div className="flex">
//     {/* slidebar*/ }
// <div className={`fixed top-0 left-0 h-full w-60 ${
//     isopen?"translate-x-0":"-translate-x-full"
// } transition-transform duration-300`}>
// <div className="bg-gray-400 w-full">
//     <h3>Admin Panel</h3>
//     <ul className="flex flex-col">
//         <li className="cursor-pointer">home</li>
//         <li onClick={()=>setactive("student")}>course</li>
//         <li onClick={()=>setactive("subject")}>subjects</li>
//         <li>Add Subject</li>
//         <li> Add Student</li>
//         <li>view Attendace</li>
//         <li>student feedback</li>
//         <li>teacher feedback</li>
//         <li>logout</li>
//     </ul>
// </div>
// {isopen&&(<div className="inset-0 fixed bg-black opacity-40" onClick={()=>setisopen(false)}></div>)}
  
// </div>
// <div className="w-full"> 
//  {/* navbar */}
//  <div className="bg-blue-400 h-15 w-full flex p-3 place-content-between">
// <button onClick={()=>setisopen(!isopen)}>
//     {isopen?<Bars3Icon/>:<XMarkIcon/>}
// </button>
// <h1>admin dashord</h1>

//  </div>
//  <div className="pl-60">
     
//     <div className="pl-60 p-4">
 
//   {active === "student" && <Classes />}
//   {active === "subject" && <Subject />}
// </div>

//  </div>
//  </div>
//   </div>
  
//   </>
//   );
// }

// export default Admin;
 import React, { useEffect, useState } from "react";
import {
  Bars3Icon,
  XMarkIcon,
  BellIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

import Classes from "./Classes";
import Managestudent from "./Adminpannel/Managestudent";
import Addstudent from "./Add-student";
import StudentFeedback from "./Adminpannel/Studentfeedback";
import StaffFeedback from "./Adminpannel/Stafffeedback";
import Addstaff from "./Adminpannel/Addteacher";
import Managestaff from "./Adminpannel/Managestaff";
import Pie from "./Piechart";
import Studentpie from "./Studentpie";
import Subjects from "./Adminpannel/Subjects";
import Exams from "./Adminpannel/Exam";
import Notice from "./Adminpannel/Notice";
import Notify from "./Adminpannel/Notify";

import axios from "axios";
import { useNavigate } from "react-router-dom";

function Admin() {
  const [totalcourse,settotalcourse]=useState([])
  const [total,settotal]=useState([])
  const[subjectcount,setsubjectcount]=useState([])
  const [isopen, setisopen] = useState(false);
  const [active, setactive] = useState("home");
  const navigate=useNavigate()
  useEffect(() => {
    fetchstudent();
    fetchcourse();
    fetchsubject()
     axios.get(`${import.meta.env.VITE_API_URL}/api/authcheck` ,{ withCredentials: true })
    .catch(() => {
      navigate("/login");
    });
}, []);  
const fetchsubject=async()=>{
  const res=await fetch(`${import.meta.env.VITE_API_URL}/api/subject/stats`,{credentials:"include"})
  const data=await res.json();
  console.log(data)
  setsubjectcount(data);
}
const fetchstudent=async()=>{
  const res= await fetch(`${import.meta.env.VITE_API_URL}/api/stats/type`, {credentials: "include"})
  const data= await res.json()
  settotal(data)
  console.log(total)
}
const fetchcourse=async()=>{
  const res= await fetch(`${import.meta.env.VITE_API_URL}/api/course/stats` ,{credentials:"include"})
  const sdata= await res.json()
  settotalcourse(sdata)
  console.log(totalcourse)
}


const handlelogout=async()=>{
axios.post(`${import.meta.env.VITE_API_URL}/api/logout`,{},
   {withCredentials:true}
    
)
 
 navigate("/login")
}
  return (
    <div className="min-h-screen bg-[#0B1020] text-white relative overflow-hidden">
 <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[150px]"></div>

    <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-[150px]"></div>

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-screen w-72 overflow-y-auto
bg-white/5
backdrop-blur-2xl
border-r border-white/10
shadow-2xl
transition-all duration-300 z-50
${isopen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
`}
      >
         <h1 className="text-3xl font-bold p-6">
Admin<span className="text-purple-500">Pannel</span>
</h1>
        <ul className="space-y-3 px-4">
          <li onClick={() => setactive("home")} className=" cursor-pointer
bg-white/5
backdrop-blur-xl
border border-white/10
rounded-2xl
py-3
 hover:bg-purple-600/30
hover:border-purple-500
hover:translate-x-1
transition-all
duration-300
text-center">Home</li>
          <li onClick={() => setactive("classes")} className=" cursor-pointer
bg-white/5
backdrop-blur-xl
border border-white/10
rounded-2xl
py-3
 hover:bg-purple-600/30
hover:border-purple-500
hover:translate-x-1
transition-all
duration-300
text-center">Classes</li>
           
          <li onClick={() => setactive("subjects")} className=" cursor-pointer
bg-white/5
backdrop-blur-xl
border border-white/10
rounded-2xl
py-3
 hover:bg-purple-600/30
hover:border-purple-500
hover:translate-x-1
transition-all
duration-300
text-center">Subjects</li>
           <li onClick={() => setactive("addstudent")} className=" cursor-pointer
bg-white/5
backdrop-blur-xl
border border-white/10
rounded-2xl
py-3
 hover:bg-purple-600/30
hover:border-purple-500
hover:translate-x-1
transition-all
duration-300
text-center">Add-student</li>
            <li onClick={() => setactive("managestudent")} className="cursor-pointer
bg-white/5
backdrop-blur-xl
border border-white/10
rounded-2xl
py-3
 hover:bg-purple-600/30
hover:border-purple-500
hover:translate-x-1
transition-all
duration-300
text-center">Manage-student</li>
            <li onClick={() => setactive("addstaff")} className="cursor-pointer
bg-white/5
backdrop-blur-xl
border border-white/10
rounded-2xl
py-3
 hover:bg-purple-600/30
hover:border-purple-500
hover:translate-x-1
transition-all
duration-300
text-center">Add-Staff</li>
            <li onClick={() => setactive("managestaff")} className="cursor-pointer
bg-white/5
backdrop-blur-xl
border border-white/10
rounded-2xl
py-3
 hover:bg-purple-600/30
hover:border-purple-500
hover:translate-x-1
transition-all
duration-300
text-center">Manage-Staff</li>
            <li onClick={() => setactive("exam")} className="cursor-pointer
bg-white/5
backdrop-blur-xl
border border-white/10
rounded-2xl
py-3
 hover:bg-purple-600/30
hover:border-purple-500
hover:translate-x-1
transition-all
duration-300
text-center">Exam</li>
            <li onClick={() => setactive("studentfeedback")} className="cursor-pointer
bg-white/5
backdrop-blur-xl
border border-white/10
rounded-2xl
py-3
 hover:bg-purple-600/30
hover:border-purple-500
hover:translate-x-1
transition-all
duration-300
text-center">Student-feedback</li>
            <li onClick={() => setactive("stafffeedback")} className="cursor-pointer
bg-white/5
backdrop-blur-xl
border border-white/10
rounded-2xl
py-3
 hover:bg-purple-600/30
hover:border-purple-500
hover:translate-x-1
transition-all
duration-300
text-center">Staff-feedback</li>
            <li onClick={() => setactive("notice")} className="cursor-pointer
bg-white/5
backdrop-blur-xl
border border-white/10
rounded-2xl
py-3
 hover:bg-purple-600/30
hover:border-purple-500
hover:translate-x-1
transition-all
duration-300
text-center">Notify-Student</li>
            <li onClick={() => setactive("notify")} className="cursor-pointer
bg-white/5
backdrop-blur-xl
border border-white/10
rounded-2xl
py-3
 hover:bg-purple-600/30
hover:border-purple-500
hover:translate-x-1
transition-all
duration-300
text-center">Notify</li>
            <li onClick={handlelogout} className="cursor-pointer
bg-white/5
backdrop-blur-xl
border border-white/10
rounded-2xl
py-3
 hover:bg-purple-600/30
hover:border-purple-500
hover:translate-x-1
transition-all
duration-300
text-center">Logout</li>
        </ul>
      </div>

      {/* OVERLAY */}
      {isopen && (
        <div
          className="fixed inset-0 bg-black opacity-40"
          onClick={() => setisopen(false)}
        ></div>
      )}

      {/* MAIN CONTENT */}
      <div className="w-full md:ml-72 overflow-y-auto relative z-10">

        {/* NAVBAR */}
        <div className="h-20
px-8
flex
items-center
justify-between
bg-white/5
backdrop-blur-2xl
border-b border-white/10
sticky top-0 z-40">
          <button onClick={() => setisopen(!isopen)}>
            {isopen ? (
              <XMarkIcon className="h-8 w-8" />
            ) : (
              <Bars3Icon className="h-8 w-8" />
            )}
          </button>
          <h2 className="text-3xl font-bold">
Dashboard
</h2>
<div className="hidden md:flex items-center gap-4">

  <div className="
  bg-white/10
  border border-white/10
  rounded-2xl
  px-4 py-2
  flex items-center gap-3
  w-72">

    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400"/>

    <input
      type="text"
      placeholder="Search..."
      className="
      bg-transparent
      outline-none
      text-white
      w-full
      placeholder:text-gray-400"
    />
  </div>

  <BellIcon className="h-7 w-7 text-gray-300 cursor-pointer"/>
<div className="flex items-center gap-3">

<img
src="https://i.pravatar.cc/100"
className="w-11 h-11 rounded-full border border-purple-500"
/>

<div>
<h3 className="font-semibold">
Admin
</h3>

<p className="text-gray-400 text-sm">
Administrator
</p>

</div>

</div>
</div>
        </div>

        {/* PAGE CONTENT */}
        <div className="p-8 space-y-8 relative z-10">
    {active === "home" && (
  <div className="flex flex-col gap-10">

    {/* ===== STATS CARDS ===== */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white/5
backdrop-blur-2xl
border border-white/10
rounded-3xl
 shadow-[0_0_40px_rgba(34,211,238,.15)]
p-6
hover:scale-105
transition-all
duration-300">
        <h2 className="text-5xl font-bold text-cyan-400">{total.Student}</h2>
        <p className="text-lg mt-2 text-cyan-400" >Total Students</p>
      </div>

      <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_0_40px_rgba(74,222,128,.15)]   p-6 hover:scale-105 transition-all duration-300">
        <h2 className="text-4xl font-bold text-green-400">{total.Teachers}</h2>
        <p className="text-lg mt-2">Total Staff</p>
      </div>

      <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_0_40px_rgba(251,146,60,.15)]  p-6 hover:scale-105 transition-all duration-300">
        <h2 className="text-4xl font-bold text-orange-400">{subjectcount}</h2>
        <p className="text-lg mt-2">Total Subjects</p>
      </div>

      <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_0_40px_rgba(248,113,113,.15)]  p-6 hover:scale-105 transition-all duration-300">
        <h2 className="text-4xl font-bold text-red-400">{totalcourse}</h2>
        <p className="text-lg mt-2">Total Courses</p>
      </div>
    </div>

    {/* ===== CHART SECTION ===== */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white/5
backdrop-blur-2xl
border border-white/10
rounded-3xl
p-6">
        <h3 className="text-xl font-bold mb-4 text-white">
          📊 Students Overview
        </h3>
        <Pie />
      </div>

      <div className="bg-white/5
backdrop-blur-2xl
border border-white/10
rounded-3xl
p-6">
       <h3 className="text-xl font-bold mb-4 text-white">
👥 Gender Distribution
</h3>
        <Studentpie />
      </div>
    </div>

    {/* ===== NOTICE BOARD ===== */}
    <div className=" bg-white/5
backdrop-blur-2xl
border border-white/10
rounded-3xl
p-6
shadow-xl
hover:scale-[1.02]
transition-all duration-300">
      <Notice />
    </div>

  </div>
)}

            
          {active === "classes" && <Classes />}
          
          {active === "subjects" && <Subjects />}
          {active === "addstudent" && <Addstudent />} 
          {active === "managestudent" && <Managestudent />} 
          {active === "addstaff"&& <Addstaff/>}
          {active==="managestaff"&&<Managestaff/>}
           {active === "studentfeedback" && <StudentFeedback />} 
            {active === "stafffeedback" && <StaffFeedback/>} 
            {active === "exam" && <Exams/>}
            {active==="notice"&& <Notice/>}
              {active==="notify"&& <Notify/>}
               
        </div>

      </div>
    </div>
  );
}

export default Admin;
