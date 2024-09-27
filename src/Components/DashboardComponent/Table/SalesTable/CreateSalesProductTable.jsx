import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDeleteSaleProductMutation } from "../../../../features/api/seller/saleProductApi";
import EditButton from "../../Common/EditButton/EditButton";
import DeleteButton from "../../Common/DeleteButton/DeleteButton";
import { toast } from "react-toastify";
import { closeModal, openModal } from "../../../../features/deleteModal/deleteModalSlice";
import DeleteConfirmationModal from "../../Common/DeleteConfirmationModal/DeleteConfirmationModal";

const CreateSalesProductTable = ({saleProducts}) => {
  const dispatch = useDispatch();
  const { isModalOpen, selectedItemId } = useSelector((state) => state.deleteModal);

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

  // console.log("sales data: ",saleProducts)

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
                  {row.regNo}
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
                  <EditButton />
                  <DeleteButton id={row.id} onDelete={handleDeleteClick}/>
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

export default CreateSalesProductTable;
