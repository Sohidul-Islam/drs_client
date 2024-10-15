import React, { useState } from "react";
import EditButton from "../../Common/EditButton/EditButton";
import SearchAndExport from "../../Common/SearchAndExport/SearchAndExport";
import DeleteButton from "../../Common/DeleteButton/DeleteButton";
import Pagination from "../../Common/Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  closeModal,
  openModal,
} from "../../../../features/deleteModal/deleteModalSlice";
import { toast } from "react-toastify";
import DeleteConfirmationModal from "../../Common/DeleteConfirmationModal/DeleteConfirmationModal";
import { useDeleteUserMutation, useGetAllUsersQuery } from "../../../../features/api/admin/adminUserApi";
import UpdateUserModal from "./UpdateUserModal";

const tableHeadings = [
  "ID",
  "Shop Name",
  "Owner Name",
  "Division",
  "District",
  "Upzilla/Thana",
  "Phone Number",
  "Status",
  "Update On",
];

const ManageStoreTable = () => {
  const dispatch = useDispatch();
  const { isModalOpen, selectedItemId } = useSelector(
    (state) => state.deleteModal
  );
  const filterQuery = useSelector((state) => state.advanceFilter.filterQuery);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

  const { data: users, isLoading } = useGetAllUsersQuery({
    page: currentPage,
    pageSize: pageSize,
    searchKey: searchQuery || filterQuery,
  });

  const [deleteUser] = useDeleteUserMutation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // console.log("searchQuery", searchQuery, filterQuery)

  const { totalPages } = users?.metadata || 1;

  // console.log("users data --> ", users?.data)

  // Delete user subscription - open modal
  const handleDeleteClick = (id) => {
    dispatch(openModal({ id }));
  };

  // delete confirm
  const handleConfirmDelete = async () => {
    try {
      const res = await deleteUser(selectedItemId).unwrap();
      // console.log("res11", res)
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

    // Edit logic
    const handleEditClick = (user) => {
      setUserToEdit(user); 
      setIsEditModalOpen(true);
    };


  return (
    <div className="bg-white px-5 pb-1">
      {/* Search and Export */}
      <SearchAndExport
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        data={users}
        columns={[
          "id",
          "shop_name",
          "shop_owner_name",
          "division",
          "district",
          "upazila",
          "phone_number",
          "status",
          "date",
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
          <thead className="bg-gray-50 whitespace-nowrap">
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
          {users?.data?.length > 0 ? (
            <tbody className="bg-white divide-y divide-gray-200">
              {users?.data?.map((row, index) => (
                <tr key={index}>
                  <td className="px-4 py-4 whitespace-nowrap text-xs font-medium text-[#0085FF]">
                    {row.id}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row?.shop_name}
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row?.shop_owner_name}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row?.division}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row?.district}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row?.upazila}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row?.phone_number}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row.status}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row.date}
                  </td>
                  {/* update and delete button  */}
                  <td className="px-4 py-4 whitespace-nowrap text-xs flex gap-3">
                  <EditButton handleEditClick={handleEditClick} item={row} />
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
      </div>

      {/* Update Modal */}
      {isEditModalOpen && (
          <UpdateUserModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            userData={userToEdit}
          />
        )}

      {/* pagination  */}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />

      {/* Delete Modal  */}
      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default ManageStoreTable;
