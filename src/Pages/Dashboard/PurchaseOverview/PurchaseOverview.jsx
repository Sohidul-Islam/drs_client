import React from "react";
import { GoTag } from "react-icons/go";
import PurchaseInvoiceTable from "../../../Components/DashboardComponent/PurchaseInvoiceTable/PurchaseInvoiceTable";

const PurchaseOverview = () => {
  return (
    <div>
      <div className="flex items-center gap-x-[10px]">
        <GoTag className="text-lg" />
        <p>Purchase Overview</p>
      </div>

      {/*Purchase Invoice Table  */}
      <div className=" mt-3">
        <div className="flex justify-end mr-5 mb-3">
          <button className="text-[#880015] border border-[#880015] rounded-md px-3 py-1 flex items-center font-medium">
            <span className="text-3xl mr-2">+</span>Create new purchase
          </button>
        </div>
        <PurchaseInvoiceTable />
      </div>
    </div>
  );
};

export default PurchaseOverview;
