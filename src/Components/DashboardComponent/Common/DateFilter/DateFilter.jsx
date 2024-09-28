import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  clearFilterQuery,
  setFilterQuery,
} from "../../../../features/advanceFilter/advanceFilterSlice";

const DateFilter = () => {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(""); 

  const handleFilterChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    dispatch(clearFilterQuery());
    dispatch(setFilterQuery(date)); 
  };

  return (
    <div>
      <input
        type="date"
        value={selectedDate} 
        onChange={handleFilterChange}
        className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
      />
    </div>
  );
};

export default DateFilter;
