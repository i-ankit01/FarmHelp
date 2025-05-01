"use client"

import { useState } from "react"
import { Leaf, Mail, Lock, ArrowRight, Tractor, TreesIcon as Plant, Sun, Cloud, ChevronRight } from "lucide-react"
// import farmIllustration from "./assets/farm-illustration.png"
import "../animations/animation.css"

function NewUserLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Replace with your actual API endpoint
      const response = await fetch("https://your-api-endpoint.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Authentication failed")
      }

      // Handle successful login
      console.log("Login successful:", data)
      // You can store the token in localStorage or cookies
      localStorage.setItem("authToken", data.token)
      // Redirect to dashboard or home page
      // window.location.href = '/dashboard'
    } catch (err) {
      setError(err.message || "Failed to authenticate. Please try again.")
      console.error("Login error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const redirectToCompanyLogin = () => {
    // Redirect to company login page
    window.location.href = "/company-login"
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Left side - Illustrations and animations */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-green-600 to-emerald-700 items-center justify-center p-12">
        <div className="relative z-10 text-white">
          <div className="text-4xl font-bold mb-6 fade-in">
            <span className="flex items-center gap-2">
              <Leaf className="text-yellow-300" />
              FarmHelp
            </span>
          </div>

          <h2 className="text-2xl mb-6 fade-in delay-300">Connecting Farmers Directly to Companies</h2>

          <div className="fade-in delay-600">
            <p className="text-lg mb-8">Eliminate middlemen and maximize your profits</p>

            <ul className="space-y-4">
              {[
                "Direct access to companies",
                "Better prices for your crops",
                "Transparent transactions",
                "Secure payment system",
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

      {/* Right side - Sign in form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md fade-in">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-8 fade-in delay-200">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-green-600 rounded-full p-3 mr-3 rotate-animation">
                  <Leaf className="text-white" size={24} />
                </div>
                <h1 className="text-3xl font-bold text-gray-800">Farmer Login</h1>
              </div>

              <p className="text-gray-600 text-center mb-8">
                Sign in to connect with companies and sell your crops directly
              </p>

              {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 fade-in">{error}</div>}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative slide-in-left delay-400">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail className="text-green-600" size={18} />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Email Address"
                    required
                  />
                </div>

                <div className="relative slide-in-left delay-500">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="text-green-600" size={18} />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Password"
                    required
                  />
                </div>

                <div className="flex items-center justify-between fade-in delay-600">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                  <a href="#" className="text-sm font-medium text-green-600 hover:text-green-500">
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center button-scale fade-in delay-700"
                >
                  {isLoading ? <span className="loading-spinner mr-2"></span> : null}
                  <span>{isLoading ? "Signing In..." : "Sign In"}</span>
                  {!isLoading && <ArrowRight className="ml-2" size={18} />}
                </button>
              </form>

              <div className="mt-8 text-center fade-in delay-800">
                <p className="text-gray-600 mb-4">
                  Don't have an account?{" "}
                  <a href="#" className="text-green-600 font-medium">
                    Register now
                  </a>
                </p>

                <button
                  onClick={redirectToCompanyLogin}
                  className="inline-flex items-center justify-center text-sm font-medium text-green-700 hover:text-green-800 transition-colors"
                >
                  <span>Go to Company Login</span>
                  <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
            </div>

            <div className="bg-green-50 p-4 text-center text-sm text-gray-600 fade-in delay-900">
              By signing in, you agree to FarmHelp's Terms of Service and Privacy Policy
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewUserLogin
