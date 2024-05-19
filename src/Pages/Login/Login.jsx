import React, { useState } from "react";
import pharmaLogin from "../../assets/pharma-login.png";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaHandPointDown, FaPhone } from "react-icons/fa6";
import { MdAlternateEmail } from "react-icons/md";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 container mx-auto">
      {/* Explore photo section  */}
      <section className="lg:col-span-7 bg-bgExploreImage bg-cover">
        <div className="flex items-center justify-center h-full bg-[#1F23A8]/50 py-10 lg:py-0">
          <div className="text-white px-5 md:px-28 font-sora">
            <h1 className="text-3xl mb-8">Pharma DRA Solutions</h1>
            <p>
              We provide comprehensive regulatory service in Bangladesh for
              pharmaceuticals, medical device, IVD reagents, cosmetics and API
              industries. We provide registration holding service for global
              medical device and API manufacturers to get Bangladesh market
              access.
            </p>
            <button className="bg-[#006E9E] w-44 h-10 mt-16">
              Explore More{" "}
            </button>
          </div>
        </div>
      </section>

      {/* login form section  */}
      <section className="lg:col-span-5">
        <div className="px-5 md:px-10 py-10 bg-white font-sora lg:my-14 lg:-ml-14 lg:mr-14 border border-l-0 border-[#006E9E] rounded-lg">
          <div className="flex items-center gap-3 mb-10">
            <img className="w-10 h-8" src={pharmaLogin} alt="" />
            <h2 className="text-2xl font-semibold">
              <span className="text-[#006E9E]">Pharma</span> DRA Solution
            </h2>
          </div>
          <p className="font-semibold mb-3">Welcome Back!</p>
          <p className="text-[13px]">
            Don't have an account?{" "}
            <Link to="/register" className="underline font-semibold">
              Create a new account now
            </Link>
            . It's FREE! for one month, Takes let a minutes.
          </p>

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
      </section>
    </div>
  );
};

export default Login;
