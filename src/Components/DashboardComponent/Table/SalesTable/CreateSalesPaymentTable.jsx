import React from "react";
import { useGetAllPaymentQuery } from "../../../../features/api/seller/paymentApi";

const CreateSalesPaymentTable = () => {
  const { data: payments, isLoading } = useGetAllPaymentQuery({
    page: 1,
    pageSize: 20,
    searchKey: "",
    type: "sales",
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log("payment data: ", payments.data)

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
          {payments?.data?.length > 0 ? (
            payments?.data?.map((row, index) => (
              <tr key={index}>
                <td className="px-4 py-4 whitespace-nowrap text-xs font-medium text-[#0085FF]">
                  {row.paidAmount} TK
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row.paymentMethod}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row.due} TK
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row.date}
                </td>
              </tr>
            ))
          ) : (
            <p className="text-sm py-1">No data available</p>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CreateSalesPaymentTable;
