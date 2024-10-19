import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import successAnimation from "../../assets/payment-success.json";
import Lottie from "lottie-react";

const PaymentSuccess = () => {
  return (
    <div className="container mx-auto p-5 md:p-10">
      {/* Logo and Company Name */}
      <Link to="/" className="flex items-center gap-3">
        <img className="w-10 md:h-8" src={logo} alt="DRA Solution logo" />
        <div className="text-xl md:text-2xl font-semibold">
          <span className="text-[#006E9E]">DRA</span> Solution
        </div>
      </Link>

      {/* Payment Success Message */}
      <div className="max-w-md mx-auto mt-5 p-4 border border-green-300 rounded-md shadow-md">
        <div className="text-center">
          <Lottie
            animationData={successAnimation}
            loop={true}
            style={{ width: "200px", margin: "0 auto" }}
          />
          <h1 className="text-2xl font-bold mt-4">Congratulations! 🎉</h1>
          <p className="text-gray-600 mt-2">
            Your Payment was Successful. Thank you for your purchase! We hope you enjoy your plan.
          </p>
        </div>

        {/* Dashboard Button */}
        <div className="flex justify-center mt-6">
          <Link to="/dashboard">
            <button className="px-4 py-2 bg-[#006E9E] text-white text-sm rounded-md hover:bg-[#005482] transition duration-200">
              Go to Dashboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
