import React, { useState } from "react";
import { useDeleteCustomerMutation, useGetAllCustomerQuery } from "../../../../features/api/admin/adminCustomerApi";
import Pagination from "../../Common/Pagination/Pagination";
import SearchAndExport from "../../Common/SearchAndExport/SearchAndExport";
import EditButton from "../../Common/EditButton/EditButton";
import DeleteButton from "../../Common/DeleteButton/DeleteButton";
import { toast } from "react-toastify";
import DeleteConfirmationModal from "../../Common/DeleteConfirmationModal/DeleteConfirmationModal";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "../../../../features/deleteModal/deleteModalSlice";
import CustomerModal from "../SalesTable/CustomerModal";
import CustomerUpdateModal from "./CustomerUpdateModal";

const CustomerTable = () => {
  const dispatch = useDispatch();
  const { isModalOpen, selectedItemId } = useSelector(
    (state) => state.deleteModal
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [customerToEdit, setCustomerToEdit] = useState(null);

  const { data, isLoading } = useGetAllCustomerQuery({
    page: currentPage,
    pageSize: pageSize,
    searchKey: searchQuery,
  });

  const [deleteCustomer] = useDeleteCustomerMutation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const { totalPages } = data.metadata;
  // console.log('from customer table: ', data.data)

    // Delete 
  // open delete modal
  const handleDeleteClick = (id) => {
    dispatch(openModal({ id }));
  };

  // delete confirm
  const handleConfirmDelete = async () => {
    try {
      const res = await deleteCustomer(selectedItemId).unwrap();
      if (res.status) {
        toast.success("Item deleted successfully");
      }
    } catch (error) {
      console.error("Failed to delete the supplier:", error);
    } finally {
      dispatch(closeModal());
    }
  };

  // close delete modal
  const handleCancelDelete = () => {
    dispatch(closeModal());
  };

   // Edit logic
   const handleEditClick = (customer) => {
    setCustomerToEdit(customer); 
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setCustomerToEdit(null);
  };

  return (
    <div className="bg-white px-5">
      {/* Search and Export */}
      <SearchAndExport
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        data={data}
        columns={["id", "name", "address", "phoneNumber", "date"]}
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
                "Address",
                "Mobile",
                "Updater On",
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
            {data?.data?.length > 0 ? (
              data.data.map((row, index) => (
                <tr key={index}>
                  <td className="px-4 py-4 whitespace-nowrap text-xs font-medium text-[#0085FF]">
                    {row?.id}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row?.name}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row?.address}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row?.phoneNumber}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row?.date}
                  </td>
                  {/* update and delete button  */}
                  <td className="px-4 py-4 whitespace-nowrap text-xs flex gap-3">
                  <EditButton item={row} handleEditClick={handleEditClick} />
                    <DeleteButton id={row.id} onDelete={handleDeleteClick} />
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

       {/* Delete Modal  */}
       <DeleteConfirmationModal
        isOpen={isModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

      {/* Update/Edit Modal */}
      {isEditModalOpen && (
        <CustomerUpdateModal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          customerData={customerToEdit}
        />
      )}
    </div>
  );
};

export default CustomerTable;
