import React from "react";
import EditButton from "../../Common/EditButton/EditButton";
import DeleteButton from "../../Common/DeleteButton/DeleteButton";
import { useGetAllSubscriptionQuery } from "../../../../features/api/admin/adminSubscriptionApi";

const ManageContentTable = () => {
  const { data: subscriptions, isLoading } = useGetAllSubscriptionQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const getMonth = (days) => {
    const months = days / 30
    return months
  }

  console.log("Subscription data:", subscriptions);
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
        {subscriptions.map((item, index) => (
          <tr key={index}>
            <td className="border border-gray-300 px-4 py-2 text-left align-top">
              {item?.id}
            </td>
            <td className="border border-gray-300 px-4 py-2 text-left align-top">
              {item?.package}
            </td>
            <td className="border border-gray-300 px-4 py-2 text-left align-top">
              {item?.description}
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
                  {item?.offers?.map((offer, index) => (
                    <li key={index}>{offer?.name}</li>
                  ))}
                </ol>
              </div>
            </td>

            <td className="border border-gray-300 px-4 py-2 text-left align-top">
              {item?.price} TK
            </td>
            <td className="border border-gray-300 px-4 py-2 text-left align-top">
              {getMonth(item?.duration_in_days)}
            </td>
            <td className="border border-gray-300 px-4 py-2 text-left align-top">
              <div className="flex gap-3">
                <EditButton />
                <DeleteButton />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ManageContentTable;
