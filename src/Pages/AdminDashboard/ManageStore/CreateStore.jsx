import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineReconciliation } from "react-icons/ai";
import { FaFileMedical, FaRegTrashCan } from "react-icons/fa6";
import { toast } from "react-toastify";
import { useAddFileMutation } from "../../../features/api/admin/adminFileUploadApi";
import { useAddUserMutation } from "../../../features/api/admin/adminUserApi";

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
    { value: "Dhanmondi", label: "Dhanmondi" },
    { value: "Uttara", label: "Uttara" },
  ],
  Gazipur: [
    { value: "Tongi", label: "Tongi" },
    { value: "Kaliakoir", label: "Kaliakoir" },
  ],
};

const CreateStore = () => {
  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("No image found");
  const selectedDivision = watch("division");
  const selectedDistrict = watch("district");

  const [addUser] = useAddUserMutation();
  const [addFile] = useAddFileMutation();

  const onSubmit = async (data) => {
    setLoading(true);
    data.accountType = "seller";
    try {
      const res = await addUser(data);
      if (res?.data?.status) {
        toast.success("successfully created an account");
        setLoading(false);
        reset();
      }
    } catch (error) {
      toast.error("something went wrong");
      setLoading(false);
      reset();
    }
  };

  // upload image or file
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await addFile(formData).unwrap();
      console.log("File uploaded successfully:", res);
      setValue("drugLicenseDocument", res?.file?.url);
    } catch (error) {
      console.error("Failed to upload file:", error);
    }
  };

  return (
    <div className="relative h-screen">
      <div className="flex items-center gap-x-[10px]">
        <AiOutlineReconciliation className="text-lg" />
        <p>Create New Store</p>
      </div>

      <div className="px-5 py-3 mt-3 bg-white ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-4 gap-x-4 gap-y-5">
            {/* Store Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Store Name <span className="text-[#FF0027]">*</span>
              </label>
              <input
                type="text"
                {...register("shop_name", { required: true })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
              />
            </div>

            {/* Store Owner Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Store Owner Name <span className="text-[#FF0027]">*</span>
              </label>
              <input
                type="text"
                {...register("shop_owner_name", { required: true })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
              />
            </div>

            {/* Division */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Division <span className="text-[#FF0027]">*</span>
              </label>
              <select
                {...register("division", { required: true })}
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

            {/* District */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                District <span className="text-[#FF0027]">*</span>
              </label>
              <select
                {...register("district", { required: true })}
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

            {/* Upozilla/Thana */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Upozilla/Thana <span className="text-[#FF0027]">*</span>
              </label>
              <select
                {...register("upazila", { required: true })}
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
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address Line
              </label>
              <input
                type="text"
                {...register("address", { required: true })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 whitespace-nowrap">
                Email<span className="text-[#FF0027]">*</span>
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number <span className="text-[#FF0027]">*</span>
              </label>
              <input
                type="number"
                {...register("phone_number", { required: true })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
              />
            </div>

            {/* Pharmacist Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Pharmacist Name
              </label>
              <input
                type="text"
                // readOnly
                {...register("pharmacistName", { required: true })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
              />
            </div>

            {/* Pharmacist Reg No. */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Pharmacist Reg No.
              </label>
              <input
                type="text"
                {...register("pharmacistRegNo", { required: true })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
              />
            </div>

            {/* Drug License No. */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Drug License No.
              </label>
              <input
                type="text"
                {...register("drugLicenseNo", { required: true })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
              />
            </div>

            {/* Upload Drug License */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Upload Drug License
              </label>
              <div className="mt-1 flex items-center border p-2 rounded-md">
                <input
                  type="file"
                  accept="image/*"
                  {...register("drugLicenseDocument")}
                  className="hidden"
                  id="file-upload"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer bg-[#006E9E] text-white p-[6px] text-xs"
                >
                  Upload
                </label>
                <span className="text-xs text-gray-700 ml-2">
                  {fileName ? fileName : "No file selected"}
                </span>
              </div>
            </div>

            {/* Establishment Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Establishment Date
              </label>
              <input
                type="date"
                {...register("establishMentData", { required: true })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                {...register("status", { required: true })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
              >
                <option value="">Select</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                {...register("password", { required: true })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
              />
            </div>
          </div>

          {/* button  */}
          <div className="absolute bottom-0">
            <div className="flex gap-x-5">
              {/* Save button */}
              <button
                type="submit"
                disabled={loading}
                className={`${
                  loading
                    ? "text-gray-400 border-gray-400 cursor-no-drop"
                    : "text-[#139238] border-[#139238]"
                } border rounded-md px-3 py-1 flex items-center font-medium`}
              >
                <span className="mr-2">
                  <FaFileMedical />
                </span>
                Save{" "}
                {loading && (
                  <span className="ml-2 w-4 h-4 border-2 items-center justify-center border-gray-400 border-b-transparent rounded-full inline-block animate-spin"></span>
                )}
              </button>
              {/* Clear button */}
              <button
                onClick={() => reset()}
                className="text-[#880015] border border-[#880015] rounded-md px-3 py-1 flex items-center font-medium"
              >
                <span className="mr-2">
                  <FaRegTrashCan />
                </span>
                Clear all
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateStore;
