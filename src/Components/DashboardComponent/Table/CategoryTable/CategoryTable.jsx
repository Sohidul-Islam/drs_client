import React, { useState } from 'react';
import { useGetAllCustomerQuery } from '../../../../features/api/admin/adminCustomerApi';

// const customers = [
//   {
//     id: 1,
//     customer_name: "Alex Johnson",
//     store_name: "Gizmo Corp",
//     mobile_number: "0123456789",
//     updater: "John Smith",
//     date: "05/01/2024",
//     active: "yes",
//   },
//   {
//     id: 2,
//     customer_name: "Samantha Williams",
//     store_name: "InnovaTech",
//     mobile_number: "0198765432",
//     updater: "Emily Johnson",
//     date: "12/02/2024",
//     active: "no",
//   },
//   {
//     id: 3,
//     customer_name: "Daniel Robinson",
//     store_name: "Tech Giants",
//     mobile_number: "0154321098",
//     updater: "Michael Brown",
//     date: "23/03/2024",
//     active: "yes",
//   },
//   {
//     id: 4,
//     customer_name: "Victoria Clark",
//     store_name: "Future Innovations",
//     mobile_number: "0187654321",
//     updater: "Sarah Davis",
//     date: "17/04/2024",
//     active: "no",
//   },
//   {
//     id: 5,
//     customer_name: "Andrew Lee",
//     store_name: "ElectroTech",
//     mobile_number: "0165432109",
//     updater: "Daniel Lee",
//     date: "09/05/2024",
//     active: "yes",
//   },
//   {
//     id: 6,
//     customer_name: "Megan Turner",
//     store_name: "Gizmo Solutions",
//     mobile_number: "0135792468",
//     updater: "Michelle Turner",
//     date: "14/06/2024",
//     active: "no",
//   },
//   {
//     id: 7,
//     customer_name: "Jonathan Harris",
//     store_name: "Smart Gadgets",
//     mobile_number: "0178642093",
//     updater: "Richard Harris",
//     date: "21/07/2024",
//     active: "yes",
//   },
//   {
//     id: 8,
//     customer_name: "Natalie Walker",
//     store_name: "High-Tech Innovations",
//     mobile_number: "0147382906",
//     updater: "Laura Edwards",
//     date: "30/08/2024",
//     active: "no",
//   },
//   {
//     id: 9,
//     customer_name: "Kevin Edwards",
//     store_name: "Innovative Solutions",
//     mobile_number: "0112345678",
//     updater: "Jacob Martinez",
//     date: "11/09/2024",
//     active: "yes",
//   },
//   {
//     id: 10,
//     customer_name: "Sophia Harris",
//     store_name: "Tech Innovations",
//     mobile_number: "0198765432",
//     updater: "Emma Harris",
//     date: "25/10/2024",
//     active: "no",
//   },
// ];



const CategoryTable = () => {
  const [searchQuery, setSearchQuery] = useState("")

  const { data, isLoading } = useGetAllCustomerQuery({
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
                "Customer Name",
                "Store",
                "Mobile",
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
                  {row.customer_name}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row.store_name}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row.mobile_number}
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

export default CategoryTable;