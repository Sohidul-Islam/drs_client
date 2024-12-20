import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaFileMedical, FaRegTrashCan } from "react-icons/fa6";
import { toast } from "react-toastify";
import { AiFillProduct } from "react-icons/ai";
import { useAddProductMutation } from "../../../features/api/admin/adminProductApi";
import { useGetAllProductCategoryQuery } from "../../../features/api/admin/adminProductCategoryApi";
import { useGetAllManufactureQuery } from "../../../features/api/admin/adminManufactureApi";
import SearchableDropdown from "../../../Components/DashboardComponent/Common/SearchableDropdown/SearchableDropdown";
import { useGetAllDosageFormQuery } from "../../../features/api/admin/adminDosageFormApi";

const CreateProduct = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");

  const { data: manufactures, isLoading } = useGetAllManufactureQuery({
    page: 1,
    pageSize: 15,
    searchKey: searchInputValue,
  });

  const { data: categories } = useGetAllProductCategoryQuery({
    page: 1,
    pageSize: 15,
    searchKey: searchInputValue,
  });

  const { data: dosageData } = useGetAllDosageFormQuery({
    page: 1,
    pageSize: 15,
    searchKey: searchInputValue,
  });

  const [addProduct] = useAddProductMutation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const onSubmit = async (data) => {
    setLoading(true);
    data.manufacturerId = data.manufacturerId.value;
    data.categoryId = data.categoryId.value;
    data.dosageId = data.dosageForm.value;
    console.log("first", data)
    try {
      const { data: res } = await addProduct(data);
      if (res?.status) {
        reset();
        toast.success(res?.message);
        setLoading(false);
      } else {
        toast.error(res?.message);
        setLoading(false);
        reset();
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error?.message);
    }
  };

  return (
    <div className="relative h-screen">
      <div className="flex items-center gap-x-[10px]">
        <AiFillProduct className="text-lg" />
        <p>Create New Product</p>
      </div>

      <div className="px-5 py-3 mt-3 bg-white ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-4 gap-x-4 gap-y-5">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product Name <span className="text-[10px]">(e,g; Napa)</span>{" "}
                <span className="text-[#FF0027]">*</span>
              </label>
              <input
                type="text"
                {...register("productName", { required: true })}
                placeholder="Product name"
                className={`${
                  errors?.productName && "border-[#FF0027]"
                } mt-1 block w-full border outline-none text-gray-700 py-[6px] px-3 rounded-md`}
              />
            </div>

            {/* Strength */}
            {/* <div>
              <label className="block text-sm font-medium text-gray-700">
                Strength <span className="text-[#FF0027]">*</span>
              </label>
              <select
                {...register("strength", { required: true })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
              >
                <option value="">Select</option>
                <option value="mg">mg</option>
                <option value="mp">mp</option>
              </select>
            </div> */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Strength <span className="text-[#FF0027]">*</span>
              </label>
              <input
                type="text"
                {...register("strength", { required: true })}
                placeholder="strength"
                className={`${
                  errors?.strength && "border-[#FF0027]"
                } mt-1 block w-full border outline-none text-gray-700 py-[6px] px-3 rounded-md`}
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
                placeholder="Generic name"
                className={`${
                  errors?.genericName && "border-[#FF0027]"
                } mt-1 block w-full border outline-none text-gray-700 py-[6px] px-3 rounded-md`}
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
              errors={errors.categoryId}
            />

            {/* Manufacturer */}
            <SearchableDropdown
              labelText="Manufacturer"
              name="manufacturerId"
              control={control}
              data={manufactures}
              placeholder="search a manufacture"
              required="true"
              propertyValue="id"
              propertyName="manufacture_name"
              setSearchInputValue={setSearchInputValue}
              errors={errors.manufacturerId}
            />
            {/* Dosage Form */}
            <SearchableDropdown
              labelText="Dosage Form"
              name="dosageForm"
              control={control}
              data={dosageData}
              placeholder="search dosage form"
              required="true"
              propertyValue="id"
              propertyName="dosageName"
              setSearchInputValue={setSearchInputValue}
              errors={errors.dosageForm}
            />
            {/* <div>
              <label className="block text-sm font-medium text-gray-700">
                Dosage Form <span className="text-[#FF0027]">*</span>
              </label>
              <input
                type="text"
                {...register("dosageForm", { required: true })}
                placeholder="Dosage form"
                className={`${
                  errors?.dosageForm && "border-[#FF0027]"
                } mt-1 block w-full border outline-none text-gray-700 py-[6px] px-3 rounded-md`}
              />
            </div> */}

            {/* Pack/Box Size */}
            {/* <div>
              <label className="block text-sm font-medium text-gray-700">
                Pack/Box Size
              </label>
              <select
                {...register("packBoxSize", { required: true })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
              >
                <option value="">Select</option>
                <option value="5">5</option>
                <option value="10">10</option>
              </select>
            </div> */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Pack/Box Size
              </label>
              <input
                type="number"
                {...register("packBoxSize")}
                placeholder="Box size"
                className="mt-1 block w-full border outline-none text-gray-700 py-[6px] px-3 rounded-md"
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

export default CreateProduct;
