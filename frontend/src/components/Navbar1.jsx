import React from "react";
import { Link } from "react-router-dom";

const Navbar1 = () => {
  return (
    <div className="w-full">
      {/* White line above the navbar */}
      <div className="w-full h-[1px] bg-white opacity-50"></div>

      <nav className="navbar bg-black shadow-md px-6 py-4 relative flex items-center">
        {/* Logo Section (Left-Aligned, Slightly Shifted Right) */}
        <div className="flex-1 ml-4">
          <Link
            to="/"
            className="text-4xl font-bold text-primary tracking-wide hover:text-primary-focus transition relative"
          >
            Cura
            {/* Gradient Underline */}
            <div className="absolute left-0 bottom-0 w-full h-[2px]">
              <div className="absolute inset-x-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
              <div className="absolute inset-x-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
              <div className="absolute inset-x-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
              <div className="absolute inset-x-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
            </div>
          </Link>
        </div>

        {/* Navigation Links (Right-Aligned) */}
        <div className="flex-none">
          <ul className="menu menu-horizontal space-x-4">
            <li>
              <Link to="/login" className="btn btn-outline btn-primary px-5 hover:bg-primary hover:text-white transition">
                Start Selling
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* White line below the navbar */}
      <div className="w-full h-[1px] bg-white opacity-50"></div>
    </div>
  );
};

export default Navbar1;
