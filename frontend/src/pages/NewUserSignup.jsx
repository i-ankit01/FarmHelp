"use client"

import { useState } from "react"
import {
  Leaf,
  Mail,
  Lock,
  User,
  Phone,
  CreditCard,
  MapPin,
  Wheat,
  ArrowRight,
  Tractor,
  TreesIcon as Plant,
  Sun,
  Cloud,
  ChevronRight,
} from "lucide-react"
import "../animations/animation.css"

function NewUserSignup() {
  // Change the formData state initialization to have cropGrown as an array
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNo: "",
    aadharNo: "",
    landAcres: "",
    cropGrown: [],
    password: "",
    confirmPassword: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [passwordMatch, setPasswordMatch] = useState(true)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Check password match when either password field changes
    if (name === "password" || name === "confirmPassword") {
      if (name === "confirmPassword" && value !== formData.password) {
        setPasswordMatch(false)
      } else if (name === "password" && value !== formData.confirmPassword && formData.confirmPassword) {
        setPasswordMatch(false)
      } else {
        setPasswordMatch(true)
      }
    }
  }

  // Add a new handler for checkbox changes
  const handleCropChange = (crop) => {
    setFormData((prev) => {
      // If the crop is already selected, remove it; otherwise, add it
      if (prev.cropGrown.includes(crop)) {
        return {
          ...prev,
          cropGrown: prev.cropGrown.filter((item) => item !== crop),
        }
      } else {
        return {
          ...prev,
          cropGrown: [...prev.cropGrown, crop],
        }
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // Replace with your actual API endpoint
      const response = await fetch("https://your-api-endpoint.com/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Registration failed")
      }

      // Handle successful registration
      console.log("Registration successful:", data)
      // You can redirect to login page or dashboard
      // window.location.href = '/login'
      alert("Registration successful! Please login to continue.")
    } catch (err) {
      setError(err.message || "Failed to register. Please try again.")
      console.error("Registration error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const redirectToLogin = () => {
    // Redirect to login page
    window.location.href = "/login"
  }

  const cropOptions = ["Rice", "Wheat", "Barley", "Oats", "Pulse", "Maize", "Sugarcane", "Others"]

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Left side - Illustrations and animations */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-green-600 to-emerald-700 justify-center p-12">
        <div className="relative z-10 text-white mt-24">
          <div className="text-4xl font-bold mb-6 fade-in">
            <span className="flex items-center gap-2">
              <Leaf className="text-yellow-300" />
              FarmHelp
            </span>
          </div>

          <h2 className="text-2xl mb-6 fade-in delay-300">Join Our Farming Community</h2>

          <div className="fade-in delay-600">
            <p className="text-lg mb-8">
              Register to connect directly with companies and get the best prices for your crops
            </p>

            <ul className="space-y-4">
              {[
                "Eliminate middlemen completely",
                "Get market updates and price alerts",
                "Secure and transparent transactions",
                "Access to premium buyers nationwide",
              ].map((item, index) => (
                <li key={index} className={`flex items-center gap-2 slide-in-left delay-${800 + index * 200}`}>
                  <ChevronRight className="text-yellow-300" size={18} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Background animations */}
        <div className="absolute right-10 top-20 float-animation">
          <Sun size={60} className="text-yellow-300 opacity-80" />
        </div>

        <div className="absolute left-20 bottom-40 float-animation-slow">
          <Cloud size={50} className="text-white opacity-30" />
        </div>

        <div className="absolute right-40 bottom-60 float-animation-reverse">
          <Cloud size={40} className="text-white opacity-20" />
        </div>

        <div className="absolute left-40 bottom-20 float-animation-medium">
          <Tractor size={80} className="text-yellow-400 opacity-70" />
        </div>

        <div className="absolute right-20 bottom-30 float-animation">
          <Plant size={70} className="text-green-300 opacity-70" />
        </div>

        {/* Farm illustration */}
        <img
          src={ "/placeholder.svg"}
          alt="Farm Illustration"
          className="absolute bottom-0 left-0 w-full opacity-20 object-cover"
        />
      </div>

      {/* Right side - Sign up form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md fade-in">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-8 fade-in delay-200">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-green-600 rounded-full p-3 mr-3 rotate-animation">
                  <Wheat className="text-white" size={24} />
                </div>
                <h1 className="text-3xl font-bold text-gray-800">Farmer Registration</h1>
              </div>

              <p className="text-gray-600 text-center mb-8">
                Create your account to get started
              </p>

              {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 fade-in">{error}</div>}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative slide-in-left delay-300">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <User className="text-green-600" size={18} />
                    </div>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="First Name"
                      required
                    />
                  </div>
                  <div className="relative slide-in-left delay-400">
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="Last Name"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="relative slide-in-left delay-500">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail className="text-green-600" size={18} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Email Address"
                    required
                  />
                </div>

                {/* Contact Number */}
                <div className="relative slide-in-left delay-600">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Phone className="text-green-600" size={18} />
                  </div>
                  <input
                    type="tel"
                    name="contactNo"
                    value={formData.contactNo}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Contact Number"
                    required
                  />
                </div>

                {/* Aadhar Number */}
                <div className="relative slide-in-left delay-700">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <CreditCard className="text-green-600" size={18} />
                  </div>
                  <input
                    type="text"
                    name="aadharNo"
                    value={formData.aadharNo}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Aadhar Number"
                    required
                  />
                </div>

                {/* Land in Acres */}
                <div className="relative slide-in-left delay-800">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <MapPin className="text-green-600" size={18} />
                  </div>
                  <input
                    type="number"
                    name="landAcres"
                    value={formData.landAcres}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Land in Acres"
                    required
                  />
                </div>

                {/* Crop Selection */}
                <div className="slide-in-left delay-900">
                  <label className="block text-md font-medium text-gray-700 mb-2 flex items-center">
                    <Wheat className="text-green-600 mr-2" size={18} />
                    Select the crops you grow
                  </label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {cropOptions.map((crop) => (
                      <div key={crop} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`crop-${crop}`}
                          checked={formData.cropGrown.includes(crop)}
                          onChange={() => handleCropChange(crop)}
                          className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`crop-${crop}`} className="ml-2 block text-sm text-gray-700">
                          {crop}
                        </label>
                      </div>
                    ))}
                  </div>
                  {formData.cropGrown.length === 0 && (
                    <p className="text-red-500 text-xs mt-1">Please select at least one crop</p>
                  )}
                </div>

                {/* Password */}
                <div className="relative slide-in-left delay-1000">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="text-green-600" size={18} />
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Password"
                    required
                  />
                </div>

                {/* Confirm Password */}
                <div className="relative slide-in-left delay-1100">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="text-green-600" size={18} />
                  </div>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 bg-gray-50 border ${!passwordMatch ? "border-red-400" : "border-gray-200"} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all`}
                    placeholder="Confirm Password"
                    required
                  />
                  {!passwordMatch && <p className="text-red-500 text-xs mt-1">Passwords do not match</p>}
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !passwordMatch || formData.cropGrown.length === 0}
                  className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center button-scale fade-in delay-1200 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? <span className="loading-spinner mr-2"></span> : null}
                  <span>{isLoading ? "Registering..." : "Create Account"}</span>
                  {!isLoading && <ArrowRight className="ml-2" size={18} />}
                </button>
              </form>

              <div className="mt-8 text-center fade-in delay-1300">
                <p className="text-gray-600 mb-4">
                  Already have an account?{" "}
                  <button onClick={redirectToLogin} className="text-green-600 font-medium hover:underline">
                    Sign in
                  </button>
                </p>
              </div>
            </div>

            <div className="bg-green-50 p-4 text-center text-sm text-gray-600 fade-in delay-1400">
              By signing up, you agree to FarmHelp's Terms of Service and Privacy Policy
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewUserSignup
