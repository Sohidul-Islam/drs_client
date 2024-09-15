import React from "react";
import { IoEyeOutline } from "react-icons/io5";

const EditButton = ({handleEditClick, item}) => {
  return (
    <button onClick={() => handleEditClick(item)} className="bg-[#27BD02] w-5 h-5 px-1 py-[6px] text-white flex justify-center items-center rounded-sm">
      <IoEyeOutline />
    </button>
  );
};

export default EditButton;
