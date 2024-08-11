import React from 'react';
import { useForm } from 'react-hook-form';

const CreatePurchaseProductForm = () => {
  const { register } = useForm();
  return (
    <form>
          <div className="grid grid-cols-4 gap-x-4 gap-y-5 bg-white px-5 py-3">
            {/* Manufacturer */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Manufacturer
              </label>
              <select
                {...register("manufacturer", { required: true })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
              >
                <option value="">Select</option>
                <option value="in">In</option>
                <option value="out">Out</option>
              </select>
            </div>
            {/* Supplier */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Supplier
              </label>
              <select
                {...register("supplier", { required: true })}
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
            {/* Invoice Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Invoice Date
              </label>
              <input
                type="date"
                {...register("invoicedAt", { required: true })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
              />
            </div>
            {/* <SearchableDropdown
              labelText="Product"
              name="product"
              control={control}
              data={products}
              placeholder="search a product..."
              required="false"
              propertyValue="id"
              propertyName="productName"
            /> */}
            {/* Invoice Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Invoice Number
              </label>
              <input
                type="number"
                {...register("invoiceNumber", { required: true })}
                className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
              />
            </div>
          </div>
          {/* Product Information */}
          <div className=" bg-white px-5 py-3 mt-4">
            <p className="mb-4">Product Information:</p>
            <div className="grid grid-cols-4 gap-x-4 gap-y-5">
              {/*Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Name <span className="text-[#FF0027]">*</span>
                </label>
                <select
                  {...register("productName", { required: true })}
                  className="mt-1 block w-full border outline-gray-300 text-gray-700 py-2 px-3 rounded-md"
                >
                  <option value="">Select</option>
                  <option value="in">In</option>
                  <option value="out">Out</option>
                </select>
              </div>
              {/* Manufactured Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Manufactured Date <span className="text-[#FF0027]">*</span>
                </label>
                <input
                  type="date"
                  {...register("manufacturedAt", { required: true })}
                  className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
                />
              </div>
              {/* Expiry Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Expiry Date <span className="text-[#FF0027]">*</span>
                </label>
                <input
                  type="date"
                  {...register("expiredAt", { required: true })}
                  className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
                />
              </div>
              {/* Batch/LOT No */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Batch/LOT No.
                </label>
                <input
                  type="text"
                  {...register("batchNo", { required: true })}
                  className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
                />
              </div>
              {/* Quantity (Pieces) */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Quantity (Pieces) <span className="text-[#FF0027]">*</span>
                </label>
                <input
                  type="number"
                  {...register("quantity", { required: true })}
                  className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
                />
              </div>
              {/* Unit */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Unit <span className="text-[#FF0027]">*</span>
                </label>
                <input
                  type="number"
                  {...register("unit", { required: true })}
                  className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
                />
              </div>
              {/* Trade Price*/}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Trade Price <span className="text-[#FF0027]">*</span>
                </label>
                <input
                  type="text"
                  {...register("tradePrice", { required: true })}
                  className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
                />
              </div>
              {/* VAT*/}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  VAT <span className="text-[#FF0027]">*</span>
                </label>
                <input
                  type="text"
                  {...register("vat", { required: true })}
                  className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
                />
              </div>
              {/* Total Trade Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Total Trade Price <span className="text-[#FF0027]">*</span>
                </label>
                <input
                  type="text"
                  {...register("totalTradePrice", { required: true })}
                  className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
                />
              </div>
              {/* MRP (Per unit) */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  MRP (Per unit) <span className="text-[#FF0027]">*</span>
                </label>
                <input
                  type="text"
                  {...register("mpr", { required: true })}
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

export default CreatePurchaseProductForm;