import { useState, useEffect } from "react"
import { Leaf, Home, ArrowLeft, RefreshCw } from 'lucide-react'

export default function NotFound() {
  const [isLoading, setIsLoading] = useState(true)
  const [randomTip, setRandomTip] = useState("")

  const farmingTips = [
    "Rotate your crops to maintain soil health and prevent disease buildup.",
    "Consider companion planting to naturally deter pests and improve yields.",
    "Mulching helps conserve water and suppress weeds in your fields.",
    "Soil testing can help you determine the exact nutrients your crops need.",
    "Rainwater harvesting can provide a sustainable water source for irrigation.",
    "Planting cover crops prevents soil erosion and adds organic matter.",
    "Integrated pest management reduces the need for chemical pesticides.",
    "Proper crop spacing ensures adequate airflow and reduces disease pressure.",
  ]

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    // Select a random farming tip
    const tip = farmingTips[Math.floor(Math.random() * farmingTips.length)]
    setRandomTip(tip)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50 flex flex-col">
      {/* Header */}
      <header className="w-full border-b bg-white shadow-sm">
        <div className="container mx-auto flex h-16 items-center px-4">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold">Farm Help</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-3xl mx-auto text-center">
          {/* 404 Animation */}
          <div className="relative mb-8 h-48 sm:h-64 md:h-80">
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <RefreshCw className="h-12 w-12 text-green-600 animate-spin" />
              </div>
            ) : (
              <>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-[120px] sm:text-[150px] md:text-[200px] font-bold text-green-600/10">404</div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-64 h-64 sm:w-80 sm:h-80">
                    {/* Tractor */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce-slow">
                      <div className="relative w-32 h-20">
                        <div className="absolute bottom-0 left-0 w-20 h-10 bg-green-700 rounded-md"></div>
                        <div className="absolute bottom-10 left-2 w-12 h-8 bg-green-600 rounded-t-md"></div>
                        <div className="absolute bottom-2 left-20 w-12 h-6 bg-green-800 rounded-r-md"></div>
                        <div className="absolute bottom-0 left-4 w-6 h-6 rounded-full border-4 border-gray-800 bg-yellow-400"></div>
                        <div className="absolute bottom-0 left-20 w-8 h-8 rounded-full border-4 border-gray-800 bg-yellow-400"></div>
                      </div>
                    </div>
                    
                    {/* Plants */}
                    <div className="absolute top-10 left-10 animate-sway-slow">
                      <div className="w-8 h-16 relative">
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-10 bg-green-700"></div>
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-6 h-3 bg-green-500 rounded-full -rotate-45"></div>
                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-6 h-3 bg-green-500 rounded-full rotate-45"></div>
                        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-6 h-3 bg-green-500 rounded-full -rotate-45"></div>
                      </div>
                    </div>
                    
                    <div className="absolute top-20 right-20 animate-sway-slow-reverse">
                      <div className="w-10 h-20 relative">
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-12 bg-green-700"></div>
                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-8 h-4 bg-green-600 rounded-full -rotate-25"></div>
                        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-8 h-4 bg-green-600 rounded-full rotate-25"></div>
                        <div className="absolute bottom-14 left-1/2 -translate-x-1/2 w-8 h-4 bg-green-600 rounded-full -rotate-25"></div>
                      </div>
                    </div>
                    
                    {/* Sun */}
                    <div className="absolute top-0 right-0 animate-pulse">
                      <div className="w-16 h-16 bg-yellow-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Error Message */}
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4 animate-fadeIn">Field Not Found</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto animate-fadeIn animation-delay-200">
            Looks like you've wandered into an unplanted field. The crop you're looking for doesn't seem to be growing here.
          </p>

          {/* Farming Tip */}
          <div className="bg-white border border-green-200 rounded-lg p-4 mb-8 shadow-sm max-w-lg mx-auto animate-fadeIn animation-delay-400">
            <h3 className="font-medium text-green-700 mb-2">Farming Tip:</h3>
            <p className="text-gray-700 italic">{randomTip}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn animation-delay-600">
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-md bg-green-600 px-6 py-3 text-sm font-medium text-white shadow transition-colors hover:bg-green-700"
            >
              <Home className="mr-2 h-5 w-5" />
              Return Home
            </a>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center rounded-md border border-green-600 bg-white px-6 py-3 text-sm font-medium text-green-600 shadow transition-colors hover:bg-green-50"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Go Back
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t bg-white py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Farm Help. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
