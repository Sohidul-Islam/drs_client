import React from "react";
import { AiOutlineAudit } from "react-icons/ai";
import SubscriptionDetailsTable from "../../../Components/DashboardComponent/Table/SubscriptionDetailsTable/SubscriptionDetailsTable";

const SubscriptionDetails = () => {
  return (
    <div>
      <div className="flex items-center gap-x-[10px]">
        <AiOutlineAudit className="text-lg" />
        <p>Subscriptions Details</p>
      </div>

      {/*Stock Item Table  */}
      <div className="mt-3">
        <SubscriptionDetailsTable />
      </div>
    </div>
  );
};

export default SubscriptionDetails;
