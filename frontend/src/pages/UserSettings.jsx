"use client"

import { useEffect, useState } from "react"
import { Bell, ChevronDown, Home, Leaf, Menu, Save, Search, ShoppingBag, User } from "lucide-react"
import Footer from "../components/Footer"
import UserSidebar from "../components/UserSiderbar"
import { useSelector, useDispatch } from "react-redux";
import { fetchUserData } from "../store/userSlice";
import logo from "../assets//1749736593810.png"


export default function UserSettings() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const dispatch = useDispatch();
  const { user, status } = useSelector((state) => state.user);

  useEffect(() => {
    if (!user) {
      console.log("Dispatching fetchUserData...");
      dispatch(fetchUserData());
    }
  }, [dispatch, user]);
  // Initial user data
  const [userData, setUserData] = useState({
    name: "Ankit Kumar",
    contactNo: "9876543210",
    email: "ankitdemo@gmail.com",
    cultivableLand: 45,
    cropsGrown: ["Wheat", "Rice", "Corn"],
  })

  // Form state
  const [formData, setFormData] = useState({ ...userData })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  // Available crops for selection
  const availableCrops = ["Wheat", "Rice", "Potato", "Oats", "Pulses", "Maize", "Sugarcane"]

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Handle checkbox changes for crops
  const handleCropChange = (crop) => {
    if (formData.cropsGrown.includes(crop)) {
      // Remove crop if already selected
      setFormData({
        ...formData,
        cropsGrown: formData.cropsGrown.filter((item) => item !== crop),
      })
    } else {
      // Add crop if not selected
      setFormData({
        ...formData,
        cropsGrown: [...formData.cropsGrown, crop],
      })
    }
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSuccessMessage("")
    setErrorMessage("")

    try {
      // Simulate API call to backend
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update user data on successful submission
      setUserData({ ...formData })
      setSuccessMessage("Profile updated successfully!")

      // In a real application, you would send data to your backend:
      // const response = await fetch('/api/update-profile', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // })
      //
      // if (!response.ok) {
      //   throw new Error('Failed to update profile')
      // }
      //
      // const data = await response.json()
      // setUserData({...formData})
      // setSuccessMessage(data.message)
    } catch (error) {
      setErrorMessage("Failed to update profile. Please try again.")
      console.error("Error updating profile:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

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
            <h1 className="text-2xl font-bold">Account Settings</h1>
            <p className="text-gray-600">Update your profile information</p>
          </div>

          {/* Settings Form */}
          <div className="bg-white rounded-lg border shadow-md">
            <div className="border-b p-4">
              <h2 className="text-lg font-medium">Personal Information</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
              {/* Success and Error Messages */}
              {successMessage && <div className="mb-6 rounded-md bg-green-50 p-4 text-green-700">{successMessage}</div>}

              {errorMessage && <div className="mb-6 rounded-md bg-red-50 p-4 text-red-700">{errorMessage}</div>}

              <div className="grid gap-6 md:grid-cols-2">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  />
                </div>

                {/* Contact Number */}
                <div>
                  <label htmlFor="contactNo" className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Number
                  </label>
                  <input
                    id="contactNo"
                    name="contactNo"
                    type="tel"
                    value={formData.contactNo}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  />
                </div>

                {/* Cultivable Land */}
                <div>
                  <label htmlFor="cultivableLand" className="block text-sm font-medium text-gray-700 mb-1">
                    Cultivable Land (Acres)
                  </label>
                  <input
                    id="cultivableLand"
                    name="cultivableLand"
                    type="number"
                    min="0"
                    value={formData.cultivableLand}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* Crops Grown */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Crops Grown</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {availableCrops.map((crop) => (
                    <div key={crop} className="flex items-center">
                      <input
                        id={`crop-${crop}`}
                        type="checkbox"
                        checked={formData.cropsGrown.includes(crop)}
                        onChange={() => handleCropChange(crop)}
                        className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <label htmlFor={`crop-${crop}`} className="ml-2 text-sm text-gray-700">
                        {crop}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Additional Settings Sections */}
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {/* Password Section */}
            <div className="bg-white rounded-lg border shadow-md">
              <div className="border-b p-4">
                <h2 className="text-lg font-medium">Password</h2>
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-600 mb-4">Update your password to keep your account secure.</p>
                <button className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                  Change Password
                </button>
              </div>
            </div>

            {/* Notifications Section */}
            <div className="bg-white rounded-lg border shadow-md">
              <div className="border-b p-4">
                <h2 className="text-lg font-medium">Notifications</h2>
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-600 mb-4">Configure how you receive notifications and updates.</p>
                <button className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                  Manage Notifications
                </button>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="mt-8 bg-white rounded-lg border border-red-200 shadow-md">
            <div className="border-b border-red-200 p-4">
              <h2 className="text-lg font-medium text-red-600">Danger Zone</h2>
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-600 mb-4">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <button className="inline-flex items-center rounded-md border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-600 shadow-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                Delete Account
              </button>
            </div>
          </div>
        </main>
      </div>
      <Footer/>
    </div>
  )
}

