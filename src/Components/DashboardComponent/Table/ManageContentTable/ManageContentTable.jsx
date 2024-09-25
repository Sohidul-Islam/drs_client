import React, { useState } from "react";
import EditButton from "../../Common/EditButton/EditButton";
import DeleteButton from "../../Common/DeleteButton/DeleteButton";
import {
  useDeleteSubscriptionMutation,
  useGetAllSubscriptionQuery,
} from "../../../../features/api/admin/adminSubscriptionApi";
import { useDispatch, useSelector } from "react-redux";
import {
  closeModal,
  openModal,
} from "../../../../features/deleteModal/deleteModalSlice";
import { toast } from "react-toastify";
import DeleteConfirmationModal from "../../Common/DeleteConfirmationModal/DeleteConfirmationModal";
import EditSubscriptionModal from "./EditSubscriptionModal";

const ManageContentTable = () => {
  const dispatch = useDispatch();
  const { isModalOpen, selectedItemId } = useSelector(
    (state) => state.deleteModal
  );
  const { data: subscriptions, isLoading } = useGetAllSubscriptionQuery();
  const [deleteSubscription] = useDeleteSubscriptionMutation();
  const [editItem, setEditItem] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State to handle edit modal


  if (isLoading) {
    return <div>Loading...</div>;
  }

  const getMonth = (days) => {
    const months = days / 30;
    return months;
  };

  // Delete
  // open delete modal
  const handleDeleteClick = (id) => {
    dispatch(openModal({ id }));
  };

  // delete confirm
  const handleConfirmDelete = async () => {
    try {
      const res = await deleteSubscription(selectedItemId).unwrap();
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

    // Handle edit
  const handleEditClick = (item) => {
      setEditItem(item);
      setIsEditModalOpen(true);
    };
  
    // Close edit modal
    const handleEditModalClose = () => {
      setIsEditModalOpen(false);
      setEditItem(null);
    };

  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200 mb-4">
        <thead className="bg-gray-50">
          <tr>
            {[
              "No.",
              "Package Name",
              "Description",
              "Features",
              "Price BDT",
              "Duration/month",
              "Action",
            ].map((heading) => (
              <th
                key={heading}
                scope="col"
                className="px-4 py-3 text-left text-[13px] font-medium tracking-wider whitespace-nowrap border"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2 text-left align-top">
                {item?.id}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-left align-top">
                {item?.package}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-left align-top">
                {item?.description}
              </td>
              <td className="border border-gray-300 px-2 py-2 text-left align-top">
                <div
                  className="overflow-y-auto"
                  style={{
                    width: "200px",
                    height: "100px",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}
                >
                  <ol className="list-decimal list-inside">
                    {item?.offers?.map((offer, index) => (
                      <li key={index}>{offer?.name}</li>
                    ))}
                  </ol>
                </div>
              </td>

              <td className="border border-gray-300 px-4 py-2 text-left align-top">
                {item?.price} TK
              </td>
              <td className="border border-gray-300 px-4 py-2 text-left align-top">
                {getMonth(item?.duration_in_days)}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-left align-top">
                <div className="flex gap-3">
                  <EditButton handleEditClick={handleEditClick} item={item} />
                  <DeleteButton id={item?.id} onDelete={handleDeleteClick} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <EditSubscriptionModal
          editItem={editItem}
          onClose={handleEditModalClose}
        />
      )}

      {/* Delete Modal  */}
      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default ManageContentTable;
