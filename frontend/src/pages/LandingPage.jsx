"use client"

import { useState, useEffect } from "react"
import {
  ArrowRight,
  Leaf,
  TrendingUp,
  Users,
  Truck,
  Shield,
  Sun,
  Wheat,
  Apple,
  Carrot,
  Factory,
  Building,
  Sprout,
  Zap,
  User,
} from "lucide-react"
import farmerImage from '../assets/farmer.png'
import logo from "../assets//1749736593810.png"
import API_BASE_URL from "../config";


export default function LandingPage() {
  const [email, setEmail] = useState("")
  const [scrollY, setScrollY] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(()=>{
    fetch(`${API_BASE_URL}/api/v1/ping`)
    .then(console.log("backend up"))
    .catch((err)=> console.log("some error occured backend down", err))
  },[])

  // Handle scroll for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)

    // Set loaded state after a short delay for entrance animations
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 300)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(timer)
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-gradient-to-b from-green-50 via-yellow-50 to-blue-50">
      {/* Animated background elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute -bottom-20 right-1/3 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-3000"></div>
      </div>
      
      {/* Header/Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-lg">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <img className="w-16 h-16 object-cover" src={logo} alt="logo" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-400 bg-clip-text text-transparent">
              Farm Help
            </span>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#features" className="text-sm font-medium relative group">
              <span className="bg-gradient-to-r from-green-600 to-green-400 bg-[length:0%_2px] bg-no-repeat bg-left-bottom group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                Features
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#how-it-works" className="text-sm font-medium relative group">
              <span className="bg-gradient-to-r from-green-600 to-green-400 bg-[length:0%_2px] bg-no-repeat bg-left-bottom group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                How It Works
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#testimonials" className="text-sm font-medium relative group">
              <span className="bg-gradient-to-r from-green-600 to-green-400 bg-[length:0%_2px] bg-no-repeat bg-left-bottom group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                Testimonials
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#contact" className="text-sm font-medium relative group">
              <span className="bg-gradient-to-r from-green-600 to-green-400 bg-[length:0%_2px] bg-no-repeat bg-left-bottom group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                Contact
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 group-hover:w-full transition-all duration-300"></span>
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <a href="/signin/user">
              <button className="sm:flex h-10 px-4 py-2 rounded-full cursor-pointer border border-green-300 bg-white text-sm font-medium shadow-sm transition-all duration-300 hover:shadow-lg hover:border-green-400 hover:scale-105">
                Sign In
              </button>
            </a>
            <a href="/signup/user">
              <button className="hidden md:block h-10 px-4 py-2 rounded-full bg-gradient-to-r from-green-600 to-green-400 cursor-pointer text-white text-sm font-medium shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105 hover:from-green-500 hover:to-green-600">
                Sign Up
              </button>
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section className="relative w-full py-12 md:py-20 lg:py-28 xl:py-24 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-green-100/50 to-transparent"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://via.placeholder.com/1920x1080')] bg-cover bg-center opacity-10"></div>
          </div>


          <div className="container px-4 md:px-5 relative z-10">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2 items-center">
              <div className="flex flex-col justify-center space-y-4 transform translate-y-0 opacity-100 transition-all duration-1000 ease-out">
                <div className="inline-block">
                  <span className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-green-100 to-green-200 text-green-800 text-sm font-medium shadow-inner">
                    Revolutionizing Agriculture
                  </span>
                </div>
                <div className="space-y-2">
                  <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-green-700 via-green-500 to-orange-500 animate-gradient">
                    Direct Farm to Business Connection
                  </h1>
                  <p className="max-w-[600px] text-gray-700 md:text-xl relative ml-2 md:ml-0">
                    <span className="relative z-10 ">
                      Eliminate middlemen and maximize your profits. Connect directly with businesses looking for your
                      crops.
                    </span>
                    <span className="absolute -left-2 top-0 w-1 h-full bg-green-400 rounded-full"></span>
                  </p>
                </div>
                <div className="flex sm:flex-row gap-3 mt-2">
                  <a href="/signin/user">
                    <button className="inline-flex h-12 items-center justify-center cursor-pointer rounded-full bg-gradient-to-r from-green-600 to-green-400 px-8 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 hover:from-green-500 hover:to-green-300 group">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </a>
                  <a href="#how-it-works">
                    <button className="inline-flex h-12 items-center justify-center rounded-full border border-green-300 bg-white/80 backdrop-blur px-8 text-sm font-medium text-green-700 shadow-md transition-all duration-300 hover:shadow-lg hover:bg-white hover:scale-105">
                      Learn More
                    </button>
                  </a>
                </div>

                {/* Animated stats */}
                <div className="flex flex-wrap gap-4 mt-6">
                  <div className="bg-white/80 backdrop-blur rounded-xl px-4 py-2 shadow-md border border-green-100 animate-fade-in-up animation-delay-500">
                    <p className="text-xs text-gray-500">Farmers Onboard</p>
                    <p className="text-xl font-bold text-green-700">5,000+</p>
                  </div>
                  <div className="bg-white/80 backdrop-blur rounded-xl px-4 py-2 shadow-md border border-yellow-100 animate-fade-in-up animation-delay-700">
                    <p className="text-xs text-gray-500">Companies</p>
                    <p className="text-xl font-bold text-yellow-700">1,200+</p>
                  </div>
                  <div className="bg-white/80 backdrop-blur rounded-xl px-4 py-2 shadow-md border border-blue-100 animate-fade-in-up animation-delay-900">
                    <p className="text-xs text-gray-500">Transactions</p>
                    <p className="text-xl font-bold text-blue-700">₹10Cr+</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-300 to-yellow-300 rounded-full blur-3xl opacity-20 "></div>
                <div className="relative z-10 bg-white p-2 rounded-2xl shadow-2xl transform rotate-3 transition-all duration-500 hover:rotate-0 hover:scale-105">
                  <img
                    src={farmerImage}
                    alt="Farm Help Platform"
                    className="rounded-xl object-cover w-50"
                  />

                  {/* Decorative elements */}
                  <div className="absolute -top-6 -right-6 bg-yellow-400 rounded-full p-3 shadow-lg animate-bounce-slow">
                    <Sun className="h-6 w-6 text-white" />
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-green-500 rounded-full p-3 shadow-lg animate-bounce-slow animation-delay-1000">
                    <Leaf className="h-6 w-6 text-white" />
                  </div>
                </div>

                {/* Floating badges */}
                <div className="absolute md:-top-10 md:-right-10 -top-20 -right-1 bg-white rounded-lg px-3 py-2 shadow-lg animate-float animation-delay-1500">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-500" />
                    <span className="text-sm font-medium">Verified Farmers</span>
                  </div>
                </div>
                <div className="absolute -bottom-10 -left-10 bg-white rounded-lg px-3 py-2 shadow-lg animate-float animation-delay-2000">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    <span className="text-sm font-medium">40% Higher Profits</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-green-50 to-white opacity-70"></div>

          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-20 bg-[url('https://via.placeholder.com/1920x200')] bg-repeat-x opacity-10"></div>
          <div className="absolute bottom-0 left-0 w-full h-20 bg-[url('https://via.placeholder.com/1920x200')] bg-repeat-x opacity-10 transform rotate-180"></div>

          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-[800px]">
                <div className="inline-block rounded-full bg-gradient-to-r from-green-100 to-green-200 px-4 py-1.5 text-sm font-medium text-green-800 shadow-inner ">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-green-700 via-green-500 to-yellow-500 animate-gradient">
                  Why Choose Farm Help?
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl">
                  Our platform offers unique benefits for both farmers and businesses
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {/* Feature Card 1 */}
              <div className="group flex flex-col items-center space-y-4 rounded-xl border border-green-100 bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-green-300 animate-fade-in-up">
                <div className="rounded-full bg-gradient-to-r from-green-400 to-green-600 p-3 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-700 to-green-500">
                  Higher Profits
                </h3>
                <p className="text-center text-gray-600">
                  Eliminate middlemen and increase your profit margins by up to 40%
                </p>

                {/* Animated progress bar */}
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full animate-grow-width"></div>
                </div>
              </div>

              {/* Feature Card 2 */}
              <div className="group flex flex-col items-center space-y-4 rounded-xl border border-blue-100 bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-blue-300 animate-fade-in-up animation-delay-300">
                <div className="rounded-full bg-gradient-to-r from-blue-400 to-blue-600 p-3 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500">
                  Direct Connections
                </h3>
                <p className="text-center text-gray-600">
                  Build lasting relationships with businesses that value quality produce
                </p>

                {/* Connection lines animation */}
                <div className="relative w-full h-10">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-1/3 h-0.5 bg-blue-200 animate-grow-width"></div>
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></div>
                    <div className="w-1/3 h-0.5 bg-blue-200 animate-grow-width animation-delay-300"></div>
                  </div>
                </div>
              </div>

              {/* Feature Card 3 */}
              <div className="group flex flex-col items-center space-y-4 rounded-xl border border-yellow-100 bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-yellow-300 animate-fade-in-up animation-delay-600">
                <div className="rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 p-3 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                  <Truck className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-700 to-yellow-500">
                  Simplified Logistics
                </h3>
                <p className="text-center text-gray-600">Integrated tools for managing transportation and delivery</p>

                {/* Truck animation */}
                <div className="relative w-full h-6 overflow-hidden">
                  <div className="absolute top-0 left-0 animate-move-right">
                    <Truck className="h-6 w-6 text-yellow-500" />
                  </div>
                </div>
              </div>

              {/* Additional Feature Cards */}
              <div className="group flex flex-col items-center space-y-4 rounded-xl border border-purple-100 bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-purple-300 animate-fade-in-up animation-delay-900 md:col-span-2 lg:col-span-1">
                <div className="rounded-full bg-gradient-to-r from-purple-400 to-purple-600 p-3 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-purple-500">
                  Fast Payments
                </h3>
                <p className="text-center text-gray-600">Receive payments quickly and securely through our platform</p>
              </div>

              <div className="group flex flex-col items-center space-y-4 rounded-xl border border-red-100 bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-red-300 animate-fade-in-up animation-delay-1200">
                <div className="rounded-full bg-gradient-to-r from-red-400 to-red-600 p-3 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-700 to-red-500">
                  Secure Platform
                </h3>
                <p className="text-center text-gray-600">End-to-end encryption and verification for all transactions</p>
              </div>

              <div className="group flex flex-col items-center space-y-4 rounded-xl border border-orange-100 bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-orange-300 animate-fade-in-up animation-delay-1500">
                <div className="rounded-full bg-gradient-to-r from-orange-400 to-orange-600 p-3 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                  <Sprout className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-700 to-orange-500">
                  Growth Support
                </h3>
                <p className="text-center text-gray-600">Resources and tools to help your farm business grow</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-green-100/50 to-green-50/50"></div>

          {/* Decorative patterns */}
          <div className="absolute inset-0 bg-[url('https://via.placeholder.com/100x100')] bg-repeat opacity-5"></div>

          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-full bg-gradient-to-r from-green-100 to-green-200 px-4 py-1.5 text-sm font-medium text-green-800 shadow-inner ">
                  Process
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-green-700 via-green-500 to-yellow-500 animate-gradient">
                  How Farm Help Works
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl">
                  A simple three-step process to connect farmers with businesses
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 relative">
              {/* Connecting line */}
              <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-green-300 to-green-500 hidden lg:block">
                <div className="absolute top-0 left-0 w-full h-full bg-white animate-grow-width"></div>
              </div>

              {/* Step 1 */}
              <div className="relative flex flex-col items-center space-y-4 animate-fade-in-up">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white text-xl font-bold shadow-lg z-10 ">
                  1
                </div>
                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-700 to-green-500">
                  Create Your Profile
                </h3>
                <div className="bg-white rounded-xl p-4 border border-green-100 shadow-md w-full hover:shadow-lg transition-all duration-300 hover:border-green-300">
                  <p className="text-center text-gray-600">
                    Sign up and create a detailed profile showcasing your farm and produce
                  </p>
                </div>

                {/* Decorative icon */}
                <div className="absolute -bottom-4 -right-4 bg-green-100 rounded-full p-2 animate-float">
                  <User className="h-6 w-6 text-green-600" />
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative flex flex-col items-center space-y-4 animate-fade-in-up animation-delay-300">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-xl font-bold shadow-lg z-10  animation-delay-300">
                  2
                </div>
                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-700 to-yellow-500">
                  List Your Produce
                </h3>
                <div className="bg-white rounded-xl p-4 border border-yellow-100 shadow-md w-full hover:shadow-lg transition-all duration-300 hover:border-yellow-300">
                  <p className="text-center text-gray-600">
                    Add details about your available crops, quantities, and pricing
                  </p>
                </div>

                {/* Decorative icon */}
                <div className="absolute -bottom-4 -right-4 bg-yellow-100 rounded-full p-2 animate-float animation-delay-500">
                  <Wheat className="h-6 w-6 text-yellow-600" />
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative flex flex-col items-center space-y-4 animate-fade-in-up animation-delay-600">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xl font-bold shadow-lg z-10  animation-delay-600">
                  3
                </div>
                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500">
                  Connect & Sell
                </h3>
                <div className="bg-white rounded-xl p-4 border border-blue-100 shadow-md w-full hover:shadow-lg transition-all duration-300 hover:border-blue-300">
                  <p className="text-center text-gray-600">
                    Receive inquiries from businesses and negotiate deals directly
                  </p>
                </div>

                {/* Decorative icon */}
                <div className="absolute -bottom-4 -right-4 bg-blue-100 rounded-full p-2 animate-float animation-delay-1000">
                  <Building className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>

            {/* Process visualization */}
            <div className="mx-auto max-w-3xl bg-white rounded-2xl p-6 border border-green-200 shadow-lg mt-8 relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-green-100 rounded-full opacity-50"></div>
              <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-yellow-100 rounded-full opacity-50"></div>

              <h3 className="text-xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-700 to-blue-700">
                The Farm Help Ecosystem
              </h3>

              <div className=" flex flex-col md:grid grid-cols-2 gap-4 relative">
                {/* Farmer side */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="bg-green-500 rounded-full p-1.5">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <h4 className="font-bold text-green-800">Farmers</h4>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-green-500"></span>
                      <span>Create detailed farm profiles</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-green-500"></span>
                      <span>List available crops & quantities</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-green-500"></span>
                      <span>Set your own fair prices</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-green-500"></span>
                      <span>Receive direct payments</span>
                    </li>
                  </ul>
                </div>

                {/* Business side */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="bg-blue-500 rounded-full p-1.5">
                      <Building className="h-4 w-4 text-white" />
                    </div>
                    <h4 className="font-bold text-blue-800">Businesses</h4>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                      <span>Search for specific crops</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                      <span>Connect with verified farmers</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                      <span>Place orders & negotiate terms</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                      <span>Track deliveries in real-time</span>
                    </li>
                  </ul>
                </div>

                {/* Connection arrows */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full border border-gray-200 shadow-md flex items-center justify-center z-10">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full border-2 border-green-500 animate-ping opacity-75"></div>
                    <Zap className="h-5 w-5 text-yellow-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white to-blue-50/50"></div>

          {/* Decorative elements */}
          <div className="absolute top-10 left-10 animate-float-slow">
            <div className="text-6xl opacity-10">❝</div>
          </div>
          <div className="absolute bottom-10 right-10 animate-float-slow animation-delay-1000">
            <div className="text-6xl opacity-10">❞</div>
          </div>

          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-full bg-gradient-to-r from-blue-100 to-blue-200 px-4 py-1.5 text-sm font-medium text-blue-800 shadow-inner ">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-blue-500 to-green-500 animate-gradient">
                  Success Stories
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl">
                  Hear from farmers and businesses who have transformed their operations
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2">
              {/* Testimonial 1 */}
              <div className="group flex flex-col justify-between rounded-xl border border-green-100 bg-white p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in-up relative overflow-hidden">
                <div className="absolute -right-10 -top-10 w-20 h-20 bg-green-100 rounded-full opacity-50 group-hover:scale-150 transition-all duration-500"></div>
                <div className="space-y-4 relative z-10">
                  <div className="text-4xl text-green-400">❝</div>
                  <p className="text-gray-600 italic">
                    "Since joining Farm Help, I've increased my profit margins by 35%. The direct connection with
                    restaurants has transformed my small farm business."
                  </p>
                </div>
                <div className="flex items-center space-x-4 pt-4 relative z-10">
                  <div className="rounded-full bg-gradient-to-r from-green-400 to-green-600 p-1 shadow-md">
                    <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center overflow-hidden">
                      <User className="h-8 w-8 text-green-600" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">John Smith</p>
                    <p className="text-sm text-gray-500">Organic Vegetable Farmer</p>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute bottom-3 right-3">
                  <Wheat className="h-8 w-8 text-green-100" />
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="group flex flex-col justify-between rounded-xl border border-blue-100 bg-white p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in-up animation-delay-300 relative overflow-hidden">
                <div className="absolute -right-10 -top-10 w-20 h-20 bg-blue-100 rounded-full opacity-50 group-hover:scale-150 transition-all duration-500"></div>
                <div className="space-y-4 relative z-10">
                  <div className="text-4xl text-blue-400">❝</div>
                  <p className="text-gray-600 italic">
                    "As a restaurant owner, Farm Help has allowed me to source the freshest ingredients directly from
                    local farmers. The quality is exceptional and our customers can taste the difference."
                  </p>
                </div>
                <div className="flex items-center space-x-4 pt-4 relative z-10">
                  <div className="rounded-full bg-gradient-to-r from-blue-400 to-blue-600 p-1 shadow-md">
                    <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center overflow-hidden">
                      <User className="h-8 w-8 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Sarah Johnson</p>
                    <p className="text-sm text-gray-500">Restaurant Owner</p>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute bottom-3 right-3">
                  <Building className="h-8 w-8 text-blue-100" />
                </div>
              </div>

              {/* Additional testimonials */}
              <div className="group flex flex-col justify-between rounded-xl border border-yellow-100 bg-white p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in-up animation-delay-600 relative overflow-hidden">
                <div className="absolute -right-10 -top-10 w-20 h-20 bg-yellow-100 rounded-full opacity-50 group-hover:scale-150 transition-all duration-500"></div>
                <div className="space-y-4 relative z-10">
                  <div className="text-4xl text-yellow-400">❝</div>
                  <p className="text-gray-600 italic">
                    "The logistics support on Farm Help is incredible. I can track my deliveries and manage my inventory
                    all in one place. It's revolutionized how I run my farm."
                  </p>
                </div>
                <div className="flex items-center space-x-4 pt-4 relative z-10">
                  <div className="rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 p-1 shadow-md">
                    <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center overflow-hidden">
                      <User className="h-8 w-8 text-yellow-600" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Rajesh Kumar</p>
                    <p className="text-sm text-gray-500">Rice Farmer</p>
                  </div>
                </div>
              </div>

              <div className="group flex flex-col justify-between rounded-xl border border-purple-100 bg-white p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in-up animation-delay-900 relative overflow-hidden">
                <div className="absolute -right-10 -top-10 w-20 h-20 bg-purple-100 rounded-full opacity-50 group-hover:scale-150 transition-all duration-500"></div>
                <div className="space-y-4 relative z-10">
                  <div className="text-4xl text-purple-400">❝</div>
                  <p className="text-gray-600 italic">
                    "As a food processing company, we need consistent quality and supply. Farm Help connects us directly
                    with verified farmers, ensuring we get the best raw materials year-round."
                  </p>
                </div>
                <div className="flex items-center space-x-4 pt-4 relative z-10">
                  <div className="rounded-full bg-gradient-to-r from-purple-400 to-purple-600 p-1 shadow-md">
                    <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center overflow-hidden">
                      <Factory className="h-8 w-8 text-purple-600" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Priya Sharma</p>
                    <p className="text-sm text-gray-500">Food Processing CEO</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial stats */}
            <div className="mx-auto max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="bg-white rounded-xl p-4 border border-green-100 shadow-md text-center animate-fade-in-up animation-delay-1200">
                <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-700 to-green-500">
                  35%
                </p>
                <p className="text-sm text-gray-600">Average Profit Increase</p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-blue-100 shadow-md text-center animate-fade-in-up animation-delay-1400">
                <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500">
                  5,000+
                </p>
                <p className="text-sm text-gray-600">Farmers Onboarded</p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-yellow-100 shadow-md text-center animate-fade-in-up animation-delay-1600">
                <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-700 to-yellow-500">
                  1,200+
                </p>
                <p className="text-sm text-gray-600">Business Partners</p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-purple-100 shadow-md text-center animate-fade-in-up animation-delay-1800">
                <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-purple-500">
                  98%
                </p>
                <p className="text-sm text-gray-600">Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-green-500 to-green-400"></div>

          {/* Animated background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full opacity-10 animate-float-slow"></div>
              <div className="absolute bottom-10 right-10 w-60 h-60 bg-white rounded-full opacity-10 animate-float-slow animation-delay-1000"></div>
              <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-white rounded-full opacity-10 animate-float-slow animation-delay-2000"></div>
              <div className="absolute bottom-1/3 left-1/4 w-32 h-32 bg-white rounded-full opacity-10 animate-float-slow animation-delay-3000"></div>
            </div>
          </div>

          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-white ">
                  Ready to Transform Your Business?
                </h2>
                <p className="max-w-[900px] text-green-50 md:text-xl">
                  Join thousands of farmers and businesses already benefiting from direct connections
                </p>
              </div>

              <div className="mx-auto w-full max-w-sm space-y-4 relative">
                <div className="absolute -top-16 -left-16 animate-float animation-delay-1000">
                  <Leaf className="h-12 w-12 text-white opacity-20" />
                </div>
                <div className="absolute -bottom-16 -right-16 animate-float animation-delay-2000">
                  <Wheat className="h-12 w-12 text-white opacity-20" />
                </div>

                <form
                  className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-2"
                  onSubmit={(e) => {
                    e.preventDefault()
                    // Handle form submission
                    alert(`Thank you for your interest! We'll contact you at: ${email}`)
                    setEmail("")
                  }}
                >
                  <input
                    className="flex h-12 w-full rounded-full border-2 border-white/30 bg-white/10 backdrop-blur px-4 py-2 text-sm text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300"
                    placeholder="Enter your email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    className="inline-flex h-12 w-64 items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-medium text-green-600 shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-green-50 hover:scale-105 group"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </form>
                <p className="text-xs text-green-100">
                  By signing up, you agree to our{" "}
                  <a
                    href="/terms"
                    className="underline underline-offset-2 hover:text-white transition-colors duration-200"
                  >
                    Terms & Conditions
                  </a>
                </p>
              </div>

              {/* Feature badges */}
              <div className="flex flex-wrap justify-center gap-3 mt-8">
                <div className="bg-white/10 backdrop-blur rounded-full px-4 py-1.5 text-xs font-medium text-white border border-white/20 animate-fade-in-up animation-delay-300">
                  <div className="flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    <span>Secure Transactions</span>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-full px-4 py-1.5 text-xs font-medium text-white border border-white/20 animate-fade-in-up animation-delay-600">
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>5,000+ Farmers</span>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-full px-4 py-1.5 text-xs font-medium text-white border border-white/20 animate-fade-in-up animation-delay-900">
                  <div className="flex items-center gap-1">
                    <Leaf className="h-3 w-3" />
                    <span>Sustainable Agriculture</span>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-full px-4 py-1.5 text-xs font-medium text-white border border-white/20 animate-fade-in-up animation-delay-1200">
                  <div className="flex items-center gap-1">
                    <Zap className="h-3 w-3" />
                    <span>Fast Payments</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white"></div>

          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-full bg-gradient-to-r from-blue-100 to-blue-200 px-4 py-1.5 text-sm font-medium text-blue-800 shadow-inner ">
                    Contact Us
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-blue-500 to-green-500 animate-gradient">
                    Get in Touch
                  </h2>
                  <p className="max-w-[600px] text-gray-600 md:text-xl">
                    Have questions about Farm Help? Our team is here to assist you.
                  </p>
                </div>

                <div className="space-y-4 mt-6">
                  <div className="flex items-center space-x-3 group">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                      <Shield className="h-5 w-5 text-white" />
                    </div>
                    <p className="text-gray-600 group-hover:text-gray-900 transition-colors duration-200">
                      Secure transactions guaranteed
                    </p>
                  </div>
                  <div className="flex items-center space-x-3 group">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <p className="text-gray-600 group-hover:text-gray-900 transition-colors duration-200">
                      Join 5,000+ farmers and 1,200+ businesses
                    </p>
                  </div>
                  <div className="flex items-center space-x-3 group">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                      <Leaf className="h-5 w-5 text-white" />
                    </div>
                    <p className="text-gray-600 group-hover:text-gray-900 transition-colors duration-200">
                      Supporting sustainable agriculture
                    </p>
                  </div>
                </div>

                {/* Contact info */}
                <div className="mt-8 space-y-4 bg-white rounded-xl p-6 border border-blue-100 shadow-md">
                  <h3 className="text-lg font-bold text-blue-800">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-blue-600"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                      </div>
                      <span className="text-sm text-gray-600">+91 123 456 7890</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-blue-600"
                        >
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                          <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                      </div>
                      <span className="text-sm text-gray-600">support@farmhelp.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-blue-600"
                        >
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                      </div>
                      <span className="text-sm text-gray-600">123 Agri Tower, New Delhi</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-blue-600"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                      </div>
                      <span className="text-sm text-gray-600">Mon-Fri: 9AM - 6PM</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="w-full max-w-md space-y-4 rounded-xl border border-blue-200 bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up animation-delay-300">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500">
                      Contact Form
                    </h3>
                    <p className="text-sm text-gray-500">Fill out the form below and we'll get back to you shortly.</p>
                  </div>
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="first-name" className="text-sm font-medium text-gray-700">
                          First name
                        </label>
                        <input
                          id="first-name"
                          className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="John"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="last-name" className="text-sm font-medium text-gray-700">
                          Last name
                        </label>
                        <input
                          id="last-name"
                          className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="Smith"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="john.smith@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-gray-700">
                        Message
                      </label>
                      <textarea
                        id="message"
                        className="flex min-h-[100px] w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Tell us how we can help..."
                      />
                    </div>
                    <button className="inline-flex h-10 w-full items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 px-4 py-2 text-sm font-medium text-white shadow-md transition-all duration-300 hover:shadow-lg hover:from-blue-500 hover:to-blue-300 group">
                      Send Message
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      >
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t bg-white py-8 relative z-10">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
          <div className="flex items-center gap-2">
            <div className="relative">
              <img className="w-16 h-16 object-cover" src={logo} alt="logo" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-400 bg-clip-text text-transparent">
              Farm Help
            </span>
          </div>
          <p className="text-center text-sm text-gray-500 md:text-left">
            &copy; {new Date().getFullYear()} Farm Help. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="/terms" className="text-sm text-gray-500 hover:text-green-600 transition-colors duration-200">
              Terms
            </a>
            <a href="/privacy" className="text-sm text-gray-500 hover:text-green-600 transition-colors duration-200">
              Privacy
            </a>
            <a href="/contact" className="text-sm text-gray-500 hover:text-green-600 transition-colors duration-200">
              Contact
            </a>
          </div>
        </div>

        {/* Animated footer elements */}
        <div className="absolute w-full overflow-hidden leading-0 transform">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block h-12 w-full"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="fill-green-50"
            ></path>
          </svg>
        </div>
      </footer>
    </div>
  )
}
