import React from "react";
import { NavLink } from "react-router-dom";
import { GoHome, GoTag, GoCpu , GoGitCompare} from "react-icons/go";
import { AiOutlineDollarCircle, AiFillProduct, AiOutlineDatabase } from "react-icons/ai";
import { GiDiscussion } from "react-icons/gi";
import { RiStore3Line } from "react-icons/ri";
import { PiRowsPlusTop } from "react-icons/pi";

const navList = [
  {
    id: 1,
    name: "Shop Dashboard",
    path: "/dashboard",
    icon: <GoHome />,
  },
  {
    id: 2,
    name: "Purchase Overview",
    path: "/dashboard/purchase-overview",
    icon: <GoTag />,
  },
  {
    id: 3,
    name: "Sales",
    path: "/dashboard/sales",
    icon: <AiOutlineDollarCircle />,
  },
  {
    id: 4,
    name: "Products",
    path: "/dashboard/products",
    icon: <AiFillProduct />,
  },
  {
    id: 5,
    name: "Product Categories",
    path: "/dashboard/product-categories",
    icon: <AiOutlineDatabase />,
  },
  {
    id: 6,
    name: "Customers",
    path: "/dashboard/customers",
    icon: <GiDiscussion />,
  },
  {
    id: 7,
    name: "Manufacturer",
    path: "/dashboard/manufacturer",
    icon: <GoCpu />,
  },
  {
    id: 8,
    name: "Supplier",
    path: "/dashboard/supplier",
    icon: <GoGitCompare />,
  },
  {
    id: 9,
    name: "Stock Adjustment",
    path: "/dashboard/stock-adjustment",
    icon: <RiStore3Line />,
  },
  {
    id: 10,
    name: "Stock Item",
    path: "/dashboard/stock-item",
    icon: <PiRowsPlusTop />,
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
          className={({isActive})=> `${isActive? "bg-[#006E9E] text-white" : "text-[#3F3F3F]"} w-full text-nowrap px-5 py-3 flex gap-x-2 items-center`}
        >
          <span className="text-xl">{nav?.icon}</span> <span className="text-sm">{nav?.name}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default DashboardSidebar;
