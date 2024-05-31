import React from "react";
import { GoChecklist } from "react-icons/go";

const ShopCard = ({title,  color }) => {
  return (
    <div
      className="h-[116px] rounded-md font-sora text-white px-4 py-4"
      style={{ backgroundColor: color }}
    >
      <div className="flex items-center gap-x-2">
        <div className="w-9 h-9 rounded-md bg-white flex justify-center items-center">
          <GoChecklist size={25} fill={color} />
        </div>
        <div>
          <p className="text-sm text-nowrap">{title}</p>
          <p className="text-2xl font-semibold mt-1">120</p>
        </div>
      </div>
      <div className="text-end mt-3 text-[15px]">
        <button>
          +<span className="underline">Create New</span>
        </button>
      </div>
    </div>
  );
};

export default ShopCard;
