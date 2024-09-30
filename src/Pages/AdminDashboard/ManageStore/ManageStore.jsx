import React from "react";
import { AiOutlineReconciliation } from "react-icons/ai";
import { Link } from "react-router-dom";
import StockAdjustmentTable from "../../../Components/DashboardComponent/Table/StockAdjustmentTable/StockAdjustmentTable";
import ManageStoreTable from "../../../Components/DashboardComponent/Table/ManageStoreTable/ManageStoreTable";

const ManageStore = () => {
  return (
    <div className="relative h-screen">
      <div className="flex items-center gap-x-[10px]">
        <AiOutlineReconciliation className="text-lg" />
        <p>Manage Store</p>
      </div>

       {/*Stock Adjustment Table  */}
       <div className="mt-3">
        <div className="flex justify-end mr-5 mb-3">
          <Link
            to="create-store"
            className="text-[#880015] border border-[#880015] rounded-md px-3 py-1 flex items-center font-medium"
          >
            <span className="text-3xl mr-2">+</span>Create new Store
          </Link>
        </div>
        <ManageStoreTable />
      </div>
    </div>
  );
};

export default ManageStore;
