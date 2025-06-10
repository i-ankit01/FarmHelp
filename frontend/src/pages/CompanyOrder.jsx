"use client";

import { useEffect, useState } from "react";
import {
  Bell,
  ChevronDown,
  Clock,
  Download,
  Edit,
  ExternalLink,
  FileText,
  Home,
  Leaf,
  Menu,
  Package,
  Search,
  Settings,
  User,
  Users,
  X,
} from "lucide-react";
import CompanySidebar from "../components/CompanySidebar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanyData } from "../store/companySlice";

export default function CompanyOrder() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("requested"); // "requested" or "accepted"

  const dispatch = useDispatch();
  const { company, loading, error } = useSelector(
    (state) => state.company || { company: null, loading: false, error: null }
  );

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


  // Handle order cancellation
  const handleCancelOrder = (orderId) => {
    // const cancelOrder = async (orderId) => {
    //   try {
    //     const response = await fetch('/api/cancel-order', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({ orderId }),
    //     })
    //
    //     if (!response.ok) {
    //       throw new Error('Failed to cancel order')
    //     }
    //
    //     // Update local state or refetch orders
    //   } catch (error) {
    //     console.error("Error cancelling order:", error)
    //   }
    // }

    alert(`Order ${orderId} cancelled successfully!`);
  };

  // Handle order edit
  const handleEditOrder = (orderId) => {
    alert(`Edit order ${orderId}`);
  };

  // Handle download invoice
  const handleDownloadInvoice = (orderId) => {
    alert(`Downloading invoice for order ${orderId}`);
  };

  // Handle view details
  const handleViewDetails = (orderId) => {
    alert(`View details for order ${orderId}`);
  };

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
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-400 bg-clip-text text-transparent">
              Farm Help
            </span>
          </div>

          <div className="hidden md:flex flex-1 items-center justify-center px-6">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <input
                type="search"
                placeholder="Search orders, farmers..."
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
        {/* Sidebar */}
        <CompanySidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Main Content */}
        <main className="flex-1 p-6 ml-64 bg-gradient-to-b from-blue-100/50 to-transparent">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Orders</h1>
            <p className="text-gray-600">
              Manage your requested and accepted orders
            </p>
          </div>

          {/* Order Tabs */}
          <div className="mb-6 border-b">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab("requested")}
                className={`pb-4 text-sm font-medium ${
                  activeTab === "requested"
                    ? "border-b-2 border-green-500 text-green-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Requested Orders
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

          {/* Requested Orders */}
          {activeTab === "requested" && (
            <div className="animate-fadeIn">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
                {company?.company?.orders
                  ?.filter((order) => order.status === "Pending")
                  ?.map((order) => (
                    <div
                      key={order.id}
                      className="rounded-lg border bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        <div className="mb-4 lg:mb-0">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-medium">
                              {order.farmerName}
                            </h3>
                            <span
                              className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                order.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : order.status === "Rejected"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {order.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">
                            Meerut, Uttar Pradesh
                          </p>

                          <div className="mt-4 grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs text-gray-500">Crop</p>
                              <p className="font-medium">{order.crop}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">
                                Requested Weight
                              </p>
                              <p className="font-medium">
                                {order.quantity} Quintals
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">
                                Offered Price
                              </p>
                              <p className="font-medium">
                                ₹{order.price}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">
                                Total Amount
                              </p>
                              <p className="font-medium text-green-600">
                                ₹{order.price}
                              </p>
                            </div>
                            <div className="col-span-2">
                              <p className="text-xs text-gray-500">
                                Request Date
                              </p>
                              <p className="font-medium">24-03-2025</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          {order.status === "Pending" && (
                            <>
                              <button
                                onClick={() => handleEditOrder(order.id)}
                                className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200"
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Order
                              </button>
                              <button
                                onClick={() => handleCancelOrder(order.id)}
                                className="inline-flex items-center justify-center rounded-md border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 shadow-sm hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
                              >
                                <X className="mr-2 h-4 w-4" />
                                Cancel Request
                              </button>
                            </>
                          )}
                          {order.status === "Rejected" && (
                            <button
                              onClick={() => handleEditOrder(order.id)}
                              className="inline-flex items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200"
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Revise Offer
                            </button>
                          )}
                          <button
                            onClick={() => handleViewDetails(order.id)}
                            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {company?.company?.orders?.filter(
                (order) => order.status === "Pending"
              )?.length === 0 && (
                <div className="rounded-lg border bg-white p-8 text-center shadow-sm">
                  <Package className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900">
                    No requested orders
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    You haven't requested any orders yet.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Accepted Orders */}
          {activeTab === "accepted" && (
            <div className="animate-fadeIn">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
                {company?.company?.orders
                  ?.filter((order) => order.status === "Accepted")
                  ?.map((order) => (
                    <div
                      key={order.id}
                      className="rounded-lg border bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        <div className="mb-4 lg:mb-0">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-medium">
                              {order.farmerName}
                            </h3>
                            <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                              Accepted
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">
                            Meerut, Uttar Pradesh
                          </p>

                          <div className="mt-4 grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs text-gray-500">Crop</p>
                              <p className="font-medium">{order.crop}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">
                                Requested Weight
                              </p>
                              <p className="font-medium">
                                {order.quantity} Quintals
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">
                                Agreed Price
                              </p>
                              <p className="font-medium">
                                ₹ {order.price}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">
                                Total Amount
                              </p>
                              <p className="font-medium text-green-600">
                                ₹{order.price}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">
                                Delivery Status
                              </p>
                              <div className="flex items-center">
                                <span className="mr-1 h-2 w-2 rounded-full bg-blue-500"></span>
                                <p className="font-medium">In Transit</p>
                              </div>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">
                                Payment Status
                              </p>
                              <div className="flex items-center">
                                <span className="mr-1 h-2 w-2 rounded-full bg-yellow-500"></span>
                                <p className="font-medium">Pending</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => handleViewDetails(order.id)}
                            className="inline-flex items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200"
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View Details
                          </button>
                          <button
                            onClick={() => handleDownloadInvoice(order.id)}
                            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200"
                          >
                            <FileText className="mr-2 h-4 w-4" />
                            View Invoice
                          </button>
                          {order.deliveryStatus !== "Delivered" && (
                            <button className="inline-flex items-center justify-center rounded-md border border-blue-300 bg-white px-4 py-2 text-sm font-medium text-blue-700 shadow-sm hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200">
                              <Clock className="mr-2 h-4 w-4" />
                              Track Delivery
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {company?.company?.orders?.filter(
                (order) => order.status === "Accepted"
              )?.length === 0 && (
                <div className="rounded-lg border bg-white p-8 text-center shadow-sm">
                  <Package className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900">
                    No accepted orders
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    You don't have any accepted orders yet.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Order Summary */}
          <div className="mt-8 bg-white rounded-lg border shadow-sm">
            <div className="border-b p-4">
              <h2 className="text-lg font-medium">Order Summary</h2>
            </div>
            <div className="p-6">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-700">
                      Total Orders
                    </h3>
                    <Package className="h-5 w-5 text-gray-500" />
                  </div>
                  <p className="mt-2 text-2xl font-bold">
                    {company?.company?.orders.length}
                  </p>
                  <div className="mt-2 flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <span className="h-3 w-3 rounded-full bg-yellow-400"></span>
                      <span className="text-xs text-gray-600">
                        {company?.company?.orders?.filter((order) => order.status === "Pending")?.length} Requested
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="h-3 w-3 rounded-full bg-green-400"></span>
                      <span className="text-xs text-gray-600">
                        {company?.company?.orders?.filter((order) => order.status === "Accepted")?.length} Accepted
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-700">
                      Total Spending
                    </h3>
                    <Download className="h-5 w-5 text-gray-500" />
                  </div>
                  <p className="mt-2 text-2xl font-bold">₹ 2,53,000</p>
                  <p className="mt-2 text-xs text-gray-500">
                    Based on accepted orders
                  </p>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-700">
                      Pending Deliveries
                    </h3>
                    <Clock className="h-5 w-5 text-gray-500" />
                  </div>
                  <p className="mt-2 text-2xl font-bold">
                    {
                      company?.company?.orders?.length
                    }
                  </p>
                  <p className="mt-2 text-xs text-gray-500">
                    Orders in transit or scheduled
                  </p>
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
