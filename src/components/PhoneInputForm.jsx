import { useState, useEffect } from 'react';

const PhoneInputForm = ({ onContactsChange }) => {
  // State to hold multiple phone inputs with unique ids
  const [phones, setPhones] = useState([{ id: Date.now(), value: '' }]);

  // Update parent component with the concatenated phone numbers
  useEffect(() => {
    const phoneNumbers = phones
      .map(phone => phone.value)
      .filter(phone => phone !== '')
      .join(',');
    onContactsChange(phoneNumbers);
  }, [phones, onContactsChange]);

  const handlePhoneChange = (id, value) => {
    const updatedPhones = phones.map(phone =>
      phone.id === id ? { ...phone, value } : phone
    );
    setPhones(updatedPhones);
  };

  const handleAddPhone = () => {
    setPhones([...phones, { id: Date.now(), value: '' }]); // Generate unique id using Date.now()
  };

  const handleRemovePhone = id => {
    setPhones(phones.filter(phone => phone.id !== id));
  };

  return (
    <div className="space-y-2">
      {phones.map(phone => (
        <div key={phone.id} className="flex items-center space-x-2">
          <input
            type="text"
            value={phone.value}
            placeholder="Enter phone number"
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
        className="mt- text-primary hover:underline flex items-center space-x-2"
        onClick={handleAddPhone}
      >
        <span>+ Add phone</span>
      </button>
    </div>
  );
};

export default PhoneInputForm;
