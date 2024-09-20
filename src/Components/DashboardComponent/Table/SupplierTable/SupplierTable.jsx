import React, { useEffect, useState } from "react";
import "jspdf-autotable";
import {
  useDeleteSupplierMutation,
  useGetAllSupplierQuery,
} from "../../../../features/api/admin/adminSupplierApi";
import { useDispatch, useSelector } from "react-redux";
import EditButton from "../../Common/EditButton/EditButton";
import { RiDeleteBinLine } from "react-icons/ri";
import {
  closeModal,
  openModal,
} from "../../../../features/deleteModal/deleteModalSlice";
import DeleteConfirmationModal from "../../Common/DeleteConfirmationModal/DeleteConfirmationModal";
import { toast } from "react-toastify";
import UpdateSupplierModal from "./UpdateSupplierModal";
import SearchAndExport from "../../Common/SearchAndExport/SearchAndExport";

const tableHead = [
  "ID",
  "Supplier Name",
  "Added By",
  "Contact Person",
  "Mobile",
  "Updater On",
  "Action",
];

const SupplierTable = () => {
  const dispatch = useDispatch();
  const { isModalOpen, selectedItemId } = useSelector(
    (state) => state.deleteModal);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const { data, isLoading } = useGetAllSupplierQuery({
    page: currentPage,
    pageSize: pageSize,
    searchKey: searchQuery,
  });

  const [deleteSupplier] = useDeleteSupplierMutation();

  useEffect(() => {
    setCurrentPage(1);
  }, [pageSize]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const { totalPages } = data.metadata;

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
  };

   // Pagination Previous Button 
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Pagination Next Button 
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Delete supplier - open modal
  const handleDeleteClick = (id) => {
    dispatch(openModal({ id }));
  };

  // delete confirm 
  const handleConfirmDelete = async () => {
    try {
      const res = await deleteSupplier(selectedItemId).unwrap();
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



  const handleEditClick = (supplier) => {
    setSelectedSupplier(supplier); // Pass the supplier data
    setIsUpdateModalOpen(true); // Open the modal
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
          "supplier_name",
          "contactPerson",
          "phone",
          "date",
        ]}
        title="Supplier Report"
      />

      {/* supplier table and pagination  */}
      <div className="overflow-x-auto">   
        {/* Table  */}
        <table className="min-w-full divide-y divide-gray-200">
          {/* table head  */}
          <thead className="bg-gray-50">
            <tr>
              {tableHead.map((heading) => (
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
          {/* table body  */}
          <tbody className="bg-white divide-y divide-gray-200">
            {data.data.map((row, index) => (
              <tr key={index}>
                <td className="px-4 py-4 whitespace-nowrap text-xs font-medium text-[#0085FF]">
                  {row.id}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row.supplier_name}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  <span className="px-5 py-2 text-white bg-[#8C8C8C] border rounded-full">
                    {row?.Seller?.accountType === "admin" ? "Global" : "Store"}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row.contactPerson}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row.phone}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row.date}
                </td>
                {/* update and delete button  */}
                <td className="px-4 py-4 whitespace-nowrap text-xs flex gap-3">
                  <EditButton handleEditClick={handleEditClick} item={row} />
                  <button
                    onClick={() => handleDeleteClick(row?.id)}
                    className="bg-[#CE1124] w-5 h-5 px-1 py-[6px] text-white flex justify-center items-center rounded-sm"
                  >
                    <RiDeleteBinLine />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Update Modal */}
      {isUpdateModalOpen && (
        <UpdateSupplierModal
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          supplier={selectedSupplier}
        />
      )}

        {/* pagination  */}
        <div className="border-t">
          <div className="my-4 flex justify-between">
            {/* show selection  */}
            <div>
              <label className="text-sm font-medium text-[#1F1F1F] mr-2">
                Show
              </label>
              <select
                className="text-sm border outline-gray-300 text-gray-700 py-1 px-1 rounded-md"
                value={pageSize}
                onChange={handlePageSizeChange}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </div>
            {/* next and previous button */}
            <div>
              <button
                onClick={handlePrevious}
                className={`border px-3 py-1 text-base ${
                  currentPage === 1
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer"
                }`}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                className={`border px-3 py-1 text-base ${
                  currentPage === totalPages
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer"
                }`}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
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

export default SupplierTable;
