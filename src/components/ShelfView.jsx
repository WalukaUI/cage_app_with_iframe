// // Static inventory data
// const inventoryItems = [
//   { id: 1, name: 'Arduino Uno R3', shelfNumber: 3, levelNumber: 4, binNumber: 12, description: 'A popular and versatile microcontroller board for electronics projects.', imageLink: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx2qgq8AfWo-AlNAlTn8STF5pkPI1xLhDjqg&s' },
//   { id: 2, name: 'Breadboard (830 point)', shelfNumber: 3, levelNumber: 4, binNumber: 13, description: 'A solderless breadboard used for prototyping electronics.', imageLink: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa4EkXfCRAhOsRaVYfe-fi76EibPP0vRavUg&s' },
//   { id: 3, name: 'Resistor Assortment', shelfNumber: 5, levelNumber: 2, binNumber: 5, description: 'A collection of standard resistors with various values.', imageLink: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlOp1ixXl5ntft9Wcx49SWNu0sSctHomYqag&s' },
//   { id: 4, name: 'LED Pack (Assorted Colors)', shelfNumber: 5, levelNumber: 2, binNumber: 6, description: 'A kit containing LEDs in red, green, blue, and yellow.', imageLink: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaQiUqKtZ6Jl-yeAcDAFsRcB6gj8DfJGAUpg&s' },
//   { id: 5, name: 'Wire Stripper', shelfNumber: 1, levelNumber: 8, binNumber: 1, description: 'A tool for stripping plastic insulation from electric wires.', imageLink: null },
//   { id: 6, name: 'Assorted Resistors', shelfNumber: 5, levelNumber: 2, binNumber: 5, description: 'Another collection of standard resistors.', imageLink: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlOp1ixXl5ntft9Wcx49SWNu0sSctHomYqag&s' },
//   { id: 7, name: 'More LEDs', shelfNumber: 5, levelNumber: 2, binNumber: 6, description: 'Additional LEDs for projects.', imageLink: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaQiUqKtZ6Jl-yeAcDAFsRcB6gj8DfJGAUpg&s' }
// ];




//   const groupedByShelf = items.reduce((acc, item) => {
//     (acc[item.shelfNumber] = acc[item.shelfNumber] || []).push(item);
//     return acc;
//   }, {});

//   if (loading) return <div className="text-center">Loading shelves...<Spinner/></div>;
//   if (error) return <div className="text-center text-red-500">Error: {error}</div>;

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">Shelf View</h2>
//       {Object.keys(groupedByShelf).length > 0 ? (
//         Object.keys(groupedByShelf).sort().map((shelfNumber) => (
//           <div key={shelfNumber} className="mb-8 border-b pb-4">
//             <h3 className="text-xl font-bold text-gray-700 mb-4">Shelf {shelfNumber}</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {groupedByShelf[shelfNumber].map((item) => (
//                 <div key={item.id} className="p-4 bg-gray-50 border rounded-lg shadow-sm">
//                   <h4 className="text-lg font-semibold">{item.name}</h4>
//                   <p>Level: {item.levelNumber}, Bin: {item.binNumber}</p>
//                   <p className="text-sm text-gray-600 mt-2">{item.description}</p>
//                   {item.imageLink && <img src={item.imageLink} alt={item.name} className="mt-4 max-w-full h-auto rounded-md" />}
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))
//       ) : (
//         <p className="text-center text-gray-500">No items available to display.</p>
//       )}
//     </div>
//   );
// }

// export default ShelfView;


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
            console.log(`http://${apiIp}/items`);
            //const response =  await fetch(`http://${apiIp}/items`);
            //const response =  await fetch("http://10.227.163.73/items");
            const response = await fetch('/api/items');
          
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setItems(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError(err.message);
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const groupedItems = items.reduce((shelves, item) => {
    const { shelfNumber, levelNumber, binNumber } = item;
    if (!shelves[shelfNumber]) shelves[shelfNumber] = {};
    if (!shelves[shelfNumber][levelNumber]) shelves[shelfNumber][levelNumber] = {};
    if (!shelves[shelfNumber][levelNumber][binNumber]) {
      shelves[shelfNumber][levelNumber][binNumber] = [];
    }
    shelves[shelfNumber][levelNumber][binNumber].push(item);
    return shelves;
  }, {});

  const handleBinClick = (shelfNum, levelNum, binNum) => {
    const itemsInBin = groupedItems[shelfNum]?.[levelNum]?.[binNum] || [];
    if (itemsInBin.length > 0) {
      setSelectedBin({
        shelfNumber: shelfNum,
        levelNumber: levelNum,
        binNumber: binNum,
        items: itemsInBin,
      });
      setShowModal(true);
    }
  };

  if (loading) return <div className="text-center">Loading shelves...<Spinner/></div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  const shelfNumbers = Array.from({ length: maxShelves }, (_, i) => i + 1);
  const levelNumbers = Array.from({ length: maxLevels }, (_, i) => i + 1);
  const binNumbers = Array.from({ length: maxBins }, (_, i) => i + 1);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Shelf View</h2>
      {shelfNumbers.map((shelfNum) => (
        <div key={shelfNum} className="mb-8 p-4 border-2 border-gray-400 rounded-lg bg-gray-100">
          <div className="relative p-2 bg-gray-300 border-b-2 border-gray-400 mb-2">
            <h3 className="text-xl font-bold text-gray-800 text-center">Shelf {shelfNum}</h3>
          </div>
          {levelNumbers.map((levelNum) => (
            <div key={levelNum} className="flex border-t border-gray-400">
              <div className="w-16 p-2 bg-gray-300 flex-shrink-0 flex items-center justify-center">
                <span className="font-bold text-gray-800">L{levelNum}</span>
              </div>
              <div className="flex flex-1 relative bg-white">
                <div className="absolute inset-0 z-0 bg-gray-300"></div>
                {binNumbers.map((binNum) => {
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
