import React from "react";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <section className="w-full px-4 sm:px-6 md:px-8 lg:px-10">

      <div className="max-w-[1400px] mx-auto border border-gray-300">

        {/* ================= HERO CONTAINER ================= */}

        <div className="flex flex-col-reverse md:flex-row w-full">

          {/* ================= LEFT SIDE ================= */}

          <div className="w-full md:w-1/2 bg-white flex items-center justify-center">

            <div className="w-full px-8 py-14 sm:px-12 sm:py-16 md:px-10 lg:px-16 xl:px-24">

              {/* Bestseller */}
              <div className="flex items-center gap-3 mb-4">

                <span className="block w-9 sm:w-10 h-[1px] bg-gray-800"></span>

                <p className="text-[11px] sm:text-xs font-medium tracking-wide text-gray-700">
                  OUR BESTSELLER
                </p>

              </div>

              {/* Heading */}
              <h1 className="prata-regular text-3xl sm:text-4xl md:text-4xl lg:text-5xl text-gray-700 leading-tight">
                Latest Arrivals
              </h1>

              {/* Shop Now */}
              <div className="flex items-center gap-3 mt-4">

                <p className="text-[11px] sm:text-xs font-medium text-gray-700">
                  SHOP NOW
                </p>

                <span className="block w-9 sm:w-10 h-[1px] bg-gray-800"></span>

              </div>

            </div>

          </div>

          {/* ================= RIGHT SIDE ================= */}

          <div className="w-full md:w-1/2">

            <img
              src={assets.hero_img}
              alt="Latest arrivals"
              className="w-full h-full object-cover object-center"
            />

          </div>

        </div>

      </div>

    </section>
  );
};

export default Hero;