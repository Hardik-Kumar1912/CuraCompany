import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

const DashBoard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen relative">
      {/* HAMBURGER BUTTON (Mobile Only) */}
      <div className="absolute top-4 left-4 md:hidden z-50">
        <button
          onClick={toggleSidebar}
          className="text-white text-3xl focus:outline-none"
        >
          &#9776; {/* Hamburger Symbol */}
        </button>
      </div>

      {/* SIDEBAR */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-800 shadow-lg z-50 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform md:relative md:translate-x-0 md:w-72`}
      >
        <Sidebar toggleSidebar={toggleSidebar} />
      </div>

      {/* OVERLAY (For Mobile Click Outside) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* MAIN CONTENT */}
      <div className="flex-1 flex justify-center items-center p-5 md:p-10 relative">
        <div className="text-white text-center w-full max-w-4xl">
          <h1 className="text-3xl md:text-5xl font-bold">
            Welcome to Your Dashboard!
          </h1>
          <p className="text-sm md:text-lg text-gray-300 mt-2">
            Track your sales, manage orders, and analyze your revenue growth.
          </p>

          {/* INSIGHTS SECTION */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* REVENUE */}
            <div className="p-5 bg-white/20 shadow-xl rounded-xl text-center">
              <h2 className="text-lg md:text-xl font-bold text-gray-100">
                Total Revenue
              </h2>
              <p className="text-xl md:text-2xl text-green-400 font-semibold mt-2">
                ₹ 1,25,000
              </p>
            </div>

            {/* ORDERS */}
            <div className="p-5 bg-white/20 shadow-xl rounded-xl text-center">
              <h2 className="text-lg md:text-xl font-bold text-gray-100">
                Total Orders
              </h2>
              <p className="text-xl md:text-2xl text-blue-400 font-semibold mt-2">
                350
              </p>
            </div>

            {/* GROWTH */}
            <div className="p-5 bg-white/20 shadow-xl rounded-xl text-center">
              <h2 className="text-lg md:text-xl font-bold text-gray-100">
                Revenue Growth
              </h2>
              <p className="text-xl md:text-2xl text-purple-400 font-semibold mt-2">
                +12.5%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
