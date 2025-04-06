import React from "react";
import { Link } from "react-router-dom";

const Navbar1 = () => {
  return (
    <div className="w-full">
      <nav className="navbar bg-gradient-to-r from-blue-500 to-blue-700 border-b border-blue-800 shadow-md px-6 py-4 relative flex items-center text-white">
        {/* Logo Section (Left-Aligned, Slightly Shifted Right) */}
        <img
          src="../../public/Logo.png" // <- Update this to your actual logo path
          alt="Cura Logo"
          className="h-12 w-12 object-contain"
        />
        <div className="flex-1 ml-1 mb-1">
          <Link
            to="/"
            className="text-4xl font-bold tracking-wide hover:text-white transition relative"
          >
            Cura
            {/* Gradient Underline */}
            <div className="absolute left-0 bottom-0 w-full h-[2px]">
              <div className="absolute inset-x-0 bg-gradient-to-r from-transparent via-indigo-200 to-transparent h-[2px] w-3/4 blur-sm" />
              <div className="absolute inset-x-0 bg-gradient-to-r from-transparent via-indigo-200 to-transparent h-px w-3/4" />
              <div className="absolute inset-x-0 bg-gradient-to-r from-transparent via-sky-200 to-transparent h-[5px] w-1/4 blur-sm" />
              <div className="absolute inset-x-0 bg-gradient-to-r from-transparent via-sky-200 to-transparent h-px w-1/4" />
            </div>
          </Link>
        </div>

        {/* Navigation Links (Right-Aligned) */}
        <div className="flex-none">
          <ul className="menu menu-horizontal space-x-4">
            <li>
              <Link
                to="/login"
                className="btn btn-outline border-white text-white hover:bg-white hover:text-blue-700 transition px-5"
              >
                Start Selling
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar1;
