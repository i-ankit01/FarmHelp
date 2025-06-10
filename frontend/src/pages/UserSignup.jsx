import React, { useState } from "react";
import Header from "../components/header";
import { Link, useNavigate } from "react-router-dom";
import { ButtonLink } from "../components/ButtonLink";

export function UserSignup({ className, ...props }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNo: "",
    aadhar: "",
    land: "",
    crops: [],
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Crop Selection
  const handleCropChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      crops: checked
        ? [...prev.crops, value]
        : prev.crops.filter((crop) => crop !== value),
    }));
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
  
    try {
      const response = await fetch(`${backendUrl}/api/v1/farmer/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      console.log("Response:", data); // Log the response
  
      if (response.ok) {
        alert("Signup Successful!");
        navigate("/signin/user");
      } else {
        setError(data.message || "Signup failed!");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Something went wrong! Try again.");
    }
  };
  

  return (
    <>
      <Header />
      <div className="w-full mt-5 flex justify-center items-center">
        <ButtonLink text="Company? Sign Up as Company" to="/signup/company" />
      </div>

      <div className="flex justify-center items-center mt-5">
        <div className={`flex flex-col gap-6 w-full max-w-lg ${className}`} {...props}>
          <div className="border rounded-lg overflow-hidden">
            <div className="p-6 md:p-8">
              <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Create an Account</h1>
                  <p className="text-gray-600">Sign up for Farm Help</p>
                </div>

                {/* First Name & Last Name */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-medium">First Name</label>
                    <input name="firstName" type="text" required className="p-2 border rounded-md w-full" onChange={handleChange} />
                  </div>
                  <div>
                    <label className="font-medium">Last Name</label>
                    <input name="lastName" type="text" required className="p-2 border rounded-md w-full" onChange={handleChange} />
                  </div>
                </div>

                {/* Email */}
                <div className="grid gap-2">
                  <label className="font-medium">Email</label>
                  <input name="email" type="email" required className="p-2 border rounded-md w-full" onChange={handleChange} />
                </div>

                {/* Contact No. & Aadhar No. */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-medium">Contact No.</label>
                    <input name="contactNo" type="text" required className="p-2 border rounded-md w-full" onChange={handleChange} />
                  </div>
                  <div>
                    <label className="font-medium">Aadhar Card No.</label>
                    <input name="aadhar" type="text" required className="p-2 border rounded-md w-full" onChange={handleChange} />
                  </div>
                </div>

                {/* Land in Acres */}
                <div className="grid gap-2">
                  <label className="font-medium">Land in Acres</label>
                  <input name="land" type="number" required className="p-2 border rounded-md w-full" onChange={handleChange} />
                </div>

                {/* Crop Selection */}
                <div className="grid gap-2">
                  <label className="font-medium">Select the crops which you grow:</label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Rice", "Wheat", "Barley", "Oats", "Pulse", "Maize", "Sugarcane", "Others"].map((crop) => (
                      <label key={crop} className="flex items-center">
                        <input type="checkbox" value={crop} onChange={handleCropChange} className="mr-2" /> {crop}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Password & Confirm Password */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-medium">Password</label>
                    <input name="password" type="password" required className="p-2 border rounded-md w-full" onChange={handleChange} />
                  </div>
                  <div>
                    <label className="font-medium">Confirm Password</label>
                    <input name="confirmPassword" type="password" required className="p-2 border rounded-md w-full" onChange={handleChange} />
                  </div>
                </div>

                {/* Show Error (if any) */}
                {error && <p className="text-red-600 text-center">{error}</p>}

                {/* Signup Button */}
                <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded-md">
                  Sign Up
                </button>

                {/* Already have an account? */}
                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <Link to="/signin/user" className="underline hover:text-blue-600">Login</Link>
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
