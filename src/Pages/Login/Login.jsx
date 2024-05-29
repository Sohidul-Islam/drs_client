import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import HelpCard from "../../Components/HelpCard/HelpCard";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/auth/authSlice";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  // console.log(error, 'error')

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await dispatch(
        login({ email: data.email, password: data.password })
      ).unwrap();
      if (res?.status) {
        navigate("/");
        toast.success("login successful", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
      }
      // console.log(res, 'res')
    } catch (error) {
      toast.error("Something went wrong!!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
      // console.log("login error: ", error);
    }
  };

  return (
    <div className="bg-bgLogin bg-cover bg-no-repeat">
      <div className="px-5 py-5 md:py-14 flex items-center justify-center h-full bg-[#1F23A8]/50 ">
        <div className="p-5 md:p-10 w-full md:max-w-[536px] bg-white font-sora rounded-lg">
          <div className="flex items-center gap-3 mb-5 md:mb-10">
            <img className="w-10 h-8" src={logo} alt="DRA Solution logo" />
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
          <form onSubmit={handleSubmit(onSubmit)} className="mt-11">
            {/* Email  */}
            <div>
              <label
                className="block text-[#989898] text-xs"
                htmlFor="username"
              >
                Email or username
              </label>
              <input
                {...register("email", {
                  required: "email is required",
                })}
                aria-invalid={errors.email ? "true" : "false"}
                type="email"
                className={`w-full border-b-2 ${
                  errors.email ? "border-red-500 mb-1" : "border-[#989898] mb-8"
                } outline-none block p-1`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mb-3">
                  {errors.email.message}
                </p>
              )}
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
                  {...register("password", {
                    required: "password is required",
                  })}
                  aria-invalid={errors.password ? "true" : "false"}
                  type={showPassword ? "text" : "password"}
                  className={`w-full border-b-2 ${
                    errors.password
                      ? "border-red-500 mb-1"
                      : "border-[#989898] mb-8"
                  } outline-none block p-1`}
                />
                <button
                  type="submit"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-500 mt-2 absolute right-3"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <p role="alert" className="text-red-500 text-xs mb-3">
                  {errors.password.message}
                </p>
              )}
              {/* authentication error  */}
              {/* this message will show on toaster , for temporary i have put here  */}
              {error && <p className="text-red-500 text-xs mb-3">{error}</p>}

              <button
                disabled={loading}
                type="submit"
                className="bg-[#006E9E] text-white font-semibold py-4 px-4 rounded w-full text-xs hover:bg-blue-700 mb-4"
              >
                {loading ? "Logging in..." : "LOG IN"}
              </button>
              <span className="text-sm">
                Forgot password? <Link className="underline">Click here</Link>
              </span>
            </div>
          </form>
          {/* end form  */}

          {/* contact info  */}
          <div className="mt-8 md:mt-14 flex justify-center">
            <HelpCard display="md:flex" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
