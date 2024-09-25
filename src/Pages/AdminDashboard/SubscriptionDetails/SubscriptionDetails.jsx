import React from "react";
import { AiOutlineAudit } from "react-icons/ai";
import ExpiredTable from "../../../Components/DashboardComponent/Table/ExpiredTable/ExpiredTable";

const SubscriptionDetails = () => {
  return (
    <div>
      <div className="flex items-center gap-x-[10px]">
        <AiOutlineAudit className="text-lg" />
        <p>Subscriptions Details</p>
      </div>

      {/*Stock Item Table  */}
      <div className="mt-3">
        <ExpiredTable />
      </div>
    </div>
  );
};

export default SubscriptionDetails;
