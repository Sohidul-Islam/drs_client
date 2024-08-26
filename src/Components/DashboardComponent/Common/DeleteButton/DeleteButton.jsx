import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";

const DeleteButton = ({ onDelete, id }) => {
  return (
    <div>
      <button
        onClick={() => onDelete(id)}
        className="bg-[#CE1124] w-5 h-5 px-1 py-[6px] text-white flex justify-center items-center rounded-sm"
      >
        <RiDeleteBinLine />
      </button>
    </div>
  );
};

export default DeleteButton;
