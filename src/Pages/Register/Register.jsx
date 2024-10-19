import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import HelpCard from "../../Components/HelpCard/HelpCard";
import { useDispatch, useSelector } from "react-redux";
import { registers } from "../../features/auth/authSlice";
import Spinner from "../../Components/Spinner/Spinner";
import { toast } from "react-toastify";
import {
  getDivisions,
  getDistrictsByDivision,
  getUpazilasByDistrict,
} from "bd-geodata";

const Register = () => {
  const {
    register,
    handleSubmit,
    control,
    getValues,
    watch,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedDivision = watch("division");
  const selectedDistrict = watch("district");

  const divisions = getDivisions();

  // get district by division
  useEffect(() => {
    const districts = getDistrictsByDivision(selectedDivision);
    setDistricts(districts);
  }, [selectedDivision, setDistricts]);

  // get upazila by district
  useEffect(() => {
    const upazilas = getUpazilasByDistrict(selectedDistrict);
    setUpazilas(upazilas);
  }, [selectedDistrict, setUpazilas]);

  const onSubmit = async (data) => {
    // Find selected division, district, and upazila names
    const divisionName = divisions.find(
      (div) => div.id === data.division
    )?.name;
    const districtName = districts.find(
      (dis) => dis.id === data.district
    )?.name;
    const upazilaName = upazilas.find((upa) => upa.id === data.upazila)?.name;
    data.division = divisionName;
    data.district = districtName;
    data.upazila = upazilaName;

    console.log(data);
    try {
      await dispatch(registers(data)).unwrap();
      navigate("/dashboard");
      toast.success("successfully created an account");
    } catch (error) {
      toast.error("something went wrong");
      // console.error("Failed to register: ", error.message);
    }
  };

  return (
    <div className="bg-bgRegister bg-cover bg-no-repeat">
      <div className="px-5 py-5 md:py-14 flex items-center justify-center h-full bg-[#1F23A8]/50 ">
        <div className="p-5 md:p-10 w-full md:max-w-[536px] bg-white rounded-lg">
          <div className="flex items-center gap-3 mb-5 md:mb-10">
            <img className="w-10 h-8" src={logo} alt="DRA Solution logo" />
            <Link to="/" className="text-xl md:text-2xl font-semibold">
              <span className="text-[#006E9E]">DRA</span> Solution
            </Link>
          </div>
          <p className="font-semibold mb-3">Create New Account!</p>
          <p className="text-[13px]">
            Already have an account?{" "}
            <Link to="/login" className="underline font-semibold">
              Sign In
            </Link>
            . Takes just a minute.
          </p>

          {/* start form  */}
          <form className="mt-11" onSubmit={handleSubmit(onSubmit)}>
            {/* Full name & Shop name  */}
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 md:mb-3">
              {/* Full name  */}
              <div>
                <label className="block text-[#989898] text-xs">
                  Full name
                </label>
                <input
                  type="text"
                  {...register("shop_owner_name", {
                    required: "Full name is required",
                  })}
                  className={`w-full border-b-2 ${
                    errors.shop_owner_name
                      ? "border-red-500 mb-1"
                      : "border-[#989898] mb-5"
                  } outline-none block p-1`}
                />
                {errors.shop_owner_name && (
                  <p className="text-red-500 text-xs">
                    {errors.shop_owner_name.message}
                  </p>
                )}
              </div>
              {/* Shop name  */}
              <div>
                <label className="block text-[#989898] text-xs">
                  Shop name
                </label>
                <input
                  type="text"
                  {...register("shop_name", {
                    required: "Shop name is required",
                  })}
                  className={`w-full border-b-2 ${
                    errors.shop_name
                      ? "border-red-500 mb-1"
                      : "border-[#989898] mb-5"
                  } outline-none block p-1`}
                />
                {errors.shop_name && (
                  <p className="text-red-500 text-xs">
                    {errors.shop_name.message}
                  </p>
                )}
              </div>
            </div>

            {/* Division, District, Upozila/Thana */}
            <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 md:mb-3">
              {/* Division */}
              <div>
                <label className="block text-[#989898] text-xs">Division</label>
                <select
                  {...register("division", {
                    required: "Division is required",
                  })}
                  className={`w-full border-b-2 ${
                    errors.division
                      ? "border-red-500 mb-1"
                      : "border-[#989898] mb-5"
                  } outline-none block p-1`}
                >
                  <option value="">------</option>
                  {divisions.map((division, index) => (
                    <option key={index} value={division.id}>
                      {division.name}
                    </option>
                  ))}
                </select>
                {errors.division && (
                  <p className="text-red-500 text-xs">
                    {errors.division.message}
                  </p>
                )}
              </div>
              {/* District */}
              <div>
                <label className="block text-[#989898] text-xs">District</label>
                <select
                  {...register("district", {
                    required: "District is required",
                  })}
                  className={`w-full border-b-2 ${
                    errors.district
                      ? "border-red-500 mb-1"
                      : "border-[#989898] mb-5"
                  } outline-none block p-1`}
                >
                  <option>------</option>
                  {selectedDivision &&
                    districts?.map((district, index) => (
                      <option key={index} value={district.id}>
                        {district.name}
                      </option>
                    ))}
                </select>
                {errors.district && (
                  <p className="text-red-500 text-xs">
                    {errors.district.message}
                  </p>
                )}
              </div>
              {/* Upazila/Thana */}
              <div>
                <label className="block text-[#989898] text-xs">
                  Upazila/Thana
                </label>
                <select
                  {...register("upazila", {
                    required: "Upazila/Thana is required",
                  })}
                  className={`w-full border-b-2 ${
                    errors.upazila
                      ? "border-red-500 mb-1"
                      : "border-[#989898] mb-5"
                  } outline-none block p-1`}
                >
                  <option>------</option>
                  {selectedDistrict &&
                    upazilas?.map((upazila, index) => (
                      <option key={index} value={upazila.id}>
                        {upazila.name}
                      </option>
                    ))}
                </select>
                {errors.upazila && (
                  <p className="text-red-500 text-xs">
                    {errors.upazila.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email & Mobile  */}
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 md:mb-3">
              {/* Email  */}
              <div>
                <label className="block text-[#989898] text-xs">Email</label>
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className={`w-full border-b-2 ${
                    errors.email
                      ? "border-red-500 mb-1"
                      : "border-[#989898] mb-5"
                  } outline-none block p-1`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email.message}</p>
                )}
              </div>
              {/* Mobile  */}
              <div>
                <label className="block text-[#989898] text-xs">Mobile</label>
                <Controller
                  name="phone_number"
                  control={control}
                  rules={{ required: "Mobile number is required" }}
                  render={({ field }) => (
                    <PhoneInput
                      {...field}
                      country={"bd"}
                      inputStyle={{
                        width: "100%",
                        border: "none",
                        borderBottom: "2px solid #989898",
                        borderRadius: "0px",
                        outline: "none",
                      }}
                      buttonStyle={{
                        backgroundColor: "white",
                        border: "none",
                        borderBottom: "2px solid #989898",
                        borderRadius: "0px",
                      }}
                      autoFormat={false} // Disable autoformatting
                    />
                  )}
                />
                {errors.phone_number && (
                  <p className="text-red-500 text-xs">
                    {errors.phone_number.message}
                  </p>
                )}
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
                    {...register("password", {
                      required: "Password is required",
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message:
                          "Password must be at least 8 characters, include one uppercase letter, one lowercase letter, one number, and one special character",
                      },
                    })}
                    className={`w-full border-b-2 ${
                      errors.password
                        ? "border-red-500 mb-1"
                        : "border-[#989898] mb-5"
                    } outline-none block p-1`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-500 mt-2 absolute right-3"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs">
                    {errors.password.message}
                  </p>
                )}
              </div>
              {/* Re-type password */}
              <div>
                <label
                  className="block text-[#989898] text-xs"
                  htmlFor="confirmPassword"
                >
                  Re-type password
                </label>
                <div className="flex relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    {...register("confirm_password", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === getValues("password") ||
                        "Passwords do not match",
                    })}
                    className={`w-full border-b-2 ${
                      errors.confirm_password
                        ? "border-red-500 mb-1"
                        : "border-[#989898] mb-5"
                    } outline-none block p-1`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-gray-500 mt-2 absolute right-3"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.confirm_password && (
                  <p className="text-red-500 text-xs">
                    {errors.confirm_password.message}
                  </p>
                )}
              </div>
            </div>

            {/* Register button  */}
            <button
              className={`${
                loading && "bg-[#394856]"
              } bg-[#006E9E] text-white font-semibold py-4 px-4 rounded w-full text-xs hover:bg-[#003660] mb-4`}
              type="submit"
              disabled={loading}
            >
              {loading ? <Spinner /> : "REGISTER"}
            </button>

            {/* Forgot password  */}
            {/* <span className="text-sm">
              Forgot password? <Link className="underline">Click here</Link>
            </span> */}
          </form>
          {/* end form  */}

          {/* Contact Info  */}
          <div className="mt-8 md:mt-14 flex justify-center">
            <HelpCard display="md:flex" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
