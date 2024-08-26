import { Controller } from "react-hook-form";
import CreatableSelect from "react-select/creatable";

const SearchableDropdown = ({
  labelText,
  name,
  control,
  data,
  placeholder,
  required,
  propertyValue,
  propertyName,
  setSearchInputValue,
}) => {
  const options = data?.data?.map((item) => ({
    value: item[propertyValue],
    label: item[propertyName],
  }));

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {labelText}
        {required === "true" && <span className="text-[#FF0027]">*</span>}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <CreatableSelect
            {...field}
            options={options}
            isClearable
            placeholder={placeholder}
            isValidNewOption={() => false} // Disable option creation
            onChange={(selectedOption) => {
              field.onChange(selectedOption); // Update react-hook-form
              setSearchInputValue(selectedOption ? selectedOption.value : ""); // Update local state with the value
            }}
            onInputChange={(value) => {
              setSearchInputValue(value); // Capture typed text
            }}
          />
        )}
      />
    </div>
  );
};
export default SearchableDropdown;
