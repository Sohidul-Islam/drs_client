import React, { useState } from "react";
import EditButton from "../../Common/EditButton/EditButton";
import { useGetAllUserSubscriptionQuery, useDeleteUserSubscriptionMutation, useDeleteSubscriptionMutation } from "../../../../features/api/admin/adminSubscriptionApi";
import SearchAndExport from "../../Common/SearchAndExport/SearchAndExport";
import DeleteButton from "../../Common/DeleteButton/DeleteButton";
import Pagination from "../../Common/Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  closeModal,
  openModal,
} from "../../../../features/deleteModal/deleteModalSlice.js";
import { toast } from "react-toastify";
import DeleteConfirmationModal from "../../Common/DeleteConfirmationModal/DeleteConfirmationModal";

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
  const dispatch = useDispatch();
  const { isModalOpen, selectedItemId } = useSelector(
    (state) => state.deleteModal
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: subscriptions, isLoading } = useGetAllUserSubscriptionQuery({
    page: currentPage,
    pageSize: pageSize,
    searchKey: searchQuery,
  });

  // const [deleteUserSubscription] = useDeleteUserSubscriptionMutation();
  const [deleteSubscription] = useDeleteSubscriptionMutation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const { totalPages } = subscriptions?.metadata;

  // console.log("Subscriptions --> ", subscriptions)

  // Delete user subscription - open modal
  const handleDeleteClick = (id) => {
    dispatch(openModal({ id }));
  };

  // delete confirm
  const handleConfirmDelete = async () => {
    try {
      const res = await deleteSubscription(selectedItemId).unwrap();
      if (res.status) {
        toast.success("Item deleted successfully");
      }
    } catch (error) {
      console.error("Failed to delete the supplier:", error);
    } finally {
      dispatch(closeModal());
    }
  };

  // delete close modal
  const handleCancelDelete = () => {
    dispatch(closeModal());
  };

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
                    {row.id}
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
                    {row?.prevPlan ? row?.prevPlan : 'No Prev Plan'}
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
                    <EditButton />
                    <DeleteButton id={row.id} onDelete={handleDeleteClick} />
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
      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default SubscriptionDetailsTable;
