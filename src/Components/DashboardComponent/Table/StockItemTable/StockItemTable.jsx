import React, { useState } from "react";
import {useGetAllStockItemQuery,} from "../../../../features/api/seller/stockAdjustmentApi";
import Pagination from "../../Common/Pagination/Pagination";
import SearchAndExport from "../../Common/SearchAndExport/SearchAndExport";

const StockItemTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading } = useGetAllStockItemQuery({
    page: currentPage,
    pageSize: pageSize,
    searchKey: searchQuery,
    // name: "Sample Manufacturer",
    // sellerId: 1,
    // status: "active",
    // updatedBy: 1
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const { totalPages } = data?.metadata || {};
  // console.log('stock data',data)


  return (
    <div className="bg-white px-5">
      {/* Search and Export */}
      <SearchAndExport
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        data={data}
        columns={[
          "productId",
          "productName",
          "stockQuantity",
          "mrp",
        ]}
        title="Stock Item Report"
      />
      {/* Table and Pagination  */}
      <div className="overflow-x-auto">
        {/* Table  */}
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "ID",
                "Product Name",
                "Available Stock",
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
          <tbody className="bg-white divide-y divide-gray-200">
            {data?.data?.map((row, index) => (
              <tr key={index}>
                <td className="px-4 py-4 whitespace-nowrap text-xs font-medium text-[#0085FF]">
                  {row.productId}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row?.productName}
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

export default StockItemTable;
