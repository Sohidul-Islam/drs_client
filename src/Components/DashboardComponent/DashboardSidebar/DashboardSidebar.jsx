import React from "react";
import { NavLink } from "react-router-dom";

const navList = [
  {
    id: 1,
    name: "Shop Dashboard",
    path: "/dashboard",
    icon: "",
  },
  {
    id: 2,
    name: "Sales",
    path: "/dashboard/sales",
    icon: "",
  },
  {
    id: 3,
    name: "Products",
    path: "/dashboard/products",
    icon: "",
  },
  {
    id: 4,
    name: "Product Categories",
    path: "/dashboard/product-categories",
    icon: "",
  },
  {
    id: 5,
    name: "Customers",
    path: "/dashboard/customers",
    icon: "",
  },
  {
    id: 6,
    name: "Manufacturer",
    path: "/dashboard/manufacturer",
    icon: "",
  },
  {
    id: 7,
    name: "Supplier",
    path: "/dashboard/supplier",
    icon: "",
  },
];

const DashboardSidebar = () => {
  return (
    <nav>
      {navList.map((nav, index) => (
        <NavLink
          key={index}
          to={nav?.path}
          end={nav.path === '/dashboard'}
          className={({isActive})=> `${isActive? "bg-[#006E9E] text-white" : "text-[#3F3F3F]"} w-full px-5 py-2 font-sora block`}
        >
          {nav?.name}
        </NavLink>
      ))}
    </nav>
  );
};

export default DashboardSidebar;
