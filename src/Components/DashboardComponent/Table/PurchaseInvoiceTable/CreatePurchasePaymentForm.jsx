import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useGetAllPurchaseProductQuery } from "../../../../features/api/seller/purchaseProductApi";
import { toast } from "react-toastify";
import { useAddPaymentMutation } from "../../../../features/api/seller/paymentApi";

const CreatePurchasePaymentForm = ({refetchProducts}) => {
  const { user } = useSelector((state) => state.auth);
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const { data: purchaseProducts } = useGetAllPurchaseProductQuery({
    page: 1,
    pageSize: 15,
    searchKey: "",
    status: "inactive",
    sellerId: user?.id || 1,
  });

  const [addPayment] = useAddPaymentMutation();

  const purchaseId = purchaseProducts?.data.map((item) => item.id);


  const onSubmit = async (data) => {
    setLoading(true);
    data.type = "purchase";
    data.paidAmount = Number(data.paidAmount)
    data.sellerId = user?.id;
    data.purchaseId = purchaseId && purchaseId

    try {
      const { data: res } = await addPayment(data);
      if (res?.status) {
        reset();
        toast.success(res?.message);
        setLoading(false);
        if (refetchProducts) {
          refetchProducts();
        }
      } else {
        toast.error(res?.message);
        setLoading(false);
        reset();
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
              <option value="card">Card</option>
              <option value="wallet">Wallet</option>
              <option value="cash">Cash</option>
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
              type="number"
              {...register("paidAmount", { required: true })}
              className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
            />
          </div>
        </div>
        {/* Button  */}
        <button
          type="submit"
          disabled={loading}
          className={`${
            loading
              ? "text-gray-400 bg-slate-600 cursor-no-drop"
              : "text-white bg-[#0085FF]"
          } my-4 px-3 py-2 border`}
        > Payment Amount
          {loading && (
            <span className="ml-2 w-4 h-4 border-2 items-center justify-center border-gray-400 border-b-transparent rounded-full inline-block animate-spin"></span>
          )}
        </button>
      </div>
    </form>
  );
};

export default CreatePurchasePaymentForm;
