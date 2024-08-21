import React, { useState } from "react";
import { useGetAllCustomerQuery } from "../../../../features/api/admin/adminCustomerApi";
import Pagination from "../../Common/Pagination/Pagination";
import SearchAndExport from "../../Common/SearchAndExport/SearchAndExport";

const CustomerTable = () => {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading } = useGetAllCustomerQuery({
    page: currentPage,
    pageSize: pageSize,
    searchKey: searchQuery,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const { totalPages } = data.metadata;
  // console.log('from customer table: ', data.data)

  return (
    <div className="bg-white px-5">
      {/* Search and Export */}
      <SearchAndExport
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        data={data}
        columns={[
          "id",
          "customer_name",
          "store_name",
          "mobile_number",
          "updater",
          "date",
          "status",
        ]}
        title="Customer Report"
      />

      <div className="overflow-x-auto">
        {/* Table  */}
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "ID",
                "Customer Name",
                "Store",
                "Mobile",
                "Updater",
                "Updater On",
                "Active",
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
            {data?.data?.length > 0 ? (
              data.data.map((row, index) => (
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
              <p className="text-center py-1">No data available</p>
            )}
          </tbody>
        </table>

        {/* pagination  */}
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
      </div>
    </div>
  );
};

export default CustomerTable;
