import React from "react";
import { Leaf } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  // Function to handle smooth scrolling
  const handleScroll = (event, targetId) => {
    event.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo Section */}
        <div className="flex items-center gap-2 ml-10">
          <Leaf className="h-6 w-6 text-green-600" />
          <Link to={"/"} className="text-2xl font-bold">Farm Help</Link>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex gap-6">
          <a
            href="#features"
            onClick={(e) => handleScroll(e, "features")}
            className="text-sm font-medium hover:text-green-600 transition-colors cursor-pointer"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            onClick={(e) => handleScroll(e, "how-it-works")}
            className="text-sm font-medium hover:text-green-600 transition-colors cursor-pointer"
          >
            How It Works
          </a>
          <a
            href="#testimonials"
            onClick={(e) => handleScroll(e, "testimonials")}
            className="text-sm font-medium hover:text-green-600 transition-colors cursor-pointer"
          >
            Testimonials
          </a>
          <a
            href="#contact"
            onClick={(e) => handleScroll(e, "contact")}
            className="text-sm font-medium hover:text-green-600 transition-colors cursor-pointer"
          >
            Contact
          </a>
        </nav>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <a href="/signin/user">
            <button className="hidden cursor-pointer sm:flex h-10 px-4 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium shadow-sm transition-colors hover:bg-gray-200">
              Sign In
            </button>
          </a>
          <a href="/signup/user">
            <button className="h-10 cursor-pointer px-4 py-2 rounded-md bg-green-600 text-white text-sm font-medium shadow transition-colors hover:bg-green-700">
              Sign Up
            </button>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
