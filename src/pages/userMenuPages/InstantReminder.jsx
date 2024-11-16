import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// data set for selections
const industryOptions = [
  { value: '', label: 'Select option', disabled: true },
  { value: 'agriculture', label: 'Agriculture' },
  { value: 'arts-entertainment', label: 'Arts and Entertainment' },
  { value: 'automotive', label: 'Automotive' },
  { value: 'banking-financial', label: 'Banking and Financial Services' },
  { value: 'construction', label: 'Construction' },
  { value: 'consulting', label: 'Consulting' },
  { value: 'consumer-goods', label: 'Consumer Goods' },
  { value: 'education', label: 'Education' },
  { value: 'energy-utilities', label: 'Energy and Utilities' },
  { value: 'food-beverages', label: 'Food and Beverages' },
  { value: 'government-public', label: 'Government and Public Sector' },
  { value: 'healthcare-life-sciences', label: 'Healthcare and Life Sciences' },
  { value: 'information-technology', label: 'Information Technology' },
  { value: 'insurance', label: 'Insurance' },
  { value: 'legal-services', label: 'Legal Services' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'non-profit', label: 'Non-Profit' },
  { value: 'pharmaceuticals', label: 'Pharmaceuticals' },
  { value: 'real-estate', label: 'Real Estate' },
  { value: 'retail-wholesale', label: 'Retail and Wholesale' },
  { value: 'telecommunications', label: 'Telecommunications' },
  { value: 'transportation-logistics', label: 'Transportation and Logistics' },
  { value: 'travel-hospitality', label: 'Travel and Hospitality' },
  { value: 'other', label: 'Other' },
];

const sendNotificationOptions = [
  { value: '', label: 'Select option', disabled: true },
  { value: 'sms', label: 'SMS' },
  { value: 'email', label: 'Email' },
  { value: 'whatsapp', label: 'WhatsApp' },
];

const serviceTypeOptions = [
  { value: '', label: 'Select option', disabled: true },
  { value: 'catering', label: 'Catering' },
  { value: 'photography', label: 'Photography' },
  { value: 'decor', label: 'Decor' },
  { value: 'dj', label: 'DJ' },
  { value: 'entertainer', label: 'Entertainer' },
  { value: 'graphic-artist', label: 'Graphic Artist' },
  { value: 'others', label: 'Others' },
];

const InstantReminder = () => {
  const [name, setName] = useState('');
  // const [serviceType, setServiceType] = useState('');
  // const [industry, setIndustry] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  // const [notificationMethod, setNotificationMethod] = useState('');
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/dashboard');
  };

  const handleAddVendor = () => {
    // Logic to handle vendor addition
    navigate('/dashboard/events');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://timelessvet.com/auth/join');
    alert('Link copied to clipboard!');
  };

  return (
    <div className="flex justify-center items-center overflow-y-auto max-h-full mt-4 mx-4">
      <div className="bg-white w-full max-w-xl py-4 lg:border border-gray rounded-lg lg:shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Add Vendor</h2>
        <hr className="hidden lg:block mb-4 border-gray" />
        <form className="flex flex-col justify-center items-center lg:px-12">
          {/* Name Input */}
          <div className="w-full mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full px-4 py-2 border border-gray focus:outline-none focus:border-primary"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter vendor name"
            />
          </div>

          {/* Service Type Selection */}
          <div className="w-full mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="serviceType"
            >
              Service Type
            </label>
            <select
              id="serviceType"
              className="w-full px-4 py-2 border border-gray focus:outline-none focus:border-primary"
              // value={serviceType}
              // onChange={e => setServiceType(e.target.value)}
            >
              {serviceTypeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Industry Selection */}
          <div className="w-full mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="industry"
            >
              Choose Industry
            </label>
            <select
              id="industry"
              className="w-full px-4 py-2 border border-gray focus:outline-none focus:border-primary"
              // value={industry}
              // onChange={e => setIndustry(e.target.value)}
            >
              {industryOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Email Input */}
          <div className="w-full mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 border border-gray focus:outline-none focus:border-primary"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter email address"
            />
          </div>

          {/* Phone Number Input */}
          <div className="w-full mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phoneNumber"
            >
              Phone Number
            </label>
            <input
              id="phoneNumber"
              type="tel"
              className="w-full px-4 py-2 border border-gray focus:outline-none focus:border-primary"
              value={phoneNumber}
              onChange={e => setPhoneNumber(e.target.value)}
              placeholder="Enter phone number"
            />
          </div>

          {/* Address Input */}
          <div className="w-full mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="address"
            >
              Address
            </label>
            <input
              id="address"
              type="text"
              className="w-full px-4 py-2 border border-gray focus:outline-none focus:border-primary"
              value={address}
              onChange={e => setAddress(e.target.value)}
              placeholder="Enter address"
            />
          </div>

          {/* Description Input */}
          <div className="w-full mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              className="w-full px-4 py-2 border border-gray focus:outline-none focus:border-primary"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Enter description"
              rows="2"
            ></textarea>
          </div>

          {/* Send Notification Selection */}
          <div className="w-full mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="notificationMethod"
            >
              Send Notification
            </label>
            <select
              id="notificationMethod"
              className="w-full px-4 py-2 border border-gray focus:outline-none focus:border-primary"
              // value={notificationMethod}
              // onChange={e => setNotificationMethod(e.target.value)}
            >
              {sendNotificationOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Copy Link Input */}
          <div className="w-full py-4 flex justify-between gap-2 items-center">
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray focus:outline-none focus:border-primary"
              value="https://timelessvet.com/auth/join"
              readOnly
            />
            <button
              type="button"
              className="w-1/2 border border-primary text-primary font-semibold px-2 py-2 hover:bg-primary hover:text-black transition duration-300"
              onClick={handleCopyLink}
            >
              Copy link
            </button>
          </div>

          {/* Cancel and Add Vendor Buttons */}
          <div className="lg:w-3/4 w-full flex justify-center gap-8 py-4">
            <button
              type="button"
              className="lg:w-1/2 w-full border border-primary text-primary font-semibold py-2 px-4 hover:bg-primary hover:text-black transition duration-300"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className="lg:w-1/2 w-full bg-primary text-black font-semibold py-2 px-4 hover:bg-transparent hover:border hover:border-primary hover:text-primary transition duration-300"
              onClick={handleAddVendor}
            >
              Add Vendor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InstantReminder;
