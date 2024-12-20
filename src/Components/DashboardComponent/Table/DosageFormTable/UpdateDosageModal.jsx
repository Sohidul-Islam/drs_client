import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaFileMedical } from "react-icons/fa6";
import { AiOutlineDatabase } from "react-icons/ai";
import { toast } from "react-toastify";
import { useUpdateDosageFormMutation } from "../../../../features/api/admin/adminDosageFormApi";

const UpdateDosageModal = ({ isOpen, onClose, dosageData }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [updateDosageForm] = useUpdateDosageFormMutation();

  useEffect(() => {
    if (dosageData) {
      setValue("name", dosageData.dosageName);
    }
  }, [dosageData, setValue]);

  const onSubmit = async (data) => {
    data.id = dosageData.id;
  
    try {
      const response = await updateDosageForm(data);
      if (response?.data?.status) {
        toast.success(response?.data?.message);
        onClose();
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="relative h-screen z-10">
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
          <div className="flex items-center gap-x-[10px] mb-5">
            <AiOutlineDatabase className="text-lg" />
            <p>Update Dosage Form</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Category Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Dosage Form <span className="text-[#FF0027]">*</span>
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                className={`${
                  errors?.name && "border-[#FF0027]"
                } mt-1 block w-full border outline-none text-gray-700 py-[6px] px-3 rounded-md`}
              />
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
                  Update Dosage
                </button>
                <button
                  onClick={onClose}
                  type="button"
                  className="hover:bg-[#139238] hover:text-white border border-[#139238] rounded-md px-3 py-1"
                >
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

export default UpdateDosageModal;
