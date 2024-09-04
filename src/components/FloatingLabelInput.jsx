/* eslint-disable react/prop-types */
import { useState } from 'react';

const FloatingLabelInput = ({ label, type = 'text', id }) => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');

  return (
    <div className="relative w-full">
      <input
        id={id}
        type={type}
        value={value}
        onChange={e => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => !value && setFocused(false)}
        className="w-full py-3 px-4 border border-gray-300 focus:outline-none focus:border-primary transition"
      />
      <label
        htmlFor={id}
        className={`absolute left-4 transition-all duration-200 ease-in-out pointer-events-none bg-white px-1 ${
          focused || value
            ? 'text-sm -top-3 z-10 text-primary'
            : 'top-1/2 transform -translate-y-1/2 text-gray-400'
        }`}
        style={{ zIndex: 10 }}
      >
        {label}
      </label>
    </div>
  );
};

export default FloatingLabelInput;
