import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { GoCpu } from "react-icons/go";
import { FaFileMedical, FaRegTrashCan } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useAddManufacturerMutation } from "../../../features/api/admin/adminManufactureApi";
import { toast } from "react-toastify";

const CreateManufacturer = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  // console.log('user from manufacturer', user);

  const [addManufacturer] = useAddManufacturerMutation();

  const onSubmit = async (data) => {
    setLoading(true);
    const manufacture = {
      name: data?.name,
      status: "active",
      sellerId: user?.id,
      contactPerson: data?.contactPerson,
      phoneNumber: data?.phone,
    };

    try {
      const { data } = await addManufacturer(manufacture);
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
                placeholder="Manufacturer name"
                className={`${
                  errors?.name && "border-[#FF0027]"
                } mt-1 block w-full border outline-none text-gray-700 py-[6px] px-3 rounded-md`}
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
                placeholder="Person name"
                className={`${
                  errors?.contactPerson && "border-[#FF0027]"
                } mt-1 block w-full border outline-none text-gray-700 py-[6px] px-3 rounded-md`}
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
                placeholder="Phone number"
                className={`${
                  errors?.phone && "border-[#FF0027]"
                } mt-1 block w-full border outline-none text-gray-700 py-[6px] px-3 rounded-md`}
              />
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

export default CreateManufacturer;
