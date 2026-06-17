//  import React, { useState } from "react"
// import { useNavigate } from "react-router-dom"
// import axios from "axios"

// function Login() {
//   const [Username, setUsername] = useState("")
//   const [Password, setPassword] = useState("")
//   const navigate = useNavigate()

//   const handleLogin = async (e) => {
//     e.preventDefault()

//     try {
//       const res = await axios.post("http://localhost:5001/api/login", {
//         Username,
//         Password,
//       })

//       const role = res.data.role

//       if (role === "admin") navigate("/admin")
//       else if (role === "teacher") navigate("/teacher")
//       else if (role === "student") navigate("/student")

//     } catch (err) {
//       alert("Invalid email or password")
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600">
//       <div className="bg-white p-10 rounded-2xl shadow-xl w-96">
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
//           Student Management Login
//         </h2>

//         <form onSubmit={handleLogin} className="flex flex-col">
//           <input
//             type="text"
//             placeholder="Username"
//             value={Username}
//             onChange={e => setUsername(e.target.value)}
//             className="mb-4 p-3 rounded-lg border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-indigo-400"
//             required
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={e => setPassword(e.target.value)}
//             className="mb-6 p-3 rounded-lg border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-indigo-400"
//             required
//           />

//           <button
//             type="submit"
//             className="bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-semibold text-lg"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default Login
 import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GraduationCap, User, Lock } from "lucide-react";

function Login() {
  const [Username, setUsername] = useState("");  // Capital U
  const [Password, setPassword] = useState("");  // Capital P
  const navigate = useNavigate();
 const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/login`,
      { Username, Password },
      { withCredentials: true }
    );

    console.log("LOGIN RES 👉", res.data);

    const role = res.data.role;

    if (role === "admin") navigate("/admin");
    else if (role === "teacher") navigate("/teacher");
    else if (role === "student") navigate("/student");
    else alert("Role not recognized");

  } catch (err) {
    console.log("LOGIN ERROR 👉", err.response?.data || err.message);
    alert("Invalid Username or Password");
  }
};

  return (
  <div className="min-h-screen bg-[#0b1020] relative overflow-hidden">

    {/* Background */}
    <div className="absolute inset-0">
      <img
        src="https://images.unsplash.com/photo-1562774053-701939374585"
        alt=""
        className="w-full h-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-black/60"></div>
    </div>

    {/* Blur Effects */}
    <div className="absolute top-0 left-0 w-80 h-80 bg-purple-600/30 rounded-full blur-[120px]" />
    <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-600/30 rounded-full blur-[120px]" />

    <div className="relative z-10 min-h-screen flex items-center justify-center p-4">

      <div className="w-full max-w-6xl bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[35px] overflow-hidden grid lg:grid-cols-2 shadow-2xl">

        {/* Left */}
        <div className="hidden lg:flex flex-col justify-center p-16 text-white">

          <div className="flex items-center gap-4 mb-10">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center">
              <GraduationCap size={30}/>
            </div>

            <div>
              <h1 className="text-3xl font-bold">
                Campus<span className="text-purple-400">Pro</span>
              </h1>

              <p className="text-slate-400">
                Student Management System
              </p>
            </div>
          </div>

          <h1 className="text-6xl font-bold leading-tight mb-8">
            Smart Campus <br />
            Better <span className="text-purple-400">Future</span>
          </h1>

          <p className="text-slate-300 text-lg leading-8">
            Manage students, teachers and academics with one modern ERP platform.
          </p>

        </div>

        {/* Right */}
        <div className="flex items-center justify-center p-6 md:p-10">

          <div className="w-full max-w-md">

            <div className="lg:hidden flex items-center justify-center mb-8">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center">
                <GraduationCap size={28} className="text-white"/>
              </div>
            </div>

            <div className="bg-white/10 border border-white/10 rounded-[30px] p-8 backdrop-blur-xl">

              <h2 className="text-4xl font-bold text-white mb-3">
                Welcome Back
              </h2>

              <p className="text-slate-400 mb-8">
                Login to continue
              </p>

              <form onSubmit={handleLogin} className="space-y-5">

                {/* Username */}
                <div className="h-16 rounded-2xl bg-white/10 border border-white/10 flex items-center px-5">

                  <User className="text-slate-400" size={20}/>

                  <input
                    type="text"
                    placeholder="Username"
                    value={Username}
                    onChange={(e)=>setUsername(e.target.value)}
                    className="bg-transparent outline-none ml-4 text-white w-full placeholder:text-slate-500"
                    required
                  />
                </div>

                {/* Password */}
                <div className="h-16 rounded-2xl bg-white/10 border border-white/10 flex items-center px-5">

                  <Lock className="text-slate-400" size={20}/>

                  <input
                    type="password"
                    placeholder="Password"
                    value={Password}
                    onChange={(e)=>setPassword(e.target.value)}
                    className="bg-transparent outline-none ml-4 text-white w-full placeholder:text-slate-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-16 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold text-lg hover:scale-[1.02] duration-300"
                >
                  Login
                </button>

              </form>

              <div className="text-center mt-8 text-slate-500 text-sm">
                Student • Teacher • Admin Portal
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  </div>
);
}

export default Login;
