import React from "react";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Yet = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-white text-gray-800 relative">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 flex items-center p-3 bg-gray-200 rounded-full hover:bg-gray-300 transition"
      >
        <MdArrowBack className="w-6 h-6 text-gray-700" />
      </button>

      {/* Centered Message */}
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-green-400 text-transparent bg-clip-text">
          Yet To Be Developed
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600">
          This feature is under construction. Stay tuned!
        </p>
      </div>
    </div>
  );
};

export default Yet;
