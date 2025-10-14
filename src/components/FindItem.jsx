import { useState, useEffect } from 'react';
import Spinner from './Spinner';
import EditItemModal from './EditItemModal';

function FindItem() {
  const colors = ['#9FB3DF', '#9EC6F3', '#BDDDE4', '#FFF1D5'];

  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
            const apiIp = import.meta.env.VITE_API_IP;
            const response = await fetch(`http://${apiIp}/items`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setItems(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchItems()
  }, []);

  useEffect(() => {
    setFilteredItems(
      items.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, items]);

  const handleDeleteItem = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const handleEditItem = (item) => {
    setItemToEdit(item);
    setIsModalOpen(true);
  };

  const handleSaveEdit = (updatedItem) => {
    setItems(items.map(item => item.id === updatedItem.id ? updatedItem : item));
    setIsModalOpen(false);
    setItemToEdit(null);
  };

  if (loading) return <div className="text-center">Loading items...<Spinner/></div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Find Items</h2>
      <input
        type="text"
        placeholder="Search by item name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="space-y-4">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => {
            const backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            return (
              <div
                key={item.id}
                className="p-4 border rounded-lg shadow-sm flex flex-col"
                style={{ backgroundColor }}
              >
                <div className="flex items-start">
                  <div className="flex-1">
                    <h3 className="text-xl text-gray-800">{item.name}</h3>
                    <p className="text-lg text-gray-700">
                      <span className="font-semibold">Shelf:</span> <span className="font-bold text-gray-800">{item.shelfnumber}</span>,
                      <span className="font-semibold"> Level:</span> <span className="font-bold text-gray-800">{item.level}</span>,
                      <span className="font-semibold"> Bin:</span> <span className="font-bold text-gray-800">{item.bin}</span>
                    </p>
                    <p className="text-gray-600 mt-2">{item.description}</p>
                  </div>
                  {item.image && (
                    <div className="ml-4 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-32 w-32 object-cover rounded-md"
                      />
                    </div>
                  )}
                </div>
                <div className="mt-2 flex justify-end space-x-2">
                  <button
                    onClick={() => handleEditItem(item)}
                    className="flex items-center space-x-1 py-2 px-3 bg-blue-200 text-white rounded-md hover:bg-blue-600 transition-colors"
                    aria-label="Edit"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    <span className="font-semibold">Edit</span>
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="flex items-center space-x-1 py-2 px-3 bg-red-200 text-white rounded-md hover:bg-red-600 transition-colors"
                    aria-label="Delete"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold">Delete</span>
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500">No items found.</p>
        )}
      </div>

      {isModalOpen && (
        <EditItemModal
          item={itemToEdit}
          onSave={handleSaveEdit}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default FindItem;
