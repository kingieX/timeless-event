import { useState } from 'react';

const VendorMessage = () => {
  const [vendor, setVendor] = useState('');
  const [messageBody, setMessageBody] = useState('');

  // Temporary custom data for vendors
  const vendors = [
    { id: 1, name: 'Vendor One' },
    { id: 2, name: 'Vendor Two' },
    { id: 3, name: 'Vendor Three' },
  ];

  const handleSendMessage = () => {
    // Implement logic for sending a message
    console.log('Message Sent', { vendor, messageBody });
  };

  return (
    <div className="mt-12 mx-2 lg:mx-24 lg:px-24">
      <h2 className="text-xl font-semibold mb-2">Inbox</h2>
      <h3 className="text-lg mb-6">Send message to a vendor</h3>
      <form className="flex flex-col">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="vendor"
          >
            Select vendor
          </label>
          <select
            id="vendor"
            className="w-full px-4 py-2 border border-gray focus:outline-none focus:border-primary"
            value={vendor}
            onChange={e => setVendor(e.target.value)}
          >
            <option value="" disabled>
              Select a vendor
            </option>
            {vendors.map(vendor => (
              <option key={vendor.id} value={vendor.name}>
                {vendor.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="messageBody"
          >
            Message body
          </label>
          <textarea
            id="messageBody"
            className="w-full px-4 py-2 border border-gray focus:outline-none focus:border-primary"
            value={messageBody}
            onChange={e => setMessageBody(e.target.value)}
            placeholder="Enter your message"
            rows="4"
          ></textarea>
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            className="w-full bg-primary text-black font-semibold py-2 px-4 hover:bg-transparent hover:border hover:border-primary hover:text-primary transition duration-300"
            onClick={handleSendMessage}
          >
            Send message
          </button>
        </div>
      </form>
    </div>
  );
};

export default VendorMessage;
