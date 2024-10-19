import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineReconciliation } from "react-icons/ai";
import { toast } from "react-toastify";
import { useUpdateUserMutation } from "../../../../features/api/admin/adminUserApi";
import { useAddFileMutation } from "../../../../features/api/admin/adminFileUploadApi";
import {
  getDivisions,
  getDistrictsByDivision,
  getUpazilasByDistrict,
} from "bd-geodata";

const UpdateUserModal = ({ isOpen, onClose, userData }) => {
  const { register, handleSubmit, setValue, watch, reset } = useForm();
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const selectedDivision = watch("division");
  const selectedDistrict = watch("district");
  const [updateUser] = useUpdateUserMutation();
  const [addFile] = useAddFileMutation();
  const [loading, setLoading] = useState("");

  const url =
    userData?.drugLicenseDocument || "https://example.com/1122-no image";
  const parts = url?.split("/");
  const endPortion = parts[parts?.length - 1];
  const drugLicenseDocument = endPortion?.split("-")[1];
  const [fileName, setFileName] = useState(drugLicenseDocument);

  console.log("user data", userData);

  // get division
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

  useEffect(() => {
    if (userData) {
      // Set shop name to status fields
      setValue("shop_name", userData?.shop_name);
      setValue("shop_owner_name", userData?.shop_owner_name);
      setValue("email", userData?.email);
      setValue("phone_number", userData?.phone_number);
      setValue("pharmacistName", userData?.pharmacistName);
      setValue("pharmacistRegNo", userData?.pharmacistRegNo);
      setValue("drugLicenseNo", userData?.drugLicenseNo);
      setValue("drugLicenseDocument", userData?.drugLicenseDocument);
      setValue("establishMentData", userData?.date);
      setValue("status", userData?.status);

      // Match the division name to the division id
      const divisionMatch = divisions.find(
        (division) => division.name === userData?.division
      );
      if (divisionMatch) {
        setValue("division", divisionMatch.id);
      }

      // Match the district name to the district id once division is set
      if (userData?.division) {
        const districts = getDistrictsByDivision(divisionMatch?.id);
        setDistricts(districts);
        const districtMatch = districts.find(
          (district) => district.name === userData?.district
        );
        if (districtMatch) {
          setTimeout(() => {
            setValue("district", districtMatch?.id);
          }, 100);
        }
      }

      // Fetch upazilas once district is set
      if (userData?.district) {
        const upazilas = getUpazilasByDistrict(userData?.district);
        setUpazilas(upazilas);
      }
    }
  }, [userData, setValue, divisions]);

  // Setting default upazila after upazilas are loaded
  useEffect(() => {
    if (userData?.upazila && upazilas.length > 0) {
      const upazilaMatch = upazilas.find(
        (upazila) => upazila.name === userData?.upazila
      );
      if (upazilaMatch) {
        setValue("upazila", upazilaMatch?.id);
      }
    }
  }, [userData?.upazila, upazilas, setValue]);

  const onSubmit = async (data) => {
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
    // console.log(data)
    setLoading("submit");
    try {
      const res = await updateUser({ id: userData.id, ...data }).unwrap();
      if (res.status) {
        toast.success("Store updated successfully");
        onClose();
        reset();
        setLoading("");
      }
    } catch (error) {
      toast.error("Failed to update the store");
      setLoading("");
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
      setValue("drugLicenseDocument", res?.file?.url);
    } catch (error) {
      console.error("Failed to upload file:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex">
      <div className="relative p-8 bg-white w-full">
        <div className="flex items-center gap-x-[10px] mb-5">
          <AiOutlineReconciliation className="text-lg" />
          <p>Update User</p>
        </div>
        {/* form  */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-4 gap-x-4 gap-y-5">
            {/* Shop name  */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Store Name <span className="text-[#FF0027]">*</span>
              </label>
              <input
                type="text"
                {...register("shop_name")}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
              />
            </div>

            {/* owner name  */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Store Owner Name <span className="text-[#FF0027]">*</span>
              </label>
              <input
                type="text"
                {...register("shop_owner_name")}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
              />
            </div>

            {/* Division  */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Division <span className="text-[#FF0027]">*</span>
              </label>
              <select
                {...register("division")}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
              >
                <option value="">Select Division</option>
                {divisions.map((division, index) => (
                  <option key={index} value={division.id}>
                    {division.name}
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
                  districts?.map((district, index) => (
                    <option key={index} value={district.id}>
                      {district.name}
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
                  upazilas?.map((upazila, index) => (
                    <option key={index} value={upazila.id}>
                      {upazila.name}
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
                type="tel"
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
                  className={`${
                    loading === "drugLicenseDocument"
                      ? "cursor-wait bg-[#c1c0c0] text-black"
                      : "cursor-pointer bg-[#006E9E] text-white"
                  } p-[10px] text-xs`}
                >
                  {loading === "drugLicenseDocument"
                    ? "Uploading..."
                    : "Upload"}
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

            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                {...register("password", { required: true })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
              />
            </div>
          </div>

          {/* Button  */}
          <div className="px-6 py-4 flex justify-end">
            <button
              type="button"
              className="mr-2 px-4 py-2 bg-gray-500 text-white rounded-md"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`${
                loading ? "bg-[#c1c0c0] text-black" : "bg-blue-600 text-white"
              } px-4 py-2 rounded-md`}
            >
              {loading === "submit" ? "Wait..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserModal;
