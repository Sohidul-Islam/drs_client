import React, { useState } from "react";
import EditButton from "../../Common/EditButton/EditButton";
import { RiDeleteBinLine } from "react-icons/ri";

const data = [
  {
    id: "#01",
    customerName: "John Doe",
    mobileNumber: "123-456-7890",
    orderDate: "05/06/2024",
    total: 10000,
    paid: 7000,
    due: 3000,
    updatedOn: "05/06/2024",
  },
  {
    id: "#02",
    customerName: "Jane Smith",
    mobileNumber: "987-654-3210",
    orderDate: "05/06/2024",
    total: 15000,
    paid: 10000,
    due: 5000,
    updatedOn: "05/06/2024",
  },
  {
    id: "#03",
    customerName: "Alice Johnson",
    mobileNumber: "555-123-4567",
    orderDate: "05/06/2024",
    total: 20000,
    paid: 15000,
    due: 5000,
    updatedOn: "05/06/2024",
  },
  {
    id: "#04",
    customerName: "Bob Brown",
    mobileNumber: "444-987-6543",
    orderDate: "05/06/2024",
    total: 25000,
    paid: 20000,
    due: 5000,
    updatedOn: "05/06/2024",
  },
  {
    id: "#05",
    customerName: "Charlie Davis",
    mobileNumber: "333-555-7777",
    orderDate: "05/06/2024",
    total: 30000,
    paid: 25000,
    due: 5000,
    updatedOn: "05/06/2024",
  },
  {
    id: "#06",
    customerName: "Diana Evans",
    mobileNumber: "222-444-6666",
    orderDate: "05/06/2024",
    total: 35000,
    paid: 30000,
    due: 5000,
    updatedOn: "05/06/2024",
  },
  {
    id: "#07",
    customerName: "Frank Green",
    mobileNumber: "111-222-3333",
    orderDate: "05/06/2024",
    total: 40000,
    paid: 35000,
    due: 5000,
    updatedOn: "05/06/2024",
  },
  {
    id: "#08",
    customerName: "Grace Harris",
    mobileNumber: "666-777-8888",
    orderDate: "05/06/2024",
    total: 45000,
    paid: 40000,
    due: 5000,
    updatedOn: "05/06/2024",
  },
  {
    id: "#09",
    customerName: "Henry Jackson",
    mobileNumber: "999-000-1111",
    orderDate: "05/06/2024",
    total: 50000,
    paid: 45000,
    due: 5000,
    updatedOn: "05/06/2024",
  },
  {
    id: "#10",
    customerName: "Ivy King",
    mobileNumber: "888-999-0000",
    orderDate: "05/06/2024",
    total: 55000,
    paid: 50000,
    due: 5000,
    updatedOn: "05/06/2024",
  },
];


const SalesTable = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = data.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleDelete = (id) => {
    console.log(id)
  }

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
          <thead className="bg-gray-50 whitespace-nowrap">
            <tr>
              {[
                "ID",
                "Customer Name",
                "Mobile Number",
                "Order Date",
                "Total",
                "Paid",
                "Due",
                "Updater On",
                "Action"
              ].map((heading) => (
                <th
                  key={heading}
                  scope="col"
                  className="px-4 text-left text-[13px] font-medium tracking-wider"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((row, idx) => (
              <tr key={idx}>
                <td className="px-4 py-4 whitespace-nowrap text-xs font-medium text-[#0085FF]">
                  {row.id}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row.customerName}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row.mobileNumber}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row.orderDate}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row.total}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row.paid}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row.due}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row.updatedOn}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs flex gap-3">
                  <EditButton />
                  <button
                    onClick={() => handleDelete(row.id)}
                    className="bg-[#CE1124] w-5 h-5 px-1 py-[6px] text-white flex justify-center items-center rounded-sm"
                  >
                    <RiDeleteBinLine />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesTable;
