"use client"

import { useState } from "react"
import { ArrowRight, Leaf, TrendingUp, Users, Truck, Shield } from "lucide-react"
import Header from "../components/header"

export default function FarmHelpLanding() {
  const [email, setEmail] = useState("")

  return (
    <div className="flex min-h-screen flex-col">
        <Header/>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-white to-green-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2 ml-10">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Direct Farm to Business Connection
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">
                    Eliminate middlemen and maximize your profits. Connect directly with businesses looking for your
                    crops.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <a href="/signup/user">
                    <button className="inline-flex cursor-pointer h-10 items-center justify-center rounded-md bg-green-600 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-green-700">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </a>
                  <a href="#how-it-works">
                    <button className="inline-flex hover:bg-gray-200 cursor-pointer h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground">
                      Learn More
                    </button>
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src="https://via.placeholder.com/550x550"
                  alt="Farm Help Platform"
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-800">Features</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Why Choose Farm Help?</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl">
                  Our platform offers unique benefits for both farmers and businesses
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-green-100 p-3">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold">Higher Profits</h3>
                <p className="text-center text-gray-500">
                  Eliminate middlemen and increase your profit margins by up to 40%
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-green-100 p-3">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold">Direct Connections</h3>
                <p className="text-center text-gray-500">
                  Build lasting relationships with businesses that value quality produce
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-green-100 p-3">
                  <Truck className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold">Simplified Logistics</h3>
                <p className="text-center text-gray-500">Integrated tools for managing transportation and delivery</p>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-800">Process</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">How Farm Help Works</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl">
                  A simple three-step process to connect farmers with businesses
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <div className="relative flex flex-col items-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-white">1</div>
                <h3 className="text-xl font-bold">Create Your Profile</h3>
                <p className="text-center text-gray-500">
                  Sign up and create a detailed profile showcasing your farm and produce
                </p>
                <div className="absolute right-0 top-6 hidden h-0.5 w-full bg-green-600 lg:block lg:w-1/2"></div>
              </div>
              <div className="relative flex flex-col items-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-white">2</div>
                <h3 className="text-xl font-bold">List Your Produce</h3>
                <p className="text-center text-gray-500">
                  Add details about your available crops, quantities, and pricing
                </p>
                <div className="absolute left-0 top-6 hidden h-0.5 w-1/2 bg-green-600 lg:block"></div>
                <div className="absolute right-0 top-6 hidden h-0.5 w-1/2 bg-green-600 lg:block"></div>
              </div>
              <div className="relative flex flex-col items-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-white">3</div>
                <h3 className="text-xl font-bold">Connect & Sell</h3>
                <p className="text-center text-gray-500">
                  Receive inquiries from businesses and negotiate deals directly
                </p>
                <div className="absolute left-0 top-6 hidden h-0.5 w-1/2 bg-green-600 lg:block"></div>
              </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-800">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Success Stories</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl">
                  Hear from farmers and businesses who have transformed their operations
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2">
              <div className="flex flex-col justify-between rounded-lg border p-6 shadow-sm">
                <div className="space-y-4">
                  <p className="text-gray-500">
                    "Since joining Farm Help, I've increased my profit margins by 35%. The direct connection with
                    restaurants has transformed my small farm business."
                  </p>
                </div>
                <div className="flex items-center space-x-4 pt-4">
                  <div className="rounded-full bg-green-100 p-1">
                    <div className="h-10 w-10 rounded-full bg-green-200"></div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">John Smith</p>
                    <p className="text-sm text-gray-500">Organic Vegetable Farmer</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between rounded-lg border p-6 shadow-sm">
                <div className="space-y-4">
                  <p className="text-gray-500">
                    "As a restaurant owner, Farm Help has allowed me to source the freshest ingredients directly from
                    local farmers. The quality is exceptional."
                  </p>
                </div>
                <div className="flex items-center space-x-4 pt-4">
                  <div className="rounded-full bg-green-100 p-1">
                    <div className="h-10 w-10 rounded-full bg-green-200"></div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Sarah Johnson</p>
                    <p className="text-sm text-gray-500">Restaurant Owner</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-600 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to Transform Your Business?</h2>
                <p className="max-w-[900px] text-green-50 md:text-xl">
                  Join thousands of farmers and businesses already benefiting from direct connections
                </p>
              </div>
              <div className="mx-auto w-full max-w-sm space-y-2">
                <form
                  className="flex space-x-2"
                  onSubmit={(e) => {
                    e.preventDefault()
                    // Handle form submission
                    alert(`Thank you for your interest! We'll contact you at: ${email}`)
                    setEmail("")
                  }}
                >
                  <input
                    className="flex h-10 w-full rounded-md border border-green-400 bg-white px-3 py-2 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Enter your email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-green-600 shadow transition-colors hover:bg-green-50"
                  >
                    Get Started
                  </button>
                </form>
                <p className="text-xs text-green-100">
                  By signing up, you agree to our{" "}
                  <a href="/terms" className="underline underline-offset-2">
                    Terms & Conditions
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-800">
                    Contact Us
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Get in Touch</h2>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">
                    Have questions about Farm Help? Our team is here to assist you.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-green-600" />
                    <p className="text-gray-500">Secure transactions guaranteed</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-green-600" />
                    <p className="text-gray-500">Join 5,000+ farmers and 1,200+ businesses</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Leaf className="h-5 w-5 text-green-600" />
                    <p className="text-gray-500">Supporting sustainable agriculture</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-full max-w-md space-y-4 rounded-lg border p-6 shadow-sm">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">Contact Form</h3>
                    <p className="text-sm text-gray-500">Fill out the form below and we'll get back to you shortly.</p>
                  </div>
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="first-name" className="text-sm font-medium">
                          First name
                        </label>
                        <input
                          id="first-name"
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="John"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="last-name" className="text-sm font-medium">
                          Last name
                        </label>
                        <input
                          id="last-name"
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Smith"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="john.smith@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <textarea
                        id="message"
                        className="flex min-h-[100px] w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Tell us how we can help..."
                      />
                    </div>
                    <button className="inline-flex h-10 w-full items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-green-700">
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-background py-6">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-green-600" />
            <span className="text-lg font-bold">Farm Help</span>
          </div>
          <p className="text-center text-sm text-gray-500 md:text-left">
            &copy; {new Date().getFullYear()} Farm Help. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="/terms" className="text-sm text-gray-500 hover:underline">
              Terms
            </a>
            <a href="/privacy" className="text-sm text-gray-500 hover:underline">
              Privacy
            </a>
            <a href="/contact" className="text-sm text-gray-500 hover:underline">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

