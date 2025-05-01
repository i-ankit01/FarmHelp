"use client"

import { useState, useEffect, useRef } from "react"
import {
  Leaf,
  Calendar,
  TrendingUp,
  BarChart2,
  DollarSign,
  Loader,
  ChevronDown,
  Clock,
  AlertCircle,
  Check,
  Zap,
  Sun,
  Cloud,
  CloudRain,
  Wheat,
  Sprout,
  BarChart,
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  User,
  Menu,
  Home,
  ShoppingBag,
  Search,
  Bell,
  Users,
  CreditCard,
  LineChart,
} from "lucide-react"
import UserSidebar from "../components/UserSiderbar"

export default function CropPrediction() {
  // Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Form state
  const [cropName, setCropName] = useState("")
  const [year, setYear] = useState(new Date().getFullYear())
  const [month, setMonth] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [predictionResult, setPredictionResult] = useState(null)
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)


  // Available crops for selection
  const availableCrops = ["Wheat", "Rice", "Potato", "Oats", "Pulses", "Maize", "Sugarcane"]

  // Months for selection
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  // Years for selection (current year and next 5 years)
  const years = Array.from({ length: 6 }, (_, i) => new Date().getFullYear() + i)

  // Set loaded state after a short delay for entrance animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!cropName || !year || !month) {
      setError("Please fill all the fields")
      return
    }

    setIsSubmitting(true)
    setError(null)

    const monthMap = {
      January: 1,
      February: 2,
      March: 3,
      April: 4,
      May: 5,
      June: 6,
      July: 7,
      August: 8,
      September: 9,
      October: 10,
      November: 11,
      December: 12
    };
    
    const numericMonth = monthMap[month];

    try {

      console.log('Sending:', {
        year: year,
        month: numericMonth,
        crop: cropName
      });
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          year: year,
          month: numericMonth,  // make sure this is a number
          crop: cropName
        })
      });
    
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    
      const data = await response.json();
      console.log('Prediction Result:', data);

      // Mock response from ML model
      const currentPrice = data.current_price
      const predictedPrice = data.predicted_price
      const isProfitable = predictedPrice > currentPrice
      const profitPercentage = Math.abs(((predictedPrice - currentPrice) / currentPrice) * 100).toFixed(2)

      console.log('all ok')

      setPredictionResult({
        cropName,
        year,
        month,
        currentPrice,
        predictedPrice,
        isProfitable,
        profitPercentage,
        predictionDate: new Date().toISOString(),
      })

      // Show confetti animation
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)
    } catch (err) {
      setError("Failed to get prediction. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Reset form and results
  const handleReset = () => {
    setCropName("")
    setYear(new Date().getFullYear())
    setMonth("")
    setPredictionResult(null)
    setError(null)
  }

  const dashboardData = {
    userName: "Ankit Kumar",
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-green-50 to-white">
      {/* Header/Navbar - Similar to Dashboard.jsx */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <button
              className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="relative">
              <Leaf className="h-6 w-6 text-green-600 animate-pulse" />
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-green-500 animate-ping"></span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
              Farm Help
            </span>
          </div>

          <div className="hidden md:flex flex-1 items-center justify-center px-6">
            <div className="relative w-full max-w-md group">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 group-hover:text-green-500 transition-colors duration-200" />
              <input
                type="search"
                placeholder="Search companies, crops..."
                className="w-full rounded-full border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all duration-200 group-hover:shadow-md"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
            </button>
            <div className="flex items-center gap-2 group">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center overflow-hidden shadow-sm group-hover:shadow-md transition-all duration-200">
                <User className="h-5 w-5 text-white" />
              </div>
              <span className="hidden md:inline-block text-sm font-medium">{dashboardData.userName}</span>
              <ChevronDown className="h-4 w-4 text-gray-500 group-hover:rotate-180 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar - Similar to Dashboard.jsx */}
        <UserSidebar/>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto ml-64">
          {/* Animated background elements */}
          <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-64 h-64 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
          </div>

          {/* Floating crop elements */}
          <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-10 animate-float animation-delay-1000">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center border-2 border-green-300">
                <Wheat className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <div className="absolute top-1/3 right-20 animate-float animation-delay-2000">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center border-2 border-yellow-300">
                <BarChart className="h-10 w-10 text-yellow-600" />
              </div>
            </div>
            <div className="absolute bottom-1/4 left-1/3 animate-float animation-delay-3000">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center border-2 border-blue-300">
                <DollarSign className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Confetti animation when prediction is successful */}
          {showConfetti && (
            <div className="fixed inset-0 z-10 pointer-events-none">
              {Array.from({ length: 100 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-confetti"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `-5%`,
                    width: `${Math.random() * 10 + 5}px`,
                    height: `${Math.random() * 10 + 5}px`,
                    background: `hsl(${Math.random() * 360}, 100%, 50%)`,
                    borderRadius: Math.random() > 0.5 ? "50%" : "0",
                    transform: `rotate(${Math.random() * 360}deg)`,
                    animation: `confetti ${Math.random() * 3 + 2}s linear forwards`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                />
              ))}
            </div>
          )}

          <div className="mb-6 animate-fadeIn">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent">
              Crop Price Prediction
            </h1>
            <p className="text-gray-600">Get accurate predictions for future crop prices using our advanced ML model</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Prediction Form */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-green-100 animate-fade-in-up relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-green-100 rounded-full opacity-30"></div>
              <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-blue-100 rounded-full opacity-30"></div>

              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent flex items-center">
                  <BarChart2 className="mr-2 h-6 w-6 text-green-500" />
                  Predict Future Crop Prices
                </h2>

                {error && (
                  <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 flex items-center animate-fadeIn">
                    <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                    <p>{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Crop Selection */}
                  <div className="space-y-2">
                    <label htmlFor="crop-name" className="block text-sm font-medium text-gray-700 flex items-center">
                      <Wheat className="h-4 w-4 mr-2 text-green-600" />
                      Select Crop
                    </label>
                    <div className="relative">
                      <select
                        id="crop-name"
                        value={cropName}
                        onChange={(e) => setCropName(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 bg-white py-3 px-4 pr-10 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 appearance-none"
                      >
                        <option value="">Select a crop</option>
                        {availableCrops.map((crop) => (
                          <option key={crop} value={crop}>
                            {crop}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Year Selection */}
                  <div className="space-y-2">
                    <label htmlFor="year" className="block text-sm font-medium text-gray-700 flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                      Select Year
                    </label>
                    <div className="relative">
                      <select
                        id="year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 bg-white py-3 px-4 pr-10 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 appearance-none"
                      >
                        {years.map((y) => (
                          <option key={y} value={y}>
                            {y}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Month Selection */}
                  <div className="space-y-2">
                    <label htmlFor="month" className="block text-sm font-medium text-gray-700 flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-purple-600" />
                      Select Month
                    </label>
                    <div className="relative">
                      <select
                        id="month"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 bg-white py-3 px-4 pr-10 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 appearance-none"
                      >
                        <option value="">Select a month</option>
                        {months.map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 rounded-lg bg-gradient-to-r from-green-600 to-green-400 px-4 py-3 text-sm font-medium text-white shadow-md hover:shadow-lg transition-all duration-300 hover:from-green-500 hover:to-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-70 transform hover:scale-105 group"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <Loader className="animate-spin h-5 w-5 mr-2" />
                          Predicting...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center">
                          <Zap className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                          Get Prediction
                        </span>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200"
                    >
                      Reset
                    </button>
                  </div>
                </form>

                {/* Weather Conditions */}
                <div className="mt-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200 animate-fade-in-up animation-delay-300">
                  <h3 className="font-medium text-blue-700 mb-2 flex items-center">
                    <Cloud className="h-4 w-4 mr-2" />
                    Weather Conditions Impact
                  </h3>
                  <p className="text-sm text-gray-600">
                    Our prediction model takes into account weather forecasts and historical climate data to provide
                    more accurate price predictions.
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center">
                      <Sun className="h-6 w-6 text-yellow-500 mr-1 animate-pulse" />
                      <span className="text-xs">Temperature</span>
                    </div>
                    <div className="flex items-center">
                      <CloudRain className="h-6 w-6 text-blue-500 mr-1 animate-pulse" />
                      <span className="text-xs">Rainfall</span>
                    </div>
                    <div className="flex items-center">
                      <Sprout className="h-6 w-6 text-green-500 mr-1 animate-pulse" />
                      <span className="text-xs">Growth Cycle</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Prediction Results */}
            <div
              className={`bg-white rounded-2xl shadow-xl p-6 border border-blue-100 relative overflow-hidden transition-all duration-500 ${predictionResult ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-100 rounded-full opacity-30"></div>
              <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-green-100 rounded-full opacity-30"></div>

              <div className="relative z-10">
                {predictionResult ? (
                  <div className="animate-fadeIn">
                    <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent flex items-center">
                      <TrendingUp className="mr-2 h-6 w-6 text-blue-500" />
                      Price Prediction Results
                    </h2>

                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <span className="text-sm text-gray-500">Crop:</span>
                          <span className="ml-2 font-medium text-gray-900">{predictionResult.cropName}</span>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Prediction for:</span>
                          <span className="ml-2 font-medium text-gray-900">
                            {predictionResult.month} {predictionResult.year}
                          </span>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 mb-4">
                        Prediction generated on: {new Date(predictionResult.predictionDate).toLocaleString()}
                      </div>

                      {/* Price Comparison Cards */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200 animate-fade-in-up">
                          <h3 className="text-sm font-medium text-blue-700 mb-1">Current Price</h3>
                          <p className="text-2xl font-bold text-blue-800">
                            ₹{predictionResult.currentPrice.toLocaleString()}
                          </p>
                          <p className="text-xs text-blue-600">per quintal</p>
                        </div>

                        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200 animate-fade-in-up animation-delay-300">
                          <h3 className="text-sm font-medium text-green-700 mb-1">Predicted Price</h3>
                          <p className="text-2xl font-bold text-green-800">
                            ₹{predictionResult.predictedPrice.toLocaleString()}
                          </p>
                          <p className="text-xs text-green-600">per quintal</p>
                        </div>
                      </div>

                      {/* Recommendation */}
                      <div
                        className={`rounded-lg p-5 mb-6 animate-fade-in-up animation-delay-600 ${
                          predictionResult.profitPercentage > 1.5 ? (
                          predictionResult.isProfitable
                            ? "bg-gradient-to-r from-green-100 to-green-50 border border-green-200"
                            : "bg-gradient-to-r from-red-100 to-red-50 border border-red-200") : (
                              "bg-gradient-to-r from-yellow-100 to-yellow-50 border border-yellow-200"
                            )
                        }`}
                      >
                        <h3 className="font-medium mb-2 flex items-center">
                          {predictionResult.profitPercentage > 1.5 ? (
                          predictionResult.isProfitable ? (
                            <>
                              <ArrowUpRight className="h-5 w-5 mr-2 text-green-600" />
                              <span className="text-green-800">Recommendation: Wait to Sell</span>
                            </>
                          ) : (
                            <>
                              <ArrowDownRight className="h-5 w-5 mr-2 text-red-600" />
                              <span className="text-red-800">Recommendation: Sell Now</span>
                            </>
                          )  ) : (
                            <>
                              <ArrowUpRight className="h-5 w-5 mr-2 text-green-600" />
                              <span className="text-yellow-800">Recommendation: As Prices are approximately same, You can sell or wait</span>
                            </>
                          )}
                        </h3>

                        <p className="text-sm">
                          {predictionResult.isProfitable
                            ? `Prices are expected to increase by ${predictionResult.profitPercentage}% by ${predictionResult.month}. Consider waiting to maximize your profits.`
                            : `Prices are expected to decrease by ${predictionResult.profitPercentage}% by ${predictionResult.month}. Consider selling now to avoid potential losses.`}
                        </p>

                        <div className="mt-3 flex items-center">
                          <div
                            className={`h-2 flex-1 rounded-full ${predictionResult.profitPercentage > 5 ? (predictionResult.isProfitable ? "bg-green-200" : "bg-red-200") : ('bg-yellow-200')}`}
                          >
                            <div
                              className={`h-full rounded-full animate-grow-width ${
                                predictionResult.profitPercentage > 1.5 ? (predictionResult.isProfitable ? "bg-green-700" : "bg-red-700") : ('bg-yellow-700')
                              }`}
                              style={{ width: `${Math.min(predictionResult.profitPercentage * 2, 100)}%` }}
                            ></div>
                          </div>
                          <span
                            className={`ml-3 text-sm font-medium ${
                              predictionResult.profitPercentage > 1.5 ? (predictionResult.isProfitable ? "text-green-700" : "text-red-700") : ('text-yellow-700')
                            }`}
                          >
                            {predictionResult.profitPercentage}%
                          </span>
                        </div>
                      </div>

                      {/* Price Trend Indicator - Simplified version without graph */}
                      <div className="animate-fade-in-up animation-delay-900" >
                        <h3 className="font-medium mb-4 text-gray-700 flex items-center">
                          <LineChart className="h-4 w-4 mr-2 text-gray-600" />
                          Price Trend Analysis
                        </h3>

                        <div className="h-32 relative bg-white rounded-lg border border-gray-200 p-4 flex items-center justify-center">
                          <div className="text-center">
                            {predictionResult.isProfitable ? (
                              <div className="flex flex-col items-center">
                                <ArrowUpRight className="h-12 w-12 text-green-500 mb-2 animate-bounce" />
                                <p className="text-green-700 font-medium">Price is expected to increase</p>
                                <p className="text-sm text-gray-600">
                                  From ₹{predictionResult.currentPrice.toLocaleString()} to ₹
                                  {predictionResult.predictedPrice.toLocaleString()}
                                </p>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center">
                                <ArrowDownRight className="h-12 w-12 text-red-500 mb-2 animate-bounce" />
                                <p className="text-red-700 font-medium">Price is expected to decrease</p>
                                <p className="text-sm text-gray-600">
                                  From ₹{predictionResult.currentPrice.toLocaleString()} to ₹
                                  {predictionResult.predictedPrice.toLocaleString()}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="mt-3 flex justify-center">
                          <div className="flex items-center gap-4 text-xs text-gray-600">
                            <div className="flex items-center">
                              <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                              <span>Current Price (₹{predictionResult.currentPrice.toLocaleString()})</span>
                            </div>
                            <div className="flex items-center">
                              <div
                                className={`w-3 h-3 rounded-full ${predictionResult.isProfitable ? "bg-green-500" : "bg-red-500"} mr-1`}
                              ></div>
                              <span>Predicted Price (₹{predictionResult.predictedPrice.toLocaleString()})</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Additional Insights */}
                      <div className="mt-6 grid grid-cols-2 gap-4 animate-fade-in-up animation-delay-1500">
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
                          <h3 className="text-sm font-medium text-purple-700 mb-2">Market Factors</h3>
                          <ul className="text-xs text-gray-600 space-y-1">
                            <li className="flex items-center">
                              <Check className="h-3 w-3 text-green-500 mr-1" />
                              <span>Supply and demand analysis</span>
                            </li>
                            <li className="flex items-center">
                              <Check className="h-3 w-3 text-green-500 mr-1" />
                              <span>Seasonal price variations</span>
                            </li>
                            <li className="flex items-center">
                              <Check className="h-3 w-3 text-green-500 mr-1" />
                              <span>Government policies</span>
                            </li>
                          </ul>
                        </div>

                        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-4 border border-yellow-200">
                          <h3 className="text-sm font-medium text-yellow-700 mb-2">Confidence Level</h3>
                          <div className="flex items-center mb-1">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-yellow-500 h-2 rounded-full animate-grow-width"
                                style={{ width: "85%" }}
                              ></div>
                            </div>
                            <span className="ml-2 text-xs font-medium text-yellow-700">85%</span>
                          </div>
                          <p className="text-xs text-gray-600">Based on historical data and market trends analysis</p>
                        </div>
                      </div>

                      {/* Call to Action */}
                      <div className="mt-6 flex justify-center animate-fade-in-up animation-delay-1800">
                        <button className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 px-6 py-3 text-sm font-medium text-white shadow-md hover:shadow-lg transition-all duration-300 hover:from-blue-500 hover:to-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-105 group">
                          <span className="flex items-center">
                            <ArrowRight className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                            View Detailed Analysis
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center py-12">
                    <div className="text-center">
                      <BarChart2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-700 mb-2">Price Prediction Results</h3>
                      <p className="text-gray-500 max-w-md">
                        Fill out the form and click "Get Prediction" to see detailed price forecasts and recommendations
                        for your crop.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* How It Works Section */}
          <div className="mt-12 bg-white rounded-2xl shadow-xl p-8 border border-blue-100 animate-fade-in-up animation-delay-1200 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-100 rounded-full opacity-30"></div>
            <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-green-100 rounded-full opacity-30"></div>

            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-blue-700 to-green-500 bg-clip-text text-transparent">
                How Our Crop Price Prediction Works
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200 transform transition-transform duration-300 hover:scale-105 group">
                  <div className="h-12 w-12 rounded-full bg-blue-200 flex items-center justify-center mb-4 group-hover:bg-blue-300 transition-colors duration-200">
                    <span className="text-xl font-bold text-blue-700">1</span>
                  </div>
                  <h3 className="text-lg font-medium text-blue-800 mb-2">Data Collection</h3>
                  <p className="text-sm text-gray-600">
                    Our system collects historical crop prices, weather patterns, supply-demand data, and government
                    policies.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200 transform transition-transform duration-300 hover:scale-105 group">
                  <div className="h-12 w-12 rounded-full bg-green-200 flex items-center justify-center mb-4 group-hover:bg-green-300 transition-colors duration-200">
                    <span className="text-xl font-bold text-green-700">2</span>
                  </div>
                  <h3 className="text-lg font-medium text-green-800 mb-2">ML Analysis</h3>
                  <p className="text-sm text-gray-600">
                    Advanced machine learning algorithms analyze patterns and correlations to generate accurate price
                    predictions.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200 transform transition-transform duration-300 hover:scale-105 group">
                  <div className="h-12 w-12 rounded-full bg-yellow-200 flex items-center justify-center mb-4 group-hover:bg-yellow-300 transition-colors duration-200">
                    <span className="text-xl font-bold text-yellow-700">3</span>
                  </div>
                  <h3 className="text-lg font-medium text-yellow-800 mb-2">Smart Recommendations</h3>
                  <p className="text-sm text-gray-600">
                    Get personalized recommendations on whether to sell now or wait based on predicted price trends.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
