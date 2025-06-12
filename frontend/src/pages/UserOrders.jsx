"use client"

import { useEffect, useState } from "react"
import { Bell, Check, ChevronDown, Clock, Home, Leaf, Menu, Package, Search, ShoppingBag, User } from "lucide-react"
import UserSidebar from "../components/UserSiderbar"
import { useSelector, useDispatch } from "react-redux";
import { fetchUserData } from "../store/userSlice";
import logo from "../assets//1749736593810.png"

export default function UserOrders() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const dispatch = useDispatch();
      const { user, status } = useSelector((state) => state.user);
    
      useEffect(() => {
        if (!user) {
          console.log("Dispatching fetchUserData...");
          dispatch(fetchUserData());
        }
      }, [dispatch, user]);
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("pending")

  // Handle order acceptance
  const handleAcceptOrder = async (farmerId, companyId, uniqueKey) => {
    console.log(farmerId, companyId, uniqueKey)
    try {
      const response = await fetch(`${backendUrl}/api/v1/accept-order/${farmerId}/${companyId}/${uniqueKey}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to accept order");
      }
  
      const data = await response.json();
      console.log(data.message);
  
      // Optionally, update UI state or refetch orders
      alert(`Order accepted successfully!`);
    } catch (error) {
      console.error("Error accepting order:", error);
    }
  };
  

  return (
    <div className="flex min-h-screen flex-col">
      
      {/* Header/Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-white shadow-md">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <button className="md:hidden p-2 rounded-md hover:bg-gray-100" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu className="h-5 w-5" />
            </button>
            <img className="w-16 h-16 object-cover" src={logo} alt="logo" />
            <span className="text-xl font-bold">Farm Help</span>
          </div>

          <div className="hidden md:flex flex-1 items-center justify-center px-6">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <input
                type="search"
                placeholder="Search orders, companies..."
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
              <span className="hidden md:inline-block text-sm font-medium">{status === "loading" ? "Loading..." : user?.farmer.firstName}</span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <UserSidebar sidebarOpen={sidebarOpen}/>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gradient-to-br from-green-100 via-white to-blue-100 overflow-y-auto overflow-x-hidden md:ml-64">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Orders</h1>
            <p className="text-gray-600">Manage your pending and accepted orders</p>
          </div>

          {/* Order Tabs */}
          <div className="mb-6 border-b">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab("pending")}
                className={`pb-4 text-sm font-medium ${
                  activeTab === "pending"
                    ? "border-b-2 border-green-500 text-green-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Pending Orders
              </button>
              <button
                onClick={() => setActiveTab("accepted")}
                className={`pb-4 text-sm font-medium ${
                  activeTab === "accepted"
                    ? "border-b-2 border-green-500 text-green-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Accepted Orders
              </button>
            </div>
          </div>

          {/* Pending Orders */}
          {activeTab === "pending" && (
            <div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
                {user?.farmer?.orders ?.filter(order => order.status === "Pending")?.map((order , key) => (
                  <div key={order.id} className="rounded-lg border bg-white p-6 shadow-md">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="mb-4 lg:mb-0">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-medium">{order.companyName}</h3>
                          <span className="rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                            Pending
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">Meerut, Uttar Pradesh</p>

                        <div className="mt-4 grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-gray-500">Crop</p>
                            <p className="font-medium">{order.crop}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Requested Weight</p>
                            <p className="font-medium">{order.quantity} Quintals</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Offered Amount</p>
                            <p className="font-medium text-green-600">₹ {order.price}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Date</p>
                            <p className="font-medium">24-03-2025</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleAcceptOrder(order.farmerId , order.companyId , order.uniqueKey )}
                          className="inline-flex items-center justify-center rounded-md cursor-pointer bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        >
                          <Check className="mr-2 h-4 w-4 " />
                          Accept Order
                        </button>
                        <button className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {user?.farmer?.orders ?.filter(order => order.status === "Pending")?.length === 0 && (
                <div className="rounded-lg border bg-white p-8 text-center shadow-md">
                  <Package className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No pending orders</h3>
                  <p className="mt-1 text-sm text-gray-500">You don't have any pending orders at the moment.</p>
                </div>
              )}
            </div>
          )}

          {/* Accepted Orders */}
          {activeTab === "accepted" && (
            <div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
                {user?.farmer?.orders ?.filter(order => order.status === "Accepted")?.map((order, key) => (
                  <div key={key} className="rounded-lg border bg-white p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-fade-in-up">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="mb-4 lg:mb-0">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-medium">{order.companyName}</h3>
                          <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                            Accepted
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">Meerut, Uttar Pradesh</p>

                        <div className="mt-4 grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-gray-500">Crop</p>
                            <p className="font-medium">{order.crop}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Requested Weight</p>
                            <p className="font-medium">{order.quantity} Quintals</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Amount</p>
                            <p className="font-medium text-green-600">₹{order.price}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Payment Status</p>
                            <div className="flex items-center">
                              {order.paymentStatus === "Accepted" ? (
                                <>
                                  <span className="mr-1 h-2 w-2 rounded-full bg-green-500"></span>
                                  <p className="font-medium text-green-600">Accepted</p>
                                </>
                              ) : (
                                <>
                                  <span className="mr-1 h-2 w-2 rounded-full bg-yellow-500"></span>
                                  <p className="font-medium text-yellow-600">Pending</p>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <button className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                          View Details
                        </button>
                        {order.paymentStatus === "Pending" && (
                          <button className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                            <Clock className="mr-2 h-4 w-4" />
                            Track Payment
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {user?.farmer?.orders ?.filter(order => order.status === "Accepted")?.length === 0 && (
                <div className="rounded-lg border bg-white p-8 text-center shadow-md">
                  <Package className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No accepted orders</h3>
                  <p className="mt-1 text-sm text-gray-500">You haven't accepted any orders yet.</p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

