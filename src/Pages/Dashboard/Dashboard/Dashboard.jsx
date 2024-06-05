import React from "react";
import ShopCard from "../../../Components/DashboardComponent/ShopCard/ShopCard";
import ReportCard from "../../../Components/DashboardComponent/ReportCard/ReportCard";
import StoreCard from "../../../Components/DashboardComponent/StoreCard/StoreCard";

const reports = [
  {
    id: "1",
    title: "Sale/Purchase Report",
    list1: "Day and Item Wise Sale",
    list2: "Day Wise Purchase",
    color: "#5066F2",
  },
  {
    id: "2",
    title: "Profit/Loss Report",
    list1: "Today's Summary",
    list2: "This Month Summary",
    color: "#177833",
  },
  {
    id: "3",
    title: "Stock Report",
    list1: "Stock Items",
    list2: "Stock Item (batch Wise)",
    color: "#006E9E",
  },
  {
    id: "4",
    title: "Medicine Expiry Report",
    list1: "Expired Medicine/Products",
    list2: "Expiring Within 06 Month",
    color: "#E4B904",
  },
];

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
      <div className="mt-4 grid grid-cols-3 gap-x-8">
        <div className="col-span-1 grid grid-cols-1 gap-y-3">
          <StoreCard
            title="Today's Store"
            purchaseBgColor="#E2FFE3"
            saleBgColor="#DBF1FC"
            purchaseColor="#3C763D"
            saleColor="#31708F"
          />
          <StoreCard
            title="This Month Store"
            purchaseBgColor="#FFFAE4"
            saleBgColor="#FBDDE2"
            purchaseColor="#BA9703"
            saleColor="#880015"
          />
        </div>
        <div className="col-span-2 grid grid-cols-2 gap-x-8 gap-y-3">
          {reports.map((report, index) => (
            <ReportCard key={index} report={report} />
          ))}
          {/* <ReportCard />
          <ReportCard />
          <ReportCard />
          <ReportCard /> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
