import React from "react";
import Header from "../components/Header";

import "remixicon/fonts/remixicon.css";
import { Link } from "react-router-dom";
import { ButtonLink } from "../components/ButtonLink";

export function CompanySignup({ className, ...props }) {
  return (
    <>
      <Header />
      <div className="w-full mt-5 flex justify-center items-center">
            <ButtonLink text="User? Sign Up as User" to="/signup/user" />
            </div>
      <div className="flex justify-center items-center mt-5">
        <div className={`flex flex-col gap-6 w-full max-w-lg ${className}`} {...props}>
          <div className="border rounded-lg overflow-hidden">
            <div className="p-6 md:p-8">
              {/* Signup Form */}
              <form className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Register Your Company</h1>
                  <p className="text-gray-600">Sign up for Farm Help</p>
                </div>

                {/* First Name & Last Name */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="first-name" className="font-medium">First Name</label>
                    <input id="first-name" type="text" required className="p-2 border rounded-md w-full" />
                  </div>
                  <div>
                    <label htmlFor="last-name" className="font-medium">Last Name</label>
                    <input id="last-name" type="text" required className="p-2 border rounded-md w-full" />
                  </div>
                </div>

                {/* Email */}
                <div className="grid gap-2">
                  <label htmlFor="email" className="font-medium">Email</label>
                  <input id="email" type="email" required className="p-2 border rounded-md w-full" />
                </div>

                {/* Contact No. */}
                <div className="grid gap-2">
                  <label htmlFor="contact" className="font-medium">Contact No.</label>
                  <input id="contact" type="text" required className="p-2 border rounded-md w-full" />
                </div>

                {/* Company Name */}
                <div className="grid gap-2">
                  <label htmlFor="company-name" className="font-medium">Company Name</label>
                  <input id="company-name" type="text" required className="p-2 border rounded-md w-full" />
                </div>

                {/* GST Number */}
                <div className="grid gap-2">
                  <label htmlFor="gst-number" className="font-medium">GST Number</label>
                  <input id="gst-number" type="text" required className="p-2 border rounded-md w-full" />
                </div>

                {/* Password & Confirm Password */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="password" className="font-medium">Password</label>
                    <input id="password" type="password" required className="p-2 border rounded-md w-full" />
                  </div>
                  <div>
                    <label htmlFor="confirm-password" className="font-medium">Confirm Password</label>
                    <input id="confirm-password" type="password" required className="p-2 border rounded-md w-full" />
                  </div>
                </div>

                {/* Signup Button */}
                <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded-md">
                  Sign Up
                </button>

                {/* Already have an account? */}
                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <Link to="/signin/company" className="underline hover:text-blue-600">Login</Link>
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
