import React from "react";
import { Outlet } from "react-router-dom";
import DashboardNavbar from "../../Components/DashboardComponent/DashboardNavbar/DashboardNavbar";
import DashboardSidebar from "../../Components/DashboardComponent/DashboardSidebar/DashboardSidebar";

const DashboardLayout = () => {
  return (
    <div>
      <div className="">
        <DashboardNavbar />
      </div>
      <div className="grid grid-cols-6">
        <div className="col-span-1 border-r border-[#E9E9E9] min-h-screen py-4">
          <DashboardSidebar />
        </div>
        <div className="col-span-5 p-4 bg-[#F9F9F9]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
