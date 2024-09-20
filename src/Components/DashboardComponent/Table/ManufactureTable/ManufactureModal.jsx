import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { GoCpu } from "react-icons/go";
import { FaFileMedical } from "react-icons/fa6";
import { useSelector } from "react-redux";// Adjust the import path
import { toast } from "react-toastify";
import { useUpdateManufacturerMutation } from "../../../../features/api/admin/adminManufactureApi";

const ManufactureModal = ({ isOpen, onClose, manufacturerData }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  
  const { user } = useSelector((state) => state.auth);

  const [updateManufacturer, { isLoading: isUpdating }] = useUpdateManufacturerMutation();

  useEffect(() => {
    if (manufacturerData) {
      setValue("name", manufacturerData.manufacture_name);
      setValue("contactPerson", manufacturerData.contactPerson);
      setValue("phone", manufacturerData.phoneNumber);
    }
  }, [manufacturerData, setValue]);

  const onSubmit = async (data) => {
    const updatedManufacture = {
      id: manufacturerData.id,
      name: data.name,
      status: "active",
      sellerId: user?.id,
      contactPerson: data.contactPerson,
      phoneNumber: data.phone,
    };

    try {
      const response = await updateManufacturer(updatedManufacture).unwrap();
      if (response.status) {
        toast.success(response.message || "Manufacturer updated successfully!");
        reset();
        onClose();
      } else {
        toast.error(response.message || "Failed to update manufacturer.");
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("An error occurred while updating the manufacturer.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-96 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-xl"
        >
          &times;
        </button>
        <div className="flex items-center gap-x-[10px] mb-5">
          <GoCpu className="text-lg" />
          <p>Update Manufacturer</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-4">
            {/* Manufacturer Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Manufacturer Name <span className="text-[#FF0027]">*</span>
              </label>
              <input
                type="text"
                {...register("name", { required: "Manufacturer name is required" })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
              />
              {errors.name && (
                <span className="text-red-500 text-sm">{errors.name.message}</span>
              )}
            </div>

            {/* Contact Person Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contact Person Name <span className="text-[#FF0027]">*</span>
              </label>
              <input
                type="text"
                {...register("contactPerson", { required: "Contact person is required" })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
              />
              {errors.contactPerson && (
                <span className="text-red-500 text-sm">{errors.contactPerson.message}</span>
              )}
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mobile Number <span className="text-[#FF0027]">*</span>
              </label>
              <input
                type="tel"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10,15}$/,
                    message: "Invalid phone number format",
                  },
                })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
              />
              {errors.phone && (
                <span className="text-red-500 text-sm">{errors.phone.message}</span>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => {
                reset();
                onClose();
              }}
              className="text-gray-600 border border-gray-600 rounded-md px-4 py-2 hover:bg-gray-600 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUpdating}
              className={`text-[#139238] border border-[#139238] rounded-md px-4 py-2 flex items-center ${
                isUpdating ? "opacity-50 cursor-not-allowed" : "hover:bg-[#139238] hover:text-white"
              }`}
            >
              <span className="mr-2">
                <FaFileMedical />
              </span>
              {isUpdating ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManufactureModal;