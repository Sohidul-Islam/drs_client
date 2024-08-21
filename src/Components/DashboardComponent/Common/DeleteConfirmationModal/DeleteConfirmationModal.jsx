import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

const DeleteConfirmationModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-10 rounded-md shadow-md">
        <div className="flex justify-between">
          <h2 className="text-lg font-bold mb-4">Delete Item?</h2>
          <button
            onClick={onCancel}
            className="border h-1/2 py-1 px-3 bg-[#EFEFEF] hover:bg-[#FF0025] hover:text-white rounded-md text-2xl"
          >
            X
          </button>
        </div>
        <p className="my-4 w-[476px]">
          All share links will be inaccessible. All history of this Item will be
          destroyed.
        </p>
        <div className="flex items-center justify-center my-5">
          <RiDeleteBin6Line  size={90} fill="white" className="border bg-[#FF0025] p-4 rounded-full"/>
        </div>
        <div className="flex justify-around gap-3">
          <button
            onClick={onConfirm}
            className="bg-[#FF0025] hover:bg-red-700 text-white px-12 py-2 rounded-md"
          >
            Yes, delete this
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-300 hover:bg-gray-400 px-14 py-2 rounded-md"
          >
            No, keep it
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
