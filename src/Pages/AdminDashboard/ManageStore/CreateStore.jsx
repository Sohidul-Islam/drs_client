import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineReconciliation } from "react-icons/ai";
import { FaFileMedical, FaRegTrashCan } from "react-icons/fa6";
import { toast } from "react-toastify";

const CreateStore = () => {
  const { register, handleSubmit, reset, watch, control, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [nidSrc, setNidSrc] = useState("https://i.ibb.co/KrT7qK8/nid.png");
  const [nidFileName, setNidFileName] = useState("No image found");

  const onSubmit = async (data) => {
    console.log("Store data: ", data);
    // setLoading(true);
    // try {
    //   const { data: res } = await addAdjustment(adjustment);
    //   console.log(res, "res");
    //   if (res?.status) {
    //     reset();
    //     toast.success(res?.message);
    //     setLoading(false);
    //   } else {
    //     toast.error(res?.message);
    //     reset();
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const handleImageUpload = (
    e,
    setImageSrcCallback,
    fieldName,
    setFileNameCallback
  ) => {
    const file = e.target.files[0];
    if (file) {
      setValue(fieldName, file);
      setFileNameCallback(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrcCallback(reader.result);
      };
      reader.readAsDataURL(file);
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
                {...register("storeName", { required: true })}
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
                {...register("storeOwner", { required: true })}
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
                <option value="">Select</option>
                <option value="dhaka">Dhaka</option>
                <option value="chattogram">Chattogram</option>
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
              >
                <option value="">Select</option>
                <option value="dhaka">Dhaka</option>
                <option value="cumilla">Cumilla</option>
                <option value="Feni">Feni</option>
              </select>
            </div>

            {/* Upozilla/Thana */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Upozilla/Thana <span className="text-[#FF0027]">*</span>
              </label>
              <select
                {...register("upozilla", { required: true })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
              >
                <option value="">Select</option>
                <option value="dhaka">Dhaka</option>
                <option value="cumilla">Cumilla</option>
                <option value="Feni">Feni</option>
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
                {...register("phoneNumber", { required: true })}
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
                {...register("regNo", { required: true })}
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
                {...register("licenseNo", { required: true })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
              />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                  Upload NID
                </label>
                <div className="mt-1 flex items-center border p-2 rounded-md">
                  <input
                    type="file"
                    accept="image/*"
                    {...register("nidImage")}
                    onChange={(e) =>
                      handleImageUpload(
                        e,
                        setNidSrc,
                        "nidImage",
                        setNidFileName
                      )
                    }
                    className="hidden"
                    id="nid-upload"
                  />
                  <label
                    htmlFor="nid-upload"
                    className="cursor-pointer bg-[#006E9E] text-white p-[6px] text-xs"
                  >
                    Upload
                  </label>
                  <span className="text-xs text-gray-700 ml-2">
                    {nidFileName}
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
                {...register("establishmentDate", { required: true })}
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
