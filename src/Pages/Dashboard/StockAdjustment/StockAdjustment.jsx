import React from 'react';
import { Link } from 'react-router-dom';
import { RiStore3Line } from 'react-icons/ri';
import CustomerTable from '../../../Components/DashboardComponent/Table/CustomerTable/CustomerTable';

const StockAdjustment = () => {
  return (
    <div>
      <div className="flex items-center gap-x-[10px]">
        <RiStore3Line className="text-lg" />
        <p>Stock Adjustment</p>
      </div>

      {/*Supplier Table  */}
      <div className="mt-3">
        <div className="flex justify-end mr-5 mb-3">
          <Link
            to="create-product"
            className="text-[#880015] border border-[#880015] rounded-md px-3 py-1 flex items-center font-medium"
          >
            <span className="text-3xl mr-2">+</span>Create new Stock Adjustment
          </Link>
        </div>
        <CustomerTable />
      </div>
    </div>
  );
};

export default StockAdjustment;