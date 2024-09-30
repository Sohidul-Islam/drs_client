import React, { useState } from "react";
import EditButton from "../../Common/EditButton/EditButton";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllPaymentQuery } from "../../../../features/api/seller/paymentApi";
import { useDeleteSaleProductMutation } from "../../../../features/api/seller/saleProductApi";
import {
  closeModal,
  openModal,
} from "../../../../features/deleteModal/deleteModalSlice";
import { toast } from "react-toastify";
import DeleteButton from "../../Common/DeleteButton/DeleteButton";
import Pagination from "../../Common/Pagination/Pagination";
import DeleteConfirmationModal from "../../Common/DeleteConfirmationModal/DeleteConfirmationModal";
import SearchAndExport from "../../Common/SearchAndExport/SearchAndExport";

const SalesTable = () => {
  const dispatch = useDispatch();
  const { isModalOpen, selectedItemId } = useSelector(
    (state) => state.deleteModal
  );
  const filterQuery = useSelector((state) => state.advanceFilter.filterQuery);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: payments, isLoading } = useGetAllPaymentQuery({
    page: currentPage,
    pageSize: pageSize,
    searchKey: searchQuery || filterQuery,
    type: "sales",
  });

  const [deleteSaleProduct] = useDeleteSaleProductMutation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const { totalPages } = payments?.metadata;

  // Delete
  // open delete modal
  const handleDeleteClick = (id) => {
    dispatch(openModal({ id }));
  };

  // delete confirm
  const handleConfirmDelete = async () => {
    try {
      const res = await deleteSaleProduct(selectedItemId).unwrap();
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
      <SearchAndExport
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        data={payments}
        columns={[
          "id",
          "invoiceNumber",
          "invoiceDate",
          "manufacturer",
          "manufacturer",
          "total",
          "paidAmount",
          "due",
          "date",
        ]}
        title="Sales Report"
        advanceFilter={true}
        name="sales"
      />

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 whitespace-nowrap">
            <tr>
              {[
                "ID",
                "Customer Name",
                "Mobile Number",
                "Order Date",
                "Total",
                "Paid",
                "Due",
                "Updater On",
                "Action",
              ].map((heading) => (
                <th
                  key={heading}
                  scope="col"
                  className="px-4 text-left text-[13px] font-medium tracking-wider"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          {payments?.data?.length > 0 ? (
            <tbody className="bg-white divide-y divide-gray-200">
              {payments?.data?.map((row, idx) => (
                <tr key={idx}>
                  <td className="px-4 py-4 whitespace-nowrap text-xs font-medium text-[#0085FF]">
                    {row.id}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row.customerName}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row.phoneNumber}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row.orderDate}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row.total} TK
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row.paidAmount} TK
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row.due} TK
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row.orderDate}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs flex gap-3">
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
    </div>
  );
};

export default SalesTable;
