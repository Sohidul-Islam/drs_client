import React from "react";
import { useDeletePurchaseProductMutation, useGetAllPurchaseProductQuery } from "../../../../features/api/seller/purchaseProductApi";
import { useDispatch, useSelector } from "react-redux";
import EditButton from "../../Common/EditButton/EditButton";
import DeleteButton from "../../Common/DeleteButton/DeleteButton";
import { toast } from "react-toastify";
import { closeModal, openModal } from "../../../../features/deleteModal/deleteModalSlice";
import DeleteConfirmationModal from "../../Common/DeleteConfirmationModal/DeleteConfirmationModal";

const CreatePurchaseProductTable = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth);
  const { isModalOpen, selectedItemId } = useSelector(
    (state) => state.deleteModal
  );
  const { data: purchaseProducts, isLoading } = useGetAllPurchaseProductQuery({
    page: 1,
    pageSize: 15,
    searchKey: "",
    status: "inactive",
    sellerId: user?.id || 1,
  });

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

  return (
    <div className="overflow-x-auto bg-white px-5 py-3">
      {/* Table  */}
      <table className="min-w-full divide-y divide-gray-200 whitespace-nowrap">
        <thead className="bg-gray-50">
          <tr>
            {[
              "Id",
              "Generic Name",
              "Batch",
              "Manufactured Date",
              "Expiry Date",
              "Quantity (Pieces)",
              "Trade Price",
              "VAT",
              "Total Trade Price (TP+VAT)",
              "Unit Price",
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
        <tbody className="bg-white divide-y divide-gray-200">
          {purchaseProducts?.data?.length > 0 ? (
            purchaseProducts?.data?.map((row, index) => (
              <tr key={index}>
                <td className="px-4 py-4 whitespace-nowrap text-xs font-medium text-[#0085FF]">
                  {row?.id}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row?.genericName}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row?.batchNo}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row?.manufacturedDate}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row?.expiryDate}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row?.quantity}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row?.tradePrice}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row?.VAT}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row?.totalTradePrice}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row?.id} temp
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row?.MRP}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs flex gap-3">
                  <EditButton />
                  <DeleteButton id={row.id} onDelete={handleDeleteClick} />
                </td>
              </tr>
            ))
          ) : (
            <p className="text-sm py-1">No data available</p>
          )}
        </tbody>
      </table>

       {/* Delete Modal  */}
       <DeleteConfirmationModal
        isOpen={isModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default CreatePurchaseProductTable;
