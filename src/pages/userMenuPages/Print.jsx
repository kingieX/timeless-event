import React from 'react';
import { useNavigate } from 'react-router-dom';

const Print = () => {
  const navigate = useNavigate();

  const handlePrint = () => {
    // Trigger the print dialog
    window.print();
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">
        This is the page to be printed
      </h1>
      <p>
        When you click on the print menu, this page's content will be printed.
        You can customize the content as needed.
      </p>

      {/* Additional content can go here */}

      {/* Print button (Optional, can be part of the menu instead) */}
      <button
        onClick={handlePrint}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Print this page
      </button>
    </div>
  );
};

export default Print;
