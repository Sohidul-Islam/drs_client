import React from "react";
import { useDeletePaymentMutation, useGetAllPaymentQuery } from "../../../../features/api/seller/paymentApi";
import EditButton from "../../Common/EditButton/EditButton";
import DeleteButton from "../../Common/DeleteButton/DeleteButton";
import { closeModal, openModal } from "../../../../features/deleteModal/deleteModalSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import DeleteConfirmationModal from "../../Common/DeleteConfirmationModal/DeleteConfirmationModal";

const CreatePurchasePaymentTable = () => {
  const dispatch = useDispatch();
  const { isModalOpen, selectedItemId } = useSelector(
    (state) => state.deleteModal
  );
  const { data: payments, isLoading } = useGetAllPaymentQuery({
    page: 1,
    pageSize: 20,
    searchKey: "",
    type: "purchase",
  });

  const [deletePayment] = useDeletePaymentMutation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Delete
  // open delete modal
  const handleDeleteClick = (id) => {
    dispatch(openModal({ id }));
  };

  // delete confirm
  const handleConfirmDelete = async () => {
    try {
      const res = await deletePayment(selectedItemId).unwrap();
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
      <table className="min-w-full divide-y divide-gray-200 whitespace-nowrap">
        <thead className="bg-gray-50">
          <tr>
            {[
              "Paid Amount",
              "Payment Method",
              "Due Amount",
              "Updater at",
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
          {payments?.length > 0 ? (
            payments?.map((row, index) => (
              <tr key={index}>
                <td className="px-4 py-4 whitespace-nowrap text-xs font-medium text-[#0085FF]">
                  {row?.payment?.paidAmount} TK
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row?.payment?.paymentMethod}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                {row?.payment?.due} TK
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row?.createdAt.split('T')[0]}
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

export default CreatePurchasePaymentTable;
