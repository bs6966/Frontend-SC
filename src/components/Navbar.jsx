import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white py-4 shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to={"/"}>
          <div className="text-xl font-bold">LOGO</div>
        </Link>

        <div className="flex space-x-8">
          <a href="#" className="text-gray-600 hover:text-gray-800">
            Payments
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800">
            Services
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800">
            Accounts
          </a>
        </div>
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-white-200 font-semibold border-2 border-blue-500 text-blue-500 rounded hover:bg-gray-300">
            Login
          </button>
          <button className="px-4 py-2 font-semibold bg-blue-500 text-white rounded hover:bg-blue-600">
            Open Account
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
