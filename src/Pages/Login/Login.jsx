import React, { useState } from "react";
import pharmaLogin from "../../assets/pharma-login.png";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import HelpCard from "../../Components/HelpCard/HelpCard";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-bgExploreImage bg-cover">
      <div className="px-5 py-5 md:py-14 flex items-center justify-center h-full bg-[#1F23A8]/50 ">
        <div className="p-5 md:p-10 w-full md:max-w-[536px] bg-white font-sora rounded-lg">
          <div className="flex items-center gap-3 mb-5 md:mb-10">
            <img className="w-10 h-8" src={pharmaLogin} alt="" />
            <Link to="/" className="text-xl md:text-2xl font-semibold">
              <span className="text-[#006E9E]">Pharma</span> DRA Solution
            </Link>
          </div>
          <div>
            <p className="font-semibold mb-3">Welcome Back!</p>
            <p className="text-[13px]">
              Don't have an account?{" "}
              <Link to="/register" className="underline font-semibold">
                Create a new account now
              </Link>
              . It's FREE! for one month, Takes let a minutes.
            </p>
          </div>
          {/* start form  */}
          <form className="mt-11">
            {/* Email  */}
            <div>
              <label
                className="block text-[#989898] text-xs"
                htmlFor="username"
              >
                Email or username
              </label>
              <input
                type="email"
                className="w-full border-b-2 border-[#989898] outline-none block mb-5 p-1"
              />
            </div>
            {/* password  */}
            <div>
              <label
                className="block text-[#989898] text-xs"
                htmlFor="password"
              >
                Password
              </label>
              <div className="flex relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full border-b-2 border-[#989898] outline-none block mb-5 p-1"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-500 mt-2 absolute right-3"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <button className="bg-[#006E9E] text-white font-semibold py-4 px-4 rounded w-full text-xs hover:bg-blue-700 mb-4">
                LOG IN
              </button>
              <span className="text-sm">
                Forgot password? <Link className="underline">Click here</Link>
              </span>
            </div>
          </form>
          {/* end form  */}

          {/* contact info  */}
          <div className="mt-8 md:mt-14 flex justify-center">
            <HelpCard display="md:flex"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
