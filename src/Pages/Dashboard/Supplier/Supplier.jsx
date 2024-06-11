import React from 'react';
import { GoGitCompare } from 'react-icons/go';
import { Link } from 'react-router-dom';
import SupplierTable from '../../../Components/DashboardComponent/Table/SupplierTable/SupplierTable';

const Supplier = () => {
  return (
    <div>
      <div className="flex items-center gap-x-[10px]">
        <GoGitCompare className="text-lg" />
        <p>Supplier</p>
      </div>

      {/*Supplier Table  */}
      <div className="mt-3">
        <div className="flex justify-end mr-5 mb-3">
          <Link
            to="create-manufacturer"
            className="text-[#880015] border border-[#880015] rounded-md px-3 py-1 flex items-center font-medium"
          >
            <span className="text-3xl mr-2">+</span>Create new Supplier
          </Link>
        </div>
        <SupplierTable />
      </div>
    </div>
  );
};

export default Supplier;