import React from 'react';
import { useForm } from 'react-hook-form';
import { FaFileMedical, FaRegTrashCan } from 'react-icons/fa6';
import { GiDiscussion } from 'react-icons/gi';
import { useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { useAddCustomerMutation } from '../../../features/api/admin/adminCustomerApi';

const CreateCustomer = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { user } = useSelector((state) => state.auth);
  const [addCustomer] = useAddCustomerMutation()

  const onSubmit = async (data) => {
    const customer = {
      name: data?.name,
      phoneNumber: data?.phoneNumber,
      userId: user?.id,
      address: data.address,
      status: "active",
    };
    
    try {
      const { data } = await addCustomer(customer);
      console.log("response:", data)
      if (data?.status) {
        reset()
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
        reset()
      }
    } catch (error) {
      console.log(error);
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
            <div className='relative'>
              <label className="block text-sm font-medium text-gray-700">
                Customer Name <span className="text-[#FF0027]">*</span>
              </label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
              />
              {errors.name && <span className="absolute text-red-500 text-sm">{errors.name.message}</span>}
            </div>
            {/* Phone Number */}
            <div className='relative'>
              <label className="block text-sm font-medium text-gray-700">
                Phone number <span className="text-[#FF0027]">*</span>
              </label>
              <input
                type="tel"
                {...register("phoneNumber", { required: true, pattern: {
                  value: /^[0-9]{11}$/,
                  message: "Invalid phone number format"
                } })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
              />
              {errors?.phoneNumber && <span className="absolute text-red-500 text-sm">{errors?.phoneNumber?.message}</span>}
            </div>
            {/* Address */}
            <div className="">
              <label className="text-sm font-medium text-gray-700">
                Address
              </label>
              <textarea
                {...register("address")}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-2 px-3 rounded-md resize-none"
                rows="3"
              ></textarea>
            </div>
          </div>

          {/* button  */}
          <div className="absolute bottom-0">
            <div className="flex gap-x-5">
              <button
                type="submit"
                className="text-[#139238] border border-[#139238] rounded-md px-3 py-1 flex items-center font-medium"
              >
                <span className="mr-2">
                  <FaFileMedical />
                </span>
                Save
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

export default CreateCustomer;