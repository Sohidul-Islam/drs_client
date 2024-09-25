import React from 'react';
import { GiDiscussion } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import CustomerTable from '../../../Components/DashboardComponent/Table/CustomerTable/CustomerTable';

const Customers = () => {
  return (
    <div>
      <div className="flex items-center gap-x-[10px]">
        <GiDiscussion className="text-lg" />
        <p>Customer</p>
      </div>

      {/*Supplier Table  */}
      <div className="mt-3">
        <div className="flex justify-end mr-5 mb-3">
          <Link
            to="create-customer"
            className="text-[#880015] border border-[#880015] rounded-md px-3 py-1 flex items-center font-medium"
          >
            <span className="text-3xl mr-2">+</span>Create new Customer
          </Link>
        </div>
        <CustomerTable />
      </div>
    </div>
  );
};

export default Customers;