import React, { useState } from "react";
import { Link } from "react-router-dom";
import pharmaLogin from "../../assets/pharma-login.png";
import { FaEye, FaEyeSlash, FaHandPointDown, FaPhone } from "react-icons/fa6";
import { MdAlternateEmail } from "react-icons/md";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="bg-bgRegisterImage bg-cover">
      <div className="flex items-center justify-center h-full bg-[#1F23A8]/50 py-14">
        <div className="px-5 md:px-10 py-10 bg-white font-sora rounded-lg">
          <div className="flex items-center gap-3 mb-10">
            <img className="w-10 h-8" src={pharmaLogin} alt="" />
            <h2 className="text-2xl font-semibold">
              <span className="text-[#006E9E]">Pharma</span> DRA Solution
            </h2>
          </div>
          <p className="font-semibold mb-3">Create New Account!</p>
          <p className="text-[13px]">
            Already you have an account?{" "}
            <Link to="/login" className="underline font-semibold">
              Sign In
            </Link>
            . Takes let a minutes.
          </p>

          {/* start form  */}
          <form className="mt-11">
            {/* Full name & Shop name  */}
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 md:mb-3">
              {/* Full name  */}
              <div>
                <label className="block text-[#989898] text-xs">
                  Full name
                </label>
                <input
                  type="text"
                  className="w-full border-b-2 border-[#989898] outline-none block mb-5 p-1"
                />
              </div>
              {/* Shop name  */}
              <div>
                <label className="block text-[#989898] text-xs">
                  Shop name
                </label>
                <input
                  type="text"
                  className="w-full border-b-2 border-[#989898] outline-none block mb-5 p-1"
                />
              </div>
            </div>

            {/* Division, District, Upozila/Thana */}
            <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 md:mb-3">
              {/* Division */}
              <div>
                <label className="block text-[#989898] text-xs">Division</label>
                <select className="w-full border-b-2 border-[#989898] outline-none block mb-5 p-1">
                  <option value="">------</option>
                  {/* Add options for divisions here */}
                  {/* <option value="Dhaka">Dhaka</option> */}
                </select>
              </div>
              {/* District */}
              <div>
                <label className="block text-[#989898] text-xs">District</label>
                <select className="w-full border-b-2 border-[#989898] outline-none block mb-5 p-1">
                  <option value="">Select District</option>
                  {/* Add options for districts here */}
                </select>
              </div>
              {/* Upozila/Thana */}
              <div>
                <label className="block text-[#989898] text-xs">
                  Upozila/Thana
                </label>
                <select className="w-full border-b-2 border-[#989898] outline-none block mb-5 p-1">
                  <option value="">Select Upozila/Thana</option>
                  {/* Add options for Upozila/Thana here */}
                </select>
              </div>
            </div>

            {/* Email & Mobile  */}
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 md:mb-3">
              {/* Email  */}
              <div>
                <label className="block text-[#989898] text-xs">Email</label>
                <input
                  type="email"
                  className="w-full border-b-2 border-[#989898] outline-none block mb-5 p-1"
                />
              </div>
              {/* Mobile  */}
              <div>
                <label className="block text-[#989898] text-xs">Mobile</label>
                <input
                  type="number"
                  className="w-full border-b-2 border-[#989898] outline-none block mb-5 p-1"
                />
              </div>
            </div>

            {/* Password & Re-type password  */}
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 md:mb-3">
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
              </div>
              {/* Re-type password */}
              <div>
                <label
                  className="block text-[#989898] text-xs"
                  htmlFor="password"
                >
                  Re-type password
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
              </div>
            </div>

            {/* Register button  */}
            <button className="bg-[#006E9E] text-white font-semibold py-4 px-4 rounded w-full text-xs hover:bg-blue-700 mb-4">
              REGISTER
            </button>

            {/* Forgot password  */}
            <span className="text-sm">
              Forgot password? <Link className="underline">Click here</Link>
            </span>
          </form>
          {/* end form  */}

          {/* Contact Info  */}
          <div className="mt-14">
            <p className="flex gap-2 items-center mb-5">
              <FaHandPointDown fill="#006E9E" />
              <span className="text-[#006E9E]">
                For any query contact with us.
              </span>
            </p>
            <div className="md:flex gap-14">
              <p className="flex gap-2 items-center">
                <MdAlternateEmail />
                <span className="text-sm">pharnadrasolutions@gmail.com</span>
              </p>
              <p className="flex gap-2 items-center">
                <FaPhone />
                <span className="text-sm">+880-1994779217</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
