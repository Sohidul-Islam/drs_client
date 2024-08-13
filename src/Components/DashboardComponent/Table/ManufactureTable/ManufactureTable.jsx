import React, { useState } from "react";
import { useGetAllManufactureQuery } from "../../../../features/api/admin/adminManufactureApi";

const ManufactureTable = () => {
  // const [page, setPage] = useState(1);
  // const [pageSize, setPageSize] = useState(2);
  // const [searchKey, setSearchKey] = useState("Sample");
  const [searchQuery, setSearchQuery] = useState("");

  const { data, error, isLoading } = useGetAllManufactureQuery({
    page: 1,
    pageSize: 15,
    searchKey: "",
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="bg-white px-5">
      {/* search field  */}
      <div className="py-5">
        <label className="text-sm mr-2">Search:</label>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          className="border outline-gray-300 text-gray-700 py-[5px] px-2"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "ID",
                // "Store",
                "Manufacturer Name",
                "Added By",
                "Update On",
                // "Active",
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
            {data.map((row, index) => (
              <tr key={index}>
                <td className="px-4 py-4 whitespace-nowrap text-xs font-medium text-[#0085FF]">
                  {row.id}
                </td>
                {/* <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row.store_name}
                </td> */}
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row.manufacturer_name}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  <span className="px-5 py-2 text-white bg-[#8C8C8C] border rounded-full">
                    {row?.Seller?.accountType === 'admin' ? "Global" : row.updater}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row.date.slice(0, 10)}
                </td>
                {/* <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row.status}
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManufactureTable;
