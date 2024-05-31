import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import HelpCard from "../../Components/HelpCard/HelpCard";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/auth/authSlice";
import Spinner from "../../Components/Spinner/Spinner";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

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
        navigate("/dashboard");
        toast.success("login successful");
        window.scrollTo(0, 0);
      }
      // console.log(res, 'res')
    } catch (error) {
      toast.error("incorrect email or password");
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
              <span className="text-[#006E9E]">DRA</span> Solution
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
                <p className="text-red-500 text-xs mb-3">
                  {errors.password.message}
                </p>
              )}

              <button
                disabled={loading}
                type="submit"
                className={`${
                  loading && "bg-[#394856]"
                } bg-[#006E9E] text-white font-semibold py-4 px-4 rounded w-full text-xs hover:bg-[#003660] mb-4`}
              >
                {loading ? <Spinner /> : "LOG IN"}
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
