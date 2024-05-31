import React from "react";
import ShopCard from "../../../Components/DashboardComponent/ShopCard/ShopCard";

const Dashboard = () => {
  return (
    <div>
      <p>Dashboard Home Page</p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
        <ShopCard title="Sale Order" color="#006E9E"/>
        <ShopCard title="Purchase Order" color="#955176"/>
        <ShopCard title="Total Products" color="#E79C25"/>
        <ShopCard title="Stock Items" color="#AE463B"/>
        <ShopCard title="Stock Adjustment" color="#009F8E"/>
      </div>
    </div>
  );
};

export default Dashboard;
