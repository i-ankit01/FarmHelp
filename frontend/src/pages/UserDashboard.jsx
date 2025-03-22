"use client"

import { useState } from "react"
import {
  Bell,
  ChevronDown,
  CreditCard,
  Grid,
  Home,
  Leaf,
  Menu,
  Package,
  Search,
  ShoppingBag,
  User,
  Settings,
  HelpCircle,
  Users,
} from "lucide-react"
import Footer from "../components/Footer"
import UserSiderbar from "../components/UserSiderbar"

export default function UserDashboard() {

  // Sample data for dashboard
  const dashboardData = {
    userName: "Ankit Kumar",
    cultivableArea: "45 Acres",
    companies: 12,
    cropsGrown: ["Wheat", "Rice", "Corn", "Soybeans"],
    accountBalance: "₹1,45,000",
    orders: {
      total: 24,
      pending: 5,
      completed: 19,
    },
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
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <User className="h-5 w-5 text-gray-600" />
              </div>
              <span className="hidden md:inline-block text-sm font-medium">{dashboardData.userName}</span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <UserSiderbar/>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Welcome, {dashboardData.userName}</h1>
            <p className="text-gray-600">Here's an overview of your farm's performance</p>
          </div>

          {/* Dashboard Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Cultivable Area */}
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-700">Cultivable Area</h3>
                <Grid className="h-5 w-5 text-green-600" />
              </div>
              <p className="mt-2 text-3xl font-bold">{dashboardData.cultivableArea}</p>
              <p className="mt-1 text-sm text-gray-500">Total farmland available</p>
            </div>

            {/* Companies */}
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-700">Connected Companies</h3>
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <p className="mt-2 text-3xl font-bold">{dashboardData.companies}</p>
              <p className="mt-1 text-sm text-gray-500">Business partnerships</p>
            </div>

            {/* Account Balance */}
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-700">Account Balance</h3>
                <CreditCard className="h-5 w-5 text-green-600" />
              </div>
              <p className="mt-2 text-3xl font-bold">{dashboardData.accountBalance}</p>
              <p className="mt-1 text-sm text-gray-500">Available for withdrawal</p>
            </div>

            {/* Crops Grown */}
            <div className="rounded-lg border bg-white p-6 shadow-sm md:col-span-2 lg:col-span-2">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-700">Crops Grown</h3>
                <Leaf className="h-5 w-5 text-green-600" />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {dashboardData.cropsGrown.map((crop, index) => (
                  <span key={index} className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-800">
                    {crop}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-sm text-gray-500">Current season crops</p>
            </div>

            {/* Orders */}
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-700">Orders</h3>
                <Package className="h-5 w-5 text-green-600" />
              </div>
              <p className="mt-2 text-3xl font-bold">{dashboardData.orders.total}</p>
              <div className="mt-2 flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <span className="h-3 w-3 rounded-full bg-yellow-400"></span>
                  <span className="text-sm text-gray-600">{dashboardData.orders.pending} Pending</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="h-3 w-3 rounded-full bg-green-400"></span>
                  <span className="text-sm text-gray-600">{dashboardData.orders.completed} Completed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="mt-8">
            <h2 className="mb-4 text-xl font-semibold">Recent Activity</h2>
            <div className="rounded-lg border bg-white shadow-sm">
              <div className="p-4 border-b">
                <h3 className="font-medium">Latest Updates</h3>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <ShoppingBag className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">New order received</p>
                      <p className="text-sm text-gray-500">Order #12345 from Organic Foods Ltd.</p>
                      <p className="mt-1 text-xs text-gray-400">2 hours ago</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">New company connection</p>
                      <p className="text-sm text-gray-500">Farm Fresh Inc. wants to connect with you</p>
                      <p className="mt-1 text-xs text-gray-400">Yesterday</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-purple-600" />
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
        </main>
      </div>
      <Footer/>
    </div>
  )
}

