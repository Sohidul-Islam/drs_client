import React from "react";

const CreateSalesPaymentTable = () => {
  const data = 0;
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
          {data.length > 0 ? (
            data.map((row, index) => (
              <tr key={index}>
                <td className="px-4 py-4 whitespace-nowrap text-xs font-medium text-[#0085FF]">
                  {row.paid_amount}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row.due}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row.updater_at}
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
