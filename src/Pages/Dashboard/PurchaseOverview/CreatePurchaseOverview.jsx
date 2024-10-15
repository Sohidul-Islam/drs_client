import React from "react";
import { GoTag } from "react-icons/go";
import CreatePurchaseProductTable from "../../../Components/DashboardComponent/Table/PurchaseInvoiceTable/CreatePurchaseProductTable";
import CreatePurchasePaymentTable from "../../../Components/DashboardComponent/Table/PurchaseInvoiceTable/CreatePurchasePaymentTable";
import CreatePurchasePaymentForm from "../../../Components/DashboardComponent/Table/PurchaseInvoiceTable/CreatePurchasePaymentForm";
import CreatePurchaseProductForm from "../../../Components/DashboardComponent/Table/PurchaseInvoiceTable/CreatePurchaseProductForm";
import { useGetAllPurchaseProductQuery } from "../../../features/api/seller/purchaseProductApi";
import { useSelector } from "react-redux";

const CreatePurchaseOverview = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: purchaseProducts, refetch } = useGetAllPurchaseProductQuery({
    page: 1,
    pageSize: 15,
    searchKey: "",
    status: "inactive",
    sellerId: user?.id || 1,
  });
  
  return (
    <div className="relative">
      <div className="flex items-center gap-x-[10px]">
        <GoTag className="text-lg" />
        <p>Create New Purchase</p>
      </div>

       {/* product form and table  */}
      <div className="mt-3">
        <CreatePurchaseProductForm />
        <CreatePurchaseProductTable purchaseProducts={purchaseProducts} />
      </div>

      {/* payment form and table  */}
      <div>
        <CreatePurchasePaymentForm refetchProducts={refetch}/>
        <CreatePurchasePaymentTable />
      </div>
    </div>
  );
};

export default CreatePurchaseOverview;
