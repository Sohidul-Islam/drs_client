import React, { useState } from "react";
import logo from "../../../assets/logo.png";
import user from "../../../assets/user.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../features/auth/authSlice";

const DashboardNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useSelector((state) => state?.auth?.user || {user:undefined});

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="flex justify-between px-5 py-2 border-b border-[#E9E9E9]">
      <Link to="/" className="flex gap-x-2 items-center">
        <img className="w-10 h-8" src={logo} alt="DRA Solution logo" />
        <p className="text-sm font-semibold">
          <span className="text-[#006E9E]">DRA</span> Solution
        </p>
      </Link>
      <div className="flex gap-x-2 items-center">
        <img className="w-9 h-9 bg-slate-700 rounded-full" src={user} alt="" />
        <div className="relative">
          <button onClick={() => setIsOpen(!isOpen)}>
            <p className="text-sm font-semibold w-24 truncate">
              {data?.shop_owner_name || "User Name"}
            </p>
            <p className="text-xs text-[#6B6B6B]">
              {data?.shop_name || "Shope Name"}
            </p>
          </button>

          <div
            className={`${
              isOpen ? "opacity-100" : "opacity-0"
            } w-[274px] h-[61px] bg-white border border-gray-300 flex justify-between p-3 shadow-xl absolute top-12 -right-5  transition-all duration-300`}
          >
            <Link
              to="/dashboard/profile"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 border border-[#C4C4C4] text-sm"
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-[#C4C4C4] text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
