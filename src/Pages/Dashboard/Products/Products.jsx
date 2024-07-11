import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillProduct } from 'react-icons/ai';
import ProductsTable from '../../../Components/DashboardComponent/Table/ProductsTable/ProductsTable';

const Products = () => {
  return (
    <div>
      <div className="flex items-center gap-x-[10px]">
        <AiFillProduct className="text-lg" />
        <p>Products Overview</p>
      </div>

      {/*Supplier Table  */}
      <div className="mt-3">
        <div className="flex justify-end mr-5 mb-3">
          <Link
            to="create-product"
            className="text-[#880015] border border-[#880015] rounded-md px-3 py-1 flex items-center font-medium"
          >
            <span className="text-3xl mr-2">+</span>Create new Product
          </Link>
        </div>
        <ProductsTable />
      </div>
    </div>
  );
};

export default Products;