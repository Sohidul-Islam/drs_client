import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaFileMedical, FaRegTrashCan } from "react-icons/fa6";
import { GiDiscussion } from "react-icons/gi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useAddCustomerMutation } from "../../../features/api/admin/adminCustomerApi";

const CreateCustomer = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { user } = useSelector((state) => state.auth);
  const [addCustomer] = useAddCustomerMutation();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    const customer = {
      name: data?.name,
      phoneNumber: data?.phoneNumber,
      userId: user?.id,
      address: data.address,
      status: "active",
    };

    setLoading(true);

    try {
      const { data } = await addCustomer(customer);
      if (data?.status) {
        reset();
        toast.success(data?.message);
        setLoading(false);
      } else {
        toast.error(data?.message);
        reset();
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
      setLoading(false);
    }
  };

  return (
    <div className="relative h-screen">
      <div className="flex items-center gap-x-[10px]">
        <GiDiscussion className="text-lg" />
        <p>Create New Customer</p>
      </div>

      <div className="px-5 py-3 mt-3 bg-white">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-3 gap-x-12 gap-y-7">
            {/* Customer Name */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                Customer Name <span className="text-[#FF0027]">*</span>
              </label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                placeholder="Customer name"
                className={`${
                  errors?.name && "border-[#FF0027]"
                } mt-1 block w-full border outline-none text-gray-700 py-[6px] px-3 rounded-md`}
              />
            </div>
            {/* Phone Number */}
            <div className="relative">
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
                placeholder="Phone number"
                className={`${
                  errors?.phoneNumber && "border-[#FF0027]"
                } mt-1 block w-full border outline-none text-gray-700 py-[6px] px-3 rounded-md`}
              />
            </div>
            {/* Address */}
            <div className="">
              <label className="text-sm font-medium text-gray-700">
                Address
              </label>
              <textarea
                {...register("address")}
                placeholder="Write address..."
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-2 px-3 rounded-md resize-none"
                rows="3"
              ></textarea>
            </div>
          </div>

          {/* button  */}
          <div className="fixed bottom-5">
            <div className="flex gap-x-5">
              <button
                type="submit"
                disabled={loading}
                className={`${
                  loading
                    ? "text-gray-400 border-gray-400 cursor-no-drop"
                    : "text-[#139238] hover:text-white hover:bg-[#139238] border-[#139238]"
                } border rounded-md px-3 py-1 flex items-center font-medium`}
              >
                <span className="mr-2">
                  <FaFileMedical />
                </span>
                Save
                {loading && (
                  <span className="ml-2 w-4 h-4 border-2 items-center justify-center border-gray-400 border-b-transparent rounded-full inline-block animate-spin"></span>
                )}
              </button>
              <button
                type="button"
                onClick={() => reset()}
                className="text-[#FF0027] hover:text-white border hover:bg-[#FF0027] border-[#FF0027] rounded-md px-3 py-1 flex items-center font-medium"
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

export default CreateCustomer;
