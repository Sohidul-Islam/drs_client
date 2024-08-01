import React, { useState } from "react";
import {
  useGetAllProductQuery,
  useDeleteProductMutation,
} from "../../../../features/api/admin/adminProductApi";
import EditButton from "../../Common/EditButton/EditButton";
import { RiDeleteBinLine } from "react-icons/ri";

const ProductsTable = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading } = useGetAllProductQuery({
    page: 1,
    pageSize: 15,
    searchKey: "",
  });

  const [deleteProduct] = useDeleteProductMutation();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  // console.log(data, "product");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDelete = async (product) => {
    // console.log(product)
    const productData = {
      id: product?.id,
      name: product?.productName,
      status: product?.status,
    };
    try {
      const res = await deleteProduct(productData).unwrap();
      console.log(res)
      alert("Product deleted successfully");
    } catch (error) {
      console.error("Failed to delete the product:", error);
    }
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
                "Product Name",
                "Generic Name",
                "Manufacturer",
                "Strength",
                "Dosage Form",
                "Pack/Box",
                "Quantity",
                "Updater On",
                "Action",
              ].map((heading) => (
                <th
                  key={heading}
                  scope="col"
                  className="px-4 py-3 text-left text-[13px] font-medium tracking-wider whitespace-nowrap"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data?.map((row, index) => (
              <tr key={index}>
                <td className="px-4 py-4 whitespace-nowrap text-xs font-medium text-[#0085FF]">
                  {row.id}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row.productName}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row.genericName}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row.manufacturer}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row.strength}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row.dosageForm}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row.packBoxSize} Pack's
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row.quantity}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {row.date}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs flex gap-3">
                  <EditButton />
                  <button
                    onClick={() => handleDelete(row)}
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

export default ProductsTable;
