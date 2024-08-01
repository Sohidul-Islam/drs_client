import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDeleteAdjustmentMutation } from "../../../../features/api/seller/stockAdjustmentApi";

const DeleteButton = ({ id }) => {
  const [deleteAdjustment] = useDeleteAdjustmentMutation();

  const handleDelete = async () => {
    try {
      const res = await deleteAdjustment({ id }).unwrap();
      console.log(`Deleted adjustment with id: ${id}`);
      console.log(res)
    } catch (error) {
      console.error("Failed to delete the adjustment:", error);
    }
  };

  return (
    <button onClick={handleDelete} className="bg-[#CE1124] w-5 h-5 px-1 py-[6px] text-white flex justify-center items-center rounded-sm">
      <RiDeleteBinLine />
    </button>
  );
};

export default DeleteButton;
