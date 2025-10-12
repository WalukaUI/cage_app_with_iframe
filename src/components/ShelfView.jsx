import { useState, useEffect } from 'react';
import Spinner from './Spinner'; // Import the Spinner component

function ShelfView() {
  const [items, setItems] = useState([]);
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

  const groupedByShelf = items.reduce((acc, item) => {
    (acc[item.shelfNumber] = acc[item.shelfNumber] || []).push(item);
    return acc;
  }, {});

  if (loading) return <div className="text-center">Loading shelves...<Spinner/></div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Shelf View</h2>
      {Object.keys(groupedByShelf).length > 0 ? (
        Object.keys(groupedByShelf).sort().map((shelfNumber) => (
          <div key={shelfNumber} className="mb-8 border-b pb-4">
            <h3 className="text-xl font-bold text-gray-700 mb-4">Shelf {shelfNumber}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {groupedByShelf[shelfNumber].map((item) => (
                <div key={item.id} className="p-4 bg-gray-50 border rounded-lg shadow-sm">
                  <h4 className="text-lg font-semibold">{item.name}</h4>
                  <p>Level: {item.levelNumber}, Bin: {item.binNumber}</p>
                  <p className="text-sm text-gray-600 mt-2">{item.description}</p>
                  {item.imageLink && <img src={item.imageLink} alt={item.name} className="mt-4 max-w-full h-auto rounded-md" />}
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No items available to display.</p>
      )}
    </div>
  );
}

export default ShelfView;
