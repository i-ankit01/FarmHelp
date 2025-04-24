import React from "react";
import { Facebook, Instagram, Linkedin, Twitter, Leaf } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = ()=> {
    return (
        <footer className="bg-white border-t py-8 md:ml-64 z-50">
        <div className="container px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="h-6 w-6 text-green-600" />
                <span className="text-xl font-bold">Farm Help</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Connecting farmers and businesses directly, eliminating middlemen and maximizing profits.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-gray-600 hover:text-green-600">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-green-600">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-green-600">
                    Press
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-green-600">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-gray-600 hover:text-green-600">
                    Farmer Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-green-600">
                    Market Insights
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-green-600">
                    Success Stories
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-green-600">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li className="text-gray-600">support@farmhelp.com</li>
                <li className="text-gray-600">+91 123 456 7890</li>
                <li className="text-gray-600">123 Agri Tower, Sector 15</li>
                <li className="text-gray-600">New Delhi, India 110001</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t pt-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-gray-600">&copy; {new Date().getFullYear()} Farm Help. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex space-x-6 text-sm">
              <a href="#" className="text-gray-600 hover:text-green-600">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-600 hover:text-green-600">
                Terms of Service
              </a>
              <a href="#" className="text-gray-600 hover:text-green-600">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    )
}

export default Footer;