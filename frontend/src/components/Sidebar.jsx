import React from "react";
import { Link } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import useLogout from "../hooks/useLogout.js";

const Sidebar = ({ toggleSidebar }) => {
  const { loading, logout } = useLogout();

  return (
    <div className="relative h-full flex flex-col w-64 md:w-72 bg-white text-gray-800 shadow-xl">
      {/* Close Button (Mobile Only) */}
      <div className="md:hidden flex justify-end p-4">
        <button
          onClick={toggleSidebar}
          className="text-3xl text-gray-600 hover:text-gray-800 transition"
        >
          &times;
        </button>
      </div>

      {/* CURA HEADING */}
      <div className="text-center py-6 mb-4">
        <h1 className="text-3xl font-bold tracking-wide text-gray-900">
          <Link to="/">Cura</Link>
        </h1>
        <div className="h-1 w-20 bg-blue-500 rounded-full mx-auto mt-2"></div>
      </div>

      {/* NAVIGATION LINKS */}
      <ul className="flex-1 px-6 space-y-4">
        {[
          { name: "Test/Packages", path: "/home" },
          { name: "Analytics", path: "/yet" },
          { name: "Orders", path: "/yet" },
          { name: "Sales", path: "/yet" },
          { name: "Settings", path: "/yet" },
        ].map((item, index) => (
          <li key={index}>
            <Link
              to={item.path}
              className="py-3 px-4 rounded-lg border border-green-300 hover:bg-gray-200 transition flex items-center justify-start text-lg"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* LOGOUT BUTTON */}
      <div className="px-6 pb-6">
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-3 bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600 transition"
          disabled={loading}
        >
          {loading ? (
            <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
          ) : (
            <>
              <MdLogout className="w-6 h-6" />
              Logout
            </>
          )}
        </button>
      </div>

      {/* Gradient Border on Right Side */}
      <div className="absolute top-0 right-0 h-full w-1 bg-gradient-to-b from-green-400 to-orange-400" />
    </div>
  );
};

export default Sidebar;
