import React from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";

const SearchableDropdown = ({
  labelText,
  name,
  control,
  data,
  placeholder,
  required,
  propertyValue,
  propertyName,
}) => {
  const options = data?.data?.map((item) => ({
    value: item[propertyValue],
    label: item[propertyName],
  }));

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {labelText} {required && <span className="text-[#FF0027]">*</span>}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={options}
            isClearable
            placeholder={placeholder}
            className="mt-1"
            classNamePrefix="react-select"
          />
        )}
      />
    </div>
  );
};
export default SearchableDropdown;
