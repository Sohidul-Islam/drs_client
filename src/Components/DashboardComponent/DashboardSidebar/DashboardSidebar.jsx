import React from "react";
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
import { useSelector } from "react-redux";

const navList = [
  {
    id: 1,
    name: "Shop Dashboard",
    path: "/dashboard",
    icon: <GoHome />,
    roles: ["seller"],
  },
  {
    id: 2,
    name: "Admin Dashboard",
    path: "/dashboard",
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
    roles: ["seller"],
  },
  {
    id: 6,
    name: "Sales",
    path: "/dashboard/sales",
    icon: <AiOutlineDollarCircle />,
    roles: ["seller"],
  },
  {
    id: 7,
    name: "Products",
    path: "/dashboard/products",
    icon: <AiFillProduct />,
    roles: ["seller"],
  },
  {
    id: 8,
    name: "Dosage Form",
    path: "/dashboard/dosage-form",
    icon: <AiOutlineDatabase />,
    roles: [ "admin"],
  },
  {
    id: 9,
    name: "Product Categories",
    path: "/dashboard/product-categories",
    icon: <AiOutlineDatabase />,
    roles: ["seller", "admin"],
  },
  {
    id: 10,
    name: "Customers",
    path: "/dashboard/customers",
    icon: <GiDiscussion />,
    roles: ["seller"],
  },
  {
    id: 11,
    name: "Manufacturer",
    path: "/dashboard/manufacturer",
    icon: <GoCpu />,
    roles: ["seller", "admin"],
  },
  {
    id: 12,
    name: "Supplier",
    path: "/dashboard/supplier",
    icon: <GoGitCompare />,
    roles: ["seller", "admin"],
  },
  {
    id: 13,
    name: "Stock Adjustment",
    path: "/dashboard/stock-adjustment",
    icon: <RiStore3Line />,
    roles: ["seller"],
  },
  {
    id: 14,
    name: "Stock Item",
    path: "/dashboard/stock-item",
    icon: <PiRowsPlusTop />,
    roles: ["seller"],
  },
  {
    id: 15,
    name: "Subscription Details",
    path: "/dashboard/subscription-details",
    icon: <AiOutlineAudit />,
    roles: ["admin"],
  },
  {
    id: 16,
    name: "Expiring Stock",
    path: "/dashboard/expiring-stock",
    icon: <AiFillCreditCard />,
    roles: ["seller"],
  },
  {
    id: 17,
    name: "Expired Stock",
    path: "/dashboard/expired-stock",
    icon: <AiOutlineGroup />,
    roles: ["seller"],
  },
];

const DashboardSidebar = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <nav>
      {navList
        .filter((item) => item.roles.includes(user.accountType))
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
            <span className="text-xl">{nav?.icon}</span>
            <span className="text-sm">{nav?.name}</span>
          </NavLink>
        ))}
    </nav>
  );
};

export default DashboardSidebar;
