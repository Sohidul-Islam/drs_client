import React from "react";
import EditButton from "../../Common/EditButton/EditButton";
import { useGetAllPaymentQuery } from "../../../../features/api/seller/paymentApi";

const CreatePurchasePaymentTable = () => {
  const { data: payments, isLoading } = useGetAllPaymentQuery({
    page: 1,
    pageSize: 20,
    searchKey: "",
    type: "purchase",
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-x-auto bg-white px-5 py-3">
      <table className="min-w-full divide-y divide-gray-200 whitespace-nowrap">
        <thead className="bg-gray-50">
          <tr>
            {[
              "Paid Amount",
              "Payment Method",
              "Due Amount",
              "Updater at",
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

        {payments?.data?.length > 0 ? (
          <tbody className="bg-white divide-y divide-gray-200">
            {payments?.data?.map((row, index) => (
              <tr key={index}>
                <td className="px-4 py-4 whitespace-nowrap text-xs font-medium text-[#0085FF]">
                  {row?.paidAmount} TK
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row?.paymentMethod}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row?.due} TK
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row?.date}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs flex gap-3">
                  <EditButton />
                  {/* <DeleteButton id={row.id} onDelete={handleDeleteClick} /> */}
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan="12">
                <div className="flex justify-center items-center py-5">
                  <p className="text-gray-500 text-lg">No data found</p>
                </div>
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};

export default CreatePurchasePaymentTable;
