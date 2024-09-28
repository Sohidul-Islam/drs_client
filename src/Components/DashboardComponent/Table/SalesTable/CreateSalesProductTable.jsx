import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDeleteSaleProductMutation } from "../../../../features/api/seller/saleProductApi";
import EditButton from "../../Common/EditButton/EditButton";
import DeleteButton from "../../Common/DeleteButton/DeleteButton";
import { toast } from "react-toastify";
import {
  closeModal,
  openModal,
} from "../../../../features/deleteModal/deleteModalSlice";
import DeleteConfirmationModal from "../../Common/DeleteConfirmationModal/DeleteConfirmationModal";
import UpdateSalesProductModal from "./UpdateSalesProductModal";

const CreateSalesProductTable = ({ saleProducts }) => {
  const dispatch = useDispatch();
  const { isModalOpen, selectedItemId } = useSelector(
    (state) => state.deleteModal
  );
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

  // -------------------------------------------------------------------------------
  //     I have moved this code to it's parent for refetch data after payment
  // -------------------------------------------------------------------------------
  // const { data: saleProducts } = useGetAllSaleProductQuery({
  //   page: 1,
  //   pageSize: 15,
  //   searchKey: "",
  //   status: "inactive",
  //   sellerId: user?.id || 1,
  // });

  const [deleteSaleProduct] = useDeleteSaleProductMutation();

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
      <table className="min-w-full divide-y divide-gray-200 whitespace-nowrap">
        <thead className="bg-gray-50">
          <tr>
            {[
              "Name",
              "Generic Name",
              "Reg-no",
              "Doctor Name",
              "Discount",
              "Quantity",
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

        {saleProducts?.data?.length > 0 ? (
          <tbody className="bg-white divide-y divide-gray-200">
            {saleProducts?.data?.map((row, index) => (
              <tr key={index}>
                <td className="px-4 py-4 whitespace-nowrap text-xs font-medium text-[#0085FF]">
                  {row.name}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row.genericName}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row.BMDCRegistrationNo}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row.doctorName}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row.discount}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row.quantity}
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

      {/* Delete Modal  */}
      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

      {/* Update Modal  */}
      {selectedProduct && (
        <UpdateSalesProductModal
          isOpen={isUpdateModalOpen}
          onClose={handleCloseUpdateModal}
          productData={selectedProduct}
        />
      )}
    </div>
  );
};

export default CreateSalesProductTable;
