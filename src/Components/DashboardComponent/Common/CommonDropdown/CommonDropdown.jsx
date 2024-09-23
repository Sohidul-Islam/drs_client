import React from "react";

const CommonDropdown = ({ dropdownData, itemName, level, onFilterChange }) => {
  return (
    <div>
      {level && (
        <label className="text-sm font-medium text-[#1F1F1F] mr-2">
          Filter:
        </label>
      )}
      <select
        onChange={(e) => onFilterChange(e.target.value)}
        className="text-sm border outline-gray-300 text-gray-700 py-2 px-1 rounded-md"
      >
        <option value="">{itemName}</option>
        {dropdownData?.map((item, index) => (
          <option key={index} value={item.value}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CommonDropdown;
