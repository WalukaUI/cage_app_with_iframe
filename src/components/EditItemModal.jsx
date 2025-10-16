import React, { useState } from 'react';

const EditItemModal = ({ item, onSave, onClose }) => {
  const [editedItem, setEditedItem] = useState(item);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedItem({ ...editedItem, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedItem);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold">Edit Item: {item.title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Name</label>
            <input
              type="text"
              name="title"
              value={editedItem.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Description</label>
            <textarea
              name="content"
              value={editedItem.content}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md h-24"
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Image Link</label>
            <input
              type="text"
              name="image"
              value={editedItem.image}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Shelf</label>
              <input type="number" name="shelfnumber" value={editedItem.shelfnumber} onChange={handleChange} className="w-full p-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Level</label>
              <input type="number" name="level" value={editedItem.level} onChange={handleChange} className="w-full p-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Bin</label>
              <input type="number" name="bin" value={editedItem.bin} onChange={handleChange} className="w-full p-2 border rounded-md" />
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditItemModal;
