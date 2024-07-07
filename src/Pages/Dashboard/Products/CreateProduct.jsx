import React from "react";
import { useForm } from "react-hook-form";
import { FaFileMedical, FaRegTrashCan } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AiFillProduct } from "react-icons/ai";
import { useAddProductMutation } from "../../../features/api/admin/adminProductApi";
import { useGetSingleProductCategoryQuery } from "../../../features/api/admin/adminProductCategoryApi";
import { useGetSingleManufacturerQuery } from "../../../features/api/admin/adminManufactureApi";

const CreateProduct = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useSelector((state) => state.auth);
  // console.log('user from category', user);

  const { data: manufacturerId } = useGetSingleProductCategoryQuery({ sellerId: user?.id })
  const { data: categoryId } = useGetSingleManufacturerQuery({ sellerId: user?.id })

  // console.log('product category id: ', categoryId)
  // console.log('manufacturerId: ', manufacturerId)
  
  const [addProduct] = useAddProductMutation();

  const onSubmit = async (data) => {
    // console.log(data)
    data.manufacturerId = manufacturerId;
    data.categoryId = categoryId
    // const products = {
    //   productName: data?.productName,
    //   strength:data?.strength,
    //   genericName: data?.genericName,
    //   categoryId,
    //   manufacturerId,
    //   dosageForm: data?.dosageForm,
    //   unit: data?.unit,
    //   packBoxSize: data?.boxSize,
    //   tradePrice: data?.tradePrice,
    //   vat: data?.vat,
    //   totalPrice: data?.totalPrice,
    //   sellerId: user?.id,
    //   status: data?.status,
    // };
    // console.log('products' ,data)
    try {
      const { data: res } = await addProduct(data);
      console.log(res, 'res')
      if (res?.status) {
        reset();
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
        reset();
      }
    } catch (error) {
      console.log(error);
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
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category <span className="text-[#FF0027]">*</span>
              </label>
              <select
                {...register("category", { required: true })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
              >
                <option value="">Select</option>
                <option value="active">A</option>
                <option value="inactive">B</option>
              </select>
            </div>

            {/* Manufacturer */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Manufacturer <span className="text-[#FF0027]">*</span>
              </label>
              <select
                {...register("Manufacturer", { required: true })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
              >
                <option value="">Select</option>
                <option value="active">Manufacturer-1</option>
                <option value="inactive">Manufacturer-2</option>
              </select>
            </div>
            {/* Dosage Form */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Dosage Form
              </label>
              <select
                {...register("dosageForm", { required: true })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
              >
                <option value="">Select</option>
                <option value="active">Dosage Form-1</option>
                <option value="inactive">Dosage Form-2</option>
              </select>
            </div>
            {/* Unit */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Unit
              </label>
              <select
                {...register("unit", { required: true })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
              >
                <option value="">Select</option>
                <option value="active">MG</option>
                <option value="inactive">MP</option>
              </select>
            </div>
            {/* Pack/Box Size */}
            <div>
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
            </div>
            {/* Trade Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Trade Price <span className="text-[#FF0027]">*</span>
              </label>
              <input
                type="number"
                {...register("tradePrice", { required: true })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
              />
            </div>

            {/* Vat (%) */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Vat (%)
              </label>
              <input
                type="number"
                {...register("vat", { required: true })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
              />
            </div>

            {/* Total Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Total Price <span className="text-[#FF0027]">*</span>
              </label>
              <input
                type="number"
                {...register("totalPrice", { required: true })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
              />
            </div>
            {/* Store */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Store
              </label>
              <select
                {...register("store", { required: true })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
              >
                <option value="">Select</option>
                <option value="laz-pharma">Laz Pharma</option>
                <option value="saba-pharma">Saba Pharma</option>
              </select>
            </div>
            {/* Active Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Active Status
              </label>
              <select
                {...register("status", { required: true })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
              >
                <option value="">Select</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
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

export default CreateProduct;
