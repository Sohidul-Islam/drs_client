import React, { useState } from "react";
import { useGetAllUserSubscriptionQuery } from "../../../../features/api/admin/adminSubscriptionApi";
import SearchAndExport from "../../Common/SearchAndExport/SearchAndExport";
import Pagination from "../../Common/Pagination/Pagination";
import { IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const tableHeadings = [
  "ID",
  "Store Name",
  "Owner Name",
  "Mobile Number",
  "Previous Package",
  "Current Package",
  "Amount",
  "Update On",
];

const SubscriptionDetailsTable = () => {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: subscriptions, isLoading } = useGetAllUserSubscriptionQuery({
    page: currentPage,
    pageSize: pageSize,
    searchKey: searchQuery,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const { totalPages } = subscriptions?.metadata;

  return (
    <div className="bg-white px-5">
      {/* Search and Export */}
      <SearchAndExport
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        data={subscriptions}
        columns={[
          "id",
          "storeName",
          "ownerName",
          "mobileNumber",
          "prevPlan",
          "currentPackage",
          "price",
          "updateOn",
        ]}
        title="Subscription Details Report"
      />

      {/* subscription details table and pagination  */}
      <div className="overflow-x-auto">
        {/* Table  */}
        <table className="min-w-full divide-y divide-gray-200">
          {/* table head  */}
          <thead className="bg-gray-50">
            <tr>
              {tableHeadings?.map((item, index) => (
                <th
                  key={index}
                  className="px-4 py-3 text-left text-[13px] font-medium tracking-wider"
                >
                  {item}
                </th>
              ))}
              <th className="px-4 py-3 text-left text-[13px] font-medium tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          {/* table body  */}
          {subscriptions?.data?.length > 0 ? (
            <tbody className="bg-white divide-y divide-gray-200">
              {subscriptions?.data?.map((row, index) => (
                <tr key={index}>
                  <td className="px-4 py-4 whitespace-nowrap text-xs font-medium text-[#0085FF]">
                    {row?.id}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row?.storeName}
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row?.ownerName}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row?.mobileNumber}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row?.prevPlan ? row?.prevPlan : "No Prev Plan"}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row?.currentPackage}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row?.price}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row?.updateOn}
                  </td>
                  {/* update and delete button  */}
                  <td className="px-4 py-4 whitespace-nowrap text-xs flex gap-3">
                    <button
                      onClick={() => navigate('/subscription-plan')}
                      className="bg-[#27BD02] w-5 h-5 px-1 py-[6px] text-white flex justify-center items-center rounded-sm"
                    >
                      <IoEyeOutline />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan="12">
                  <div className="flex justify-center items-center py-5">
                    <p className="text-gray-500 text-lg">No data found</p>
                  </div>
                </td>
              </tr>
            </tbody>
          )}
        </table>

        {/* Update Modal */}
        {/* {isUpdateModalOpen && (
          <UpdateSupplierModal
            isOpen={isUpdateModalOpen}
            onClose={() => setIsUpdateModalOpen(false)}
            supplier={selectedSupplier}
          />
        )} */}

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

export default SubscriptionDetailsTable;
