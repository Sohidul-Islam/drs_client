import React from "react";
import DeleteButton from "../../Common/DeleteButton/DeleteButton";
import { useDeletePaymentMutation, useGetAllPaymentQuery } from "../../../../features/api/seller/paymentApi";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "../../../../features/deleteModal/deleteModalSlice";
import { toast } from "react-toastify";
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

  // console.log("payment data: ", payments.data)
  
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
      console.error("Failed to delete the item:", error);
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
              "Payment Method",
              "Total Amount",
              "Paid Amount",
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

        {payments?.data?.length > 0 ? (
          <tbody className="bg-white divide-y divide-gray-200">
            {payments?.data?.map((row, index) => (
              <tr key={index}>
                <td className="px-4 py-4 whitespace-nowrap text-xs font-medium text-[#0085FF]">
                  {row?.paymentMethod?.toUpperCase()}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row?.total} TK
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row?.paidAmount} TK
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row?.due} TK
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row?.date}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs text-center">
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
    </div>
  );
};

export default CreatePurchasePaymentTable;
