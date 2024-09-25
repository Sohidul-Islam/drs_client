import React from 'react';
import { AiFillCreditCard } from 'react-icons/ai';
import ExpiringTable from '../../../Components/DashboardComponent/Table/ExpiringTable/ExpiringTable';

const ExpiringStock = () => {
  return (
    <div>
      <div className="flex items-center gap-x-[10px]">
        <AiFillCreditCard className="text-lg" />
        <p>Expiring Stock</p>
      </div>

      {/*Stock Item Table  */}
      <div className="mt-3">
        <ExpiringTable />
      </div>
    </div>
  );
};

export default ExpiringStock;