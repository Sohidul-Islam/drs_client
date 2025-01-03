import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserMutation } from "../../../features/api/admin/adminUserApi";
import { useAddFileMutation } from "../../../features/api/admin/adminFileUploadApi";
import { toast } from "react-toastify";
import { getUser } from "../../../features/auth/authSlice";
import {
  getDivisions,
  getDistrictsByDivision,
  getUpazilasByDistrict,
} from "bd-geodata";

const ShopInformation = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [imageSrc, setImageSrc] = useState("");
  const [nidFileName, setNidFileName] = useState("No image found");
  const [dragLicFileName, setDragLicFileName] = useState("No image found");
  const [loading, setLoading] = useState("");
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  const [updateUser] = useUpdateUserMutation();
  const [addFile] = useAddFileMutation();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm();

  const establishMentDate = user && user?.establishMentData?.split("T")[0];
  const selectedDivision = watch("division");
  const selectedDistrict = watch("district");
  const selectedUpozila = watch("upazila");

  const divisions = getDivisions();

  // Fetch districts based on division selection
  useEffect(() => {
    if (selectedDivision) {
      const districts = getDistrictsByDivision(selectedDivision);
      setDistricts(districts);
    } else {
      setDistricts([]);
    }
  }, [selectedDivision]);

  // Fetch upazilas based on district selection
  useEffect(() => {
    if (selectedDistrict) {
      const upazilas = getUpazilasByDistrict(selectedDistrict);
      setUpazilas(upazilas);
    } else {
      setUpazilas([]);
    }
  }, [selectedDistrict]);

  console.log("user data", user);

  useEffect(() => {
    if (user) {
      setValue("image", user?.image);
      setValue("shop_name", user?.shop_name);
      setValue("email", user?.email);
      setValue("phone_number", user?.phone_number);
      setValue("drugLicenseNo", user?.drugLicenseNo);
      setValue("establishMentData", establishMentDate);
      setValue("division", user?.division);
      setTimeout(() => {
        setValue("district", user?.district);
      }, 100);
      setTimeout(() => {
        setValue("upazila", user?.upazila);
      }, 200);
      setValue("shop_owner_name", user?.shop_owner_name);
      setValue("pharmacistName", user?.pharmacistName);
      setValue("pharmacistRegNo", user?.pharmacistRegNo);
      setValue("nidNumber", user?.nidNumber);
      setValue("nid_image", user?.nid_image);
      setValue("drugLicenseDocument", user?.drugLicenseDocument);
    }
  }, [user, setValue, establishMentDate]);

  const onSubmit = async (data) => {
    setLoading("submit");
    // console.log(data);
    try {
      const res = await updateUser({ id: user.id, ...data }).unwrap();
      if (res.status) {
        toast.success("Store updated successfully");
        setLoading("");
        dispatch(getUser(user?.email));
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update the store");
      setLoading("");
      console.log(error);
    }
  };

  const handleFileUpload = async (
    e,
    setFileName = () => {},
    fieldName,
    setImageSrc = () => {}
  ) => {
    setLoading(fieldName);
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await addFile(formData).unwrap();
      if (res?.message === "File uploaded successfully") {
        setValue(fieldName, res?.file?.url);
        setImageSrc(res?.file?.url);
        toast.success("File uploaded successfully");
        setLoading("");
      }
    } catch (error) {
      toast.error("something went wrong");
      setLoading("");
    }
  };

  return (
    <div className="bg-white">
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-6">
        {/* Shop image  */}
        <div className="col-span-1 mx-auto">
          <div>
            {imageSrc ? (
              <img
                src={imageSrc}
                alt="shop logo"
                className="mt-4 w-24 h-24 rounded-full"
              />
            ) : (
              <img
                src={user?.image}
                alt="shop logo"
                className="mt-4 w-24 h-24 rounded-full border text-xs"
              />
            )}
          </div>
          {/* image button  */}
          <div className="mt-4 flex items-center">
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              onChange={(e) =>
                handleFileUpload(e, undefined, "image", setImageSrc)
              }
              className="hidden"
              id="store-file-upload"
            />
            <label
              htmlFor="store-file-upload"
              className={`${
                loading === "image"
                  ? "cursor-wait bg-[#c1c0c0] text-black"
                  : "cursor-pointer bg-[#006E9E] text-white"
              } p-[10px] text-xs`}
            >
              {loading === "image" ? "Uploading..." : "Upload Image"}
            </label>
          </div>
        </div>
        <div className="col-span-5 border-l px-5 my-5 space-y-11">
          {/* Shop Information  */}
          <div>
            <p className="border-b pb-2">Shop Information</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
              {/* shop name  */}
              <div>
                <label className="block text-xs font-medium text-gray-700">
                  Shop name
                </label>
                <input
                  type="text"
                  placeholder="Shop name"
                  {...register("shop_name", { required: true })}
                  className={`${
                    errors?.shop_name && "outline-red-600"
                  } mt-1 block w-full bg-gray-100 outline-none text-xs text-gray-700 py-2 px-3 rounded-md`}
                />
              </div>

              {/*shop email  */}
              <div>
                <label className="block text-xs font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="E-mail"
                  {...register("email", { required: true })}
                  className={`${
                    errors?.email && "outline-red-600"
                  } mt-1 block w-full bg-gray-100 outline-none text-xs text-gray-700 py-2 px-3 rounded-md`}
                />
              </div>

              {/*shop phone number  */}
              <div>
                <label className="block text-xs font-medium text-gray-700">
                  Phone number
                </label>
                <input
                  type="tel"
                  placeholder="Phone number"
                  {...register("phone_number", { required: true })}
                  className={`${
                    errors?.phone_number && "outline-red-600"
                  } mt-1 block w-full bg-gray-100 outline-none text-xs text-gray-700 py-2 px-3 rounded-md`}
                />
              </div>

              {/* Establishment Date  */}
              <div>
                <label className="block text-xs font-medium text-gray-700">
                  Establishment Date
                </label>
                <input
                  type="date"
                  {...register("establishMentData")}
                  className={`mt-1 block w-full  border outline-none text-xs text-gray-700 py-2 px-3 rounded-md`}
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div>
            <p className="border-b pb-2 text-sm">Address</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
              {/* Division */}
              <div>
                <label className="block text-xs font-medium text-gray-700">
                  Division <span className="text-[#FF0027]">*</span>
                </label>
                <select
                  {...register("division")}
                  className={`${
                    errors?.division && "outline-red-600"
                  } mt-1 block w-full border outline-none text-xs text-gray-700 py-2 px-3 rounded-md`}
                >
                  <option value="">Select Division</option>
                  {divisions?.map((division) => (
                    <option key={division.value} value={division.id}>
                      {division.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* District  */}
              <div>
                <label className="block text-xs font-medium text-gray-700">
                  District <span className="text-[#FF0027]">*</span>
                </label>
                <select
                  {...register("district")}
                  className={`${
                    errors?.district && "outline-red-600"
                  } mt-1 block w-full border outline-none text-xs text-gray-700 py-2 px-3 rounded-md`}
                  disabled={!selectedDivision}
                >
                  <option value="">Select District</option>
                  {selectedDivision &&
                    districts?.map((district, index) => (
                      <option key={index} value={district.id}>
                        {district.name}
                      </option>
                    ))}
                </select>
              </div>

              {/* Thana  */}
              <div>
                <label className="block text-xs font-medium text-gray-700">
                  Upozilla/Thana <span className="text-[#FF0027]">*</span>
                </label>
                <select
                  {...register("upazila")}
                  className={`${
                    errors?.upazila && "outline-red-600"
                  } mt-1 block w-full border outline-none text-xs text-gray-700 py-2 px-3 rounded-md`}
                  disabled={!selectedDistrict}
                >
                  <option value="">Select Upazila</option>
                  {selectedDistrict &&
                    upazilas?.map((upazila, index) => (
                      <option key={index} value={upazila.id}>
                        {upazila.name}
                      </option>
                    ))}
                </select>
              </div>

              {/* Address Line */}
              <div className="md:col-span-">
                <label className="block text-xs font-medium text-gray-700">
                  Address Line
                </label>
                <textarea
                  placeholder="Address..."
                  {...register("address-line")}
                  className="mt-1 block w-full border outline-gray-300 text-xs text-gray-700 py-2 px-3 rounded-md resize-none"
                />
              </div>
            </div>
          </div>

          {/* Owner Information */}
          <div>
            <p className="border-b pb-2 text-sm">Owner Information</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
              {/* Owner Name  */}
              <div>
                <label className="block text-xs font-medium text-gray-700">
                  Owner Name
                </label>
                <input
                  type="text"
                  {...register("shop_owner_name")}
                  placeholder="Name"
                  className="mt-1 block w-full border outline-gray-300 text-xs text-gray-700 py-2 px-3 rounded-md"
                />
              </div>

              {/* Pharmacist Name  */}
              <div>
                <label className="block text-xs font-medium text-gray-700">
                  Pharmacist Name
                </label>
                <input
                  type="text"
                  placeholder="Pharmacist name"
                  {...register("pharmacistName")}
                  className="mt-1 block w-full border outline-gray-300 text-xs text-gray-700 py-2 px-3 rounded-md"
                />
              </div>

              {/* Pharmacist Registration No. */}
              <div>
                <label className="block text-xs font-medium text-gray-700">
                  Pharmacist Registration No{" "}
                  <span className="text-[8px] text-gray-500">
                    (Mandatory Reg. No)
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Registration No"
                  {...register("pharmacistRegNo", { required: true })}
                  className={`${
                    errors?.pharmacistRegNo && " border-red-700"
                  } mt-1 block w-full border outline-none text-xs text-gray-700 py-2 px-3 rounded-md`}
                />
              </div>

              {/* NID No. */}
              <div>
                <label className="block text-xs font-medium text-gray-700">
                  NID No.
                </label>
                <input
                  type="number"
                  placeholder="National Id No."
                  {...register("nidNumber")}
                  className="mt-1 block w-full border outline-gray-300 text-xs text-gray-700 py-2 px-3 rounded-md"
                />
              </div>

              {/* Upload NID Photo  */}
              <div>
                <label className="block text-xs font-medium text-gray-700">
                  Upload NID
                </label>
                <div className="mt-1 flex items-center border px-2 py-1 rounded-md">
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    {...register("nid_image")}
                    className="hidden"
                    id="nid-image-upload"
                    onChange={(e) =>
                      handleFileUpload(
                        e,
                        setNidFileName,
                        "nid_image",
                        undefined
                      )
                    }
                  />
                  <label
                    htmlFor="nid-image-upload"
                    className={`${
                      loading === "nid_image"
                        ? "cursor-wait bg-[#c1c0c0] text-black"
                        : "cursor-pointer bg-[#006E9E] text-white"
                    } p-1 text-xs`}
                  >
                    {loading === "nid_image" ? "Uploading..." : "Upload"}
                  </label>
                  <span className="text-xs text-gray-700 ml-2">
                    {nidFileName
                      ? nidFileName?.slice(0, 25)
                      : "No file selected"}
                  </span>
                </div>
              </div>

              {/* drag license no  */}
              <div>
                <label className="block text-xs font-medium text-gray-700">
                  Drug license No{" "}
                  <span className="text-[8px] text-gray-500">
                    (Mandatory drug license)
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="License no."
                  {...register("drugLicenseNo", { required: true })}
                  className={`${
                    errors?.drugLicenseNo && " border-red-700"
                  } mt-1 block w-full border outline-none text-xs text-gray-700 py-2 px-3 rounded-md`}
                />
              </div>

              {/* Upload Drug License  */}
              <div>
                <label className="block text-xs font-medium text-gray-700">
                  Upload Drug License
                </label>
                <div className="mt-1 flex items-center border px-2 py-1 rounded-md">
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    {...register("drugLicenseDocument")}
                    onChange={(e) =>
                      handleFileUpload(
                        e,
                        setDragLicFileName,
                        "drugLicenseDocument",
                        undefined
                      )
                    }
                    className="hidden"
                    id="drag-license-upload"
                  />
                  <label
                    htmlFor="drag-license-upload"
                    className={`${
                      loading === "drugLicenseDocument"
                        ? "cursor-wait bg-[#c1c0c0] text-black"
                        : "cursor-pointer bg-[#006E9E] text-white"
                    } p-1 text-xs`}
                  >
                    {loading === "drugLicenseDocument"
                      ? "Uploading..."
                      : "Upload"}
                  </label>
                  <span className="text-xs text-gray-700 ml-2">
                    {dragLicFileName?.slice(0, 20)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div>
            <p className="border-b pb-2 text-sm">Privacy Settings</p>
            <div className=" grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
              {/* Old password  */}
              <div>
                <label className="block text-xs font-medium text-gray-700">
                  Old password
                </label>
                <input
                  type="password"
                  {...register("old_password", {
                    // required: true,
                    // pattern: {
                    //   value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                    // },
                  })}
                  placeholder="Enter old password"
                  className="my-1 block w-full border outline-gray-300 text-xs text-gray-700 py-[5px] px-3 rounded-md"
                />
                {errors.old_password && (
                  <p className="text-red-500 text-[10px]">
                    {errors.old_password.message}
                  </p>
                )}
              </div>

              {/* New password  */}
              <div>
                <label className="block text-xs font-medium text-gray-700">
                  New password
                </label>
                <input
                  type="password"
                  {...register("password", {
                    // required: true,
                    validate: (value) => {
                      if (!value) return true; // Skip validation if the field is empty
                      const validations = {
                        hasLowercase:
                          /[a-z]/.test(value) ||
                          "Password must include at least one lowercase letter",
                        hasUppercase:
                          /[A-Z]/.test(value) ||
                          "Password must include at least one uppercase letter",
                        hasNumber:
                          /\d/.test(value) ||
                          "Password must include at least one number",
                        hasSpecialCharacter:
                          /[@$!%*?&]/.test(value) ||
                          "Password must include at least one special character",
                        hasMinimumLength:
                          value.length >= 8 ||
                          "Password must be at least 8 characters long",
                      };
                      return (
                        Object.values(validations).find((v) => v !== true) ||
                        true
                      );
                    },
                  })}
                  placeholder="Enter new password"
                  className="my-1 block w-full border outline-gray-300 text-xs text-gray-700 py-[5px] px-3 rounded-md"
                />
                {errors.password ? (
                  <p className="text-red-500 text-[10px] h-[45px]">
                    {errors.password.message}
                  </p>
                ) : (
                  <p className="text-[10px] text-[#989898]">
                    Password must be at least 8 characters, include one
                    uppercase letter, one lowercase letter, one number, and one
                    special character
                  </p>
                )}
              </div>

              {/* Confirm new password */}
              <div>
                <label className="block text-xs font-medium text-gray-700">
                  Confirm new password
                </label>
                <input
                  type="password"
                  {...register("confirm_password", {
                    validate: (value) =>
                      value === getValues("password") ||
                      "Passwords do not match",
                  })}
                  placeholder="Enter confirm password"
                  className="my-1 block w-full border outline-gray-300 text-xs text-gray-700 py-[5px] px-3 rounded-md"
                />
                {errors.confirm_password && (
                  <p className="text-red-500 text-[10px]">
                    {errors.confirm_password.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* submit button  */}
          <button
            type="submit"
            className={`${
              loading
                ? "cursor-wait bg-[#c1c0c0] text-black"
                : "cursor-pointer bg-[#006E9E] text-white"
            } px-7 py-[10px] text-sm`}
          >
            {loading === "submit" ? "Wait..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShopInformation;
