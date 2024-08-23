import React, { useState } from "react";
import { useDeleteProductCategoryMutation, useGetAllProductCategoryQuery } from "../../../../features/api/admin/adminProductCategoryApi";
import EditButton from "../../Common/EditButton/EditButton";
import DeleteButton from "../../Common/DeleteButton/DeleteButton";
import { toast } from "react-toastify";
import { closeModal, openModal } from "../../../../features/deleteModal/deleteModalSlice";
import { useDispatch, useSelector } from "react-redux";
import DeleteConfirmationModal from "../../Common/DeleteConfirmationModal/DeleteConfirmationModal";

const CategoryTable = () => {
  const dispatch = useDispatch()
  const { isModalOpen, selectedItemId } = useSelector(
    (state) => state.deleteModal
  );
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading } = useGetAllProductCategoryQuery({
    page: 1,
    pageSize: 15,
    searchKey: "",
  });

  const [deleteProductCategory] = useDeleteProductCategoryMutation();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log(data, "category");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

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

  return (
    <div className="bg-white px-5">
      {/* search field  */}
      <div className="py-5">
        <label className="text-sm mr-2">Search:</label>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          className="border outline-gray-300 text-gray-700 py-[5px] px-2"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "ID",
                "Categories Name",
                "Added By",
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
            {data?.map((row, index) => (
              <tr key={index}>
                <td className="px-4 py-4 whitespace-nowrap text-xs font-medium text-[#0085FF]">
                  {row.id}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row.category_name}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  <span className="px-5 py-2 text-white bg-[#8C8C8C] border rounded-full">
                    {row?.Seller?.accountType === 'admin' ? "Global" : row.addedBy}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row.date}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs flex gap-3">
                    <EditButton />
                    <DeleteButton id={row.id} onDelete={handleDeleteClick} />
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
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

export default CategoryTable;
