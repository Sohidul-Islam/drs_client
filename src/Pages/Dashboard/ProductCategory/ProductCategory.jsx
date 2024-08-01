import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineDatabase } from "react-icons/ai";
import CategoryTable from "../../../Components/DashboardComponent/Table/CategoryTable/CategoryTable";
import { useSelector } from "react-redux";

const ProductCategory = () => {
  // const { role } = useSelector((state) => state.auth);
  // console.log(role)
  const role = "user"; //this is temporary, i have to remove it later and uncomment line no 8

  return (
    <div>
      <div className="flex items-center gap-x-[10px]">
        <AiOutlineDatabase className="text-lg" />
        <p>Product Category</p>
      </div>

      {/*Supplier Table  */}
      <div className="mt-3">
        {role === "admin" && (
          <div className="flex justify-end mr-5 mb-3">
            <Link
              to="create-product-category"
              className="text-[#880015] border border-[#880015] rounded-md px-3 py-1 flex items-center font-medium"
            >
              <span className="text-3xl mr-2">+</span>Create new Category
            </Link>
          </div>
        )}

        <CategoryTable />
      </div>
    </div>
  );
};

export default ProductCategory;
