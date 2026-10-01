import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className="mt-10">

      {/* ================= FOOTER CONTENT ================= */}

      <div className="
        flex
        flex-col
        sm:grid
        sm:grid-cols-[3fr_1fr_1fr]
        gap-14
        my-10
        mt-10
        text-sm
      ">

        {/* ================= COMPANY INFO ================= */}

        <div>
          <img
            src={assets.logo}
            className="mb-5 w-32"
            alt="Forever"
          />

          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s.
          </p>
        </div>


        {/* ================= COMPANY LINKS ================= */}

        <div>
          <p className="text-xl font-medium mb-5">
            COMPANY
          </p>

          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>


        {/* ================= CONTACT ================= */}

        <div>
          <p className="text-xl font-medium mb-5">
            GET IN TOUCH
          </p>

          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+1-212-456-7890</li>
            <li>contact@foreveryou.com</li>
          </ul>
        </div>

      </div>


      {/* ================= COPYRIGHT ================= */}

      <div>

        <hr />

        <p className="py-5 text-sm text-center">
          Copyright 2024@ forever.com - All Right Reserved.
        </p>

      </div>

    </footer>
  )
}

export default Footer