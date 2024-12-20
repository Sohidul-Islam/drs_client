import React, { useState } from "react";
import {
  useGetAllProductQuery,
  useDeleteProductMutation,
} from "../../../../features/api/admin/adminProductApi";
import EditButton from "../../Common/EditButton/EditButton";
import DeleteButton from "../../Common/DeleteButton/DeleteButton";
import { toast } from "react-toastify";
import {
  closeModal,
  openModal,
} from "../../../../features/deleteModal/deleteModalSlice";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../Common/Pagination/Pagination";
import DeleteConfirmationModal from "../../Common/DeleteConfirmationModal/DeleteConfirmationModal";
import SearchAndExport from "../../Common/SearchAndExport/SearchAndExport";
import UpdateProductModal from "./UpdateProductModal";

const ProductsTable = () => {
  const dispatch = useDispatch();
  const { isModalOpen, selectedItemId } = useSelector(
    (state) => state.deleteModal
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const filterQuery = useSelector((state) => state.advanceFilter.filterQuery);

  const { data, isLoading } = useGetAllProductQuery({
    page: currentPage,
    pageSize: pageSize,
    searchKey: searchQuery || filterQuery,
  });

  const [deleteProduct] = useDeleteProductMutation();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const { totalPages } = data?.metadata || {};

  // console.log("product data", data?.data)

  // Delete
  // open delete modal
  const handleDeleteClick = (id) => {
    dispatch(openModal({ id }));
  };

  // delete confirm
  const handleConfirmDelete = async () => {
    try {
      const res = await deleteProduct(selectedItemId).unwrap();
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

  // Open update modal and set selected product
  const handleEditClick = (product) => {
    setSelectedProduct(product); 
    setUpdateModalOpen(true); 
  };

  // Close update modal
  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
    setSelectedProduct(null); 
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
          "genericName",
          "manufacturer",
          "strength",
          "dosageForm",
          "packBoxSize",
          "date",
        ]}
        title="Product Report"
        advanceFilter={true}
        name="product"
      />

      {/* Table */}
      <div className="overflow-x-auto">
        {/* Table  */}
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "ID",
                "Product Name",
                "Generic Name",
                "Manufacturer",
                "Strength",
                "Dosage Form",
                "Pack/Box",
                "Quantity",
                "Update On",
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
                    {row?.id}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row?.productName}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row?.genericName}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row?.menufacturer?.name}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row?.strength}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row?.dosageForm}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row?.packBoxSize} Pack's
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row?.stockQuantity === 0 ? "---" : row?.stockQuantity}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs">
                    {row?.date}
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

      {/* Update Modal  */}
      {selectedProduct && (
        <UpdateProductModal
          isOpen={isUpdateModalOpen}
          onClose={handleCloseUpdateModal}
          productData={selectedProduct}
        />
      )}
    </div>
  );
};

export default ProductsTable;
