'use client';
/* eslint-disable react/prop-types */
import { useState } from 'react';

const ReminderModal = ({
  onClose,
  onSave,
  groupOptions = [],
  deliveryMediumOptions = [],
  initialData = {}, // Initial data to prefill the modal if needed
}) => {
  const [group, setGroup] = useState(initialData.group || '');
  const [enableInviteLink, setEnableInviteLink] = useState(
    initialData.enableInviteLink || false
  );
  const [subject, setSubject] = useState(initialData.subject || '');
  const [media, setMedia] = useState(initialData.media || null);
  const [message, setMessage] = useState(initialData.message || '');
  const [contactList, setContactList] = useState(initialData.contactList || '');
  const [deliveryMedium, setDeliveryMedium] = useState(
    initialData.deliveryMedium || ''
  );

  const handleSave = () => {
    onSave({
      group,
      enableInviteLink,
      subject,
      media,
      message,
      contactList,
      deliveryMedium,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full lg:max-w-2xl max-h-full overflow-y-auto py-6 lg:px-12 px-6 rounded-md shadow-md m-7">
        <h2 className="text-2xl text-center font-bold mb-4">
          Configure Reminder
        </h2>

        {/* Group Selection */}
        <label className="block text-slate-700">Select Group</label>
        <select
          value={group}
          onChange={e => setGroup(e.target.value)}
          className="w-full mb-4 p-2 border"
        >
          {groupOptions.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Enable Invite Link */}
        <label className="block text-slate-700">
          <input
            type="checkbox"
            checked={enableInviteLink}
            onChange={e => setEnableInviteLink(e.target.checked)}
            className="mr-2"
          />
          Enable Invite Link
        </label>

        {/* Subject */}
        <label className="block text-slate-700 mt-4">Subject</label>
        <input
          type="text"
          value={subject}
          onChange={e => setSubject(e.target.value)}
          className="text-sm flex-grow outline-none w-full mb-4 p-2 border"
        />

        {/* Message */}
        <label className="block text-slate-700">Message</label>
        <textarea
          value={message}
          onChange={e => setMessage(e.target.value)}
          className="w-full mb-4 p-2 border text-sm flex-grow outline-none"
          rows="3"
        ></textarea>

        {/* Attach Media and Delivery Medium */}
        <div className="flex lg:flex-row flex-col justify-between gap-4">
          <div className="lg:w-1/2">
            <label className="block text-slate-700">Attach Media</label>
            <input
              type="file"
              onChange={e => setMedia(e.target.files[0])}
              className="w-full mb-4 px-2 p-1 border text-sm flex-grow outline-none"
            />
          </div>
          <div className="lg:w-1/2">
            <label className="block text-slate-700">Delivery Medium</label>
            <select
              value={deliveryMedium}
              onChange={e => setDeliveryMedium(e.target.value)}
              className="w-full mb-4 p-2 border"
            >
              {deliveryMediumOptions.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex lg:flex-row flex-col justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="w-full border border-red-400 text-red-400 font-semibold py-2 px-4 hover:bg-red-400 hover:text-white transition duration-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="w-full bg-primary text-black font-semibold py-2 px-4 hover:bg-transparent hover:border hover:border-primary hover:text-primary transition duration-300"
          >
            Save Reminder
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReminderModal;
