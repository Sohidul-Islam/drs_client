import React from "react";
import { FiTag } from "react-icons/fi";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { FcCalendar } from "react-icons/fc";

const StoreCard = ({
  title,
  purchaseBgColor,
  saleBgColor,
  purchaseColor,
  saleColor,
}) => {
  return (
    <div className="bg-white border p-5 py-3 rounded-md">
      <div className="flex items-center gap-x-[6px]">
        <FcCalendar size={20} />
        <p>{title}</p>
      </div>
      <hr className="my-2 w-full border text-black" />
      <div className="mt-5">
        <div className="bg-[#E2FFE3] flex items-center gap-x-[6px] rounded-md text-sm p-3" style={{ backgroundColor: purchaseBgColor }}>
          <FiTag size={20} style={{ color: purchaseColor }} />
          <p style={{ color: purchaseColor }}>Purchase Amount: 10,000 BDT</p>
        </div>
        <div className="flex items-center gap-x-[6px] rounded-md text-sm p-3 mt-3" style={{ backgroundColor: saleBgColor }}>
          <AiOutlineDollarCircle size={20} style={{ color: saleColor }} />
          <p style={{ color: saleColor }}>Sale Amount: 5,000 BDT</p>
        </div>
      </div>
    </div>
  );
};

export default StoreCard;
