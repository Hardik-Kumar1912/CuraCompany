import React from "react";
import { Link } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import useLogout from "../hooks/useLogout.js";

const Sidebar = ({ toggleSidebar }) => {
  const { loading, logout } = useLogout();

  return (
    <div className="h-full flex flex-col w-64 md:w-72 bg-gradient-to-b from-black to-gray-900 text-white shadow-xl border-r border-gray-800">
      {/* Close Button (Mobile Only) */}
      <div className="md:hidden flex justify-end p-4">
        <button onClick={toggleSidebar} className="text-3xl text-gray-400 hover:text-white transition">
          &times;
        </button>
      </div>

      {/* CURA HEADING */}
      <div className="text-center py-6">
        <h1 className="text-3xl font-bold tracking-wide text-gray-100">
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
              className="block py-3 px-4 rounded-lg bg-gray-800/50 hover:bg-blue-600 transition flex items-center justify-start text-lg"
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
    </div>
  );
};

export default Sidebar;
