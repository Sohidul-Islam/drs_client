import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaFileMedical } from "react-icons/fa6";
import { GiDiscussion } from "react-icons/gi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useUpdateProductCategoryMutation } from "../../../../features/api/admin/adminProductCategoryApi";

const ProductCategoryModal = ({ isOpen, onClose, categoryData }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { user } = useSelector((state) => state.auth);

  const [updateProductCategory] = useUpdateProductCategoryMutation();

  useEffect(() => {
    if (categoryData) {
      setValue("name", categoryData.category_name);
    }
  }, [categoryData, setValue]);

  const onSubmit = async (data) => {
    const category = {
      name: data?.name,
      sellerId: user?.id,
      status: "active",
    };

    try {
      // Update customer logic
      const response = await updateProductCategory({
        id: categoryData.id,
        ...category,
      });
      if (response?.data?.status) {
        toast.success(response?.data?.message);
        onClose();
      } else {
        toast.error(response?.data?.message);
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
            <p>Update Product Category</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Category Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Category Name <span className="text-[#FF0027]">*</span>
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
                  Update Category
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

export default ProductCategoryModal;
