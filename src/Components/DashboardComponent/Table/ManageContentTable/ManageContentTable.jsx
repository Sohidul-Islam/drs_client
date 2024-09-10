import React from "react";
import EditButton from "../../Common/EditButton/EditButton";
import DeleteButton from "../../Common/DeleteButton/DeleteButton";

const ManageContentTable = () => {
  return (
    <table className="min-w-full divide-y divide-gray-200 mb-4">
      <thead className="bg-gray-50">
        <tr>
          {[
            "No.",
            "Package Name",
            "Description",
            "Features",
            "Price BDT",
            "Duration/month",
            "Action",
          ].map((heading) => (
            <th
              key={heading}
              scope="col"
              className="px-4 py-3 text-left text-[13px] font-medium tracking-wider whitespace-nowrap border"
            >
              {heading}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border border-gray-300 px-4 py-2 text-left align-top">
            01
          </td>
          <td className="border border-gray-300 px-4 py-2 text-left align-top">
            Free Trial
          </td>
          <td className="border border-gray-300 px-4 py-2 text-left align-top">
            Get access to all premium features.
          </td>
          <td className="border border-gray-300 px-2 py-2 text-left align-top">
            <div
              className="overflow-y-auto"
              style={{
                width: "200px",
                height: "100px",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <ol className="list-decimal list-inside">
                <li>All In One Dashboard</li>
                <li>Create 30 invoices & bills</li>
                <li>Auto bank reconciliation</li>
                <li>Run Payroll for 5 employees</li>
                <li>Auto bank reconciliation</li>
                <li>Run Payroll for 5 employees</li>
              </ol>
            </div>
          </td>

          <td className="border border-gray-300 px-4 py-2 text-left align-top">
            0.00
          </td>
          <td className="border border-gray-300 px-4 py-2 text-left align-top">
            01
          </td>
          <td className="border border-gray-300 px-4 py-2 text-left align-top">
            <div className="flex gap-3">
              <EditButton />
              <DeleteButton />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default ManageContentTable;
