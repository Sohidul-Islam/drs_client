import React from "react";
import { useForm } from "react-hook-form";
import { FaFileMedical } from "react-icons/fa6";
import { GiDiscussion } from "react-icons/gi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useAddCustomerMutation } from "../../../../features/api/admin/adminCustomerApi";

const CreateCustomer = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { user } = useSelector((state) => state.auth);

  const [addCustomer] = useAddCustomerMutation();

  const onSubmit = async (data) => {
    const customer = {
      name: data?.name,
      phoneNumber: data?.phoneNumber,
      userId: user?.id,
      address: data.address,
      status: "active",
    };

    try {
      const response = await addCustomer(customer);
      if (response?.data?.status) {
        reset();
        toast.success(response?.data?.message);
        onClose()
      } else {
        toast.error(response?.data?.message);
        reset();
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="relative h-screen z-10">
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
          <div className="flex items-center gap-x-[10px] mb-5">
            <GiDiscussion className="text-lg" />
            <p>Create New Customer</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Customer Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Customer Name
              </label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
              />
              {errors.name && (
                <span className="absolute text-red-500 text-sm">
                  {errors.name.message}
                </span>
              )}
            </div>
            {/* Phone Number */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Phone number <span className="text-[#FF0027]">*</span>
              </label>
              <input
                type="tel"
                {...register("phoneNumber", {
                  required: true,
                  pattern: {
                    value: /^[0-9]{11}$/,
                    message: "Invalid phone number format",
                  },
                })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
              />
              {errors?.phoneNumber && (
                <span className="absolute text-red-500 text-sm">
                  {errors?.phoneNumber?.message}
                </span>
              )}
            </div>
            {/* Address */}
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700">
                Address
              </label>
              <textarea
                {...register("address")}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-2 px-3 rounded-md resize-none"
                rows="3"
              ></textarea>
            </div>

            {/* Button Section */}
            <div className="mt-4">
              <div className="flex gap-x-5">
                <button
                  type="submit"
                  className="text-[#139238] border border-[#139238] rounded-md px-3 py-1 flex items-center font-medium"
                >
                  <span className="mr-2">
                    <FaFileMedical />
                  </span>
                  Add Product
                </button>
                <button onClick={onClose} type="button" className="border">
                  Close
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCustomer;