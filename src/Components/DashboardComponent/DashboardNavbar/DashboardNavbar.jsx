import React, { useState } from "react";
import logo from "../../../assets/logo.png";
import user from "../../../assets/user.png";
import { Link } from "react-router-dom";

const DashboardNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="flex justify-between px-5 py-2 border-b border-[#E9E9E9]">
      <div className="flex gap-x-2 items-center">
        <img className="w-10 h-8" src={logo} alt="DRA Solution logo" />
        <p className="text-sm font-semibold">
          <span className="text-[#006E9E]">DRA</span> Solution
        </p>
      </div>
      <div className="flex gap-x-2 items-center">
        <img className="w-9 h-9 bg-slate-700 rounded-full" src={user} alt="" />
        <div className="relative">
          <button onClick={() => setIsOpen(!isOpen)}>
            <p className="text-sm font-semibold w-24 truncate">
              Sabaria Mozumder
            </p>
          </button>
          <p className="text-xs text-[#6B6B6B]">MAA Pharmacy</p>

          <div className={`${isOpen ? "opacity-100" : "opacity-0"} w-[274px] h-[61px] flex justify-between p-3 shadow-xl absolute top-14 -right-5  transition-all duration-300`}>
            <Link to="/dashboard/profile" onClick={() => setIsOpen(false)} className="px-4 py-2 border border-[#C4C4C4] text-sm">Profile</Link>
            <p className="px-4 py-2 border border-[#C4C4C4] text-sm">Logout</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
