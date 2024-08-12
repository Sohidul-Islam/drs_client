import React from "react";
import { useForm } from "react-hook-form";

const CreateSalesProductForm = () => {
  const { register } = useForm();
  return (
    <form>
      <div className="grid grid-cols-4 gap-x-4 gap-y-5 bg-white px-5 py-3">
        {/* Customer */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Customer
          </label>
          <select
            {...register("manufacturer", { required: true })}
            className="mt-1 block w-full border outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
          >
            <option value="">Select</option>
            <option value="in">Customer-A</option>
            <option value="out">Customer-B</option>
          </select>
        </div>
        {/* Doctor Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Doctor Name
          </label>
          <input
            type="text"
            {...register("doctorName", { required: true })}
            className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
          />
        </div>
        {/*BMDC Registration No. */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            BMDC Registration No.
          </label>
          <input
            type="text"
            {...register("regNo", { required: true })}
            className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
          />
        </div>
        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date <span className="text-[#FF0027]">*</span>
          </label>
          <input
            type="date"
            {...register("date", { required: true })}
            className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
          />
        </div>
      </div>

      {/* Product Information */}
      <div className=" bg-white px-5 py-3 mt-4">
        <p className="mb-4">Product Information:</p>
        <div className="grid grid-cols-4 gap-x-4 gap-y-5">
          {/*Product */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product
            </label>
            <select
              {...register("product", { required: true })}
              className="mt-1 block w-full border outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
            >
              <option value="">Select</option>
              <option value="in">Napa</option>
              <option value="out">Tufnil </option>
            </select>
          </div>
          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
            Quantity <span className="text-[#FF0027]">*</span>
            </label>
            <input
              type="number"
              {...register("quantity", { required: true })}
              className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
            />
          </div>
          {/* Unit Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Unit Price <span className="text-[#FF0027]">*</span>
            </label>
            <input
              type="number"
              {...register("unitPrice", { required: true })}
              className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
            />
          </div>
          {/* Discount (%) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
            Discount (%)
            </label>
            <input
              type="number"
              {...register("discount", { required: true })}
              className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
            />
          </div>
        </div>

        {/* Button  */}
        <button className="my-4 px-3 py-2 border text-white bg-[#0085FF]">
          Add Product
        </button>
      </div>
    </form>
  );
};

export default CreateSalesProductForm;
