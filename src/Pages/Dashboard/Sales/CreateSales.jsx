import React from "react";
import { AiOutlineDollarCircle } from "react-icons/ai";
import CreateSalesProductForm from "../../../Components/DashboardComponent/Table/SalesTable/CreateSalesProductForm";
import CreateSalesProductTable from "../../../Components/DashboardComponent/Table/SalesTable/CreateSalesProductTable";
import CreateSalesPaymentForm from "../../../Components/DashboardComponent/Table/SalesTable/CreateSalesPaymentForm";
import CreateSalesPaymentTable from "../../../Components/DashboardComponent/Table/SalesTable/CreateSalesPaymentTable";
import { useSelector } from "react-redux";
import { useGetAllSaleProductQuery } from "../../../features/api/seller/saleProductApi";

const CreateSales = () => {
  const { user } = useSelector((state) => state.auth);
   const { data: saleProducts, refetch, isLoading } = useGetAllSaleProductQuery({
    page: 1,
    pageSize: 15,
    searchKey: "",
    status: "inactive",
    sellerId: user?.id || 1,
   });
  
   if (isLoading) {
    return <div>Loading...</div>;
  }

  // console.log("sales product", saleProducts)
  
  return (
    <div className="relative">
      <div className="flex items-center gap-x-[10px]">
        <AiOutlineDollarCircle className="text-lg" />
        <p>Create New Sales Orders</p>
      </div>

       {/* product form and table  */}
      <div className="mt-3">
        <CreateSalesProductForm />
        <CreateSalesProductTable saleProducts={saleProducts} />
      </div>

      {/* payment form and table  */}
      <div>
        <CreateSalesPaymentForm refetchSaleProducts={refetch}/>
        <CreateSalesPaymentTable />
      </div>
    </div>
  );
};

export default CreateSales;
