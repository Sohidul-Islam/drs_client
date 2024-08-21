import React, { useState } from "react";
import { PiExportLight } from "react-icons/pi";
import { useDispatch } from "react-redux";
import {
  exportExcel,
  exportPDF,
} from "../../../../features/export/exportSlice";

const SearchAndExport = ({ searchQuery, onSearchChange, data }) => {
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Export PDF and Excel File
  const handleExport = (type) => {
    const columns = [
      "id",
      "manufacture_name",
      "contactPerson",
      "phone",
      "date",
    ];
    const title = "Manufacture Report";

    if (type === "pdf") {
      dispatch(exportPDF({ columns, data: data.data, title }));
    } else if (type === "excel") {
      dispatch(exportExcel({ columns, data: data.data, title }));
    }
    setIsDropdownOpen(false);
  };

  return (
    <div className="flex justify-between py-5">
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
        <div>
          <label className="text-sm font-medium text-[#1F1F1F] mr-2">
            Filter:
          </label>
          <select
            className="text-sm border outline-gray-300 text-gray-700 py-2 px-1 rounded-md"
            // value={statusFilter}
            // onChange={handleStatusFilterChange}
          >
            <option value="all">Active Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

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
