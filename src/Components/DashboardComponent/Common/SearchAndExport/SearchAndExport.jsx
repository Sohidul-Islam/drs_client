import React, { useState } from "react";
import { PiExportLight } from "react-icons/pi";
import { useDispatch } from "react-redux";
import {
  exportExcel,
  exportPDF,
} from "../../../../features/export/exportSlice";
import CommonDropdown from "../CommonDropdown/CommonDropdown";

const adjustments = [
  { name: "Income", value: "income" },
  { name: "Expense", value: "expense" },
];

const stockInOut = [
  { name: "In", value: "in" },
  { name: "Out", value: "out" },
];

const events = [
  { name: "Purchase", value: "Purchase" },
  { name: "Sale Returned", value: "Sale Returned" },
  { name: "Sale Order", value: "Sale Order" },
  { name: "Purchase Returned", value: "Purchase Returned" },
  { name: "Damage", value: "Damage" },
  { name: "Correction", value: "Correction" },
  { name: "Opening", value: "Opening" },
];

const SearchAndExport = ({
  searchQuery,
  onSearchChange,
  onFilterChange,
  data,
  columns,
  title,
  advanceFilter,
  name,
}) => {
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Export PDF and Excel File
  const handleExport = (type) => {
    if (type === "pdf") {
      dispatch(exportPDF({ columns, data: data.data, title }));
    } else if (type === "excel") {
      dispatch(exportExcel({ columns, data: data.data, title }));
    }
    setIsDropdownOpen(false);
  };

  return (
    <div className="flex justify-between py-5">
      {/* Search field  */}
      <div>
        <label className="text-sm mr-2">Search:</label>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="border outline-gray-300 text-gray-700 py-[5px] px-2"
        />
      </div>

      <div className="flex items-center gap-2">
        {/* Advance Filter  */}
        <div>
          {advanceFilter && (
            <div className="flex items-center gap-2">
              {/* For stock adjustment  */}
              {name === "stock-adjustment" && (
                <div className="flex items-center gap-2">
                  <CommonDropdown dropdownData={adjustments} itemName="Transaction" level="true" onFilterChange={onFilterChange}/> 
                  <CommonDropdown dropdownData={stockInOut} itemName="Stock In/Out" onFilterChange={onFilterChange}/>
                  <CommonDropdown dropdownData={events} itemName="Event" onFilterChange={onFilterChange}/>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Export  */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="p-2 border rounded-md bg-[#F5F5F5] flex gap-1"
          >
            <span className="text-sm">Export</span> <PiExportLight size={17} />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-lg">
              <button
                onClick={() => handleExport("pdf")}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Export PDF
              </button>
              <button
                onClick={() => handleExport("excel")}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Export Excel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchAndExport;
