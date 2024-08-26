import React from "react";
import { useGetAllPurchaseProductQuery } from "../../../../features/api/seller/purchaseProductApi";
import { useSelector } from "react-redux";

const CreatePurchaseProductTable = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: purchaseProducts, isLoading } = useGetAllPurchaseProductQuery({
    page: 1,
    pageSize: 15,
    searchKey: "",
    status: "inactive",
    sellerId: user?.id || 1,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

console.log("purchaseProducts", purchaseProducts)

  return (
    <div className="overflow-x-auto bg-white px-5 py-3">
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
          {purchaseProducts.data.length > 0 ? (
            purchaseProducts.data.map((row, index) => (
              <tr key={index}>
                <td className="px-4 py-4 whitespace-nowrap text-xs font-medium text-[#0085FF]">
                  {row?.id}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row?.genericName}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row?.batchNo}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row?.manufacturedDate}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row?.expiryDate}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row?.quantity}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row?.tradePrice}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row?.VAT}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row?.totalTradePrice}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row?.id} temp
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row?.MRP}
                </td>
              </tr>
            ))
          ) : (
            <p className="text-sm py-1">No data available</p>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CreatePurchaseProductTable;
