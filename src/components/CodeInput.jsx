/* eslint-disable react/prop-types */
import { useState } from 'react';

const CodeInput = ({ codeLength = 6, onCodeChange }) => {
  const [code, setCode] = useState(Array(codeLength).fill(''));

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) {
      // Allow only numbers
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      onCodeChange(newCode.join(''));

      if (value && index < codeLength - 1) {
        // Automatically focus on the next input if a digit is entered
        document.getElementById(`code-input-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      // If the current input is empty, move focus to the previous input
      if (code[index] === '' && index > 0) {
        document.getElementById(`code-input-${index - 1}`).focus();
      }
    }
  };

  return (
    <div className="flex justify-between space-x-2 py-4">
      {code.map((digit, index) => (
        <input
          key={index}
          id={`code-input-${index}`}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={e => handleChange(e, index)}
          onKeyDown={e => handleKeyDown(e, index)}
          className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 text-center text-xl md:text-2xl lg:text-3xl border border-gray-300 rounded-xl focus:outline-none focus:border-primary"
          required
        />
      ))}
    </div>
  );
};

export default CodeInput;
