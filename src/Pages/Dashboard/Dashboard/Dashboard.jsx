import React from "react";
import ShopCard from "../../../Components/DashboardComponent/ShopCard/ShopCard";
import ReportCard from "../../../Components/DashboardComponent/ReportCard/ReportCard";

const Dashboard = () => {
  return (
    <div>
      <p>Dashboard Home Page</p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
        <ShopCard title="Sale Order" color="#006E9E" />
        <ShopCard title="Purchase Order" color="#955176" />
        <ShopCard title="Total Products" color="#E79C25" />
        <ShopCard title="Stock Items" color="#AE463B" />
        <ShopCard title="Stock Adjustment" color="#009F8E" />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-x-10">
        <div className="col-span-1 grid grid-cols-1 gap-y-3">
          {/* <ReportCard />
          <ReportCard /> */}
        </div>
        <div className="col-span-2 grid grid-cols-2 gap-x-10 gap-y-3">
        <ReportCard />
        <ReportCard />
        <ReportCard />
        <ReportCard />
        </div>
        
        {/* <ReportCard/> */}
      </div>
    </div>
  );
};

export default Dashboard;
