import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaFileMedical, FaRegTrashCan } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useGetAllProductQuery } from "../../../features/api/admin/adminProductApi";
import { RiStore3Line } from "react-icons/ri";
import SearchableDropdown from "../../../Components/DashboardComponent/Common/SearchableDropdown/SearchableDropdown";
import { useAddAdjustmentMutation } from "../../../features/api/seller/stockAdjustmentApi";

const CreateAdjustment = () => {
  const { register, handleSubmit, reset, watch, control, setValue } = useForm();
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");

  const productQuantity = watch("adjustedProductQuantity", 0); // default value of 0
  const productUnitPrice = watch("productUnitPrice", 0); // default value of 0

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

  const [addAdjustment] = useAddAdjustmentMutation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // console.log(products, 'product from crate adjustment')

  const onSubmit = async (data) => {
    const adjustment = {
      ...data,
      productId: data.product.value,
      sellerId: user.id,
    };

    delete adjustment.product;
    setLoading(true);

    console.log("Sending data:", adjustment);

    try {
      const { data: res } = await addAdjustment(adjustment);
      if (res?.status) {
        reset();
        toast.success(res?.message);
        setLoading(false);
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
        <RiStore3Line className="text-lg" />
        <p>Create New Stock Adjustment</p>
      </div>

      <div className="px-5 py-3 mt-3 bg-white ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-4 gap-x-4 gap-y-5">
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
            {/*Product Quantity (To be adjusted) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 whitespace-nowrap">
                Product Quantity{" "}
                <span className="text-[10px]">(To be adjusted)</span>{" "}
                <span className="text-[#FF0027]">*</span>
              </label>
              <input
                type="text"
                {...register("adjustedProductQuantity", { required: true })}
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
                {...register("productUnitPrice", { required: true })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
              />
            </div>

            {/* Product Total Price (To be adjusted) */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product Total Price
                <span className="text-[10px]">(To be adjusted)</span>{" "}
                <span className="text-[#FF0027]">*</span>
              </label>
              <input
                type="text"
                readOnly
                {...register("productTotalPrice", { required: true })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
              />
            </div>

            {/* MRP (Per Unit) */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                MRP (Per Unit) <span className="text-[#FF0027]">*</span>
              </label>
              <input
                type="number"
                {...register("mrpPerUnit", { required: true })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
              />
            </div>
            {/* Transaction Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Transaction Type
              </label>
              <select
                {...register("transactionType", { required: true })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
              >
                <option value="">Select</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            {/* Expiry Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Expiry Date
              </label>
              <input
                type="date"
                {...register("expiryDate", { required: true })}
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
                {...register("eventDate", { required: true })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
              />
            </div>
          </div>

          {/* button  */}
          <div className="absolute bottom-0">
            <div className="flex gap-x-5">
              {/* Save button */}
              <button
                type="submit"
                disabled={loading}
                className={`${
                  loading
                    ? "text-gray-400 border-gray-400 cursor-no-drop"
                    : "text-[#139238] border-[#139238]"
                } border rounded-md px-3 py-1 flex items-center font-medium`}
              >
                <span className="mr-2">
                  <FaFileMedical />
                </span>
                Save{" "}
                {loading && (
                  <span className="ml-2 w-4 h-4 border-2 items-center justify-center border-gray-400 border-b-transparent rounded-full inline-block animate-spin"></span>
                )}
              </button>
              {/* Clear button */}
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

export default CreateAdjustment;
