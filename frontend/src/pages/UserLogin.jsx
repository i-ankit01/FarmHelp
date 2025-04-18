import React, { useState } from "react";
import Header from "../components/header";
import "remixicon/fonts/remixicon.css";
import { Link, useNavigate } from "react-router-dom";
import { ButtonLink } from "../components/ButtonLink";
import API_BASE_URL from "../config";

export function UserLogin({ className, ...props }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("button clicked")
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/farmer/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include", // Ensures cookies (JWT) are saved
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store token & navigate to dashboard
      localStorage.setItem("token", data.token);
      navigate("/dashboard/user") // Change this to your actual dashboard route
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <>
      <Header />
      <div className="w-full mt-5 flex justify-center items-center">
        <ButtonLink text="Company? Login as Company" to="/signin/company" />
      </div>
      <div className="flex justify-center items-center mt-5">
        <div
          className={`flex flex-col gap-6 w-full max-w-lg ${className}`}
          {...props}
        >
          <div className="border rounded-lg overflow-hidden">
            <div className="p-6 md:p-8">
              {/* Login Form */}
              <form className="flex flex-col gap-6" onSubmit={handleSubmit} >
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">
                    Welcome back (User Login)
                  </h1>
                  <p className="text-gray-600">
                    Login to your Farm Help account
                  </p>
                </div>

                {/* Email */}
                <div className="grid gap-2">
                  <label htmlFor="email" className="font-medium">
                    Email
                  </label>
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
                    <label htmlFor="password" className="font-medium">
                      Password
                    </label>
                    <a
                      href="#"
                      className="ml-auto text-sm underline hover:text-blue-600"
                    >
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
                  <span className="bg-white px-2 text-gray-500">
                    Or continue with
                  </span>
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
                  <Link
                    to="/signup/user"
                    className="underline hover:text-blue-600"
                  >
                    Sign up
                  </Link>
                </div>
              </form>
            </div>
          </div>

          {/* Terms & Conditions */}
         
        </div>
      </div>
    </>
  );
}
