"use client";

import { useEffect, useState } from "react";
import {
  Bell,
  ChevronDown,
  CreditCard,
  Grid,
  Truck,
  Building,
  Wheat,
  Leaf,
  Menu,
  Package,
  Search,
  ShoppingBag,
  User,
  Users,
} from "lucide-react";
import Footer from "../components/Footer";
import UserSiderbar from "../components/UserSiderbar";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserData } from "../store/userSlice";
import VoiceChatbot from "./VoiceChatbot";

export default function UserDashboard() {
  const dispatch = useDispatch();
  const { user, status } = useSelector((state) => state.user);

  useEffect(() => {
    if (!user) {
      console.log("Dispatching fetchUserData...");
      dispatch(fetchUserData());
    }
  }, [dispatch, user]);


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
      <header className="sticky top-0 z-50 w-full border-b bg-white shadow-md">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <button
              className="md:hidden p-2 rounded-md hover:bg-gray-100"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-400 bg-clip-text text-transparent">
              Farm Help
            </span>
          </div>
          </div>

          <div className="hidden md:flex flex-1 items-center justify-center px-6">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <input
                type="search"
                placeholder="Search companies, crops..."
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
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center overflow-hidden shadow-sm group-hover:shadow-md transition-all duration-300">
                <User className="h-5 w-5 text-white" />
              </div>
              <span className="hidden md:inline-block text-sm font-medium">
                {status === "loading" ? "Loading..." : user?.farmer.firstName}
              </span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <UserSiderbar />

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto bg-transparent overflow-y-auto overflow-x-hidden md:ml-64">
          <div className="mb-6 animate-fadeIn">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent">
            Welcome,{" "}
              {status === "loading"
                ? "Loading..."
                : user?.farmer
                ? `${user.farmer.firstName} ${user.farmer.lastName}`
                : "User not found"}
            </h1>
            <p className="text-gray-600">Here's an overview of your farm's performance</p>
          </div>

          {/* Dashboard Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Cultivable Area */}
            <div className="rounded-xl border bg-white p-6 shadow-sm hover:shadow-xl transition-all duration-300 animate-fadeIn animation-delay-100 group overflow-hidden relative">
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-green-100 opacity-70 group-hover:scale-125 transition-transform duration-500"></div>
              <div className="relative">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-700 group-hover:text-green-700 transition-colors duration-200">
                    Cultivable Area
                  </h3>
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors duration-200">
                    <Grid className="h-5 w-5 text-green-600 group-hover:rotate-12 transition-transform duration-200" />
                  </div>
                </div>
                <p className="mt-2 text-3xl font-bold bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent group-hover:scale-105 origin-left transition-transform duration-200">
                {status === "loading" ? "Loading..." : user?.farmer.land} Acres
                </p>
                <p className="mt-1 text-sm text-gray-500">Total farmland available</p>
              </div>
            </div>

            {/* Companies */}
            <div className="rounded-xl border bg-white p-6 shadow-sm hover:shadow-xl transition-all duration-300 animate-fadeIn animation-delay-200 group overflow-hidden relative">
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-blue-100 opacity-70 group-hover:scale-125 transition-transform duration-500"></div>
              <div className="relative">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-700 group-hover:text-blue-700 transition-colors duration-200">
                    Connected Companies
                  </h3>
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-200">
                    <Users className="h-5 w-5 text-blue-600 group-hover:rotate-12 transition-transform duration-200" />
                  </div>
                </div>
                <p className="mt-2 text-3xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent group-hover:scale-105 origin-left transition-transform duration-200">
                {status === "loading"
                  ? "Loading..."
                  : user?.farmer.orders.length}
                </p>
                <p className="mt-1 text-sm text-gray-500">Business partnerships</p>
              </div>
            </div>

            {/* Account Balance */}
            <div className="rounded-xl border bg-white p-6 shadow-sm hover:shadow-xl transition-all duration-300 animate-fadeIn animation-delay-300 group overflow-hidden relative">
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-purple-100 opacity-70 group-hover:scale-125 transition-transform duration-500"></div>
              <div className="relative">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-700 group-hover:text-purple-700 transition-colors duration-200">
                    Account Balance
                  </h3>
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors duration-200">
                    <CreditCard className="h-5 w-5 text-purple-600 group-hover:rotate-12 transition-transform duration-200" />
                  </div>
                </div>
                <p className="mt-2 text-3xl font-bold bg-gradient-to-r from-purple-700 to-purple-500 bg-clip-text text-transparent group-hover:scale-105 origin-left transition-transform duration-200">
                ₹1,45,000
                </p>
                <p className="mt-1 text-sm text-gray-500">Available for withdrawal</p>
              </div>
            </div>

            {/* Crops Grown */}
            <div className="rounded-xl border bg-white p-6 shadow-sm hover:shadow-xl transition-all duration-300 animate-fadeIn animation-delay-400 md:col-span-2 lg:col-span-2 group">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-700 group-hover:text-green-700 transition-colors duration-200">
                  Crops Grown
                </h3>
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors duration-200">
                  <Leaf className="h-5 w-5 text-green-600 group-hover:rotate-12 transition-transform duration-200" />
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
              {status === "loading"
                  ? "Loading..."
                  : user?.farmer?.crops?.map((crop, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-green-100 px-3 py-1 text-md border border-green-700 text-green-800"
                      >
                        {crop}
                      </span>
                    ))}
              </div>
              <p className="mt-3 text-sm text-gray-500">Current season crops</p>
            </div>

            {/* Orders */}
            <div className="rounded-xl border bg-white p-6 shadow-sm hover:shadow-xl transition-all duration-300 animate-fadeIn animation-delay-500 group">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-700 group-hover:text-amber-700 transition-colors duration-200">
                  Orders
                </h3>
                <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center group-hover:bg-amber-200 transition-colors duration-200">
                  <Package className="h-5 w-5 text-amber-600 group-hover:rotate-12 transition-transform duration-200" />
                </div>
              </div>
              <p className="mt-2 text-3xl font-bold bg-gradient-to-r from-amber-700 to-amber-500 bg-clip-text text-transparent group-hover:scale-105 origin-left transition-transform duration-200">
              {status === "loading"
                  ? "Loading..."
                  : user?.farmer.orders.length}
              </p>
              <div className="mt-2 flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <span className="h-3 w-3 rounded-full bg-yellow-400 "></span>
                  <span className="text-sm text-gray-600">{status === "loading"
                      ? "Loading..."
                      : user?.farmer?.orders ?.filter(order => order.status === "Pending")?.length}{" "}
                    Pending</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="h-3 w-3 rounded-full bg-green-400"></span>
                  <span className="text-sm text-gray-600">{status === "loading"
                      ? "Loading..."
                      : user?.farmer?.orders ?.filter(order => order.status === "Accepted")?.length}{" "} Completed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="mt-8 animate-fadeIn animation-delay-600">
            <h2 className="mb-4 text-xl font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Recent Activity
            </h2>
            <div className="rounded-xl border bg-white shadow-sm overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="p-4 border-b bg-gradient-to-r from-gray-50 to-white group-hover:from-green-50 group-hover:to-white transition-colors duration-300">
                <h3 className="font-medium">Latest Updates</h3>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  <div className="flex items-start gap-4 hover:bg-green-50 p-3 rounded-lg transition-colors duration-200 -mx-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-sm">
                      <ShoppingBag className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">New order received</p>
                      <p className="text-sm text-gray-500">Order #12345 from Organic Foods Ltd.</p>
                      <p className="mt-1 text-xs text-gray-400">2 hours ago</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 hover:bg-blue-50 p-3 rounded-lg transition-colors duration-200 -mx-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-sm">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">New company connection</p>
                      <p className="text-sm text-gray-500">Farm Fresh Inc. wants to connect with you</p>
                      <p className="mt-1 text-xs text-gray-400">Yesterday</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 hover:bg-purple-50 p-3 rounded-lg transition-colors duration-200 -mx-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center shadow-sm">
                      <CreditCard className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">Payment received</p>
                      <p className="text-sm text-gray-500">₹35,000 from Green Grocers</p>
                      <p className="mt-1 text-xs text-gray-400">2 days ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Weather Widget */}
          <div className="mt-8 animate-fadeIn animation-delay-700">
            <div className="rounded-xl border bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white shadow-md overflow-hidden relative">
              <div className="absolute top-0 right-0 opacity-20">
                <svg width="150" height="150" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 3V5M5.6 5.6L7 7M3 12H5M5.6 18.4L7 17M12 19V21M17 17L18.4 18.4M19 12H21M18.4 5.6L17 7M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium">Today's Weather</h3>
                  <p className="text-3xl font-bold mt-2">32°C</p>
                  <p className="text-sm opacity-80">Sunny with occasional clouds</p>
                </div>
                <div className="text-right">
                  <p className="text-sm">Perfect for harvesting</p>
                  <p className="text-sm opacity-80">Humidity: 65%</p>
                  <p className="text-sm opacity-80">Wind: 10 km/h</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <VoiceChatbot/>
      <Footer />
    </div>
  );
}
