import React from "react";
import { useSelector } from "react-redux";
import { useGetAllSaleProductQuery } from "../../../../features/api/seller/saleProductApi";

const CreateSalesProductTable = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: saleProducts } = useGetAllSaleProductQuery({
    page: 1,
    pageSize: 15,
    searchKey: "",
    status: "inactive",
    sellerId: user?.id || 1,
  });

  console.log("sales data: ",saleProducts)
  
  return (
    <div className="overflow-x-auto bg-white px-5 py-3">
      <table className="min-w-full divide-y divide-gray-200 whitespace-nowrap">
        <thead className="bg-gray-50">
          <tr>
            {[
              "Name",
              "Generic Name",
              "Reg-no",
              "Doctor Name",
              "Discount",
              "Quantity",
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
          {saleProducts?.data?.length > 0 ? (
            saleProducts?.data?.map((row, index) => (
              <tr key={index}>
                <td className="px-4 py-4 whitespace-nowrap text-xs font-medium text-[#0085FF]">
                  {row.name}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row.genericName}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row.regNo}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row.doctorName}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row.discount}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row.quantity}
                </td>
                {/* <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row.status}
                </td> */}
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

export default CreateSalesProductTable;
