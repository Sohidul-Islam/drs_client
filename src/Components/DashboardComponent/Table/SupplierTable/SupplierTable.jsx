import React, { useEffect, useState } from "react";
import "jspdf-autotable";
import { useGetAllSupplierQuery } from "../../../../features/api/admin/adminSupplierApi";
import { PiExportLight } from "react-icons/pi";
import { useDispatch } from "react-redux";
import {
  exportExcel,
  exportPDF,
} from "../../../../features/export/exportSlice";

const tableHead = [
  "ID",
  "Store",
  "Supplier Name",
  "Updater",
  "Updater On",
  "Active",
];

const SupplierTable = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { data, isLoading } = useGetAllSupplierQuery({
    page: currentPage,
    pageSize: pageSize,
    searchKey: "",
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [pageSize]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const { totalPages } = data.metadata;

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to check if any field in the row matches the search query
  const filterData = (rowData) => {
    const matchesSearchQuery = Object.values(rowData).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    );

    const matchesStatusFilter =
      statusFilter === "all" || rowData.status.toLowerCase() === statusFilter;

    return matchesSearchQuery && matchesStatusFilter;
  };
  // Filter data based on search query
  const filteredData = data?.data?.filter(filterData);

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
    setCurrentPage(1);
  };

  // Export PDF and Excel File
  const handleExport = (type) => {
    const columns = [
      "id",
      "store_name",
      "supplier_name",
      "updater",
      "date",
      "status",
    ];
    const title = "Supplier Report";

    if (type === "pdf") {
      dispatch(exportPDF({ columns, data: filteredData, title }));
    } else if (type === "excel") {
      dispatch(exportExcel({ columns, data: filteredData, title }));
    }
    setIsDropdownOpen(false);
  };

  return (
    <div className="bg-white px-5">
      {/* Search and Export */}
      <div className="flex justify-between py-5">
        <div>
          <label className="text-sm mr-2">Search:</label>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
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
              value={statusFilter}
              onChange={handleStatusFilterChange}
            >
              <option value="all">Active Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="relative">
            <button
              onClick={()=> setIsDropdownOpen(!isDropdownOpen)}
              className="p-2 border rounded-md bg-[#F5F5F5] flex gap-1"
            >
              <span className="text-sm">Export</span>{" "}
              <PiExportLight size={17} />
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

      {/* supplier table  */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {tableHead.map((heading) => (
                <th
                  key={heading}
                  scope="col"
                  className="px-4 py-3 text-left text-[13px] font-medium tracking-wider"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((row, index) => (
              <tr key={index}>
                <td className="px-4 py-4 whitespace-nowrap text-xs font-medium text-[#0085FF]">
                  {row.id}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row.store_name}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row.supplier_name}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row.updater}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row.date.slice(0, 10)}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="border-t">
          <div className="my-4 flex justify-between">
            <div>
              <label className="text-sm font-medium text-[#1F1F1F] mr-2">
                Show
              </label>
              <select
                className="text-sm border outline-gray-300 text-gray-700 py-1 px-1 rounded-md"
                value={pageSize}
                onChange={handlePageSizeChange}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </div>
            <div>
              <button
                onClick={handlePrevious}
                className={`border px-3 py-1 text-base ${
                  currentPage === 1
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer"
                }`}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                className={`border px-3 py-1 text-base ${
                  currentPage === totalPages
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer"
                }`}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierTable;
