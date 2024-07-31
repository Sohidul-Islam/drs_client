import React, { useState } from "react";
import { useGetAllAdjustmentQuery } from "../../../../features/api/seller/stockAdjustmentApi";
import { IoEyeOutline } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";

const StockAdjustmentTable = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading } = useGetAllAdjustmentQuery({
    page: 1,
    pageSize: 15,
    searchKey: "",
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log("adjustment data", data);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="bg-white px-5">
      {/* search field  */}
      <div className="py-5">
        <label className="text-sm mr-2">Search:</label>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          className="border outline-gray-300 text-gray-700 py-[5px] px-2"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "ID",
                "Product Name",
                "Batch",
                "Type",
                "Event",
                "Transaction",
                "Quantity",
                "Unit Price (Taka)",
                "Total Price (Taka)",
                "Updater On",
                "Action",
              ].map((heading) => (
                <th
                  key={heading}
                  scope="col"
                  className="px-4 py-3 text-left text-[13px] font-medium tracking-wider whitespace-nowrap"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          {data?.length > 0 ? (
            <tbody className="bg-white divide-y divide-gray-200">
              {data?.map((row, index) => (
                <tr key={index}>
                  <td className="px-4 py-4 whitespace-nowrap text-xs font-medium text-[#0085FF]">
                    {row.id}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row.productName}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row.batchNo}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row.adjustmentType}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row.eventType}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row.transactionType}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row.quantity}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row.unitPrice}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row.productTotalPrice}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row.updater}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs flex gap-3">
                    <button className="bg-[#27BD02] w-5 h-5 px-1 py-[6px] text-white flex justify-center items-center rounded-sm">
                      <IoEyeOutline size={12} />
                    </button>
                    <button className="bg-[#CE1124] w-5 h-5 px-1 py-[6px] text-white flex justify-center items-center rounded-sm">
                      <RiDeleteBinLine />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <p className="text-center py-1 whitespace-nowrap">
              No data available
            </p>
          )}
        </table>
      </div>
    </div>
  );
};

export default StockAdjustmentTable;
