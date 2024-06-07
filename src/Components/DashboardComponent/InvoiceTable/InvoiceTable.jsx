import React from 'react';

const data = [
  {product: 'Reversair CT' , strength: '10 mg', generic: 'Montelukast Sodium', manufacturer: 'ACI Pharmaceuticals Limited', dosageForm: 'Chewable Tablet', category: 'Category-A', soldQuantity: 10},
  {product: 'Reversair CT', strength: '10 mg', generic: 'Montelukast Sodium', manufacturer: 'ACI Pharmaceuticals Limited', dosageForm: 'Chewable Tablet', category: 'Category-A', soldQuantity: 20},
  {product: 'Reversair CT', strength: '10 mg', generic: 'Montelukast Sodium', manufacturer: 'ACI Pharmaceuticals Limited', dosageForm: 'Chewable Tablet', category: 'Category-A', soldQuantity: 30},
  {product: 'Reversair CT', strength: '10 mg', generic: 'Montelukast Sodium', manufacturer: 'ACI Pharmaceuticals Limited', dosageForm: 'Chewable Tablet', category: 'Category-A', soldQuantity: 40},
  {product: 'Reversair CT', strength: '10 mg', generic: 'Montelukast Sodium', manufacturer: 'ACI Pharmaceuticals Limited', dosageForm: 'Chewable Tablet', category: 'Category-A', soldQuantity: 50},
  {product: 'Reversair CT', strength: '10 mg', generic: 'Montelukast Sodium', manufacturer: 'ACI Pharmaceuticals Limited', dosageForm: 'Chewable Tablet', category: 'Category-A', soldQuantity: 60},
  {product: 'Reversair CT', strength: '10 mg', generic: 'Montelukast Sodium', manufacturer: 'ACI Pharmaceuticals Limited', dosageForm: 'Chewable Tablet', category: 'Category-A', soldQuantity: 70},
  {product: 'Reversair CT', strength: '10 mg', generic: 'Montelukast Sodium', manufacturer: 'ACI Pharmaceuticals Limited', dosageForm: 'Chewable Tablet', category: 'Category-A', soldQuantity: 80},
  {product: 'Reversair CT', strength: '10 mg', generic: 'Montelukast Sodium', manufacturer: 'ACI Pharmaceuticals Limited', dosageForm: 'Chewable Tablet', category: 'Category-A', soldQuantity: 90},
  {product: 'Reversair CT', strength: '10 mg', generic: 'Montelukast Sodium', manufacturer: 'ACI Pharmaceuticals Limited', dosageForm: 'Chewable Tablet', category: 'Category-A', soldQuantity: 100},
];

const ShopInvoiceTable = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {['Product', 'Strength', 'Generic', 'Manufacturer', 'Dosage Form', 'Category', 'Sold Quantity'].map((heading) => (
              <th
                key={heading}
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider text-nowrap"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, idx) => (
            <tr key={idx}>
              <td className="px-4 py-1 text-[12px] text-gray-500 h-12">{row.product}</td>
              <td className="px-4 py-1 text-[12px] text-gray-500 h-12">{row.strength}</td>
              <td className="px-4 py-1 text-[12px] text-gray-500 h-12">{row.generic}</td>
              <td className="px-4 py-1 text-[12px] text-gray-500 h-12">{row.manufacturer}</td>
              <td className="px-4 py-1 text-[12px] text-gray-500 h-12">{row.dosageForm}</td>
              <td className="px-4 py-1 text-[12px] text-gray-500 h-12">{row.category}</td>
              <td className="px-4 py-1 text-[12px] text-gray-500 h-12">{row.soldQuantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShopInvoiceTable;
