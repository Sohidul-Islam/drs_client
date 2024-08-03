import React from "react";
import { useForm } from "react-hook-form";
import { GoTag } from "react-icons/go";

const CreatePurchaseOverview = () => {
  const { register } = useForm();
  const data = 0;
  return (
    <div className="relative">
      <div className="flex items-center gap-x-[10px]">
        <GoTag className="text-lg" />
        <p>Create New Purchase</p>
      </div>

      <div className="mt-3">
        <form className="">
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
          <div className=" bg-white px-5 py-3 my-4">
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

            {/* Table  */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 whitespace-nowrap">
                <thead className="bg-gray-50">
                  <tr>
                    {[
                      "Name",
                      "Generic Name",
                      "Batch",
                      "Manufactured Date",
                      "Expiry Date",
                      "Quantity (Pieces)",
                      "Trade Price",
                      "VAT",
                      "Total Trade Price (TP+VAT)",
                      "Unit Price",
                      "MRP (Per Unit)",
                      "Action",
                    ].map((heading) => (
                      <th
                        key={heading}
                        scope="col"
                        className="px-4 py-3 text-left text-[13px] font-medium tracking-wider"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.length > 0 ? (
                    data.map((row, index) => (
                      <tr key={index}>
                        <td className="px-4 py-4 whitespace-nowrap text-xs font-medium text-[#0085FF]">
                          {row.id}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-xs">
                          {row.customer_name}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-xs">
                          {row.store_name}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-xs">
                          {row.mobile_number}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-xs">
                          {row.updater}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-xs">
                          {row.date}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-xs">
                          {row.status}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <p className="text-sm text-center py-1">
                      No data available
                    </p>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </form>
      </div>

      {/* add payment  */}
      <div>
        <form>
          <div className=" bg-white px-5 py-3 my-4">
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
            </div>

            {/* Button  */}
            <button className="my-4 px-3 py-2 border text-white bg-[#0085FF]">
              Payment Amount
            </button>

            {/* Table  */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 whitespace-nowrap">
                <thead className="bg-gray-50">
                  <tr>
                    {[
                      "Paid Amount",
                      "Payment Method",
                      "Due Amount",
                      "Updater at",
                      "Action",
                    ].map((heading) => (
                      <th
                        key={heading}
                        scope="col"
                        className="px-4 py-3 text-left text-[13px] font-medium tracking-wider"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.length > 0 ? (
                    data.map((row, index) => (
                      <tr key={index}>
                        <td className="px-4 py-4 whitespace-nowrap text-xs font-medium text-[#0085FF]">
                          {row.id}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-xs">
                          {row.customer_name}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-xs">
                          {row.store_name}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-xs">
                          {row.mobile_number}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-xs">
                          {row.updater}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-xs">
                          {row.date}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-xs">
                          {row.status}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <p className="text-sm text-center py-1">
                      No data available
                    </p>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePurchaseOverview;
