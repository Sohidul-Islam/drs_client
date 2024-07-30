import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { GoHome, GoTag, GoCpu, GoGitCompare } from "react-icons/go";
import {
  AiOutlineDollarCircle,
  AiFillProduct,
  AiOutlineDatabase,
  AiOutlineCopy,
  AiOutlineReconciliation,
  AiOutlineAudit,
  AiFillCreditCard,
  AiOutlineGroup
} from "react-icons/ai";
import { GiDiscussion } from "react-icons/gi";
import { RiStore3Line } from "react-icons/ri";
import { PiRowsPlusTop } from "react-icons/pi";

const navList = [
  {
    id: 1,
    name: "Shop Dashboard",
    path: "/dashboard",
    icon: <GoHome />,
    roles: ["user"],
  },
  {
    id: 2,
    name: "Admin Dashboard",
    path: "/admin-dashboard",
    icon: <GoHome />,
    roles: ["admin"],
  },
  {
    id: 3,
    name: "Manage Content",
    path: "/dashboard/manage-content",
    icon: <AiOutlineCopy />,
    roles: ["admin"],
  },
  {
    id: 4,
    name: "Manage Store",
    path: "/dashboard/manage-store",
    icon: <AiOutlineReconciliation />,
    roles: ["admin"],
  },
  {
    id: 5,
    name: "Purchase Overview",
    path: "/dashboard/purchase-overview",
    icon: <GoTag />,
    roles: ["user"],
  },
  {
    id: 6,
    name: "Sales",
    path: "/dashboard/sales",
    icon: <AiOutlineDollarCircle />,
    roles: ["user"],
  },
  {
    id: 7,
    name: "Products",
    path: "/dashboard/products",
    icon: <AiFillProduct />,
    roles: ["user", "admin"],
  },
  {
    id: 8,
    name: "Product Categories",
    path: "/dashboard/product-categories",
    icon: <AiOutlineDatabase />,
    roles: ["user", "admin"],
  },
  {
    id: 9,
    name: "Customers",
    path: "/dashboard/customers",
    icon: <GiDiscussion />,
    roles: ["user", "admin"],
  },
  {
    id: 10,
    name: "Manufacturer",
    path: "/dashboard/manufacturer",
    icon: <GoCpu />,
    roles: ["user", "admin"],
  },
  {
    id: 11,
    name: "Supplier",
    path: "/dashboard/supplier",
    icon: <GoGitCompare />,
    roles: ["user", "admin"],
  },
  {
    id: 12,
    name: "Stock Adjustment",
    path: "/dashboard/stock-adjustment",
    icon: <RiStore3Line />,
    roles: ["user"],
  },
  {
    id: 13,
    name: "Stock Item",
    path: "/dashboard/stock-item",
    icon: <PiRowsPlusTop />,
    roles: ["user"],
  },
  {
    id: 14,
    name: "Manage Plan",
    path: "/dashboard/manage-plan",
    icon: <AiOutlineAudit />,
    roles: ["admin"],
  },
  {
    id: 15,
    name: "Expiring Stock",
    path: "/dashboard/expiring-stock",
    icon: <AiFillCreditCard />,
    roles: ["user"],
  },
  {
    id: 16,
    name: "Expired Stock",
    path: "/dashboard/expired-stock",
    icon: <AiOutlineGroup />,
    roles: ["user"],
  },
];

const DashboardSidebar = () => {
  const [role, setRole] = useState("admin");

  return (
    <nav>
      {navList
        .filter((item) => item.roles.includes(role))
        .map((nav, index) => (
          <NavLink
            key={index}
            to={nav?.path}
            end={nav.path === "/dashboard"}
            className={({ isActive }) =>
              `${
                isActive ? "bg-[#006E9E] text-white" : "text-[#3F3F3F]"
              } w-full text-nowrap px-5 py-3 flex gap-x-2 items-center`
            }
          >
            <span className="text-xl">{nav?.icon}</span>{" "}
            <span className="text-sm">{nav?.name}</span>
          </NavLink>
        ))}

      {/* temporary test user and admin, when you will remove this portion, also remove useState hook  */}
      <div className="ml-5 mt-5">
        <p className="text-xs">Temporary Button - {role}</p>
        <button
          onClick={() => setRole("user")}
          className="mr-3 bg-red-700 text-white text-sm px-2 py-1 rounded"
        >
          Seller
        </button>
        <button
          onClick={() => setRole("admin")}
          className=" bg-green-700 text-white text-sm px-2 py-1 rounded"
        >
          Admin
        </button>
      </div>
    </nav>
  );
};

export default DashboardSidebar;
