import React, { useState } from "react";
import { Link } from "react-router-dom";
import pharmaLogin from "../../assets/pharma-login.png";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import HelpCard from "../../Components/HelpCard/HelpCard";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  return (
    <div className="bg-bgRegisterImage bg-cover">
      <div className="px-5 py-5 md:py-14 flex items-center justify-center h-full bg-[#1F23A8]/50 ">
        <div className="p-5 md:p-10 w-full md:max-w-[536px] bg-white font-sora rounded-lg">
          <div className="flex items-center gap-3 mb-5 md:mb-10">
            <img className="w-10 h-8" src={pharmaLogin} alt="Phara login" />
            <Link to="/" className="text-xl md:text-2xl font-semibold">
              <span className="text-[#006E9E]">Pharma</span> DRA Solution
            </Link>
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
                  <option value="">...</option>
                  {/* Add options for districts here */}
                </select>
              </div>
              {/* Upozila/Thana */}
              <div>
                <label className="block text-[#989898] text-xs">
                  Upozila/Thana
                </label>
                <select className="w-full border-b-2 border-[#989898] outline-none block mb-5 p-1">
                  <option value="">...</option>
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
                <PhoneInput
                  country={"bd"}
                  value={phone}
                  onChange={setPhone}
                  inputStyle={{
                    width: "100%",
                    border:"none",
                    borderBottom: "2px solid #989898",
                  borderRadius:"0px",
                    outline: "none",
                  }}
                  buttonStyle={{
                    backgroundColor: "white",
                    border:"none",
                    borderBottom: "2px solid #989898",
                    borderRadius:"0px",
                  }}
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
          <div className="mt-8 md:mt-14 flex justify-center">
            <HelpCard display="md:flex"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
