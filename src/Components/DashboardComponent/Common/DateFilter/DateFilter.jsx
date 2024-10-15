import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  clearFilterQuery,
  setFilterQuery,
} from "../../../../features/advanceFilter/advanceFilterSlice";

const DateFilter = ({name}) => {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState("");

  const handleFilterChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    dispatch(clearFilterQuery());
    dispatch(setFilterQuery(date));
  };

  return (
    <div className="flex items-center">
      <p className="text-sm font-medium text-[#1F1F1F] mr-2">Filter:</p>
      <div className="relative">
        {!selectedDate && (
          <span className="absolute left-3 top-[9px] text-gray-500 pointer-events-none">
            {name}
          </span>
        )}
        <input
          type="date"
          value={selectedDate}
          onChange={handleFilterChange}
          className={`mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md ${
            !selectedDate ? "text-transparent" : ""
          }`}
        />
      </div>
    </div>
  );
};

export default DateFilter;
