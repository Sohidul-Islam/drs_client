import React, { useState } from "react";
import {
  useGetAllAdjustmentQuery,
  useDeleteAdjustmentMutation,
} from "../../../../features/api/seller/stockAdjustmentApi";
import EditButton from "../../Common/EditButton/EditButton";
import { useDispatch, useSelector } from "react-redux";
import DeleteButton from "../../Common/DeleteButton/DeleteButton";
import { toast } from "react-toastify";
import {
  closeModal,
  openModal,
} from "../../../../features/deleteModal/deleteModalSlice";
import DeleteConfirmationModal from "../../Common/DeleteConfirmationModal/DeleteConfirmationModal";
import Pagination from "../../Common/Pagination/Pagination";
import SearchAndExport from "../../Common/SearchAndExport/SearchAndExport";
import UpdateAdjustmentModal from "./UpdateAdjustmentModal ";
// import DeleteButton from "../../Common/DeleteButton/DeleteButton";

const StockAdjustmentTable = () => {
  const dispatch = useDispatch();
  const { isModalOpen, selectedItemId } = useSelector(
    (state) => state.deleteModal
  );
 
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedAdjustment, setSelectedAdjustment] = useState(null);

  const filterQuery = useSelector(state => state.advanceFilter.filterQuery);

  const { data, isLoading } = useGetAllAdjustmentQuery({
    page: currentPage,
    pageSize: pageSize,
    searchKey: searchQuery || filterQuery,
  });

  const [deleteAdjustment] = useDeleteAdjustmentMutation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const { totalPages } = data?.metadata || {};
  // console.log("stock data", data);

  // Delete
  // open delete modal
  const handleDeleteClick = (id) => {
    dispatch(openModal({ id }));
  };

  // delete confirm
  const handleConfirmDelete = async () => {
    try {
      const res = await deleteAdjustment(selectedItemId).unwrap();
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

  // Update Handlers
  const handleEditClick = (adjustment) => {
    setSelectedAdjustment(adjustment);
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedAdjustment(null);
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
          "productName",
          "batchNo",
          "adjustmentType",
          "eventType",
          "transactionType",
          "quantity",
          "productUnitPrice",
          "productTotalPrice",
          "date",
        ]}
        title="Stock Adjustment Report"
        advanceFilter={true}
        name="stock-adjustment"
      />
      {/* Table and Pagination  */}
      <div className="overflow-x-auto">
        {/* Table  */}
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "ID",
                "Product Name",
                "Batch",
                "Type",
                "Event",
                "Transaction",
                "Quantity",
                "Unit Price (Taka)",
                "Total Price (Taka)",
                "Updater On",
                "Action",
              ].map((heading) => (
                <th
                  key={heading}
                  scope="col"
                  className="px-4 py-3 text-left text-[13px] font-medium tracking-wider whitespace-nowrap"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          {data?.data && data?.data.length > 0 ? (
            <tbody className="bg-white divide-y divide-gray-200">
              {data?.data?.map((row, index) => (
                <tr key={index}>
                  <td className="px-4 py-4 whitespace-nowrap text-xs font-medium text-[#0085FF]">
                    {row.id}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row.productName}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row.batchNo}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row.adjustmentType}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row.eventType}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row.transactionType}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row.quantity}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row.productUnitPrice} TK
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row.productTotalPrice} TK
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row.date}
                  </td>
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

      {/* Update Modal */}
      {selectedAdjustment && (
        <UpdateAdjustmentModal
          isOpen={isUpdateModalOpen}
          onClose={handleCloseUpdateModal}
          adjustmentData={selectedAdjustment}
        />
      )}
    </div>
  );
};

export default StockAdjustmentTable;
