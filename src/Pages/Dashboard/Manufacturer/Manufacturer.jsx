import React from "react";
import { GoCpu } from "react-icons/go";
import ManufactureTable from "../../../Components/DashboardComponent/Table/ManufactureTable/ManufactureTable";

const Manufacturer = () => {
  return (
    <div>
      <div className="flex items-center gap-x-[10px]">
        <GoCpu className="text-lg" />
        <p>Manufacturer</p>
      </div>

      {/*Manufacture Table  */}
      <div className="mt-3">
        <div className="flex justify-end mr-5 mb-3">
          <button className="text-[#880015] border border-[#880015] rounded-md px-3 py-1 flex items-center font-medium">
            <span className="text-3xl mr-2">+</span>Create new Manufacturer
          </button>
        </div>
        <ManufactureTable />
      </div>
    </div>
  );
};

export default Manufacturer;
