import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import newbgpic from "../assets/newbgpic.jpg";
import image1 from "../assets/1.jpg";
import image2 from "../assets/2.webp";
import image3 from "../assets/3.webp";
import Static from "../assets/Static.png";


const InitialPage = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = () => {
    navigate("/signup");
  };

  const images = [
    image1,
    image2,
    image3
  ];

  const handlePrev = (e) => {
    e.preventDefault();
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.preventDefault();
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="mt-10 px-4 sm:px-6 md:px-10">
      {/* Carousel for larger screens */}
      <div className="hidden sm:block w-full overflow-hidden">
        <div className="carousel w-full">
          {images.map((src, index) => (
            <div
              key={index}
              className={`carousel-item relative w-full ${
                activeIndex === index ? "block" : "hidden"
              }`}
            >
              <img
                src={src}
                className="w-full object-cover"
                alt={`Slide ${index + 1}`}
              />
              <div className="absolute left-2 sm:left-5 right-2 sm:right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <button
                  className="btn btn-circle btn-sm sm:btn-md"
                  onClick={handlePrev}
                >
                  ❮
                </button>
                <button
                  className="btn btn-circle btn-sm sm:btn-md"
                  onClick={handleNext}
                >
                  ❯
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Static image for mobile screens */}
      <div className="block sm:hidden">
        <img
          src={Static}
          alt="Mobile Banner"
          className="w-full object-cover"
        />
      </div>

      {/* Register As Seller Section */}
      <div className="flex justify-center items-center h-auto min-h-[24rem] py-10">
        <div className="p-1 bg-gradient-to-r from-green-400 to-orange-400 rounded-lg">
          <div className="bg-white p-6 sm:p-10 rounded-lg shadow-lg w-full max-w-md">
            <h1 className="text-xl sm:text-2xl font-bold text-center mb-4 text-black">
              Register as a Seller
            </h1>
            <p className="text-center text-black text-sm sm:text-base">
              From a small idea to a recognized name.
            </p>
            <p className="text-center text-black text-sm sm:text-base">
              Become a seller on Cura | Sign up with your business details and
              start selling today!
            </p>
            <button
              className="text-white btn btn-primary w-full mt-4 sm:mt-5 text-sm sm:text-base bg-gradient-to-r from-blue-500 to-blue-700 border-b border-blue-800"
              onClick={handleClick}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitialPage;
