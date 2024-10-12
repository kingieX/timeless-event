const FormInput = ({
  label,
  name,
  type,
  value,
  handleChange,
  handleBlur,
  error,
  touched,
}) => {
  return (
    <div className="mb-6">
      <label className="block text-gray-700">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-primary"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {touched && error ? <div className="text-red-500">{error}</div> : null}
    </div>
  );
};

export default FormInput;
