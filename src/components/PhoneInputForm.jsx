import { useState } from 'react';

const PhoneInputForm = () => {
  // State to hold multiple phone inputs
  const [phones, setPhones] = useState([{ id: 1, value: '' }]);

  // Function to handle phone input change
  const handlePhoneChange = (id, value) => {
    const updatedPhones = phones.map(phone =>
      phone.id === id ? { ...phone, value } : phone
    );
    setPhones(updatedPhones);
  };

  // Function to add a new phone input
  const handleAddPhone = () => {
    setPhones([...phones, { id: phones.length + 1, value: '' }]);
  };

  // Function to remove a phone input
  const handleRemovePhone = id => {
    setPhones(phones.filter(phone => phone.id !== id));
  };

  return (
    <div className="space-y-4">
      {phones.map(phone => (
        <div key={phone.id} className="flex items-center space-x-2">
          <select className="p-2 border border-gray-300 focus:outline-none focus:border-primary">
            <option value="+1">+1</option>
            <option value="+234">+1</option>
            <option value="+234">+1</option>
            <option value="+44">+44</option>
            {/* Add more options as needed */}
          </select>

          <input
            type="text"
            value={phone.value}
            placeholder="Phone"
            onChange={e => handlePhoneChange(phone.id, e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-primary"
          />

          {phones.length > 1 && (
            <button
              className="text-red-500 hover:text-red-700 text-xl"
              onClick={() => handleRemovePhone(phone.id)}
            >
              &times;
            </button>
          )}
        </div>
      ))}

      <button
        className="mt-4 text-primary hover:text-primary flex items-center space-x-2"
        onClick={handleAddPhone}
      >
        <span className="text-xl">+</span>
        <span>Add phone</span>
      </button>
    </div>
  );
};

export default PhoneInputForm;
