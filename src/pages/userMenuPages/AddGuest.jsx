import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const AddGuest = () => {
  const [contactMethod, setContactMethod] = useState('SMS');
  const [contacts, setContacts] = useState('');
  const [uploadOption, setUploadOption] = useState('');
  const fileInputRef = useRef(null);

  const navigate = useNavigate();

  const contactMethods = ['SMS', 'Email', 'WhatsApp'];
  const uploadOptions = ['Handwritten contact image', 'CSV file', 'Excel file'];

  const handleContactMethodChange = e => {
    setContactMethod(e.target.value);
    setContacts(''); // Clear contacts when method changes
  };

  const handleContactsChange = e => {
    setContacts(e.target.value);
  };

  const handleUploadOptionChange = e => {
    setUploadOption(e.target.value);
    // Trigger the hidden file input when an option is selected
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = e => {
    const file = e.target.files[0];
    console.log(`File uploaded for ${uploadOption}:`, file);
    // Further logic to handle the uploaded file
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  const handleAddGuest = () => {
    // Logic to handle the form submission goes here.
    console.log({
      contactMethod,
      contacts,
      uploadOption,
    });
    navigate('/dashboard/events');
  };

  return (
    <div className="flex justify-center items-center mt-4 mx-4">
      <div className="bg-white w-full max-w-xl py-4 lg:border border-gray rounded-lg lg:shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Add Guest</h2>
        <hr className="hidden lg:block mb-4 border-gray" />
        <form className="flex flex-col justify-center items-center lg:px-12">
          <div className="w-full mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="contactMethod"
            >
              Contact Through
            </label>
            <select
              id="contactMethod"
              value={contactMethod}
              onChange={handleContactMethodChange}
              className="w-full px-4 py-2 border border-gray focus:outline-none focus:border-primary"
            >
              {contactMethods.map((method, index) => (
                <option key={index} value={method}>
                  {method}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="contacts"
            >
              Enter Contacts
            </label>
            <textarea
              id="contacts"
              className="w-full px-4 py-2 border border-gray focus:outline-none focus:border-primary"
              value={contacts}
              onChange={handleContactsChange}
              placeholder={`Enter ${contactMethod} contacts separated by comma`}
              rows="2"
            />
          </div>

          <div className="w-full mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="uploadOption"
            >
              Upload
            </label>
            <select
              id="uploadOption"
              value={uploadOption}
              onChange={handleUploadOptionChange}
              className="w-full px-4 py-2 border border-gray focus:outline-none focus:border-primary"
            >
              <option value="" disabled>
                Select an option
              </option>
              {uploadOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </div>

          <div className="lg:w-3/4 w-full flex justify-center gap-8 mb-4">
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
              onClick={handleAddGuest}
            >
              Add Guest
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGuest;
