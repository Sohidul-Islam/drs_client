import React, { useState } from "react";
import EditButton from "../../Common/EditButton/EditButton";
import { useGetAllUserSubscriptionQuery } from "../../../../features/api/admin/adminSubscriptionApi";
import SearchAndExport from "../../Common/SearchAndExport/SearchAndExport";
import DeleteButton from "../../Common/DeleteButton/DeleteButton";
import Pagination from "../../Common/Pagination/Pagination";

const data = [
  {
    id: "#01",
    shopName: "MAA Pharmacy",
    ownerName: "Sabariya Muzumder",
    division: "Dhaka",
    district: "Dhaka",
    upzillaThana: "Badda",
    phoneNumber: "01994779217",
    status: "Active",
    updateOn: "05/06/2024"
  },
  {
    id: "#02",
    shopName: "Health Mart",
    ownerName: "Tariqul Islam",
    division: "Dhaka",
    district: "Gazipur",
    upzillaThana: "Sreepur",
    phoneNumber: "01894779217",
    status: "Inactive",
    updateOn: "05/05/2024"
  },
  {
    id: "#03",
    shopName: "City Pharmacy",
    ownerName: "Anisur Rahman",
    division: "Dhaka",
    district: "Dhaka",
    upzillaThana: "Mohammadpur",
    phoneNumber: "01794779217",
    status: "Active",
    updateOn: "05/04/2024"
  },
  {
    id: "#04",
    shopName: "MediCare",
    ownerName: "Farzana Khan",
    division: "Chittagong",
    district: "Comilla",
    upzillaThana: "Comilla Sadar",
    phoneNumber: "01994779218",
    status: "Inactive",
    updateOn: "05/03/2024"
  },
  {
    id: "#05",
    shopName: "Pharma Plus",
    ownerName: "Nasir Uddin",
    division: "Dhaka",
    district: "Tangail",
    upzillaThana: "Tangail Sadar",
    phoneNumber: "01694779219",
    status: "Active",
    updateOn: "05/02/2024"
  },
  {
    id: "#06",
    shopName: "Amin Pharmacy",
    ownerName: "Jamil Ahmed",
    division: "Sylhet",
    district: "Sylhet",
    upzillaThana: "Sylhet Sadar",
    phoneNumber: "01794779219",
    status: "Active",
    updateOn: "05/01/2024"
  },
  {
    id: "#07",
    shopName: "Dhaka Chemist",
    ownerName: "Shakil Hossain",
    division: "Dhaka",
    district: "Dhaka",
    upzillaThana: "Gulshan",
    phoneNumber: "01994779220",
    status: "Inactive",
    updateOn: "04/30/2024"
  }
];


const tableHeadings = [
  "ID",
  "Shop Name",
  "Owner Name",
  "Division",
  "District",
  "Upzilla/Thana",
  "Phone Number",
  "Status",
  "Update On"
];


const ManageStoreTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: manageStores, isLoading } = useGetAllUserSubscriptionQuery({
    page: currentPage,
    pageSize: pageSize,
    searchKey: searchQuery,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const { totalPages } = manageStores?.metadata || 2;

  // console.log("Manage store --> ", manageStores)

  return (
    <div className="bg-white px-5 pb-1">
      {/* Search and Export */}
      <SearchAndExport
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        data={data}
        columns={[
          "id",
          "shopName",
          "ownerName",
          "division",
          "district",
          "upzillaThana",
          "phoneNumber",
          "status",
          "updateOn",
        ]}
        advanceFilter={true}
        title="Manage Store Report"
        name="manage-store"
      />

      {/* Manage Store table */}
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
                    {row.shopName}
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row.ownerName}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row.division}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row.district}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row.upzillaThana}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row.phoneNumber}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row.status}
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

       

       
      </div>

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

      {/* Delete Modal  */}
      {/* <DeleteConfirmationModal
        isOpen={isModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      /> */}
    </div>
  );
};

export default ManageStoreTable;