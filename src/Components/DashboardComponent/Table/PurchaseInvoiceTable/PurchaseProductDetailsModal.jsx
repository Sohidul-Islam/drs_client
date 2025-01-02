import React from "react";
import { GoTag } from "react-icons/go";

const PurchaseProductDetailsModal = ({ isOpen, onClose, productDetails }) => {
  console.log("if you follow", productDetails?.invoices);
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div
        className={`${
          isOpen ? "animate-slide-in" : "animate-slide-out"
        } relative top-14 mx-auto p-5 border w-[80%] h-[80%] shadow-lg rounded-md bg-white`}
      >
        <div className="flex justify-between items-center border-b pb-1">
          <div className="flex items-center gap-x-[10px]">
            <GoTag className="text-lg" />
            <p>Purchase Overview</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 bg-red-700 hover:bg-red-800 text-white rounded-md"
          >
            X
          </button>
        </div>
        <div className="mt-5 overflow-x-auto">
          <table className="min-w-full table-fixed">
            <thead className="bg-gray-50 whitespace-nowrap">
              <tr>
                {[
                  "ID",
                  "Invoice Number",
                  "Invoice Date",
                  "Manufacturer",
                  "Products",
                  "Quantity",
                  "Trade Price",
                  "Total Price",
                  "Paid",
                  "Due",
                  "Updater On",
                ].map((heading) => (
                  <th
                    key={heading}
                    scope="col"
                    className="px-4 py-2 text-left text-[13px] font-medium tracking-wider"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="bg-white">
              <tr className="border">
                <td className="px-4 py-4 whitespace-nowrap text-xs font-medium text-[#0085FF]">
                  {productDetails?.id}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {productDetails?.invoiceNumber}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {productDetails?.invoiceDate}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {productDetails?.manufacturer}
                </td>
                <td className="px-4 py-2 text-xs max-h-24">
                  <div className="max-h-24 overflow-y-auto flex flex-col justify-center items-center">
                    {productDetails?.invoices?.map((item, index) => (
                      <p key={index} className="mb-2 whitespace-nowrap">
                       {item?.purchase_product?.product?.productName}
                      </p>
                    ))}
                  </div>
                </td>

                <td className="px-4 py-2 text-xs max-h-24">
                  <div className="max-h-24 overflow-y-auto flex flex-col justify-center items-center">
                    {productDetails?.invoices?.map((item, index) => (
                      <p key={index} className="mb-2 whitespace-nowrap">
                        {item?.purchase_product?.quantity} Pieces
                      </p>
                    ))}
                  </div>
                </td>

                <td className="px-4 py-2 text-xs max-h-24">
                  <div className="max-h-24 overflow-y-auto flex flex-col justify-center items-center">
                    {productDetails?.invoices?.map((item, index) => (
                      <p key={index} className="mb-2 whitespace-nowrap">
                        {item?.purchase_product?.tradePrice} TK
                      </p>
                    ))}
                  </div>
                </td>
                
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {productDetails?.total} TK
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {productDetails?.paidAmount} TK
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {productDetails?.due} TK
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs">
                  {productDetails?.date}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PurchaseProductDetailsModal;
