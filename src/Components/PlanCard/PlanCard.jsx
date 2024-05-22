import React from "react";
import { FaCircleCheck } from "react-icons/fa6";

const PlanCard = ({planeType, price, month, backgroundColor}) => {
  return (
    <div className={` w-full md:max-w-[302px] max-h-[516px] mx-auto bg-white border border-[#E2E2E2] rounded-lg shadow-lg p-5 relative font-sora ${backgroundColor}`}>
      <span className=" bg-[#006E9E] text-white text-xs font-bold px-2 py-1 rounded">
        {planeType}
      </span>
      <div className="mt-6">
        <p className="text-gray-600 text-sm">
          Get access to all premium features.Sign up now and start your journey
          with us.
        </p>
      </div>
      <div className="text-2xl font-semibold my-4">
        {price} BDT <span className="text-xs font-normal">/{month} month</span>
      </div>
      <ul className="space-y-2 text-xs">
        <li className="flex items-center gap-2">
          <FaCircleCheck fill="#006E9E" size={15} />
          All In One Dashboard
        </li>
        <li className="flex items-center gap-2">
          <FaCircleCheck fill="#006E9E" size={15} />
          Create 30 invoices & bills
        </li>
        <li className="flex items-center gap-2">
          <FaCircleCheck fill="#006E9E" size={15} />
          Auto bank reconciliation
        </li>
        <li className="flex items-center gap-2">
          <FaCircleCheck fill="#006E9E" size={15} />
          Run Payroll for 5 employees
        </li>
        <li className="flex items-center gap-2">
          <FaCircleCheck fill="#006E9E" size={15} />
          Create your own sales pipelines
        </li>
        <li className="flex items-center gap-2">
          <FaCircleCheck fill="#006E9E" size={15} />
          Run Email Marketing campaigns
        </li>
      </ul>
      <button className="w-full mt-8 border border-[#858585] rounded-md py-2  text-center hover:text-white hover:bg-[#006E9E]">
        Choose Plan
      </button>
    </div>
  );
};

export default PlanCard;
