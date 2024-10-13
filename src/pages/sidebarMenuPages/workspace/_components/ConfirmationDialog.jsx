const ConfirmationDialog = ({ isLoading, message, onConfirm, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 lg:max-w-lg max-w-sm  rounded-lg shadow-lg">
        <p>{message}</p>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            type="button"
            className="border border-red-400 text-red-400 font-semibold py-2 px-4 hover:border-red-800 hover:text-red-800 transition duration-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
