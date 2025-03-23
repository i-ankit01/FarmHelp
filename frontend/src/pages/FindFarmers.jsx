"use client"

import { useState, useEffect } from "react"
import {
  Bell,
  ChevronDown,
  HelpCircle,
  Home,
  Leaf,
  Menu,
  Package,
  Search,
  Send,
  Settings,
  User,
  Users,
} from "lucide-react"
import { useDispatch, useSelector } from "react-redux";
import { fetchFarmers } from "../store/userSlice";

export default function FindFarmers() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedCrop, setSelectedCrop] = useState("Wheat")
  const [isLoading, setIsLoading] = useState(false)
  const [priceOffers, setPriceOffers] = useState({})
  const [demandWeights, setDemandWeights] = useState({})

  const dispatch = useDispatch();
  const { farmers = [], farmersStatus, farmersError } = useSelector((state) => {
    console.log("Farmers state in Redux:", state.user.farmers);
    return state.user
  });
  

  useEffect(() => {
    dispatch(fetchFarmers());
  }, [dispatch]);


  // Sample company data
  const companyData = {
    companyName: "Green Harvest Foods Ltd.",
    gstin: "22AAAAA0000A1Z5",
  }

  // Available crops for filtering
  const availableCrops = ["Wheat", "Rice", "Potato", "Oats", "Pulses", "Maize", "Sugarcane"]

  // Filtered farmers based on selected crop
  const [filteredFarmers, setFilteredFarmers] = useState([])

  // Apply filters
  useEffect(() => {
    console.log("Filtering farmers:", farmers);
    if (farmers.length > 0) {
        setIsLoading(true);

        setTimeout(() => {
            const filtered = farmers.filter((farmer) => farmer.crops?.includes(selectedCrop));
            console.log(selectedCrop)
            setFilteredFarmers(filtered);
            setIsLoading(false);
        }, 500);
    }
}, [selectedCrop, farmers]); // ✅ Ensure farmers exists before filtering


  // Handle price input change
  const handlePriceChange = (farmerId, price) => {
    setPriceOffers({
      ...priceOffers,
      [farmerId]: price,
    })
  }

  // Handle demand weight input change
  const handleWeightChange = (farmerId, weight) => {
    setDemandWeights({
      ...demandWeights,
      [farmerId]: weight,
    })
  }

  // Handle request submission
  const handleSubmitRequest = (farmer) => {
    const price = priceOffers[farmer.id]
    const weight = demandWeights[farmer.id]

    if (!price || isNaN(price) || price <= 0) {
      alert("Please enter a valid price")
      return
    }

    if (!weight || isNaN(weight) || weight <= 0) {
      alert("Please enter a valid demand weight")
      return
    }

    // In a real application, you would send a request to your backend:
    // const submitRequest = async (farmerId, crop, price, weight) => {
    //   try {
    //     const response = await fetch('/api/submit-request', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         farmerId,
    //         crop: selectedCrop,
    //         pricePerQuintal: price,
    //         demandWeight: weight,
    //         companyId: 'your-company-id'
    //       }),
    //     })
    //
    //     if (!response.ok) {
    //       throw new Error('Failed to submit request')
    //     }
    //
    //     // Handle success
    //   } catch (error) {
    //     console.error("Error submitting request:", error)
    //   }
    // }

    alert(`Request sent to ${farmer.name} for ${weight} quintals of ${selectedCrop} at ₹${price} per quintal`)

    // Reset the inputs for this farmer
    setPriceOffers({
      ...priceOffers,
      [farmer.id]: "",
    })
    setDemandWeights({
      ...demandWeights,
      [farmer.id]: "",
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header/Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <button className="md:hidden p-2 rounded-md hover:bg-gray-100" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu className="h-5 w-5" />
            </button>
            <Leaf className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold">Farm Help</span>
          </div>

          <div className="hidden md:flex flex-1 items-center justify-center px-6">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <input
                type="search"
                placeholder="Search farmers, crops..."
                className="w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-full hover:bg-gray-100">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center overflow-hidden">
                <User className="h-5 w-5 text-green-600" />
              </div>
              <span className="hidden md:inline-block text-sm font-medium">{companyData.companyName}</span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-white border-r shadow-sm transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:z-auto md:w-64 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex h-16 items-center border-b px-6">
            <h2 className="text-lg font-semibold truncate">{companyData.companyName}</h2>
          </div>
          <nav className="space-y-6 p-4">
            <div className="space-y-1">
              <a href="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100">
                <Home className="h-5 w-5" />
                <span>Dashboard</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-md bg-green-50 px-3 py-2 text-green-700 font-medium"
              >
                <Users className="h-5 w-5" />
                <span>Find Farmers</span>
              </a>
              <a href="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100">
                <Package className="h-5 w-5" />
                <span>Orders</span>
              </a>
            </div>

            <div className="space-y-1">
              <a href="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100">
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </a>
              <a href="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100">
                <HelpCircle className="h-5 w-5" />
                <span>Help</span>
              </a>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold">Find Farmers</h1>
                <p className="text-gray-600">Connect with farmers to source your agricultural needs</p>
              </div>
            </div>

            {/* Filter Section - Moved to main content */}
            <div className="mt-6 p-4 bg-white rounded-lg border shadow-sm">
              <div className="flex flex-col md:flex-row md:items-end gap-4">
                <div className="flex-1">
                  <label htmlFor="crop-filter" className="block text-sm font-medium text-gray-700 mb-1">
                    Filter by Crop
                  </label>
                  <select
                    id="crop-filter"
                    value={selectedCrop}
                    onChange={(e) => setSelectedCrop(e.target.value)}
                    className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  >
                    {availableCrops.map((crop) => (
                      <option key={crop} value={crop}>
                        {crop.charAt(0).toUpperCase() + crop.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex-1 md:flex-initial">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Sort by:</span>
                    <select className="rounded-md border border-gray-300 bg-white py-2 px-3 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500">
                      <option>Land Size (High to Low)</option>
                      <option>Land Size (Low to High)</option>
                      <option>Rating (High to Low)</option>
                      <option>Previous Deals</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Farmers Grid */}
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            </div>
          ) : (
            <>
              {filteredFarmers.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredFarmers.map((farmer) => (
                    <div key={farmer.id} className="rounded-lg border bg-white shadow-sm overflow-hidden">
                      <div className="border-b bg-gray-50 p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-medium">{`${farmer.firstName} ${farmer.lastName}`}</h3>
                            <p className="text-sm text-gray-500">India</p>
                          </div>
                          <div className="flex items-center bg-green-100 px-2 py-1 rounded-full">
                            <span className="text-xs font-medium text-green-800">★ {farmer.rating}</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-gray-500">Land Size</p>
                            <p className="font-medium">{farmer.land} acres</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Crop</p>
                            <p className="font-medium capitalize">{selectedCrop}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Previous Deals</p>
                            <p className="font-medium">{farmer.orders.length}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Est. Yield</p>
                            <p className="font-medium">{Math.round(farmer.land * 18)} quintals</p>
                          </div>
                        </div>

                        <div className="mt-4 space-y-3">
                          {/* Demand Weight Input */}
                          <div>
                            <label
                              htmlFor={`weight-${farmer.id}`}
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Demand Weight (quintals)
                            </label>
                            <input
                              id={`weight-${farmer.id}`}
                              type="number"
                              min="1"
                              placeholder="Enter quantity"
                              value={demandWeights[farmer.id] || ""}
                              onChange={(e) => handleWeightChange(farmer.id, e.target.value)}
                              className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                            />
                          </div>

                          {/* Price Input */}
                          <div>
                            <label
                              htmlFor={`price-${farmer.id}`}
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Offer Price (₹ per quintal)
                            </label>
                            <div className="flex gap-2">
                              <input
                                id={`price-${farmer.id}`}
                                type="number"
                                min="1"
                                placeholder="Enter price"
                                value={priceOffers[farmer.id] || ""}
                                onChange={(e) => handlePriceChange(farmer.id, e.target.value)}
                                className="flex-1 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                              />
                              <button
                                onClick={() => handleSubmitRequest(farmer)}
                                className="inline-flex items-center rounded-md cursor-pointer bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                              >
                                <Send className="mr-2 h-4 w-4" />
                                Request
                              </button>
                            </div>
                            <p className="mt-1 text-xs text-gray-500">
                              Market rate: ₹
                              {selectedCrop === "wheat" ? "2,200" : selectedCrop === "rice" ? "3,100" : "1,800"}/quintal
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border bg-white p-8 text-center shadow-sm">
                  <Users className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No farmers found</h3>
                  <p className="mt-1 text-sm text-gray-500">Try selecting a different crop to find more farmers.</p>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  )
}

