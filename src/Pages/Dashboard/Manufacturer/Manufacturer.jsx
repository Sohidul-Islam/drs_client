import React from "react";
import { GoCpu } from "react-icons/go";
import ManufactureTable from "../../../Components/DashboardComponent/Table/ManufactureTable/ManufactureTable";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Manufacturer = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <div className="flex items-center gap-x-[10px]">
        <GoCpu className="text-lg" />
        <p>Manufacturer</p>
      </div>

      {/*Manufacture Table  */}
      <div className="mt-3">
        {user?.accountType === "admin" && (
          <div className="flex justify-end mr-5 mb-3">
            <Link
              to="create-manufacturer"
              className="text-[#880015] border border-[#880015] rounded-md px-3 py-1 flex items-center font-medium"
            >
              <span className="text-3xl mr-2">+</span>Create new Manufacturer
            </Link>
          </div>
        )}

        <ManufactureTable />
      </div>
    </div>
  );
};

export default Manufacturer;
