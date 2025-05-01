"use client"

import { useState } from "react"
import {
  Bell,
  ChevronDown,
  HelpCircle,
  Home,
  Leaf,
  Menu,
  Search,
  Settings,
  ShoppingBag,
  User,
  Users,
} from "lucide-react"
import CompanySidebar from "../components/CompanySidebar"
import Footer from "../components/Footer"

export default function CompanyHelp() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("farmer") // "farmer" or "company"
  const [openFaqs, setOpenFaqs] = useState({})



  // Toggle FAQ item
  const toggleFaq = (id) => {
    setOpenFaqs((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  // Farmer FAQs
  const farmerFaqs = [
    {
      id: "f1",
      question: "How do I create an account on Farm Help?",
      answer:
        "To create an account, click on the 'Sign Up' button on the homepage. Fill in your details including name, contact information, and farm details. Verify your email address, and you're ready to start using Farm Help.",
    },
    {
      id: "f2",
      question: "How do I list my crops for sale?",
      answer:
        "After logging in, navigate to your Dashboard and click on 'Add Crop'. Fill in details about your crop, including type, quantity, expected harvest date, and your asking price. Companies will be able to see your listing and make offers.",
    },
    {
      id: "f3",
      question: "How do I accept or reject offers from companies?",
      answer:
        "When a company makes an offer, you'll receive a notification. Go to the 'Orders' page to view all pending offers. You can review the details including price and quantity, then click 'Accept' to approve or simply ignore offers you're not interested in.",
    },
    {
      id: "f4",
      question: "How do payments work on Farm Help?",
      answer:
        "Farm Help facilitates secure payments between farmers and companies. Once an order is accepted, the company makes a payment which is held in escrow. After you deliver the crops and the company confirms receipt, the payment is released to your account. You can withdraw funds to your bank account at any time.",
    },
    {
      id: "f5",
      question: "Can I update my farm details and crop information?",
      answer:
        "Yes, you can update your profile anytime. Go to 'Settings' to update your personal information, farm details, and banking information. To update crop information, go to your crop listings and click 'Edit' on the specific crop you want to modify.",
    },
    {
      id: "f6",
      question: "What if there's a dispute with a company?",
      answer:
        "If you encounter any issues with a company, you can report the problem through our dispute resolution system. Click on the order in question and select 'Report Issue'. Our support team will review the case and help mediate a resolution between both parties.",
    },
    {
      id: "f7",
      question: "How do I track my orders?",
      answer:
        "All your orders can be tracked from the 'Orders' page. You'll see different sections for pending, accepted, and completed orders. Each order contains details about the buyer, price, quantity, and current status.",
    },
  ]

  // Company FAQs
  const companyFaqs = [
    {
      id: "c1",
      question: "How do I find farmers growing specific crops?",
      answer:
        "Use the 'Find Farmers' feature from your dashboard. You can filter farmers by crop type, location, and minimum land size. Browse through the results to find farmers that match your requirements and send them purchase requests.",
    },
    {
      id: "c2",
      question: "How do I make an offer to a farmer?",
      answer:
        "Once you find a farmer growing your desired crop, you can make an offer by entering the quantity you need and the price per quintal you're willing to pay. Click 'Request' to send your offer to the farmer, who will then decide whether to accept or reject it.",
    },
    {
      id: "c3",
      question: "How do I know if a farmer has accepted my offer?",
      answer:
        "You'll receive a notification when a farmer accepts your offer. You can also check the status of all your offers in the 'Orders' section of your dashboard, where they'll be categorized as pending, accepted, or completed.",
    },
    {
      id: "c4",
      question: "How do I make payments for accepted orders?",
      answer:
        "When a farmer accepts your offer, you'll be prompted to make a payment. You can use various payment methods including bank transfer, credit card, or UPI. The payment is held in escrow until you confirm receipt of the crops.",
    },
    {
      id: "c5",
      question: "Can I negotiate prices with farmers?",
      answer:
        "Yes, if a farmer rejects your initial offer, you can send a new offer with a different price. You can also contact the farmer directly through our messaging system to discuss terms before making a formal offer.",
    },
    {
      id: "c6",
      question: "How do I verify the quality of crops before payment?",
      answer:
        "Farm Help provides a verification process where you can inspect the crops upon delivery. If the crops meet your requirements, you confirm receipt and the payment is released to the farmer. If there are quality issues, you can raise a dispute through our platform.",
    },
    {
      id: "c7",
      question: "Can I set up recurring orders with farmers?",
      answer:
        "Yes, for long-term partnerships, you can set up recurring orders. Go to an accepted order and click 'Convert to Recurring'. You can specify the frequency, quantity, and duration of the recurring order, subject to the farmer's approval.",
    },
  ]

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
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-400 bg-clip-text text-transparent">
              Farm Help
            </span>
          </div>

          <div className="hidden md:flex flex-1 items-center justify-center px-6">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <input
                type="search"
                placeholder="Search help topics..."
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
              <span className="hidden md:inline-block text-sm font-medium">Company Help</span>
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
            <h1 className="text-2xl font-bold">Help Center</h1>
            <p className="text-gray-600">Find answers to frequently asked questions about using Farm Help</p>
          </div>

          {/* FAQ Tabs */}
          <div className="mb-6 border-b">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab("farmer")}
                className={`pb-4 text-sm font-medium transition-colors duration-200 ${
                  activeTab === "farmer"
                    ? "border-b-2 border-green-500 text-green-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                For Farmers
              </button>
              <button
                onClick={() => setActiveTab("company")}
                className={`pb-4 text-sm font-medium transition-colors duration-200 ${
                  activeTab === "company"
                    ? "border-b-2 border-green-500 text-green-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                For Companies
              </button>
            </div>
          </div>

          {/* Farmer FAQs */}
          {activeTab === "farmer" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
                <div className="border-b p-4 bg-green-50">
                  <h2 className="text-lg font-medium text-green-800">Frequently Asked Questions for Farmers</h2>
                </div>
                <div className="divide-y">
                  {farmerFaqs.map((faq) => (
                    <div key={faq.id} className="transition-all duration-200 ease-in-out">
                      <button
                        onClick={() => toggleFaq(faq.id)}
                        className="flex w-full items-center justify-between p-4 text-left hover:bg-gray-50 focus:outline-none"
                      >
                        <span className="font-medium">{faq.question}</span>
                        <ChevronDown
                          className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
                            openFaqs[faq.id] ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          openFaqs[faq.id] ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="p-4 pt-0 text-gray-600 bg-gray-50">{faq.answer}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Support Section */}
              <div className="bg-white rounded-lg border shadow-sm p-6 mt-8">
                <h3 className="text-lg font-medium mb-2">Still have questions?</h3>
                <p className="text-gray-600 mb-4">
                  If you couldn't find the answer to your question, our support team is here to help.
                </p>
                <button className="inline-flex items-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200">
                  Contact Support
                </button>
              </div>
            </div>
          )}

          {/* Company FAQs */}
          {activeTab === "company" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
                <div className="border-b p-4 bg-blue-50">
                  <h2 className="text-lg font-medium text-blue-800">Frequently Asked Questions for Companies</h2>
                </div>
                <div className="divide-y">
                  {companyFaqs.map((faq) => (
                    <div key={faq.id} className="transition-all duration-200 ease-in-out">
                      <button
                        onClick={() => toggleFaq(faq.id)}
                        className="flex w-full items-center justify-between p-4 text-left hover:bg-gray-50 focus:outline-none"
                      >
                        <span className="font-medium">{faq.question}</span>
                        <ChevronDown
                          className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
                            openFaqs[faq.id] ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          openFaqs[faq.id] ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="p-4 pt-0 text-gray-600 bg-gray-50">{faq.answer}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Business Support Section */}
              <div className="bg-white rounded-lg border shadow-sm p-6 mt-8">
                <h3 className="text-lg font-medium mb-2">Need business support?</h3>
                <p className="text-gray-600 mb-4">
                  Our business team is available to help you with any questions about sourcing, payments, or
                  partnerships.
                </p>
                <button className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200">
                  Contact Business Support
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
      <Footer/> 
    </div>
  )
}

