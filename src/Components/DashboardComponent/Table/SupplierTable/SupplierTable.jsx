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
import Pagination from "../../Common/Pagination/Pagination";

const SupplierTable = () => {
  const dispatch = useDispatch();
  const { isModalOpen, selectedItemId } = useSelector(
    (state) => state.deleteModal
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const { user } = useSelector((state) => state.auth);

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
        columns={["id", "supplier_name", "contactPerson", "phone", "date"]}
        title="Supplier Report"
      />

      {/* supplier table and pagination  */}
      <div className="overflow-x-auto">
        {/* Table  */}
        <table className="min-w-full divide-y divide-gray-200">
          {/* table head  */}

          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-[13px] font-medium tracking-wider">
                ID
              </th>
              <th className="px-4 py-3 text-left text-[13px] font-medium tracking-wider">
                Supplier Name
              </th>
              {user?.accountType === "seller" && (
                <th className="px-4 py-3 text-left text-[13px] font-medium tracking-wider">
                  Added By
                </th>
              )}
              <th className="px-4 py-3 text-left text-[13px] font-medium tracking-wider">
                Contact Person
              </th>
              <th className="px-4 py-3 text-left text-[13px] font-medium tracking-wider">
                Mobile Number
              </th>
              <th className="px-4 py-3 text-left text-[13px] font-medium tracking-wider">
                Updater On
              </th>
              <th className="px-4 py-3 text-left text-[13px] font-medium tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          {/* table body  */}
          {data?.data && data?.data.length > 0 ? (
            <tbody className="bg-white divide-y divide-gray-200">
              {data?.data?.map((row, index) => (
                <tr key={index}>
                  <td className="px-4 py-4 whitespace-nowrap text-xs font-medium text-[#0085FF]">
                    {row.id}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row.supplier_name}
                  </td>
                  {user?.accountType === "seller" && (
                    <td className="px-4 whitespace-nowrap text-xs">
                      <div className="py-2 text-white bg-[#8C8C8C] border rounded-full text-center">
                        {row?.Seller?.accountType === "admin"
                          ? "Global"
                          : "Store"}
                      </div>
                    </td>
                  )}

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
        {isUpdateModalOpen && (
          <UpdateSupplierModal
            isOpen={isUpdateModalOpen}
            onClose={() => setIsUpdateModalOpen(false)}
            supplier={selectedSupplier}
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
