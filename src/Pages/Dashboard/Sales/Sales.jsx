import React from 'react';
import { AiOutlineDollarCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import SalesTable from '../../../Components/DashboardComponent/Table/SalesTable/SalesTable';

const Sales = () => {
  return (
    <div>
      <div className="flex items-center gap-x-[10px]">
        <AiOutlineDollarCircle className="text-lg" />
        <p>Sales Orders</p>
      </div>

      {/*Sales Orders Table  */}
      <div className="mt-3">
        <div className="flex justify-end mr-5 mb-3">
          <Link to="create-sales" className="text-[#880015] border border-[#880015] rounded-md px-3 py-1 flex items-center font-medium">
            <span className="text-3xl mr-2">+</span>Create new Sale Order
          </Link>
        </div>
        <SalesTable />
      </div>
    </div>
  );
};

export default Sales;