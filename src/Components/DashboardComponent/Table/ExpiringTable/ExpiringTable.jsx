import React, { useState } from "react";
import { useGetAllExpiringProductQuery } from "../../../../features/api/seller/stockAdjustmentApi";
import Pagination from "../../Common/Pagination/Pagination";
import SearchAndExport from "../../Common/SearchAndExport/SearchAndExport";
import { useSelector } from "react-redux";

const ExpiringTable = () => {
  const { user } = useSelector((state) => state.auth);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading } = useGetAllExpiringProductQuery({
    page: currentPage,
    pageSize: pageSize,
    searchKey: searchQuery,
    sellerId: user?.id,
    showExpired: false,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const { totalPages } = data?.metadata || {};
  // console.log('Expiring Product Data',data)

  return (
    <div className="bg-white px-5">
      {/* Search and Export */}
      <SearchAndExport
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        data={data}
        columns={["productId", "batchNo", "expiryDate", "stockQuantity", "mrp"]}
        title="Expiring Product Report"
      />
      {/* Table and Pagination  */}
      <div>
        {/* Table  */}
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "ID",
                "Batch",
                "Expired Date",
                "Quantity",
                "MRP (Per unit)",
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
          <tbody className="bg-white divide-y divide-gray-200 overflow-x-auto">
            {data?.data?.map((row, index) => (
              <tr key={index}>
                <td className="px-4 py-4 whitespace-nowrap text-xs font-medium text-[#0085FF]">
                  {row.productId}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row?.batchNo}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  <span className="px-5 py-2 text-white bg-[#B60000] border rounded-full">
                    {row?.expiryDate}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row.stockQuantity}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row.mrp} TK
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* pagination  */}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </div>
  );
};

export default ExpiringTable;
