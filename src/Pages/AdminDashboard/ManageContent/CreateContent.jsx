import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaFileMedical, FaRegTrashCan } from "react-icons/fa6";
import { AiOutlineCopy } from "react-icons/ai";

const CreateContent = () => {
  const { register, handleSubmit, reset, control, unregister  } = useForm();
  const [loading, setLoading] = useState(false);

  const [features, setFeatures] = useState([""]);

  const onSubmit = (data) => {
    console.log("Submitted data:", data);
  };

  const addMoreFeatures = () => {
    setFeatures([...features, ""]);
  };

  // Function to remove a feature input
  const removeFeature = (index) => {
    const updatedFeatures = [...features];
    updatedFeatures.splice(index, 1);
    setFeatures(updatedFeatures);
    unregister(`offers.${index}`);
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-x-[10px]">
        <AiOutlineCopy className="text-lg" />
        <p>Add New Package</p>
      </div>

      <div className="px-5 py-3 mt-3 bg-white ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-3 gap-x-4 gap-y-5 w-[75%]">
            {/* Package Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Package Name <span className="text-[#FF0027]">*</span>
              </label>
              <select
                {...register("package", { required: true })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
              >
                <option value="">Select</option>
                <option value="free trial">Free Trial</option>
                <option value="steller business">Steller Business</option>
                <option value="steller">Steller</option>
              </select>
            </div>

            {/* Price (BDT) */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price (BDT) <span className="text-[#FF0027]">*</span>
              </label>
              <input
                type="number"
                {...register("price", { required: true })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
              />
            </div>

            {/* Duration (Month) */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Duration (Month) <span className="text-[#FF0027]">*</span>
              </label>
              <input
                type="number"
                {...register("duration_in_days", { required: true })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
              />
            </div>

            {/* Description */}
            <div className="col-span-3">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                type="text"
                {...register("description", { required: true })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
              />
            </div>

           {/* Features */}
           {features.map((_, index) => (
              <div key={index} className="col-span-3 flex items-center gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Feature {index + 1}
                    <span className="text-[#FF0027]">*</span>
                  </label>
                  <input
                    type="text"
                    {...register(`offers.${index}`, { required: true })}
                    className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
                  />
                </div>

                {/* Remove Feature Button */}
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="text-red-600 mt-4"
                >
                  <FaRegTrashCan />
                </button>
              </div>
            ))}

            {/* Add More Features Button */}
            <div className="flex items-center gap-5 col-span-3">
              <button
                type="button"
                onClick={addMoreFeatures}
                className="text-[#066BC9]"
              >
                <span className="text-white bg-[#066BC9] text-sm px-[6px] py-[1px] rounded-full">
                  +
                </span>
                <span className="ml-1 underline text-sm">Add more package</span>
              </button>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status <span className="text-[#FF0027]">*</span>
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
          <div className="mt-5">
            <div className="flex gap-x-5">
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

export default CreateContent;
