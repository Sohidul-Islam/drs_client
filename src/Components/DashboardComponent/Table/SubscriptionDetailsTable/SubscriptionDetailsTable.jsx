import React, { useState } from "react";
import EditButton from "../../Common/EditButton/EditButton";
import { useGetAllUserSubscriptionQuery } from "../../../../features/api/admin/adminSubscriptionApi";
import SearchAndExport from "../../Common/SearchAndExport/SearchAndExport";
import DeleteButton from "../../Common/DeleteButton/DeleteButton";
import Pagination from "../../Common/Pagination/Pagination";

const data = [
  {
    id: "#01",
    storeName: "MAA Pharmacy",
    ownerName: "Sabariya Muzumder",
    mobileNumber: "01994779217",
    previousPackage: "Free Trail",
    currentPackage: "Starter",
    amount: 300,
    updateOn: "05/06/2024",
  },
  {
    id: "#02",
    storeName: "Health Hub",
    ownerName: "Arif Rahman",
    mobileNumber: "01845789324",
    previousPackage: "Free Trail",
    currentPackage: "Starter",
    amount: 250,
    updateOn: "06/07/2024",
  },
  {
    id: "#03",
    storeName: "City Pharmacy",
    ownerName: "Nazia Khan",
    mobileNumber: "01712345678",
    previousPackage: "Basic",
    currentPackage: "Pro",
    amount: 500,
    updateOn: "07/08/2024",
  },
  {
    id: "#04",
    storeName: "Good Health",
    ownerName: "Mahmudul Hasan",
    mobileNumber: "01678912345",
    previousPackage: "Free Trail",
    currentPackage: "Starter",
    amount: 300,
    updateOn: "08/09/2024",
  },
  {
    id: "#05",
    storeName: "Care Plus",
    ownerName: "Samira Jahan",
    mobileNumber: "01567891234",
    previousPackage: "Free Trail",
    currentPackage: "Pro",
    amount: 600,
    updateOn: "09/10/2024",
  },
];

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

  const { totalPages } = data?.metadata || 2;

  // console.log("Subscriptions --> ", subscriptions)

  return (
    <div className="bg-white px-5">
      {/* Search and Export */}
      <SearchAndExport
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        data={data}
        columns={[
          "id",
          "storeName",
          "ownerName",
          "mobileNumber",
          "previousPackage",
          "currentPackage",
          "amount",
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
          {data?.length > 0 ? (
            <tbody className="bg-white divide-y divide-gray-200">
              {data?.map((row, index) => (
                <tr key={index}>
                  <td className="px-4 py-4 whitespace-nowrap text-xs font-medium text-[#0085FF]">
                    {row.id}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row.storeName}
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row.ownerName}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row.mobileNumber}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row.previousPackage}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row.currentPackage}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row.amount}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row.updateOn}
                  </td>
                  {/* update and delete button  */}
                  <td className="px-4 py-4 whitespace-nowrap text-xs flex gap-3">
                    <EditButton />
                    <DeleteButton />
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

      {/* Delete Modal  */}
      {/* <DeleteConfirmationModal
        isOpen={isModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      /> */}
    </div>
  );
};

export default SubscriptionDetailsTable;
