import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-blue-950 text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Website Info Section */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Visa Navigator</h3>
            <p className="text-gray-300">
              Your one-stop portal for navigating visa requirements, applying online, and tracking your applications. Simplify your travel plans with Visa Navigator.
            </p>
          </div>

          {/* Contact Info Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="text-gray-300 space-y-2">
              <li>Email: <a href="mailto:ripanulalam2000@gmail.com" className="hover:underline">ripanulalam2000@gmail.com</a></li>
              <li>Phone: <a href="tel:+123456789" className="hover:underline">+123 456 789</a></li>
              <li>Address: Charlakshya, Karnaphuli, Chattogram, BD.</li>
            </ul>
          </div>

          {/* Social Media Links Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="text-2xl hover:text-blue-600" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="text-2xl hover:text-blue-400" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-2xl hover:text-pink-600" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="text-2xl hover:text-blue-700" />
              </a>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="col-span-1 sm:col-span-2 md:col-span-1 lg:col-span-1">
            <p className="text-center sm:text-left text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Visa Navigator. All rights reserved. Designed & developed by <a className="underline text-blue-50" href="https://ripanulalam.netlify.app">Ripanul Alam</a>
            </p>
          </div>
        </div>

        {/* Back to Top Button */}
        <div className="flex justify-center mt-6">
          <a href="#top" className="btn  bg-blue-600 hover:bg-blue-500 text-white px-5 py-1 rounded-full">
            Back to Top
          </a>
        </div>
      </div>
    </footer>
  );
};

