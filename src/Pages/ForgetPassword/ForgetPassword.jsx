import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const ForgetPassword = () => {
  const { user } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const loading = false;

  const onSubmit = (data) => {
    console.log({ email: user?.email, ...data });
  };

  return (
    <div className="container mx-auto p-5 md:p-10 ">
      <Link to="/" className="flex items-center gap-3">
        <img className="w-10 md:h-8" src={logo} alt="DRA Solution logo" />
        <div className="text-xl md:text-2xl font-semibold">
          <span className="text-[#006E9E]">DRA</span> Solution
        </div>
      </Link>

      <div className="max-w-md mx-auto mt-10 p-4 border border-gray-300 rounded-md shadow-md">
        <h2 className="text-xl font-bold mb-4">Change Password</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* E-mail */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="email"
              {...register("email", {
                required: "Email is required",
              })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.email && (
              <p className="text-red-500 text-[10px] mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          {/* Old Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Old Password
            </label>
            <input
              type="password"
              placeholder="old password"
              {...register("oldPassword", {
                required: "Old password is required",
              })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.oldPassword && (
              <p className="text-red-500 text-[10px] mt-1">
                {errors.oldPassword.message}
              </p>
            )}
          </div>

          {/* New Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              New password
            </label>
            <input
              type="password"
              placeholder="new password"
              {...register("newPassword", {
                required: "New password is required",
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                  message:
                    "Password must be at least 6 characters long and contain both letters and numbers",
                },
              })}
              className="my-1 block w-full border text-gray-700 py-[5px] px-3 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.password ? (
              <p className="text-red-500 text-[10px]">
                {errors.password.message}
              </p>
            ) : (
              <p className="text-[10px] text-[#989898]">
                Password (Minimum 6 characters with combination of letter &
                number)
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className={`px-4 py-2 text-white font-medium rounded-md ${
                loading
                  ? "bg-gray-400 cursor-wait"
                  : "bg-[#006E9E] hover:bg-[#004f73]"
              }`}
              disabled={loading}
            >
              {loading ? "Changing..." : "Change Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
