import React from "react";
import { AiOutlineDollarCircle } from "react-icons/ai";
import CreateSalesProductForm from "../../../Components/DashboardComponent/Table/SalesTable/CreateSalesProductForm";
import CreateSalesProductTable from "../../../Components/DashboardComponent/Table/SalesTable/CreateSalesProductTable";
import CreateSalesPaymentForm from "../../../Components/DashboardComponent/Table/SalesTable/CreateSalesPaymentForm";
import CreateSalesPaymentTable from "../../../Components/DashboardComponent/Table/SalesTable/CreateSalesPaymentTable";

const CreateSales = () => {
  return (
    <div className="relative">
      <div className="flex items-center gap-x-[10px]">
        <AiOutlineDollarCircle className="text-lg" />
        <p>Create New Sales Orders</p>
      </div>

       {/* product form and table  */}
      <div className="mt-3">
        <CreateSalesProductForm />
        <CreateSalesProductTable />
      </div>

      {/* payment form and table  */}
      <div>
        <CreateSalesPaymentForm />
        <CreateSalesPaymentTable />
      </div>
    </div>
  );
};

export default CreateSales;
