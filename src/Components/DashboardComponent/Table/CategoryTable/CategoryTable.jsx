import React, { useState } from "react";
import {
  useDeleteProductCategoryMutation,
  useGetAllProductCategoryQuery,
} from "../../../../features/api/admin/adminProductCategoryApi";
import EditButton from "../../Common/EditButton/EditButton";
import DeleteButton from "../../Common/DeleteButton/DeleteButton";
import { toast } from "react-toastify";
import {
  closeModal,
  openModal,
} from "../../../../features/deleteModal/deleteModalSlice";
import { useDispatch, useSelector } from "react-redux";
import DeleteConfirmationModal from "../../Common/DeleteConfirmationModal/DeleteConfirmationModal";
import Pagination from "../../Common/Pagination/Pagination";
import SearchAndExport from "../../Common/SearchAndExport/SearchAndExport";
import ProductCategoryModal from "./ProductCategoryModal";

const CategoryTable = () => {
  const dispatch = useDispatch();
  const { isModalOpen, selectedItemId } = useSelector(
    (state) => state.deleteModal
  );
  const { user } = useSelector((state) => state.auth);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);

  const { data, isLoading } = useGetAllProductCategoryQuery({
    page: currentPage,
    pageSize: pageSize,
    searchKey: searchQuery,
  });

  const [deleteProductCategory] = useDeleteProductCategoryMutation();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  // console.log(data, "category");
  const { totalPages } = data.metadata;

  // Delete
  // open delete modal
  const handleDeleteClick = (id) => {
    dispatch(openModal({ id }));
  };

  // delete confirm
  const handleConfirmDelete = async () => {
    try {
      const res = await deleteProductCategory(selectedItemId).unwrap();
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
    const handleEditClick = (category) => {
      setCategoryToEdit(category); 
      setIsEditModalOpen(true);
    };
  
    const handleCloseEditModal = () => {
      setIsEditModalOpen(false);
      setCategoryToEdit(null);
    };
  

  return (
    <div className="bg-white px-5">
      {/* Search and Export */}
      <SearchAndExport
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        data={data}
        columns={["id", "category_name", "addedBy", "date"]}
        title="Product Category Report"
      />

      {/* Table and Pagination*/}
      <div className="overflow-x-auto">
        {/* Table  */}
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-[13px] font-medium tracking-wider">
                ID
              </th>
              <th className="px-4 py-3 text-left text-[13px] font-medium tracking-wider">
                Categories Name
              </th>
              {user?.accountType === "seller" && (
                <th className="px-4 py-3 text-left text-[13px] font-medium tracking-wider">
                  Added By
                </th>
              )}
              {user?.accountType === "admin" && (
                <th className="px-4 py-3 text-left text-[13px] font-medium tracking-wider">
                  Updater On
                </th>
              )}
              {user?.accountType === "seller" && (
                <th className="px-4 py-3 text-left text-[13px] font-medium tracking-wider">
                  Update On
                </th>
              )}
              {user?.accountType === "admin" && (
                <th className="px-4 py-3 text-left text-[13px] font-medium tracking-wider">
                  Action
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data?.data?.map((row, index) => (
              <tr key={index}>
                <td className="px-4 py-4 whitespace-nowrap text-xs font-medium text-[#0085FF]">
                  {row.id}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row.category_name}
                </td>
                {user?.accountType === "seller" && <td className="px-4 py-4 whitespace-nowrap text-xs">
                  <span className="px-5 py-2 text-white bg-[#8C8C8C] border rounded-full">
                    {row?.Seller?.accountType === "admin"
                      ? "Global"
                      : row.addedBy}
                  </span>
                </td>}
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row.date}
                </td>
                {user?.accountType === "admin" && (
                  <td className="px-4 py-4 whitespace-nowrap text-xs flex gap-3">
                    <EditButton item={row} handleEditClick={handleEditClick} />
                    <DeleteButton id={row.id} onDelete={handleDeleteClick} />
                  </td>
                )}
              </tr>
            ))}
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

       {/* Update Modal */}
       <ProductCategoryModal
       isOpen={isEditModalOpen}
       onClose={handleCloseEditModal}
       categoryData={categoryToEdit}
      />
    </div>
  );
};

export default CategoryTable;
