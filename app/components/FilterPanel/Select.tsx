interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  label: string;
  onChange: (value: string) => void;
  defaultValue: string;
  selectedValue: string;
  options: Option[];
}

const Select = ({
  label,
  onChange,
  defaultValue,
  selectedValue,
  options,
}: SelectProps) => {
  return (
    <div className="flex flex-col w-1/2">
      <label
        htmlFor="optionSelect"
        className="text-black mb-2 block text-sm font-medium"
      >
        {label}
      </label>
      <select
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          onChange(e.target.value);
        }}
        id="optionSelect"
        className="w-full rounded-lg  bg-gray-100 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
      >
        <option value="" selected={selectedValue === ""}>
          {defaultValue}
        </option>
        {options.map((option, index) => (
          <option
            key={index}
            selected={selectedValue === option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
