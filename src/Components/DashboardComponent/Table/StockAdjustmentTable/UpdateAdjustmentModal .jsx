import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaFileMedical } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RiStore3Line } from "react-icons/ri";
import { useUpdateAdjustmentMutation } from "../../../../features/api/seller/stockAdjustmentApi";
import { useGetAllProductQuery } from "../../../../features/api/admin/adminProductApi";
import SearchableDropdown from "../../Common/SearchableDropdown/SearchableDropdown";

const UpdateAdjustmentModal = ({ isOpen, onClose, adjustmentData }) => {
  const { register, handleSubmit, reset, watch, control, setValue } = useForm();
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = React.useState(false);
  const [searchInputValue, setSearchInputValue] = React.useState("");

  const productQuantity = watch("adjustedProductQuantity", 0);
  const productUnitPrice = watch("mrpPerUnit", 0);

  // console.log(adjustmentData, 'adjustmentData')

  useEffect(() => {
    if (adjustmentData) {
      reset({
        adjustmentType: adjustmentData.adjustmentType,
        eventType: adjustmentData.eventType,
        product: {
          value: adjustmentData.product.id,
          label: adjustmentData.productName,
        },
        batchNo: adjustmentData.batchNo,
        adjustedProductQuantity: adjustmentData.quantity,
        productUnitPrice: adjustmentData.mrpPerUnit,
        productTotalPrice: adjustmentData.quantity * adjustmentData.unitPrice,
        mrpPerUnit: adjustmentData.mrpPerUnit,
        transactionType: adjustmentData.transactionType,
        expiryDate: adjustmentData.expiryDate
          ? adjustmentData.expiryDate.split("T")[0]
          : "",
        eventDate: adjustmentData.eventDate
          ? adjustmentData.eventDate.split("T")[0]
          : "",
      });
    }
  }, [adjustmentData, reset]);

  useEffect(() => {
    const quantity = parseFloat(productQuantity) || 0;
    const unitPrice = parseFloat(productUnitPrice) || 0;
    const total = quantity * unitPrice;
    setValue("productTotalPrice", total.toFixed(2));
  }, [productQuantity, productUnitPrice, setValue]);

  const { data: products, isLoading } = useGetAllProductQuery({
    page: 1,
    pageSize: 15,
    searchKey: searchInputValue,
  });

  const [updateAdjustment] = useUpdateAdjustmentMutation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const onSubmit = async (data) => {
    const adjustment = {
      ...data,
      productId: data.product.value,
      sellerId: user.id,
      id: adjustmentData.id,
    };

    delete adjustment.product;
    setLoading(true);

    // console.log("data",data)
    // console.log("adjustment",adjustment)

    try {
      const res = await updateAdjustment(adjustment).unwrap();
      if (res.status) {
        toast.success(res.message || "updated successfully");
        onClose();
      } else {
        toast.error(res.message || "Failed to update");
      }
    } catch (error) {
      console.error("Failed to update adjustment:", error);
      toast.error("An error occurred while updating.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex">
      <div className="relative p-8 bg-white w-full">
        <div className="flex items-center gap-x-[10px] mb-4">
          <RiStore3Line className="text-lg" />
          <p>Update Stock Adjustment</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-4 gap-4">
            {/* Stock Adjustment Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Stock Adjustment Type <span className="text-[#FF0027]">*</span>
              </label>
              <select
                {...register("adjustmentType", { required: true })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
              >
                <option value="">Select</option>
                <option value="in">In</option>
                <option value="out">Out</option>
              </select>
            </div>

            {/* Stock Adjustment Event */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Stock Adjustment Event <span className="text-[#FF0027]">*</span>
              </label>
              <select
                {...register("eventType", { required: true })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
              >
                <option value="">Select</option>
                <option value="Purchase">Purchase</option>
                <option value="Sale Returned">Sale Returned</option>
                <option value="Sale Order">Sale Order</option>
                <option value="Purchase Returned">Purchase Returned</option>
                <option value="Damage">Damage</option>
                <option value="Correction">Correction</option>
                <option value="Opening">Opening</option>
              </select>
            </div>

            {/* Product - searchable dropdown */}
            <SearchableDropdown
              labelText="Product"
              name="product"
              control={control}
              data={products}
              placeholder="search a product..."
              required="false"
              propertyValue="id"
              propertyName="productName"
              setSearchInputValue={setSearchInputValue}
            />

            {/* Batch No */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Batch No <span className="text-[#FF0027]">*</span>
              </label>
              <input
                type="text"
                {...register("batchNo", { required: true })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
              />
            </div>

            {/* Product Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product Quantity <span className="text-[#FF0027]">*</span>
              </label>
              <input
                type="number"
                {...register("adjustedProductQuantity", {
                  required: true,
                  min: 0,
                })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
              />
            </div>

            {/* Product Unit Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product Unit Price <span className="text-[#FF0027]">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                {...register("mrpPerUnit", { required: true, min: 0 })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
              />
            </div>

            {/* Product Total Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product Total Price <span className="text-[#FF0027]">*</span>
              </label>
              <input
                type="text"
                readOnly
                {...register("productTotalPrice", { required: true })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md bg-gray-100"
              />
            </div>

            {/* MRP (Per Unit) */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                MRP (Per Unit) <span className="text-[#FF0027]">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                {...register("mrpPerUnit", { required: true, min: 0 })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
              />
            </div>

            {/* Transaction Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Transaction Type
              </label>
              <select
                {...register("transactionType", { required: false })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
              >
                <option value="">Select</option>
                <option value="expense">Expense</option>
                <option value="income">Income</option>
                {/* Add more options as needed */}
              </select>
            </div>

            {/* Expiry Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Expiry Date
              </label>
              <input
                type="date"
                {...register("expiryDate")}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
              />
            </div>

            {/* Event Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Event Date
              </label>
              <input
                type="date"
                {...register("eventDate")}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`${
                loading
                  ? "text-gray-400 border-gray-400 cursor-no-drop"
                  : "text-[#139238] border-[#139238]"
              } border rounded-md px-3 py-2 flex items-center font-medium`}
            >
              <span className="mr-2">
                <FaFileMedical />
              </span>
              Update
              {loading && (
                <span className="ml-2 w-4 h-4 border-2 items-center justify-center border-gray-400 border-b-transparent rounded-full inline-block animate-spin"></span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateAdjustmentModal;
