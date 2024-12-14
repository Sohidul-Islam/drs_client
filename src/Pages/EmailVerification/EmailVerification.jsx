import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import HelpCard from "../../Components/HelpCard/HelpCard";
import LoadingAnimation from "../../Components/LoadingAnimation/LoadingAnimation";

const EmailVerification = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // useEffect(() => {
  //   if (!location.state?.fromRegister) {
  //     navigate("/");
  //   } else {
  //     setLoading(false);
  //   }
  // }, [location.state, navigate]);

  // if (loading) {
  //   return <LoadingAnimation />;
  // }
  // const [code, setCode] = useState(["", "", "", "", "", ""]);
  // const [timer, setTimer] = useState(60);
  // const [canResend, setCanResend] = useState(false);

  // Handle input changes
  // const handleChange = (e, index) => {
  //   const value = e.target.value;

  //   if (value.length <= 1) {
  //     const newCode = [...code];
  //     newCode[index] = value;

  //     // Auto-focus on next input field
  //     if (value && index < 5) {
  //       document.getElementById(`code-input-${index + 1}`).focus();
  //     }

  //     setCode(newCode);
  //   }
  // };

  // Handle form submission
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Submitted Code: ", code.join(""));
  // };

  // Timer effect: Start countdown when the component mounts
  // useEffect(() => {
  //   if (timer > 0 && !canResend) {
  //     const interval = setInterval(() => {
  //       setTimer((prevTime) => prevTime - 1);
  //     }, 1000);
  //     return () => clearInterval(interval);
  //   } else if (timer === 0) {
  //     setCanResend(true);
  //   }
  // }, [timer, canResend]);

  // Handle "Resend Code"
  // const handleResend = () => {
  //   setCanResend(false);
  //   setTimer(60); // Reset the timer
  //   setCode(["", "", "", "", "", ""]); // Clear the input fields
  //   console.log("Verification code resent.");
  //   // Here, you would call the API to resend the code
  // };

  return (
    <div className="bg-bgRegister bg-cover bg-no-repeat h-screen">
      <div className="px-5 flex items-center justify-center h-full bg-[#1F23A8]/50">
        <div className="p-5 md:p-10 w-full md:max-w-[536px] bg-white rounded-lg">
          <div className="flex items-center gap-3 mb-5 md:mb-10">
            <img className="w-10 h-8" src={logo} alt="DRA Solution logo" />
            <Link to="/" className="text-xl md:text-2xl font-semibold">
              <span className="text-[#006E9E]">DRA</span> Solution
            </Link>
          </div>
          <p className="font-semibold mb-3">Account Verification</p>
          <p className="text-sm">
            We've sent a verification link to your email address. Please check
            your inbox (and your spam/junk folder, just in case) and click on
            the link to complete your registration.
          </p>

          <button
            onClick={() => navigate("/")}
            className="bg-[#006E9E] text-white font-semibold py-4 px-4 rounded w-full text-xs hover:bg-[#003660] mt-4"
          >
            Go to Home
          </button>

          {/* Start form */}
          {/* <form className="mt-11" onSubmit={handleSubmit}>
            <div className="flex gap-3 justify-center">
              
              {code.map((digit, index) => (
                <input
                  key={index}
                  id={`code-input-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  className="w-10 h-10 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus={index === 0}
                />
              ))}
            </div>

           
            <button
              className="bg-[#006E9E] text-white font-semibold py-4 px-4 rounded w-full text-xs hover:bg-[#003660] mt-4"
              type="submit"
              disabled={code.includes("")}
            >
              SUBMIT
            </button>
          </form> */}

          {/* Timer and Resend Code */}
          {/* <div className="mt-4 text-center text-xs">
            {timer > 0 ? (
              <p>Resend code in: {timer} seconds</p>
            ) : (
              <p>
                <button
                  onClick={handleResend}
                  className="text-[#006E9E] font-semibold"
                  disabled={!canResend}
                >
                  Resend Code
                </button>
              </p>
            )}
          </div> */}

          {/* Contact Info */}
          <div className="mt-8 md:mt-14 flex justify-center">
            <HelpCard display="md:flex" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
