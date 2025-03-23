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
  User,
  Users,
} from "lucide-react";
import Footer from "../components/Footer";
import CompanySidebar from "../components/CompanySidebar";
import { useDispatch, useSelector } from "react-redux";
import { fetchFarmers } from "../store/userSlice";
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
        <main className="flex-1 p-6 bg-[#F9FAFB] overflow-y-auto overflow-x-hidden ml-64">
          <div className="mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold">
                {company?.company?.companyName}
                </h1>
                <p className="text-gray-600">GSTIN: {company?.company?.gst}</p>
              </div>
              <div className="mt-2 md:mt-0">
                <Link to={"/farmers/search"} className="rounded-md bg-green-600 cursor-pointer px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                  Create New Order
                </Link>
              </div>
            </div>
          </div>

          {/* Dashboard Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Total Clients */}
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-700">
                  Total Clients
                </h3>
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <p className="mt-2 text-3xl font-bold">
                {farmers.length}
              </p>
              <p className="mt-1 text-sm text-gray-500">Farmers connected</p>
            </div>

            {/* Expenditure */}
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-700">
                  Expenditure
                </h3>
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <p className="mt-2 text-3xl font-bold">
              ₹24,50,000
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Total spent this quarter
              </p>
            </div>

            {/* Orders Booked */}
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-700">
                  Orders Booked
                </h3>
                <Package className="h-5 w-5 text-green-600" />
              </div>
              <p className="mt-2 text-3xl font-bold">
              {company?.company?.orders.length}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Active purchase orders
              </p>
            </div>
          </div>

          {/* Recent Farmers Section */}
          <div className="mt-8">
            <h2 className="mb-4 text-xl font-semibold">
              Recently Connected Farmers
            </h2>
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
                                className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800"
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
          <div className="mt-8">
            <h2 className="mb-4 text-xl font-semibold">Market Trends</h2>
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="space-y-4">
                <div className="flex flex-col">
                  <h3 className="font-medium">Wheat</h3>
                  <div className="mt-2 h-4 w-full rounded-full bg-gray-200">
                    <div
                      className="h-4 rounded-full bg-green-500"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                  <div className="mt-1 flex justify-between text-xs text-gray-500">
                    <span>Current Price: ₹2,200/quintal</span>
                    <span>+12% from last month</span>
                  </div>
                </div>

                <div className="flex flex-col">
                  <h3 className="font-medium">Rice</h3>
                  <div className="mt-2 h-4 w-full rounded-full bg-gray-200">
                    <div
                      className="h-4 rounded-full bg-green-500"
                      style={{ width: "60%" }}
                    ></div>
                  </div>
                  <div className="mt-1 flex justify-between text-xs text-gray-500">
                    <span>Current Price: ₹3,100/quintal</span>
                    <span>+5% from last month</span>
                  </div>
                </div>

                <div className="flex flex-col">
                  <h3 className="font-medium">Sugarcane</h3>
                  <div className="mt-2 h-4 w-full rounded-full bg-gray-200">
                    <div
                      className="h-4 rounded-full bg-green-500"
                      style={{ width: "85%" }}
                    ></div>
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

      <Footer />
    </div>
  );
}
