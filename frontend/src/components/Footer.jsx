import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-6 mt-10 relative">
      {/* Gradient Effect on Top */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>

      <div className="container mx-auto flex flex-col items-center text-center md:flex-row md:text-left justify-between px-6">
        {/* Left Section - Branding */}
        
        <div className="mb-4 md:mb-0 w-full md:w-auto">
          <div className="flex">
          <img
          src="/Logo.png" // <- Update this to your actual logo path
          alt="Cura Logo"
          className="h-12 w-12 object-contain"
        />
          <h2 className="text-3xl font-bold text-white mt-1">Cura</h2>
          </div>
          <p className="text-sm text-blue-100 mt-1">
            Empowering sellers, one product at a time.
          </p>
        </div>

        {/* Middle Section - Navigation Links */}
        <div className="flex flex-wrap justify-center md:justify-start space-x-4 md:space-x-6 w-full md:w-auto mb-4 md:mb-0">
          <Link to="/" className="hover:text-white text-blue-200 transition">Home</Link>
          <Link to="/yet" className="hover:text-white text-blue-200 transition">About</Link>
          <Link to="/yet" className="hover:text-white text-blue-200 transition">Sell</Link>
          <Link to="/yet" className="hover:text-white text-blue-200 transition">Contact</Link>
        </div>

        {/* Right Section - Copyright */}
        <div className="text-sm text-blue-100 w-full md:w-auto">
          © {new Date().getFullYear()} Cura. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
