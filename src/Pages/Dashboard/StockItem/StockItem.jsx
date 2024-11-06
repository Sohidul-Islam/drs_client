import React from "react";
import { PiRowsPlusTop } from "react-icons/pi";
import StockItemTable from "../../../Components/DashboardComponent/Table/StockItemTable/StockItemTable";

const StockItem = () => {
  return (
    <div>
      <div className="flex items-center gap-x-[10px]">
        <PiRowsPlusTop className="text-lg" />
        <p>Stock Item</p>
      </div>

      {/*Stock Item Table  */}
      <div className="mt-3">
        <StockItemTable />
      </div>
    </div>
  );
};

export default StockItem;
