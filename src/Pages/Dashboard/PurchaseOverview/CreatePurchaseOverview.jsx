import React from "react";
import { GoTag } from "react-icons/go";
import CreatePurchaseProductTable from "../../../Components/DashboardComponent/Table/PurchaseInvoiceTable/CreatePurchaseProductTable";
import CreatePurchasePaymentTable from "../../../Components/DashboardComponent/Table/PurchaseInvoiceTable/CreatePurchasePaymentTable";
import CreatePurchasePaymentForm from "../../../Components/DashboardComponent/Table/PurchaseInvoiceTable/CreatePurchasePaymentForm";
import CreatePurchaseProductForm from "../../../Components/DashboardComponent/Table/PurchaseInvoiceTable/CreatePurchaseProductForm";

const CreatePurchaseOverview = () => {
  return (
    <div className="relative">
      <div className="flex items-center gap-x-[10px]">
        <GoTag className="text-lg" />
        <p>Create New Purchase</p>
      </div>

       {/* product form and table  */}
      <div className="mt-3">
        <CreatePurchaseProductForm />
        <CreatePurchaseProductTable />
      </div>

      {/* payment form and table  */}
      <div>
        <CreatePurchasePaymentForm />
        <CreatePurchasePaymentTable />
      </div>
    </div>
  );
};

export default CreatePurchaseOverview;
