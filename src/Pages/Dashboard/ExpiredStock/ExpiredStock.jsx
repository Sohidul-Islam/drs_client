import React from 'react';
import { AiOutlineGroup } from 'react-icons/ai';
import ExpiredTable from '../../../Components/DashboardComponent/Table/ExpiredTable/ExpiredTable';

const ExpiredStock = () => {
  return (
    <div>
      <div className="flex items-center gap-x-[10px]">
        <AiOutlineGroup className="text-lg" />
        <p>Expired Stock</p>
      </div>

      {/*Stock Item Table  */}
      <div className="mt-3">
        <ExpiredTable />
      </div>
    </div>
  );
};

export default ExpiredStock;