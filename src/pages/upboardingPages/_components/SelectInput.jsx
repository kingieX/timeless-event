const SelectInput = ({
  label,
  name,
  value,
  options,
  handleChange,
  handleBlur,
  error,
  touched,
}) => {
  return (
    <div className="mb-6">
      <label className="block text-gray-700">{label}</label>
      <select
        id={name}
        name={name}
        className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-primary"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      >
        <option value="" disabled>
          Select {label.toLowerCase()}
        </option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {touched && error ? <div className="text-red-500">{error}</div> : null}
    </div>
  );
};

export default SelectInput;
