import React, { useEffect, useState } from "react";
import {
  useDeleteManufacturerMutation,
  useGetAllManufactureQuery,
} from "../../../../features/api/admin/adminManufactureApi";
import EditButton from "../../Common/EditButton/EditButton";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  closeModal,
  openModal,
} from "../../../../features/deleteModal/deleteModalSlice";
import { toast } from "react-toastify";
import DeleteConfirmationModal from "../../Common/DeleteConfirmationModal/DeleteConfirmationModal";
import { PiExportLight } from "react-icons/pi";
import {
  exportExcel,
  exportPDF,
} from "../../../../features/export/exportSlice";
import Pagination from "../../Common/Pagination/Pagination";

const ManufactureTable = () => {
  const dispatch = useDispatch();
  const { isModalOpen, selectedItemId } = useSelector(
    (state) => state.deleteModal
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading } = useGetAllManufactureQuery({
    page: currentPage,
    pageSize: pageSize,
    searchKey: searchQuery,
  });

  const [deleteManufacturer] = useDeleteManufacturerMutation();

  useEffect(() => {
    setCurrentPage(1);
  }, [pageSize]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const { totalPages } = data.metadata;

  console.log(data, "manufacture data");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

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
      dispatch(exportPDF({ columns, data: data, title }));
    } else if (type === "excel") {
      dispatch(exportExcel({ columns, data: data, title }));
    }
    setIsDropdownOpen(false);
  };

  // Delete manufacture - open modal
  const handleDeleteClick = (id) => {
    dispatch(openModal({ id }));
  };

  // delete confirm
  const handleConfirmDelete = async () => {
    try {
      const res = await deleteManufacturer(selectedItemId).unwrap();
      if (res.status) {
        toast.success("Item deleted successfully");
      }
    } catch (error) {
      console.error("Failed to delete the supplier:", error);
    } finally {
      dispatch(closeModal());
    }
  };

  // delete close modal
  const handleCancelDelete = () => {
    dispatch(closeModal());
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

      {/* Table and pagination  */}
      <div className="overflow-x-auto">
        {/* Table  */}
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "ID",
                "Manufacturer Name",
                "Added By",
                "Contact Person",
                "Mobile Number",
                "Update On",
                "Action",
              ].map((heading) => (
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
            {data?.data?.map((row, index) => (
              <tr key={index}>
                <td className="px-4 py-4 whitespace-nowrap text-xs font-medium text-[#0085FF]">
                  {row.id}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row.manufacture_name}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  <span className="px-5 py-2 text-white bg-[#8C8C8C] border rounded-full">
                    {row?.accountType === "admin"
                      ? "Global"
                      : row.shop_owner_nam}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row?.contactPerson}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row?.phone}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row.date}
                </td>
                {/* update and delete button  */}
                <td className="px-4 py-4 whitespace-nowrap text-xs flex gap-3">
                  <EditButton />
                  <button
                    onClick={() => handleDeleteClick(row?.id)}
                    className="bg-[#CE1124] w-5 h-5 px-1 py-[6px] text-white flex justify-center items-center rounded-sm"
                  >
                    <RiDeleteBinLine />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* pagination  */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          setPageSize={setPageSize}
          setCurrentPage={setCurrentPage}
        />
      </div>

      {/* Delete Modal  */}
      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default ManufactureTable;
