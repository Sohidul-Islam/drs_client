import React from "react";
import { useForm } from "react-hook-form";

const CreateSalesPaymentForm = () => {
  const { register } = useForm();
  return (
    <form>
      <div className=" bg-white px-5 py-3 mt-4">
        <p className="mb-4">Add Payment:</p>
        <div className="grid grid-cols-4 gap-x-4 gap-y-5">
          {/*Payment method */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Payment method
            </label>
            <select
              {...register("paymentMethod", { required: true })}
              className="mt-1 block w-full border outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
            >
              <option value="">Select</option>
              <option value="in">Bkash</option>
              <option value="out">Rocket</option>
            </select>
          </div>
          {/* Note */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Note
            </label>
            <input
              type="text"
              {...register("note", { required: true })}
              className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
            />
          </div>
          {/* Paid Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Paid Amount <span className="text-[#FF0027]">*</span>
            </label>
            <input
              type="text"
              {...register("paidAmount", { required: true })}
              className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
            />
          </div>
          {/*Status (Confirm & Approve order) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status <span className="text-xs">(Confirm & Approve order)</span>
            </label>
            <select
              {...register("status", { required: true })}
              className="mt-1 block w-full border outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
            >
              <option value="">Select</option>
              <option value="in">Approve</option>
              <option value="out">Reject</option>
            </select>
          </div>
        </div>
        {/* Button  */}
        <button className="mt-4 px-3 py-2 border text-white bg-[#0085FF]">
          Payment Amount
        </button>
      </div>
    </form>
  );
};

export default CreateSalesPaymentForm;
