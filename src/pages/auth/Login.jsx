import { useState } from "react";
import React from "react";
import { Eye, EyeOff } from "lucide-react";
import img8 from "../../assets/Gallery/img8.png"; // Doctor illustration
import logo from "../../assets/Gallery/logo asarsh.jpg"; // Logo image
import useLogin from "../../hooks/auth/useLogin";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function Login() {
  const [localLoading, setLocalLoading] = useState(false);
  const [email, setEmail] = useState("mayursanodiya@gmail.com");
  const [password, setPassword] = useState("pass@123");
  const [role, setRole] = useState("Editor"); // ✅ fixed destructuring
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { adminLogin, loading } = useLogin();

  const togglePassword = () => setShowPassword(!showPassword);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Enter your email");
      return;
    }
    adminLogin({ email, password, role, rememberMe });
  };

  return (
    <div className="h-full overflow-x-scroll bg-[#fde7e2] flex flex-col px-8 relative ">
      {/* Top Row: Logo */}
      <div className="flex items-center justify-between my-4">
        <img src={logo} alt="Sparsh Logo" className="w-16 h-auto" />
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center justify-center lg:px-10 flex-1">
        {/* Left Illustration */}
        <div className="relative overflow-visible">
          <div className="flex items-center overflow-x-visible overflow-y-hidden h-full">
            <img
              src={img8}
              alt="Doctor Illustration"
              className="h-auto max-h-full object-cover mx-auto"
            />
          </div>
        </div>

        {/* Right Form */}
        <div className="flex flex-col items-center w-full px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Welcome</h1>
          <p className="text-gray-600 mb-6">
            To the Dashboard of Sparsh Skin Clinic
          </p>

          <div className="bg-[#fceae4] w-full max-w-md p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-1">
              Sparsh Skin Care Admin
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Security Administration Access
            </p>

            <form className="space-y-4 text-start" onSubmit={handleLogin}>
              {/* Email */}
              <div>
                <label className="block font-medium">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email Address"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                />
              </div>

              {/* Password */}
              <div>
                <label className="font-medium">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your Password"
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                  />
                  <button
                    type="button"
                    onClick={togglePassword}
                    className="absolute right-3 top-3.5"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Remember Me and Forgot */}
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    id="remember"
                    className={`w-4 h-4 accent-orange-800 ${
                      localLoading || loading
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    disabled={localLoading || loading}
                  />
                  <label
                    htmlFor="remember"
                    className={`text-sm font-medium pl-2 ${
                      localLoading || loading
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                  >
                    Remember me
                  </label>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-blue-600 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-indigo-900 text-white py-2 rounded-md hover:bg-indigo-800 transition font-medium"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Log In"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 w-80 h-100 bg-[#8584D4] rounded-full translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute -bottom-15 right-0 w-40 h-40 bg-[#8584D4] rounded-full z-10"></div>
    </div>
  );
}
