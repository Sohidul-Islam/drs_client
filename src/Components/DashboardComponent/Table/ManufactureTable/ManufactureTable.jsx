import React, { useState } from "react";
import { useGetAllManufactureQuery } from "../../../../features/api/admin/adminManufactureApi";

const datas = [
  {
    id: 1,
    store_name: "Tech Haven",
    manufacturer_name: "Gadget Corp",
    updater: "John Doe",
    date: "05/01/2024",
    active: "yes",
  },
  {
    id: 2,
    store_name: "Electro World",
    manufacturer_name: "Innovate Inc",
    updater: "Jane Smith",
    date: "12/02/2024",
    active: "no",
  },
  {
    id: 3,
    store_name: "Gizmo Galaxy",
    manufacturer_name: "Tech Masters",
    updater: "Michael Johnson",
    date: "23/03/2024",
    active: "yes",
  },
  {
    id: 4,
    store_name: "Device Depot",
    manufacturer_name: "Future Tech",
    updater: "Emily Davis",
    date: "17/04/2024",
    active: "no",
  },
  {
    id: 5,
    store_name: "Gadget Zone",
    manufacturer_name: "ElectroWorks",
    updater: "Chris Brown",
    date: "09/05/2024",
    active: "yes",
  },
  {
    id: 6,
    store_name: "Tech Hub",
    manufacturer_name: "GizmoTech",
    updater: "Anna Wilson",
    date: "14/06/2024",
    active: "no",
  },
  {
    id: 7,
    store_name: "Digital Den",
    manufacturer_name: "Smart Devices",
    updater: "James Taylor",
    date: "21/07/2024",
    active: "yes",
  },
  {
    id: 8,
    store_name: "ElectroMart",
    manufacturer_name: "Hi-Tech Solutions",
    updater: "Patricia Miller",
    date: "30/08/2024",
    active: "no",
  },
  {
    id: 9,
    store_name: "Gadget City",
    manufacturer_name: "Innovative Gadgets",
    updater: "Robert Moore",
    date: "11/09/2024",
    active: "yes",
  },
  {
    id: 10,
    store_name: "Device Central",
    manufacturer_name: "Techno Corp",
    updater: "Linda Martinez",
    date: "25/10/2024",
    active: "no",
  },
];

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

  console.log(isLoading)
  console.log("manufacturer:", data);

  if (isLoading) {
    return <div>Loading...</div>;
  }
 

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = datas.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
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
                "Store",
                "Manufacturer Name",
                "Updater",
                "Updater On",
                "Active",
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
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row.store_name}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row.manufacturer_name}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row.updater}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row.date}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManufactureTable;
