import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useUpdateUserMutation } from "../../../features/api/admin/adminUserApi";
import { useAddFileMutation } from "../../../features/api/admin/adminFileUploadApi";
import { toast } from "react-toastify";

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
  const [storeFileName, setStoreFileName] = useState("No image found");
  const [storeImageSrc, storeUserImageSrc] = useState("");
  const [dragLicFileName, setDragLicFileName] = useState("No image found");
  const [dragLicImageSrc, setDragLicImageSrc] = useState("");
  const [loading, setLoading] = useState("");

  const [updateUser] = useUpdateUserMutation();
  const [addFile] = useAddFileMutation();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  
  const selectedDivision = watch("division");
  const selectedDistrict = watch("district");


  useEffect(() => {
    if (user) {
      setValue("shop_owner_name", user?.shop_owner_name);
      setValue("email", user?.email);
      setValue("phone_number", user?.phone_number);
      setValue("drugLicenseNo", user?.drugLicenseNo);
      setValue("establishMentData", user?.establishMentData);
      setValue("division", user?.division);
      setTimeout(() => {
        setValue("district", user?.district);
      }, 100);
      setTimeout(() => {
        setValue("upazila", user?.upazila);
      }, 100);
      setValue("pharmacistName", user?.pharmacistName);
      setValue("pharmacistRegNo", user?.pharmacistRegNo);
      setValue("storeImage", user?.UserImage);
      setValue("drugLicenseDocument", user?.drugLicenseDocument);
    }
  }, [user, setValue]);

  const onSubmit = (data) => {
    setLoading("submit");
    setTimeout(()=> {setLoading("")}, 5000)
    console.log('submitting data',data);
  };

  const handleFileUpload = async (e, setFileName, fieldName, setImageSrc) => {
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
            {storeImageSrc && (
              <img
                src={storeImageSrc}
                alt="Uploaded"
                className="mt-4 w-24 h-24 rounded-full"
              />
            )}
          </div>
          {/* image button  */}
          <div className="mt-4 flex items-center">
            <input
              type="file"
              accept="image/*"
              {...register("storeImage")}
              onChange={(e) =>
                handleFileUpload(
                  e,
                  setStoreFileName,
                  "storeImage",
                  storeUserImageSrc
                )
              }
              className="hidden"
              id="store-file-upload"
            />
            <label
              htmlFor="store-file-upload"
              className={`${
                loading === "storeImage"
                  ? "cursor-wait bg-[#c1c0c0] text-black"
                  : "cursor-pointer bg-[#006E9E] text-white"
              } p-[10px] text-xs`}
            >
              {loading === "storeImage" ? "Uploading..." : "Upload Image"}
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
                  {...register("shop_owner_name", { required: true })}
                  placeholder="Shop name"
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
                  {...register("email", { required: true })}
                  placeholder="Email"
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
                  {...register("phone_number", { required: true })}
                  placeholder="Phone number"
                  className="mt-1 block w-full bg-gray-200 outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
                />
              </div>
              {/* has drag license  */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Has Drug license
                </label>
                <select
                  {...register("has-drag-license", { required: true })}
                  className="mt-1 block w-full border outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
                >
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              {/* drag license no  */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Drug license No
                </label>
                <input
                  type="text"
                  {...register("drugLicenseNo", { required: true })}
                  placeholder="License no."
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
              {/* Store/Pharmacy Category  */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Store/Pharmacy Category
                </label>
                <select
                  {...register("store-category", { required: true })}
                  className="mt-1 block w-full border outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
                >
                  <option value="">Select</option>
                  <option value="category-1">Category-1</option>
                  <option value="category-2">Category-2</option>
                  <option value="category-3">Category-3</option>
                </select>
              </div>
              {/* Store/Pharmacy Type  */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Store/Pharmacy Type
                </label>
                <select
                  {...register("store-type", { required: true })}
                  className="mt-1 block w-full border outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
                >
                  <option value="">Select</option>
                  <option value="type-1">Type-1</option>
                  <option value="type-2">Type-2</option>
                  <option value="type-3">Type-3</option>
                </select>
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
              
              {/* Postal Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Postal Code
                </label>
                <input
                  type="number"
                  {...register("postal-code", { required: true })}
                  placeholder="Postal code"
                  className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[5px] px-3 rounded-md"
                />
              </div>
              {/* Address Line */}
              <div className="md:col-span-">
                <label className="block text-sm font-medium text-gray-700">
                  Address Line
                </label>
                <textarea
                  {...register("address-line", { required: true })}
                  placeholder="Address line"
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
                  {...register("owner-name", { required: true })}
                  placeholder="Name"
                  className="mt-1 block w-full border outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
                />
              </div>
              {/*Owner's Email  */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Owner's Email
                </label>
                <input
                  type="email"
                  {...register("owner-email", { required: true })}
                  placeholder="Email address"
                  className="mt-1 block w-full border outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
                />
              </div>
              {/* Owner's Phone Number  */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Owner's Phone Number
                </label>
                <input
                  type="tel"
                  {...register("owner-phone-number", { required: true })}
                  placeholder="Phone number"
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
                  {...register("pharmacistName", { required: true })}
                  placeholder="Pharmacist name"
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
                  {...register("pharmacistRegNo", { required: true })}
                  placeholder="Registration No"
                  className="mt-1 block w-full border outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
                />
              </div>
              <br />
              {/* Upload Drug License  */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Upload Drug License
                </label>
                <div className="mt-1 flex items-center border p-2 rounded-md">
                  <input
                    type="file"
                    accept="image/*"
                    {...register("drugLicenseDocument")}
                    onChange={(e) =>
                      handleFileUpload(
                        e,
                        setDragLicFileName,
                        "drugLicenseDocument",
                        setDragLicImageSrc
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
                    } p-[10px] text-xs`}
                  >
                    {loading === "drugLicenseDocument" ? "Uploading..." : "Upload"}
                  </label>
                  <span className="text-xs text-gray-700 ml-2">
                    {dragLicFileName}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* submit button  */}
          <button
            type="submit"
            className={`${loading? "bg-[#c1c0c0] text-black":"bg-blue-600 text-white"} px-4 py-2 rounded-md`}
          >
             {loading === "submit" ? "Wait..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShopInformation;
