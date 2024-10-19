import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import errorAnimation from "../../assets/payment-failed.json";
import Lottie from "lottie-react";

const PaymentError = () => {
  return (
    <div className="container mx-auto p-5 md:p-10">
      {/* Logo and Company Name */}
      <Link to="/" className="flex items-center gap-3">
        <img className="w-10 md:h-8" src={logo} alt="DRA Solution logo" />
        <div className="text-xl md:text-2xl font-semibold">
          <span className="text-[#006E9E]">DRA</span> Solution
        </div>
      </Link>

      {/* Payment Error Message */}
      <div className="max-w-md mx-auto mt-5 p-4 border border-red-300 rounded-md shadow-md">
        <div className="text-center">
          <Lottie
            animationData={errorAnimation} // You need to add an error animation here
            loop={true}
            style={{ width: "200px", margin: "0 auto" }}
          />
          <h1 className="text-2xl font-bold mt-4 text-red-600">
            Payment Failed 😞
          </h1>
          <p className="text-gray-600 mt-2">
            Unfortunately, your payment could not be processed. Please try again or contact support if the issue persists.
          </p>
        </div>

        {/* Retry Payment Button */}
        <div className="flex justify-center mt-5">
          <Link to="/subscription-plan">
            <button className="px-4 py-2 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition duration-200">
              Retry Payment
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentError;