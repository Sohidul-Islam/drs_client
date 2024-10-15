import React from "react";
import { useDispatch } from "react-redux";
import { setFilterQuery , clearFilterQuery } from '../../../../features/advanceFilter/advanceFilterSlice';

const CommonDropdown = ({ dropdownData, itemName, level }) => {
  const dispatch = useDispatch();
  const handleFilterChange = (e) => {
    dispatch(clearFilterQuery()); 
    dispatch(setFilterQuery(e.target.value));
  }
  
  return (
    <div>
      {level && (
        <label className="text-sm font-medium text-[#1F1F1F] mr-2">
          Filter:
        </label>
      )}
      <select
        onChange={handleFilterChange}
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
