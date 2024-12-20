import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { GoCpu } from "react-icons/go";
import { FaFileMedical, FaRegTrashCan } from "react-icons/fa6";
import { toast } from "react-toastify";
import { useAddDosageFormMutation } from "../../../features/api/admin/adminDosageFormApi";

const CreateDosageForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const [addDosageForm] = useAddDosageFormMutation();

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const { data: res } = await addDosageForm(data);
      if (res?.status) {
        reset();
        toast.success(res?.message);
        setLoading(false);
      } else {
        toast.error(res?.message);
        reset();
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error?.message);
    }
  };

  return (
    <div className="relative h-screen">
      <div className="flex items-center gap-x-[10px]">
        <GoCpu className="text-lg" />
        <p>Create Dosage Form</p>
      </div>

      <div className="px-5 py-3 mt-3 bg-white ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-3 gap-x-12">
            {/* Category Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Dosage Form <span className="text-[#FF0027]">*</span>
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="Dosage form"
                className={`${
                  errors?.name && "border-[#FF0027]"
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

export default CreateDosageForm;
