import React, { useEffect, useState } from "react";
import {
  useDeleteManufacturerMutation,
  useGetAllManufactureQuery,
} from "../../../../features/api/admin/adminManufactureApi";
import EditButton from "../../Common/EditButton/EditButton";
import { useDispatch, useSelector } from "react-redux";
import {
  closeModal,
  openModal,
} from "../../../../features/deleteModal/deleteModalSlice";
import { toast } from "react-toastify";
import DeleteConfirmationModal from "../../Common/DeleteConfirmationModal/DeleteConfirmationModal";
import Pagination from "../../Common/Pagination/Pagination";
import SearchAndExport from "../../Common/SearchAndExport/SearchAndExport";
import DeleteButton from "../../Common/DeleteButton/DeleteButton";

const ManufactureTable = () => {
  const dispatch = useDispatch();
  const { isModalOpen, selectedItemId } = useSelector(
    (state) => state.deleteModal
  );
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

  // Delete 
  // open delete modal
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

  // close delete modal
  const handleCancelDelete = () => {
    dispatch(closeModal());
  };

  return (
    <div className="bg-white px-5">
      {/* Search and Export */}
      <SearchAndExport
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        data={data}
        columns={["id", "manufacture_name", "contactPerson", "phone", "date"]}
        title="Manufacture Report"
      />

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
                  {row?.id}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row?.manufacture_name}
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
                  {row?.phoneNumber}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row?.date}
                </td>
                {/* update and delete button  */}
                <td className="px-4 py-4 whitespace-nowrap text-xs flex gap-3">
                  <EditButton />
                  <DeleteButton id={row.id} onDelete={handleDeleteClick} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* pagination  */}
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          setPageSize={setPageSize}
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
