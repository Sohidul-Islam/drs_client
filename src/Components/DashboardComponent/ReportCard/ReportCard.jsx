import React from "react";
import { LuClipboardList } from "react-icons/lu";

const ReportCard = ({ report }) => {
  const {  title, list1, list2, color } = report;

  return (
    <div className="bg-white border px-5 py-3 rounded-md">
      <div className="flex items-center gap-x-[6px]">
        <LuClipboardList size={20} style={{ color: color }} />
        <p>{title}</p>
      </div>
      <hr className="my-2 w-full border text-black" />
      <div className="border space-y-2 pb-2 text-sm">
        <div className="px-3 pt-2 pb-1 flex justify-between border-b bg-[#F4F4F4]">
          <h4>Report Name</h4>
          <h4>Action</h4>
        </div>
        <div className="px-3 flex justify-between">
          <h4>{list1}</h4>
          <button
            className="px-[10px] py-[6px] rounded-md text-white"
            style={{ backgroundColor: color }}
          >
            View
          </button>
        </div>
        <div className="px-3 flex justify-between">
          <h4>{list2}</h4>
          <button
            className="px-[10px] py-[6px] rounded-md text-white"
            style={{ backgroundColor: color }}
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
