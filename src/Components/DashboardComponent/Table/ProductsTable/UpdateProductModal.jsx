import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FaFileMedical } from "react-icons/fa6";
import { AiFillProduct } from "react-icons/ai";
import { useGetAllManufactureQuery } from "../../../../features/api/admin/adminManufactureApi";
import { useGetAllProductCategoryQuery } from "../../../../features/api/admin/adminProductCategoryApi";
import { useUpdateProductMutation } from "../../../../features/api/admin/adminProductApi";
import SearchableDropdown from "../../../DashboardComponent/Common/SearchableDropdown/SearchableDropdown";
import { useSelector } from "react-redux";

const UpdateProductModal = ({ isOpen, onClose, productData }) => {
  const { register, handleSubmit, control, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");
  const { user } = useSelector((state) => state.auth);

  const { data: manufactures } = useGetAllManufactureQuery({
    page: 1,
    pageSize: 15,
    searchKey: searchInputValue,
  });

  const { data: categories } = useGetAllProductCategoryQuery({
    page: 1,
    pageSize: 15,
    searchKey: searchInputValue,
  });

  const [updateProduct] = useUpdateProductMutation();

  useEffect(() => {
    if (productData) {
      setValue("productName", productData.productName);
      setValue("strength", productData.strength);
      setValue("genericName", productData.genericName);
      setValue("categoryId", {
        value: productData.category.id,
        label: productData.category.name,
      });
      setValue("manufacturerId", {
        value: productData.menufacturer?.id,
        label: productData.menufacturer?.name,
      });
      setValue("dosageForm", productData.dosageForm);
      setValue("packBoxSize", productData.packBoxSize);
    }
  }, [productData, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    data.id = productData.id;
    data.manufacturerId = data.manufacturerId.value;
    data.categoryId = data.categoryId.value;
    data.sellerId = user.id;
    data.status = "active";
    // console.log("Updated product data: ",data)
    try {
      const { data: res } = await updateProduct(data);
      if (res?.status) {
        toast.success(res?.message);
        onClose(); // Close modal on success
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className={`${isOpen ? "animate-slide-in" : "animate-slide-out"} relative top-14 mx-auto p-5 border w-[80%] h-[70%] shadow-lg rounded-md bg-white`}>
        <div className="flex items-center gap-x-[10px] mb-5">
          <AiFillProduct className="text-lg" />
          <p>Update Product</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-4 gap-x-4 gap-y-5">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product Name <span className="text-[#FF0027]">*</span>
              </label>
              <input
                type="text"
                {...register("productName", { required: true })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
              />
            </div>

            {/* Strength */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Strength <span className="text-[#FF0027]">*</span>
              </label>
              <input
                type="text"
                {...register("strength", { required: true })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
              />
            </div>

            {/* Generic Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Generic Name <span className="text-[#FF0027]">*</span>
              </label>
              <input
                type="text"
                {...register("genericName", { required: true })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
              />
            </div>

            {/* Category */}
            <SearchableDropdown
              labelText="Category"
              name="categoryId"
              control={control}
              data={categories}
              placeholder="search a category"
              required="true"
              propertyValue="id"
              propertyName="category_name"
              setSearchInputValue={setSearchInputValue}
            />

            {/* Manufacturer */}
            <SearchableDropdown
              labelText="Manufacturer"
              name="manufacturerId"
              control={control}
              data={manufactures}
              placeholder="search a manufacturer"
              required="true"
              propertyValue="id"
              propertyName="manufacture_name"
              setSearchInputValue={setSearchInputValue}
            />

            {/* Dosage Form */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Dosage Form <span className="text-[#FF0027]">*</span>
              </label>
              <input
                type="text"
                {...register("dosageForm", { required: true })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
              />
            </div>

            {/* Pack/Box Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Pack/Box Size
              </label>
              <input
                type="number"
                {...register("packBoxSize", { required: true })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-5 flex justify-end gap-x-5">
            <button
              onClick={onClose}
              className="text-gray-500 border border-gray-500 rounded-md px-3 py-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`${
                loading
                  ? "text-gray-400 border-gray-400 cursor-not-allowed"
                  : "text-[#139238] border-[#139238]"
              } border rounded-md px-3 py-1 flex items-center font-medium`}
            >
              <span className="mr-2">
                <FaFileMedical />
              </span>
              Update{" "}
              {loading && (
                <span className="ml-2 w-4 h-4 border-2 border-gray-400 border-b-transparent rounded-full inline-block animate-spin"></span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProductModal;
