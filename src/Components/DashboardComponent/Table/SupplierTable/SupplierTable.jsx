import React, { useState } from "react";

const suppliers = [
  {
    id: 1,
    store_name: "Health Haven",
    supplier_name: "Gizmo Corp",
    updater: "Alex Johnson",
    date: "05/01/2024",
    active: "yes",
  },
  {
    id: 2,
    store_name: "Wellness World",
    supplier_name: "InnovaTech",
    updater: "Samantha Williams",
    date: "12/02/2024",
    active: "no",
  },
  {
    id: 3,
    store_name: "Pharma Galaxy",
    supplier_name: "Tech Giants",
    updater: "Daniel Robinson",
    date: "23/03/2024",
    active: "yes",
  },
  {
    id: 4,
    store_name: "Medic Depot",
    supplier_name: "Future Innovations",
    updater: "Victoria Clark",
    date: "17/04/2024",
    active: "no",
  },
  {
    id: 5,
    store_name: "Drug Zone",
    supplier_name: "ElectroTech",
    updater: "Andrew Lee",
    date: "09/05/2024",
    active: "yes",
  },
  {
    id: 6,
    store_name: "Medicine Store",
    supplier_name: "Gizmo Solutions",
    updater: "Megan Turner",
    date: "14/06/2024",
    active: "no",
  },
  {
    id: 7,
    store_name: "Pharmacy Hub",
    supplier_name: "Smart Gadgets",
    updater: "Jonathan Harris",
    date: "21/07/2024",
    active: "yes",
  },
  {
    id: 8,
    store_name: "HealthMart",
    supplier_name: "High-Tech Innovations",
    updater: "Natalie Walker",
    date: "30/08/2024",
    active: "no",
  },
  {
    id: 9,
    store_name: "Medic Land",
    supplier_name: "Innovative Solutions",
    updater: "Kevin Edwards",
    date: "11/09/2024",
    active: "yes",
  },
  {
    id: 10,
    store_name: "Drug Central",
    supplier_name: "Tech Innovations",
    updater: "Sophia Harris",
    date: "25/10/2024",
    active: "no",
  },
];


const SupplierTable = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = suppliers.filter((row) =>
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
                "Supplier Name",
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
                  {row.date}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row.active}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupplierTable;
