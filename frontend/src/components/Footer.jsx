import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 py-6 mt-10 relative">
      {/* Gradient Effect on Top */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>

      <div className="container mx-auto flex flex-col items-center text-center md:flex-row md:text-left justify-between px-6">
        {/* Left Section - Branding */}
        <div className="mb-4 md:mb-0 w-full md:w-auto">
          <h2 className="text-3xl font-bold text-primary">Cura</h2>
          <p className="text-sm text-gray-400 mt-1">
            Empowering sellers, one product at a time.
          </p>
        </div>

        {/* Middle Section - Navigation Links */}
        <div className="flex flex-wrap justify-center md:justify-start space-x-4 md:space-x-6 w-full md:w-auto mb-4 md:mb-0">
          <Link to="/" className="hover:text-primary transition">Home</Link>
          <Link to="/yet" className="hover:text-primary transition">About</Link>
          <Link to="/yet" className="hover:text-primary transition">Sell</Link>
          <Link to="/yet" className="hover:text-primary transition">Contact</Link>
        </div>

        {/* Right Section - Copyright */}
        <div className="text-sm text-gray-400 w-full md:w-auto">
          © {new Date().getFullYear()} Cura. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
