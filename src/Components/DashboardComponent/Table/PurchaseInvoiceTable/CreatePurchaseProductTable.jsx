import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditButton from "../../Common/EditButton/EditButton";
import DeleteButton from "../../Common/DeleteButton/DeleteButton";
import { toast } from "react-toastify";
import {
  closeModal,
  openModal,
} from "../../../../features/deleteModal/deleteModalSlice";
import { useDeletePurchaseProductMutation } from "../../../../features/api/seller/purchaseProductApi";
import DeleteConfirmationModal from "../../Common/DeleteConfirmationModal/DeleteConfirmationModal";
import UpdatePurchaseProductModal from "./UpdatePurchaseProductModal";

const CreatePurchaseProductTable = ({ purchaseProducts }) => {
  const dispatch = useDispatch();
  const { isModalOpen, selectedItemId } = useSelector(
    (state) => state.deleteModal
  );
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

 
  const [deletePurchaseProduct] = useDeletePurchaseProductMutation();

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // Delete
  // open delete modal
  const handleDeleteClick = (id) => {
    dispatch(openModal({ id }));
  };

  // delete confirm
  const handleConfirmDelete = async () => {
    console.log("ishrafil")
    try {
      const res = await deletePurchaseProduct(selectedItemId).unwrap();
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
    setSelectedProduct(product); // Set the product to be edited
    setUpdateModalOpen(true); // Open the update modal
  };

  // Close update modal
  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
    setSelectedProduct(null); // Clear the selected product
  };

  return (
    <div className="overflow-x-auto bg-white px-5 py-3">
      {/* Table  */}
      <table className="min-w-full divide-y divide-gray-200 whitespace-nowrap">
        <thead className="bg-gray-50">
          <tr>
            {[
              "Id",
              "Name",
              "Generic Name",
              "Batch",
              "Unit",
              "Manufactured Date",
              "Expiry Date",
              "Quantity (Pieces)",
              "Trade Price (Per Unit)",
              "VAT (%)",
              "Total Trade Price (TP+VAT)",
              "MRP (Per Unit)",
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
        {purchaseProducts?.data?.length > 0 ? (
          <tbody className="bg-white divide-y divide-gray-200">
            {purchaseProducts?.data?.map((row, index) => (
              <tr key={index}>
                <td className="px-4 py-4 whitespace-nowrap text-xs font-medium text-[#0085FF]">
                  {row?.id}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row?.product?.productName}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row?.genericName}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row?.batchNo}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row?.unit}
                </td>
              
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row?.manufacturedDate}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row?.expiryDate}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row?.quantity} Pieces
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row?.tradePrice} TK
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row?.VAT} %
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row?.totalTradePrice} TK
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row?.MRP} TK
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs flex gap-3">
                  <EditButton handleEditClick={handleEditClick} item={row} />
                  <DeleteButton id={row?.id} onDelete={handleDeleteClick} />
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

      {/* Delete Modal  */}
      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

      {/* Update Modal  */}
      {selectedProduct && (
        <UpdatePurchaseProductModal
          isOpen={isUpdateModalOpen}
          onClose={handleCloseUpdateModal}
          productData={selectedProduct}
        />
      )}
    </div>
  );
};

export default CreatePurchaseProductTable;
