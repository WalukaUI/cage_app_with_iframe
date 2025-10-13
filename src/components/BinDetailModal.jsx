import React from 'react';

function BinDetailModal({ binDetails, onClose }) {
  if (!binDetails) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold">
            Shelf: {binDetails.shelfNumber}, Level: {binDetails.levelNumber}, Bin: {binDetails.binNumber}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {binDetails.items.map((item) => (
            <div key={item.id} className="p-4 bg-gray-100 rounded-lg shadow-sm flex items-center">
              <div className="flex-1">
                <h4 className="text-lg font-semibold">{item.name}</h4>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
              {item.imageLink && (
                <div className="ml-4 flex-shrink-0">
                  <img
                    src={item.imageLink}
                    alt={item.name}
                    className="h-16 w-16 object-cover rounded-md"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BinDetailModal;
