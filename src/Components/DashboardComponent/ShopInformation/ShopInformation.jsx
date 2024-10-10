import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserMutation } from "../../../features/api/admin/adminUserApi";
import { useAddFileMutation } from "../../../features/api/admin/adminFileUploadApi";
import { toast } from "react-toastify";
import { getUser } from "../../../features/auth/authSlice";

const divisions = [
  { value: "Dhaka", label: "Dhaka" },
  { value: "Chittagong", label: "Chittagong" },
  { value: "Khulna", label: "Khulna" },
];

const districts = {
  Dhaka: [
    { value: "Dhaka", label: "Dhaka" },
    { value: "Gazipur", label: "Gazipur" },
  ],
  Chittagong: [
    { value: "Chittagong", label: "Chittagong" },
    { value: "Comilla", label: "Comilla" },
  ],
};

const thanas = {
  Dhaka: [
    { value: "Dhaka", label: "Dhaka" },
    { value: "Dhanmondi", label: "Dhanmondi" },
    { value: "Uttara", label: "Uttara" },
  ],
  Gazipur: [
    { value: "Tongi", label: "Tongi" },
    { value: "Kaliakoir", label: "Kaliakoir" },
  ],
};

const ShopInformation = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const [imageSrc, setImageSrc] = useState("");
  const [nidFileName, setNidFileName] = useState("No image found");
  const [dragLicFileName, setDragLicFileName] = useState("No image found");
  const [loading, setLoading] = useState("");

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

  const establishMentDate = user && user?.establishMentData.split('T')[0];
  const selectedDivision = watch("division");
  const selectedDistrict = watch("district");

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
      }, 100);
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
      toast.error("Failed to update the store");
      setLoading("");
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
        <div className="col-span-5 border-l px-11 my-5 space-y-11">
          {/* Shop Information  */}
          <div>
            <p className="border-b pb-2">Shop Information</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
              {/* shop name  */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Shop name
                </label>
                <input
                  type="text"
                  placeholder="Shop name"
                  {...register("shop_name", { required: true })}
                  className="mt-1 block w-full bg-gray-200 outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
                />
              </div>

              {/*shop email  */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="E-mail"
                  {...register("email", { required: true })}
                  className="mt-1 block w-full bg-gray-200 outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
                />
              </div>

              {/*shop phone number  */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone number
                </label>
                <input
                  type="tel"
                  placeholder="Phone number"
                  {...register("phone_number", { required: true })}
                  className="mt-1 block w-full bg-gray-200 outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
                />
              </div>

              {/* drag license no  */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Drug license No
                </label>
                <input
                  type="text"
                  placeholder="License no."
                  {...register("drugLicenseNo", { required: true })}
                  className="mt-1 block w-full border outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
                />
              </div>

              {/* Establishment Date  */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Establishment Date
                </label>
                <input
                  type="date"
                  {...register("establishMentData", { required: true })}
                  className="mt-1 block w-full border outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div>
            <p className="border-b pb-2">Address</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
              {/* Division */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Division <span className="text-[#FF0027]">*</span>
                </label>
                <select
                  {...register("division")}
                  className="mt-1 block w-full border outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
                >
                  <option value="">Select Division</option>
                  {divisions.map((division) => (
                    <option key={division.value} value={division.value}>
                      {division.label}
                    </option>
                  ))}
                </select>
              </div>
              {/* District  */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  District <span className="text-[#FF0027]">*</span>
                </label>
                <select
                  {...register("district")}
                  className="mt-1 block w-full border outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
                  disabled={!selectedDivision}
                >
                  <option value="">Select District</option>
                  {selectedDivision &&
                    districts[selectedDivision]?.map((district) => (
                      <option key={district.value} value={district.value}>
                        {district.label}
                      </option>
                    ))}
                </select>
              </div>

              {/* Thana  */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Upozilla/Thana <span className="text-[#FF0027]">*</span>
                </label>
                <select
                  {...register("upazila")}
                  className="mt-1 block w-full border outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
                  disabled={!selectedDistrict}
                >
                  <option value="">Select Upazila</option>
                  {selectedDistrict &&
                    thanas[selectedDistrict]?.map((thana) => (
                      <option key={thana.value} value={thana.value}>
                        {thana.label}
                      </option>
                    ))}
                </select>
              </div>

              {/* Address Line */}
              <div className="md:col-span-">
                <label className="block text-sm font-medium text-gray-700">
                  Address Line
                </label>
                <textarea
                  placeholder="Address..."
                  {...register("address-line", { required: true })}
                  className="mt-1 block w-full border outline-gray-300 text-gray-700 py-2 px-3 rounded-md resize-none"
                />
              </div>
            </div>
          </div>

          {/* Owner Information */}
          <div>
            <p className="border-b pb-2">Owner Information</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
              {/* Owner Name  */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Owner Name
                </label>
                <input
                  type="text"
                  {...register("shop_owner_name", { required: true })}
                  placeholder="Name"
                  className="mt-1 block w-full border outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
                />
              </div>

              {/* Pharmacist Name  */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Pharmacist Name
                </label>
                <input
                  type="text"
                  placeholder="Pharmacist name"
                  {...register("pharmacistName", { required: true })}
                  className="mt-1 block w-full border outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
                />
              </div>

              {/* Pharmacist Registration No. */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Pharmacist Registration No
                </label>
                <input
                  type="text"
                  placeholder="Registration No"
                  {...register("pharmacistRegNo", { required: true })}
                  className="mt-1 block w-full border outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
                />
              </div>

              {/* NID No. */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  NID No.
                </label>
                <input
                  type="number"
                  placeholder="National Id No."
                  {...register("nidNumber", { required: true })}
                  className="mt-1 block w-full border outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
                />
              </div>

              {/* Upload NID Photo  */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Upload NID
                </label>
                <div className="mt-1 flex items-center border px-2 py-1 rounded-md">
                  <input
                    type="file"
                    accept="image/*"
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
                    } p-2.5 text-xs`}
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

              {/* Upload Drug License  */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Upload Drug License
                </label>
                <div className="mt-1 flex items-center border px-2 py-1 rounded-md">
                  <input
                    type="file"
                    accept="image/*"
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
                    } p-2.5 text-xs`}
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
            <p className="border-b pb-2">Privacy Settings</p>
            <div className="w-3/4 grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              {/* New password  */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  New password
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: true,
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                      message:
                        "Password must be at least 6 characters long and contain both letters and numbers",
                    },
                  })}
                  className="my-1 block w-full border outline-gray-300 text-gray-700 py-[5px] px-3 rounded-md"
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
              {/* Confirm new password */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirm new password
                </label>
                <input
                  type="password"
                  {...register("confirm_password", {
                    required: true,
                    validate: (value) =>
                      value === getValues("password") ||
                      "Passwords do not match",
                  })}
                  className="my-1 block w-full border outline-gray-300 text-gray-700 py-[5px] px-3 rounded-md"
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
