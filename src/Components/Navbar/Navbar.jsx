import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-[#006E9E] text-white p-4 font-sora">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <div className="text-red-500">
            <svg
              className="w-8 h-8"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9 9h6v6H9z" />
              <path
                fillRule="evenodd"
                d="M4 4h16v16H4V4zm15 15V5H5v14h14z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <Link to="/" className="text-base font-semibold">Pharma DRA Solution</Link>
        </div>
        <div className="md:block">
          <div className="flex items-center gap-x-4">
            <Link
              to="/subscription-plan"
              className="text-white hover:text-gray-300 text-sm font-semibold"
            >
              Subscriptions
            </Link>
            <Link
              to="/login"
              className="text-sm border border-white px-4 py-2 rounded hover:bg-white hover:text-[#006E9E]"
            >
              Sign in
            </Link>
            <Link
              to="/register"
              className="text-sm bg-red-700 px-4 py-2 rounded text-white hover:bg-red-800"
            >
              Register
            </Link>
          </div>
        </div>

        <button className="md:hidden" onClick={toggleMobileMenu}>
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5h18v2H3V5zm0 6h18v2H3v-2zm0 6h18v2H3v-2z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div
        className={`md:hidden ${
          isMobileMenuOpen ? "block" : "hidden"
        } flex flex-col space-y-4 mt-4`}
      >
        <a href="#subscriptions" className="text-white hover:text-gray-300">
          Subscriptions
        </a>
        <button className="border border-white px-4 py-2 rounded hover:bg-white hover:text-blue-800">
          Sign in
        </button>
        <button className="bg-red-700 px-4 py-2 rounded text-white hover:bg-red-800">
          Register
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
