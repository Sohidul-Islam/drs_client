import React from "react";
import { useForm } from "react-hook-form";
import { GoCpu } from "react-icons/go";
import { FaFileMedical, FaRegTrashCan } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useAddManufacturerMutation } from "../../../features/api/admin/adminManufactureApi";
import { toast } from "react-toastify";

const CreateManufacturer = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useSelector((state) => state.auth);
  // console.log('user from manufacturer', user);

  const [addManufacturer] = useAddManufacturerMutation();

  const onSubmit = async (data) => {
    const manufacture = {
      name: data?.name,
      status: "active",
      sellerId: user?.id,
      contactPerson: data?.contactPerson,
      phoneNumber: data?.phone,
    };
    // console.log('Manufacture' ,manufacture)
    try {
      const { data } = await addManufacturer(manufacture);
      if (data?.status) {
        reset();
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
        reset();
      }

      // console.log("response", data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative h-screen">
      <div className="flex items-center gap-x-[10px]">
        <GoCpu className="text-lg" />
        <p>Create New Manufacturer</p>
      </div>

      <div className="px-5 py-3 mt-3 bg-white ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-3 gap-x-12">
            {/* Manufacturer Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Manufacturer Name <span className="text-[#FF0027]">*</span>
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
              />
            </div>

            {/* Contact Person Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contact Person Name <span className="text-[#FF0027]">*</span>
              </label>
              <input
                type="text"
                {...register("contactPerson", { required: true })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
              />
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mobile Number <span className="text-[#FF0027]">*</span>
              </label>
              <input
                type="text"
                {...register("phone", { required: true })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
              />
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

export default CreateManufacturer;
