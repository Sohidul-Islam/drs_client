import React, { useState } from "react";
import EditButton from "../../Common/EditButton/EditButton";
import { RiDeleteBinLine } from "react-icons/ri";
import { useGetAllPaymentQuery } from "../../../../features/api/seller/paymentApi";

const PurchaseInvoiceTable = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: payments, isLoading } = useGetAllPaymentQuery({
    page: 1,
    pageSize: 20,
    searchKey: "",
    type: "purchase",
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDelete = (id) => {
    console.log(id);
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
        {/* Table  */}
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 whitespace-nowrap">
            <tr>
              {[
                "ID",
                "Invoice Number",
                "Invoice Date",
                "Manufacturer",
                "Total",
                "Paid",
                "Due",
                "Updater On",
                "Action",
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
            {payments?.data?.map((row, idx) => (
              <tr key={idx}>
                <td className="px-4 py-4 whitespace-nowrap text-xs font-medium text-[#0085FF]">
                  {row?.id}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row?.invoiceNumber}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row?.invoiceDate}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row?.manufacturer}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row?.total} TK
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row?.paidAmount} TK
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row?.due} TK
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row?.date}
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

export default PurchaseInvoiceTable;
