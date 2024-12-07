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
  errors,
}) => {
  const options = data?.data?.map((item) => ({
    value: item[propertyValue],
    label: item[propertyName],
  }));

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {labelText}
        {required === "true" && <span className="text-[#FF0027]">*</span>}
      </label>
      <Controller
        name={name}
        control={control}
        rules={{ required: required === "true" ? true : false }}
        render={({ field }) => (
          <CreatableSelect
            {...field}
            options={options}
            isClearable
            placeholder={placeholder}
            isValidNewOption={() => false} // Disable option creation
            onChange={(selectedOption) => {
              field.onChange(selectedOption); // Update react-hook-form
              setSearchInputValue(selectedOption ? selectedOption.value : "");
            }}
            onInputChange={(value) => {
              setSearchInputValue(value);
            }}
            styles={{
              control: (base) => ({
                ...base,
                borderColor: errors ? "#FF0027" : base.borderColor,
              }),
            }}
          />
        )}
      />
    </div>
  );
};
export default SearchableDropdown;
