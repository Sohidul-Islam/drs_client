import React from "react";
import { useForm } from "react-hook-form";
import { FaFileMedical, FaRegTrashCan } from "react-icons/fa6";
import { GoCpu } from "react-icons/go";
import { useSelector } from "react-redux";
import { useAddSupplierMutation } from "../../../features/api/admin/adminSupplierApi";
import { toast } from "react-toastify";

const CreateSupplier = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useSelector((state) => state.auth);
  
  const [addSupplier] = useAddSupplierMutation();

  const onSubmit = async (data) => {
    const supplierData = {
      name: data.name,
      status: data.status,
      sellerId: user?.id,
    };
    // console.log("supplier data:", supplierData);
    // console.log(user,"user")
    try {
      const { data } = await addSupplier(supplierData);
      if (data?.status) {
        reset();
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
        reset();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="relative h-screen">
      <div className="flex items-center gap-x-[10px]">
        <GoCpu className="text-lg" />
        <p>Create New Supplier</p>
      </div>

      <div className="px-5 py-3 mt-3 bg-white ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-3 gap-x-12">
            {/* Manufacturer Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Supplier Name
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Active Status
              </label>
              <select
                {...register("status", { required: true })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
              >
                <option value="">Select</option>
                <option value="active">Yes</option>
                <option value="inactive">No</option>
              </select>
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

export default CreateSupplier;
