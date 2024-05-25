import React from "react";
import { Outlet } from "react-router-dom";
import DashboardNavbar from "../../Components/DashboardComponent/DashboardNavbar/DashboardNavbar";
import DashboardSidebar from "../../Components/DashboardComponent/DashboardSidebar/DashboardSidebar";

const DashboardLayout = () => {
  return (
    <div>
      <DashboardNavbar />
      <div className="grid grid-cols-6">
        <div className="col-span-1 border-r border-[#E9E9E9] min-h-screen">
          <DashboardSidebar />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
