import { useState, useEffect } from 'react';
import Spinner from './Spinner'; // Import the Spinner component

function FindItem() {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
            const apiIp = import.meta.env.VITE_API_IP;
            const response = await fetch(`http://${apiIp}/api/items`);
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
    fetchItems();
  }, []);

  useEffect(() => {
    setFilteredItems(
      items.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, items]);

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
          filteredItems.map((item) => (
            <div key={item.id} className="p-4 bg-gray-50 border rounded-lg">
              <h3 className="text-xl font-semibold">{item.name}</h3>
              <p>Shelf: {item.shelfNumber}, Level: {item.levelNumber}, Bin: {item.binNumber}</p>
              <p className="text-gray-600 mt-2">{item.description}</p>
              {item.imageLink && <img src={item.imageLink} alt={item.name} className="mt-4 max-w-full h-auto rounded-md" />}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No items found.</p>
        )}
      </div>
    </div>
  );
}

export default FindItem;
