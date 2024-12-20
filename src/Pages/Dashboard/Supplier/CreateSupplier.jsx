import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaFileMedical, FaRegTrashCan } from "react-icons/fa6";
import { GoCpu } from "react-icons/go";
import { useSelector } from "react-redux";
import { useAddSupplierMutation } from "../../../features/api/admin/adminSupplierApi";
import { toast } from "react-toastify";

const CreateSupplier = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [addSupplier] = useAddSupplierMutation();

  const onSubmit = async (data) => {
    setLoading(true);
    const supplierData = {
      name: data.name,
      contactPerson: data.contactPerson,
      phone: data.phone,
      sellerId: user?.id,
      status: "active",
    };
    try {
      const { data } = await addSupplier(supplierData);
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
      setLoading(false);
      toast.error(error?.message);
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
            {/* Supplier Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Supplier Name <span className="text-[#FF0027]">*</span>
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="Supplier name"
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
                type="tel"
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

export default CreateSupplier;
