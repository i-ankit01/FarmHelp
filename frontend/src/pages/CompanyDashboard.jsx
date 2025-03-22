"use client"

import { useState } from "react"
import {
  Bell,
  ChevronDown,
  DollarSign,
  Facebook,
  HelpCircle,
  Home,
  Instagram,
  Leaf,
  Linkedin,
  Menu,
  Package,
  Search,
  Settings,
  Twitter,
  User,
  Users,
} from "lucide-react"
import Footer from "../components/Footer"

export default function CompanyDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchCrop, setSearchCrop] = useState("any")
  const [searchArea, setSearchArea] = useState("")

  // Sample data for company dashboard
  const companyData = {
    companyName: "Green Harvest Foods Ltd.",
    gstin: "22AAAAA0000A1Z5",
    totalClients: 78,
    expenditure: "₹24,50,000",
    ordersBooked: 124,
  }

  // Crop options for search
  const cropOptions = ["any", "wheat", "rice", "potato", "oats", "pulses", "maize", "sugarcane"]

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
              <a
                href="#"
                className="flex items-center gap-3 rounded-md bg-green-50 px-3 py-2 text-green-700 font-medium"
              >
                <Home className="h-5 w-5" />
                <span>Dashboard</span>
              </a>
            </div>

            {/* Search Form */}
            <div className="space-y-3 rounded-md border p-3">
              <h3 className="font-medium text-gray-700">Find Farmers</h3>
              <div className="space-y-3">
                <div>
                  <label htmlFor="crop-type" className="block text-sm font-medium text-gray-700 mb-1">
                    Search by crop
                  </label>
                  <select
                    id="crop-type"
                    value={searchCrop}
                    onChange={(e) => setSearchCrop(e.target.value)}
                    className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  >
                    {cropOptions.map((crop) => (
                      <option key={crop} value={crop}>
                        {crop.charAt(0).toUpperCase() + crop.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-1">
                    Enter area (acres)
                  </label>
                  <input
                    id="area"
                    type="number"
                    min="0"
                    placeholder="Minimum area"
                    value={searchArea}
                    onChange={(e) => setSearchArea(e.target.value)}
                    className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  />
                </div>

                <button className="w-full rounded-md bg-green-600 py-2 px-4 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                  Search
                </button>
              </div>
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
                <h1 className="text-2xl font-bold">{companyData.companyName}</h1>
                <p className="text-gray-600">GSTIN: {companyData.gstin}</p>
              </div>
              <div className="mt-2 md:mt-0">
                <button className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                  Create New Order
                </button>
              </div>
            </div>
          </div>

          {/* Dashboard Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Total Clients */}
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-700">Total Clients</h3>
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <p className="mt-2 text-3xl font-bold">{companyData.totalClients}</p>
              <p className="mt-1 text-sm text-gray-500">Farmers connected</p>
            </div>

            {/* Expenditure */}
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-700">Expenditure</h3>
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <p className="mt-2 text-3xl font-bold">{companyData.expenditure}</p>
              <p className="mt-1 text-sm text-gray-500">Total spent this quarter</p>
            </div>

            {/* Orders Booked */}
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-700">Orders Booked</h3>
                <Package className="h-5 w-5 text-green-600" />
              </div>
              <p className="mt-2 text-3xl font-bold">{companyData.ordersBooked}</p>
              <p className="mt-1 text-sm text-gray-500">Active purchase orders</p>
            </div>
          </div>

          {/* Recent Farmers Section */}
          <div className="mt-8">
            <h2 className="mb-4 text-xl font-semibold">Recently Connected Farmers</h2>
            <div className="rounded-lg border bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <th className="px-6 py-3">Farmer Name</th>
                      <th className="px-6 py-3">Location</th>
                      <th className="px-6 py-3">Crops</th>
                      <th className="px-6 py-3">Area</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[
                      {
                        name: "Rajesh Kumar",
                        location: "Punjab",
                        crops: ["Wheat", "Rice"],
                        area: "35 Acres",
                        status: "Active",
                      },
                      {
                        name: "Suresh Patel",
                        location: "Gujarat",
                        crops: ["Cotton", "Groundnut"],
                        area: "28 Acres",
                        status: "Active",
                      },
                      {
                        name: "Meena Sharma",
                        location: "Haryana",
                        crops: ["Rice", "Sugarcane"],
                        area: "42 Acres",
                        status: "Pending",
                      },
                      {
                        name: "Vijay Singh",
                        location: "Uttar Pradesh",
                        crops: ["Wheat", "Pulses"],
                        area: "25 Acres",
                        status: "Active",
                      },
                    ].map((farmer, index) => (
                      <tr key={index} className="bg-white">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{farmer.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{farmer.location}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex flex-wrap gap-1">
                            {farmer.crops.map((crop, i) => (
                              <span key={i} className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800">
                                {crop}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{farmer.area}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                              farmer.status === "Active"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {farmer.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-green-600 hover:text-green-900">View Details</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Market Trends Section */}
          <div className="mt-8">
            <h2 className="mb-4 text-xl font-semibold">Market Trends</h2>
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="space-y-4">
                <div className="flex flex-col">
                  <h3 className="font-medium">Wheat</h3>
                  <div className="mt-2 h-4 w-full rounded-full bg-gray-200">
                    <div className="h-4 rounded-full bg-green-500" style={{ width: "75%" }}></div>
                  </div>
                  <div className="mt-1 flex justify-between text-xs text-gray-500">
                    <span>Current Price: ₹2,200/quintal</span>
                    <span>+12% from last month</span>
                  </div>
                </div>

                <div className="flex flex-col">
                  <h3 className="font-medium">Rice</h3>
                  <div className="mt-2 h-4 w-full rounded-full bg-gray-200">
                    <div className="h-4 rounded-full bg-green-500" style={{ width: "60%" }}></div>
                  </div>
                  <div className="mt-1 flex justify-between text-xs text-gray-500">
                    <span>Current Price: ₹3,100/quintal</span>
                    <span>+5% from last month</span>
                  </div>
                </div>

                <div className="flex flex-col">
                  <h3 className="font-medium">Sugarcane</h3>
                  <div className="mt-2 h-4 w-full rounded-full bg-gray-200">
                    <div className="h-4 rounded-full bg-green-500" style={{ width: "85%" }}></div>
                  </div>
                  <div className="mt-1 flex justify-between text-xs text-gray-500">
                    <span>Current Price: ₹350/quintal</span>
                    <span>+18% from last month</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer/>
    </div>
  )
}

