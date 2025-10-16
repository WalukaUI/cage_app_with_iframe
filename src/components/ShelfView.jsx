import { useState, useEffect } from 'react';
import Spinner from './Spinner';
import BinDetailModal from './BinDetailModal';


function ShelfView() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedBin, setSelectedBin] = useState(null);

  const maxShelves = 5;
  const maxLevels = 8;
  const maxBins = 20;

  useEffect(() => {
    const fetchItems = async () => {
      try {
            const apiIp = import.meta.env.VITE_API_IP;
            const response =  await fetch(`http://${apiIp}/items`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setItems(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const groupedItems = items.reduce((shelves, item) => {
    const { shelfnumber, level, bin } = item;
    if (!shelves[shelfnumber]) shelves[shelfnumber] = {};
    if (!shelves[shelfnumber][level]) shelves[shelfnumber][level] = {};
    if (!shelves[shelfnumber][level][bin]) {
      shelves[shelfnumber][level][bin] = [];
    }
    shelves[shelfnumber][level][bin].push(item);
    return shelves;
  }, {});

  const handleBinClick = (shelfNum, levelNum, binNum) => {
    const itemsInBin = groupedItems[shelfNum]?.[levelNum]?.[binNum] || [];
    if (itemsInBin.length > 0) {
      setSelectedBin({
        shelfnumber: shelfNum,
        level: levelNum,
        bin: binNum,
        items: itemsInBin,
      });
      setShowModal(true);
    }
  };

  if (loading) return <div className="text-center">Loading shelves...<Spinner/></div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  const shelfnumbers = Array.from({ length: maxShelves }, (_, i) => i + 1);
  const levels = Array.from({ length: maxLevels }, (_, i) => i + 1);
  const bins = Array.from({ length: maxBins }, (_, i) => i + 1);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Shelf View</h2>
      {shelfnumbers.map((shelfNum) => (
        <div key={shelfNum} className="mb-8 p-4 border-2 border-gray-400 rounded-lg bg-gray-100">
          <div className="relative p-2 bg-gray-300 border-b-2 border-gray-400 mb-2">
            <h3 className="text-xl font-bold text-gray-800 text-center">Shelf {shelfNum}</h3>
          </div>
          {levels.map((levelNum) => (
            <div key={levelNum} className="flex border-t border-gray-400">
              <div className="w-16 p-2 bg-gray-300 flex-shrink-0 flex items-center justify-center">
                <span className="font-bold text-gray-800">L{levelNum}</span>
              </div>
              <div className="flex flex-1 relative bg-white">
                <div className="absolute inset-0 z-0 bg-gray-300"></div>
                {bins.map((binNum) => {
                  const hasBin = groupedItems[shelfNum]?.[levelNum]?.[binNum];
                  return (
                    <div
                      key={binNum}
                      onClick={() => handleBinClick(shelfNum, levelNum, binNum)}
                      className={`relative flex-1 flex items-center justify-center border-l border-gray-400 text-center cursor-pointer transition-colors ${hasBin ? 'bg-green-300 hover:bg-green-400' : 'bg-gray-200 hover:bg-gray-300'}`}
                      style={{ padding: '10px 0', minWidth: '40px' }}
                    >
                      <div className="relative z-10 font-bold text-gray-800">
                        {binNum}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ))}
      {showModal && selectedBin && (
        <BinDetailModal
          binDetails={selectedBin}
          onClose={() => setShowModal(false)} // This is the fix
        />
      )}
    </div>
  );
}

export default ShelfView;
