import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  const { setShowSearch , getCartCount} = useContext(ShopContext);

  return (
    <nav className="w-full border-t border-gray-100">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-10">

        {/* ================= DESKTOP NAVBAR ================= */}
        <div className="h-[70px] flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src={assets.logo}
              alt="Forever Logo"
              className="w-32 sm:w-36 md:w-40"
            />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8 lg:gap-10 text-[13px] font-medium text-gray-700">
            
            <NavLink
              to="/"
              className={({ isActive }) =>
                `relative py-2 transition-colors ${
                  isActive
                    ? "text-gray-900"
                    : "text-gray-600 hover:text-gray-900"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <p>HOME</p>

                  <span
                    className={`absolute left-1/2 -bottom-1 h-[1px] bg-gray-800 transition-all duration-300 -translate-x-1/2 ${
                      isActive ? "w-1/2" : "w-0"
                    }`}
                  />
                </>
              )}
            </NavLink>

            <NavLink
              to="/collection"
              className={({ isActive }) =>
                `relative py-2 transition-colors ${
                  isActive
                    ? "text-gray-900"
                    : "text-gray-600 hover:text-gray-900"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <p>COLLECTION</p>

                  <span
                    className={`absolute left-1/2 -bottom-1 h-[1px] bg-gray-800 transition-all duration-300 -translate-x-1/2 ${
                      isActive ? "w-1/2" : "w-0"
                    }`}
                  />
                </>
              )}
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `relative py-2 transition-colors ${
                  isActive
                    ? "text-gray-900"
                    : "text-gray-600 hover:text-gray-900"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <p>ABOUT</p>

                  <span
                    className={`absolute left-1/2 -bottom-1 h-[1px] bg-gray-800 transition-all duration-300 -translate-x-1/2 ${
                      isActive ? "w-1/2" : "w-0"
                    }`}
                  />
                </>
              )}
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `relative py-2 transition-colors ${
                  isActive
                    ? "text-gray-900"
                    : "text-gray-600 hover:text-gray-900"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <p>CONTACT</p>

                  <span
                    className={`absolute left-1/2 -bottom-1 h-[1px] bg-gray-800 transition-all duration-300 -translate-x-1/2 ${
                      isActive ? "w-1/2" : "w-0"
                    }`}
                  />
                </>
              )}
            </NavLink>

          </ul>

          {/* Right Side Icons */}
          <div className="flex items-center gap-5 sm:gap-6">

            {/* Search */}
            <button onClick={() => setShowSearch(true)} className="hover:opacity-60 transition-opacity">
              <img
                src={assets.search_icon}
                alt="Search"
                className="w-5 h-5"
              />
            </button>

            {/* Profile */}
            <div className="relative group hidden sm:block">

              <button className="hover:opacity-60 transition-opacity">
                <Link to="/login">
                  <img
                    src={assets.profile_icon}
                    alt="Profile"
                    className="w-5 h-5"
                  />
                </Link>
              </button>

              {/* Profile Dropdown */}
              <div className="absolute right-0 top-7 pt-3 hidden group-hover:block z-50">

                <div className="w-36 bg-white border border-gray-200 shadow-lg py-2">

                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  >
                    My Profile
                  </Link>

                  <Link
                    to="/orders"
                    className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  >
                    Orders
                  </Link>

                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  >
                    Logout
                  </button>

                </div>

              </div>
            </div>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative hover:opacity-60 transition-opacity"
            >
              <img
                src={assets.cart_icon}
                alt="Cart"
                className="w-5 h-5"
              />

              <span className="absolute -right-2 -bottom-2 bg-black text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center">
                {getCartCount()}
              </span>
            </Link>

            {/* Mobile Menu */}
            <button
              onClick={() => setVisible(true)}
              className="md:hidden hover:opacity-60 transition-opacity"
            >
              <img
                src={assets.menu_icon}
                alt="Menu"
                className="w-5 h-5"
              />
            </button>

          </div>
        </div>
      </div>

      {/* ================= MOBILE SIDEBAR ================= */}

      <div
        className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${
          visible
            ? "visible bg-black/20"
            : "invisible bg-transparent"
        }`}
        onClick={() => setVisible(false)}
      >

        <div
          className={`absolute right-0 top-0 h-full w-[75%] sm:w-[50%] bg-white shadow-xl transition-transform duration-300 ${
            visible ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >

          {/* Mobile Header */}
          <div className="h-[70px] flex items-center border-b border-gray-100 px-5">

            <button
              onClick={() => setVisible(false)}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-black"
            >
              <img
                src={assets.dropdown_icon}
                alt="Back"
                className="w-3 h-3 rotate-180"
              />

              <span>Back</span>
            </button>

          </div>

          {/* Mobile Links */}
          <div className="flex flex-col">

            <NavLink
              onClick={() => setVisible(false)}
              to="/"
              className={({ isActive }) =>
                `px-6 py-5 text-sm border-b border-gray-100 ${
                  isActive
                    ? "bg-gray-50 text-black font-medium"
                    : "text-gray-600"
                }`
              }
            >
              HOME
            </NavLink>

            <NavLink
              onClick={() => setVisible(false)}
              to="/collection"
              className={({ isActive }) =>
                `px-6 py-5 text-sm border-b border-gray-100 ${
                  isActive
                    ? "bg-gray-50 text-black font-medium"
                    : "text-gray-600"
                }`
              }
            >
              COLLECTION
            </NavLink>

            <NavLink
              onClick={() => setVisible(false)}
              to="/about"
              className={({ isActive }) =>
                `px-6 py-5 text-sm border-b border-gray-100 ${
                  isActive
                    ? "bg-gray-50 text-black font-medium"
                    : "text-gray-600"
                }`
              }
            >
              ABOUT
            </NavLink>

            <NavLink
              onClick={() => setVisible(false)}
              to="/contact"
              className={({ isActive }) =>
                `px-6 py-5 text-sm border-b border-gray-100 ${
                  isActive
                    ? "bg-gray-50 text-black font-medium"
                    : "text-gray-600"
                }`
              }
            >
              CONTACT
            </NavLink>

          </div>

        </div>
      </div>

    </nav>
  );
};

export default Navbar;