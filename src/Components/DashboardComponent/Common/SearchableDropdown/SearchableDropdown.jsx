import React from "react";

const SearchableDropdown = ({
  register,
  data,
  labelName,
  placeholderText,
  inputName,
  propertyName,
  valueName,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">
      {labelName} <span className="text-[#FF0027]">*</span>
    </label>
    <input
      list={`${inputName}-data`}
      placeholder={placeholderText}
      type="text"
      {...register(inputName, { required: true })}
      className="mt-1 block w-full border outline-gray-300 text-gray-700 py-[6px] px-3 rounded-md"
    />
    <datalist id={`${inputName}-data`}>
      {data.map((item, index) => (
        <option key={index} value={item[valueName]}>
          {item[propertyName]}
        </option>
      ))}
    </datalist>
  </div>
);

export default SearchableDropdown;
