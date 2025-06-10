import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import "remixicon/fonts/remixicon.css";
import { Link } from "react-router-dom";
import { ButtonLink } from "../components/ButtonLink";
import axios from "axios";

export function CompanyLogin({ className, ...props }) {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      const response = await axios.post(`${backendUrl}/api/v1/company/login`, {
        email,
        password,
      }, { withCredentials: true });
      console.log(response)

      if (response.data.success) {
        localStorage.setItem("company_token", response.data.token);
        navigate("/dashboard/company"); // Redirect to dashboard after login
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <>
      <Header />
      <div className="w-full mt-5 flex justify-center items-center">
        <ButtonLink text="User? Login as User" to="/signin/user" />
      </div>
      <div className="flex justify-center items-center mt-5">
        <div className={`flex flex-col gap-6 w-full max-w-lg ${className}`} {...props}>
          <div className="border rounded-lg overflow-hidden">
            <div className="p-6 md:p-8">
              {/* Login Form */}
              <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Welcome back (Company Login)</h1>
                  <p className="text-gray-600">Login to your Farm Help account</p>
                </div>

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                {/* Email */}
                <div className="grid gap-2">
                  <label htmlFor="email" className="font-medium">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="user@gmail.com"
                    required
                    className="p-2 border rounded-md w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {/* Password */}
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <label htmlFor="password" className="font-medium">Password</label>
                    <a href="#" className="ml-auto text-sm underline hover:text-blue-600">
                      Forgot your password?
                    </a>
                  </div>
                  <input
                    id="password"
                    type="password"
                    required
                    className="p-2 border rounded-md w-full"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded-md"
                >
                  Login
                </button>

                {/* OR Divider */}
                <div className="relative text-center text-sm">
                  <span className="bg-white px-2 text-gray-500">Or continue with</span>
                </div>

                {/* Social Login Buttons */}
                <div className="grid grid-cols-3 gap-4">
                  <button className="w-18 cursor-pointer border p-1 rounded-md flex justify-center items-center hover:bg-gray-100 transition">
                    <i className="ri-apple-fill text-2xl"></i>
                  </button>
                  <button className="w-18 cursor-pointer border p-1 rounded-md flex justify-center items-center hover:bg-gray-100 transition">
                    <i className="ri-google-fill text-2xl"></i>
                  </button>
                  <button className="w-18 cursor-pointer border p-1 rounded-md flex justify-center items-center hover:bg-gray-100 transition">
                    <i className="ri-meta-fill text-2xl"></i>
                  </button>
                </div>

                {/* Signup Link */}
                <div className="text-center text-sm">
                  Don't have an account?{" "}
                  <Link to="/signup/company" className="underline hover:text-blue-600">
                    Sign up
                  </Link>
                </div>
              </form>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="text-center text-xs text-gray-500">
            By clicking continue, you agree to our{" "}
            <a href="#" className="underline hover:text-blue-600">Terms of Service</a>{" "}
            and{" "}
            <a href="#" className="underline hover:text-blue-600">Privacy Policy</a>.
          </div>
        </div>
      </div>
    </>
  );
}