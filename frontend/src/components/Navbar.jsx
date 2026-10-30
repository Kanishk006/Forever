
import React, { useContext, useEffect, useRef, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [profileVisible, setProfileVisible] = useState(false);
  const [mobileVisible, setMobileVisible] = useState(false);
  const profileRef = useRef(null);

  const {
    setShowSearch,
    getCartCount,
    navigate,
    setToken,
    token,
    setCartItems
  } = useContext(ShopContext);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileVisible(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setProfileVisible(false);
        setMobileVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const logout = () => {
    setProfileVisible(false);
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
  };


  const handleProfileClick = () => {
    if (token) {
      setProfileVisible((isVisible) => !isVisible);
    }
    else {
      navigate('/login');
    }
  };

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
                  isActive ? "text-gray-900" : "text-gray-600 hover:text-gray-900"
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
                  isActive ? "text-gray-900" : "text-gray-600 hover:text-gray-900"
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
                  isActive ? "text-gray-900" : "text-gray-600 hover:text-gray-900"
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
                  isActive ? "text-gray-900" : "text-gray-600 hover:text-gray-900"
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
            <button
              onClick={() => setShowSearch(true)}
              className="hover:opacity-60 transition-opacity"
            >
              <img src={assets.search_icon} alt="Search" className="w-5 h-5" />
            </button>

            {/* Profile */}
            <div ref={profileRef} className="relative group hidden sm:block">
              <img
                onClick={handleProfileClick}
                src={assets.profile_icon}
                alt="Profile"
                className="w-5 cursor-pointer"
              />
             
              {/* Dropdown Menu */}
              {token && profileVisible && (
                <div className="absolute dropdown-menu right-0 pt-4 z-50">
                  <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                    <p 
                    onClick={() => {
                      setProfileVisible(false);
                      navigate('/');
                    }}
                    className="cursor-pointer hover:text-black">My Profile</p>
                    <p
                      onClick={() => {
                        setProfileVisible(false);
                        navigate('/orders');
                      }}
                      className="cursor-pointer hover:text-black"
                    >
                      Orders
                    </p>
                    <p
                      onClick={logout}
                      className="cursor-pointer hover:text-black"
                    >
                      Logout
                    </p>
                  </div>
                </div>
              )}
            </div>
            {/* Cart */}
            <Link
              to="/cart"
              className="relative hover:opacity-60 transition-opacity"
            >
              <img src={assets.cart_icon} alt="Cart" className="w-5 h-5" />
              <span className="absolute -right-2 -bottom-2 bg-black text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center">
                {getCartCount()}
              </span>
            </Link>

            {/* Mobile Menu */}
            <button
              onClick={() => setMobileVisible(true)}
              className="md:hidden hover:opacity-60 transition-opacity"
            >
              <img src={assets.menu_icon} alt="Menu" className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* ================= MOBILE SIDEBAR ================= */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${
          mobileVisible ? "visible bg-black/20" : "invisible bg-transparent"
        }`}
        onClick={() => setMobileVisible(false)}
      >
        <div
          className={`absolute right-0 top-0 h-full w-[75%] sm:w-[50%] bg-white shadow-xl transition-transform duration-300 ${
            mobileVisible ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Mobile Header */}
          <div className="h-[70px] flex items-center border-b border-gray-100 px-5">
            <button
              onClick={() => setMobileVisible(false)}
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
              onClick={() => setMobileVisible(false)}
              to="/"
              className={({ isActive }) =>
                `px-6 py-5 text-sm border-b border-gray-100 ${
                  isActive ? "bg-gray-50 text-black font-medium" : "text-gray-600"
                }`
              }
            >
              HOME
            </NavLink>

            <NavLink
              onClick={() => setMobileVisible(false)}
              to="/collection"
              className={({ isActive }) =>
                `px-6 py-5 text-sm border-b border-gray-100 ${
                  isActive ? "bg-gray-50 text-black font-medium" : "text-gray-600"
                }`
              }
            >
              COLLECTION
            </NavLink>

            <NavLink
              onClick={() => setMobileVisible(false)}
              to="/about"
              className={({ isActive }) =>
                `px-6 py-5 text-sm border-b border-gray-100 ${
                  isActive ? "bg-gray-50 text-black font-medium" : "text-gray-600"
                }`
              }
            >
              ABOUT
            </NavLink>

            <NavLink
              onClick={() => setMobileVisible(false)}
              to="/contact"
              className={({ isActive }) =>
                `px-6 py-5 text-sm border-b border-gray-100 ${
                  isActive ? "bg-gray-50 text-black font-medium" : "text-gray-600"
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
