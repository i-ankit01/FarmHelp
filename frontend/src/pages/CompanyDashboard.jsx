"use client";

import { useState, useEffect } from "react";
import {
  Bell,
  ChevronDown,
  DollarSign,
  Leaf,
  Menu,
  Package,
  Search,
  Building,
  Wheat,
  TrendingUp,
  Sprout,
  BarChart2,
  Zap,
  Truck,
  User,
  Users,
} from "lucide-react";
import Footer from "../components/Footer";
import CompanySidebar from "../components/CompanySidebar";
import { useDispatch, useSelector } from "react-redux";
import { fetchFarmers } from "../store/userSlice";
import logo from "../assets//1749736593810.png"
import { Link } from "react-router-dom";
import { fetchCompanyData } from "../store/companySlice";

export default function CompanyDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);


  const dispatch = useDispatch();
  const {
    farmers = [],
  } = useSelector((state) => state.user);

  const { company, loading, error } = useSelector((state) => state.company || { company: null, loading: false, error: null });

  useEffect(() => {
    dispatch(fetchFarmers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCompanyData());
}, [dispatch]);

let content;
    if (loading) {
        content = <p>Loading company data...</p>;
    } else if (error) {
        content = <p>Error: {error}</p>;
    } else if (!company) {
        content = <p>No company data available.</p>;
    }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating company elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 animate-float animation-delay-1000">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center border-2 border-blue-300">
            <Building className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="absolute top-1/3 right-20 animate-float animation-delay-2000">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center border-2 border-green-300">
            <Wheat className="h-10 w-10 text-green-600" />
          </div>
        </div>
        <div className="absolute bottom-1/4 left-1/3 animate-float animation-delay-3000">
          <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center border-2 border-yellow-300">
            <Truck className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
      </div>
      {/* Header/Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <button
              className="md:hidden p-2 rounded-md hover:bg-gray-100"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="h-5 w-5" />
            </button>
            <img className="w-16 h-16 object-cover" src={logo} alt="logo" />
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-400 bg-clip-text text-transparent">
              Farm Help
            </span>
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
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center overflow-hidden shadow-sm group-hover:shadow-md transition-all duration-300">
                <User className="h-5 w-5 text-white" />
              </div>
              <span className="hidden md:inline-block text-sm font-medium">
              {company?.company?.companyName}
              </span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar  */}
        <CompanySidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gradient-to-b from-blue-100/50 to-transparent overflow-y-auto overflow-x-hidden ml-64">
        <div className="mb-6 animate-fadeIn">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
                {company?.company?.companyName}
                </h1>
                <p className="text-gray-600">GSTIN: {company?.company?.gst}</p>
              </div>
              <div className="mt-2 md:mt-0">
                <Link to ={"/farmers/search"} className="text-white ">
                  <span className="flex items-center rounded-md bg-gradient-to-r from-blue-600 to-blue-400 px-4 py-2 text-sm font-medium text-white hover:from-blue-500 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 group">
                    <Zap className="mr-2 h-4 w-4 group-hover:animate-pulse" />
                    Create New Order
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Dashboard Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Total Clients */}
            <div className="rounded-xl border bg-white p-6 shadow-sm hover:shadow-xl transition-all duration-300 animate-fade-in-up group overflow-hidden relative">
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-blue-100 opacity-70 group-hover:scale-125 transition-transform duration-500"></div>
              <div className="relative">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-700 group-hover:text-blue-700 transition-colors duration-200">
                    Total Clients
                  </h3>
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-200">
                    <Users className="h-5 w-5 text-blue-600 group-hover:rotate-12 transition-transform duration-200" />
                  </div>
                </div>
                <p className="mt-2 text-3xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent group-hover:scale-105 origin-left transition-transform duration-200">
                {farmers.length}
                </p>
                <p className="mt-1 text-sm text-gray-500">Farmers connected</p>

                {/* Animated progress bar */}
                <div className="mt-2 w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-grow-width"></div>
                </div>
              </div>
            </div>

            {/* Expenditure */}
            <div className="rounded-xl border bg-white p-6 shadow-sm hover:shadow-xl transition-all duration-300 animate-fade-in-up animation-delay-300 group overflow-hidden relative">
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-green-100 opacity-70 group-hover:scale-125 transition-transform duration-500"></div>
              <div className="relative">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-700 group-hover:text-green-700 transition-colors duration-200">
                    Expenditure
                  </h3>
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors duration-200">
                    <DollarSign className="h-5 w-5 text-green-600 group-hover:rotate-12 transition-transform duration-200" />
                  </div>
                </div>
                <p className="mt-2 text-3xl font-bold bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent group-hover:scale-105 origin-left transition-transform duration-200">
                ₹24,50,000
                </p>
                <p className="mt-1 text-sm text-gray-500">Total spent this quarter</p>

                {/* Animated chart bars */}
                <div className="mt-2 flex items-end h-6 gap-1">
                  <div
                    className="w-1/6 bg-green-200 rounded-t animate-grow-height animation-delay-100"
                    style={{ height: "30%" }}
                  ></div>
                  <div
                    className="w-1/6 bg-green-300 rounded-t animate-grow-height animation-delay-200"
                    style={{ height: "50%" }}
                  ></div>
                  <div
                    className="w-1/6 bg-green-400 rounded-t animate-grow-height animation-delay-300"
                    style={{ height: "70%" }}
                  ></div>
                  <div
                    className="w-1/6 bg-green-500 rounded-t animate-grow-height animation-delay-400"
                    style={{ height: "60%" }}
                  ></div>
                  <div
                    className="w-1/6 bg-green-600 rounded-t animate-grow-height animation-delay-500"
                    style={{ height: "80%" }}
                  ></div>
                  <div
                    className="w-1/6 bg-green-700 rounded-t animate-grow-height animation-delay-600"
                    style={{ height: "100%" }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Orders Booked */}
            <div className="rounded-xl border bg-white p-6 shadow-sm hover:shadow-xl transition-all duration-300 animate-fade-in-up animation-delay-600 group overflow-hidden relative">
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-yellow-100 opacity-70 group-hover:scale-125 transition-transform duration-500"></div>
              <div className="relative">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-700 group-hover:text-yellow-700 transition-colors duration-200">
                    Orders Booked
                  </h3>
                  <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center group-hover:bg-yellow-200 transition-colors duration-200">
                    <Package className="h-5 w-5 text-yellow-600 group-hover:rotate-12 transition-transform duration-200" />
                  </div>
                </div>
                <p className="mt-2 text-3xl font-bold bg-gradient-to-r from-yellow-700 to-yellow-500 bg-clip-text text-transparent group-hover:scale-105 origin-left transition-transform duration-200">
                {company?.company?.orders.length}
                </p>
                <p className="mt-1 text-sm text-gray-500">Active purchase orders</p>

                {/* Animated circle progress */}
                <div className="mt-2 relative h-6 w-full">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1.5 bg-gray-100 rounded-full"></div>
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-yellow-500 border-2 border-white shadow-md animate-move-right-slow"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Farmers Section */}
          <div className="mt-8 animate-fade-in-up animation-delay-900">
            <h2 className="mb-4 text-xl font-semibold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
              Recently Connected Farmers
            </h2>
            <div className="rounded-xl border bg-white shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gradient-to-r from-blue-50 to-blue-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <th className="px-6 py-3">Farmer Name</th>
                      <th className="px-6 py-3">Location</th>
                      <th className="px-6 py-3">Crops</th>
                      <th className="px-6 py-3">Area</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                  {farmers.slice(0, 4).map((farmer, index) => (
                      <tr key={index} className="bg-white">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {`${farmer.firstName} ${farmer.lastName}`}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {
                            ["Maharashtra", "Punjab", "Uttar Pradesh"][
                              Math.floor(Math.random() * 3)
                            ]
                          }
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex flex-wrap gap-1">
                            {farmer.crops.map((crop, i) => (
                              <span
                                key={i}
                                className="rounded-full bg-green-100 border border-green px-2 py-0.5 text-xs text-green-800"
                              >
                                {crop}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {farmer.land}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex rounded-full px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                            Active
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-green-600 hover:text-green-900 cursor-pointer">
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Market Trends Section */}
          <div className="mt-8 animate-fade-in-up animation-delay-1200">
            <h2 className="mb-4 text-xl font-semibold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
              Market Trends
            </h2>
            <div className="rounded-xl border bg-white p-6 shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-100 rounded-full opacity-30"></div>
              <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-green-100 rounded-full opacity-30"></div>

              <div className="space-y-6 relative z-10">
                <div className="flex flex-col">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium flex items-center">
                      <Wheat className="h-4 w-4 mr-2 text-yellow-600" />
                      Wheat
                    </h3>
                    <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-full animate-pulse">
                      +12% from last month
                    </span>
                  </div>
                  <div className="mt-2 h-4 w-full rounded-full bg-gray-200 overflow-hidden">
                    <div
                      className="h-4 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 animate-grow-width"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                  <div className="mt-1 flex justify-between text-xs text-gray-500">
                    <span>Current Price: ₹2,200/quintal</span>
                    <span className="flex items-center">
                      <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                      Rising trend
                    </span>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium flex items-center">
                      <Sprout className="h-4 w-4 mr-2 text-green-600" />
                      Rice
                    </h3>
                    <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-full animate-pulse">
                      +5% from last month
                    </span>
                  </div>
                  <div className="mt-2 h-4 w-full rounded-full bg-gray-200 overflow-hidden">
                    <div
                      className="h-4 rounded-full bg-gradient-to-r from-green-400 to-green-600 animate-grow-width animation-delay-300"
                      style={{ width: "60%" }}
                    ></div>
                  </div>
                  <div className="mt-1 flex justify-between text-xs text-gray-500">
                    <span>Current Price: ₹3,100/quintal</span>
                    <span className="flex items-center">
                      <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                      Stable growth
                    </span>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium flex items-center">
                      <Sprout className="h-4 w-4 mr-2 text-yellow-600" />
                      Sugarcane
                    </h3>
                    <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-full animate-pulse">
                      +18% from last month
                    </span>
                  </div>
                  <div className="mt-2 h-4 w-full rounded-full bg-gray-200 overflow-hidden">
                    <div
                      className="h-4 rounded-full bg-gradient-to-r from-yellow-400 to-green-600 animate-grow-width animation-delay-600"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                  <div className="mt-1 flex justify-between text-xs text-gray-500">
                    <span>Current Price: ₹350/quintal</span>
                    <span className="flex items-center">
                      <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                      High demand
                    </span>
                  </div>
                </div>
              </div>

              {/* Market insights card */}
              <div className="mt-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-4 border border-blue-100 animate-fade-in-up animation-delay-900">
                <h4 className="font-medium text-blue-700 mb-2 flex items-center">
                  <BarChart2 className="h-4 w-4 mr-2" />
                  Market Insights
                </h4>
                <p className="text-sm text-gray-600">
                  Wheat and sugarcane prices are trending upward due to increased export demand. Consider securing
                  contracts early for the upcoming season.
                </p>
              </div>
            </div>
          </div>

          {/* Upcoming Opportunities Section */}
          <div className="mt-8 animate-fade-in-up animation-delay-1500">
            <h2 className="mb-4 text-xl font-semibold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
              Upcoming Opportunities
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border bg-white p-5 shadow-sm hover:shadow-lg transition-all duration-300 group relative overflow-hidden">
                <div className="absolute -right-6 -top-6 h-20 w-20 bg-yellow-100 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                      <Wheat className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Wheat Harvest Season</h3>
                      <p className="text-xs text-gray-500">Starting in 2 weeks</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Punjab and Haryana regions will begin wheat harvesting. Secure your contracts now for best rates.
                  </p>
                  <button className="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors duration-200 flex items-center">
                    <a href="/farmers/search">View Farmers</a> 
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
                      className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform duration-200"
                    >
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="rounded-xl border bg-white p-5 shadow-sm hover:shadow-lg transition-all duration-300 group relative overflow-hidden">
                <div className="absolute -right-6 -top-6 h-20 w-20 bg-green-100 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <Truck className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Logistics Partnership</h3>
                      <p className="text-xs text-gray-500">New opportunity</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Partner with regional transport companies for reduced rates on bulk shipments from rural areas.
                  </p>
                  <button className="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors duration-200 flex items-center">
                    <a href="/help/company">Learn More</a>
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
                      className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform duration-200"
                    >
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
