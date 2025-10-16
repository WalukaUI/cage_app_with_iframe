// import { useState, useEffect, useRef } from 'react';
// import SearchIframe from './SearchIframe';

// function CreateItem() {
//   const [formData, setFormData] = useState({
//     title: '',
//     shelfnumber: '',
//     level: '',
//     image: '',
//     bin: '',
//     content: '',
//   });

//   const [nameSuggestions, setNameSuggestions] = useState([]);
//   const [showNameSuggestions, setShowNameSuggestions] = useState(false);
//   const nameTimeoutRef = useRef(null);


//   const [showIframe, setShowIframe] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleImageInputFocus = () => {
//     setShowIframe(true);
//   };

//   const handleImageInputBlur = () => {
//     // Keep iframe visible for user interaction
//   };
  
//   // Debounce the name suggestion fetch call
//   useEffect(() => {
//     if (formData.title.length > 1) {
//       if (nameTimeoutRef.current) {
//         clearTimeout(nameTimeoutRef.current);
//       }
//       nameTimeoutRef.current = setTimeout(async () => {
//         try {
//           const response = await fetch(
//             `/api/google/complete/search?client=firefox&q=${formData.title}`
//           );
//           if (response.ok) {
//             const data = await response.json();
//             // The API response is an array: [query, [suggestions...]]
//             setNameSuggestions(data[1] || []);
//           }
//         } catch (error) {
//           console.error("Error fetching name suggestions:", error);
//         }
//       }, 500); // 500ms delay after user stops typing
//     } else {
//       setNameSuggestions([]);
//     }
//   }, [formData.title]);

//   const handleNameSuggestionClick = (suggestion) => {
//     setFormData((prevData) => ({ ...prevData, name: suggestion }));
//     setNameSuggestions([]);
//     setShowNameSuggestions(false);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log('Submitting data:', formData);
//     try {
//           const apiIp = import.meta.env.VITE_API_IP;
//           const response = await fetch(`http://${apiIp}/items`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         alert('Item created successfully!');
//         setFormData({ title: '', shelfnumber: '', level: '', image: '', bin: '', content: '' });
//       } else {
//         alert('Failed to create item.');
//       }
//     } catch (error) {
//       console.error('Error creating item:', error);
//       alert('An error occurred while creating the item.');
//     }
//   };

//   const inputClasses = "w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-salmonPink";
//   const selectClasses = "w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-salmonPink";

//   const generateNumberRange = (start, end) => {
//     return Array.from({ length: end - start + 1 }, (_, i) => start + i);
//   };

//   const shelfNumbers = generateNumberRange(1, 15);
//   const levelNumbers = generateNumberRange(1, 9);
//   const binNumbers = generateNumberRange(1, 20);

//   return (
//     <div className="flex">
//       <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md w-full">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Item</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="relative">
//             <label className="block text-gray-700 font-semibold mb-1">Name</label>
//             <input
//               type="text"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               onFocus={() => setShowNameSuggestions(true)}
//               onBlur={() => setTimeout(() => setShowNameSuggestions(false), 200)}
//               className={inputClasses}
//               required
//             />
//             {showNameSuggestions && nameSuggestions.length > 0 && (
//               <div className="absolute top-full mt-2 w-full bg-paleTeal rounded-lg shadow-lg z-10 p-2">
//                 <ul className="divide-y divide-gray-200">
//                   {nameSuggestions.map((suggestion, index) => (
//                     <li
//                       key={index}
//                       onClick={() => handleNameSuggestionClick(suggestion)}
//                       className="p-2 cursor-pointer hover:bg-lightPink rounded-md transition-colors"
//                     >
//                       {suggestion}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//           <div>
//             <label className="block text-gray-700 font-semibold mb-1">Shelf Number</label>
//             <select name="shelfnumber" value={formData.shelfnumber} onChange={handleChange} className={selectClasses} required>
//               <option value="">Select a shelf</option>
//               {shelfNumbers.map(number => (
//                 <option key={number} value={number}>{number}</option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-gray-700 font-semibold mb-1">Level Number</label>
//             <select name="level" value={formData.level} onChange={handleChange} className={selectClasses}>
//               <option value="">Select a level</option>
//               {levelNumbers.map(number => (
//                 <option key={number} value={number}>{number}</option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-gray-700 font-semibold mb-1">Bin Number</label>
//             <select name="bin" value={formData.bin} onChange={handleChange} className={selectClasses}>
//               <option value="">Select a bin</option>
//               {binNumbers.map(number => (
//                 <option key={number} value={number}>{number}</option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-gray-700 font-semibold mb-1">Image Link</label>
//             <input
//               type="text"
//               name="image"
//               value={formData.image}
//               onChange={handleChange}
//               onFocus={handleImageInputFocus}
//               onBlur={handleImageInputBlur}
//               className={inputClasses}
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 font-semibold mb-1">Description</label>
//             <textarea name="content" value={formData.content} onChange={handleChange} className={`${inputClasses} h-24`}></textarea>
//           </div>
//           <button type="submit" className="w-full bg-salmonPink text-white py-2 rounded-md hover:bg-red-400 transition-colors">Add Item</button>
//         </form>
//       </div>
      
//       {/* Display iframe when input is focused and name is not empty */}
//       {showIframe && formData.title && (
//         <SearchIframe searchTerm={formData.title} />
//       )}
//     </div>
//   );
// }

// export default CreateItem;


import { useState, useEffect, useRef } from 'react';
import SearchIframe from './SearchIframe';

function CreateItem() {
  const [formData, setFormData] = useState({
    title: '',
    shelfnumber: '',
    level: '',
    image: '',
    bin: '',
    content: '',
  });

  const [nameSuggestions, setNameSuggestions] = useState([]);
  const [showNameSuggestions, setShowNameSuggestions] = useState(false);
  const nameTimeoutRef = useRef(null);

  // New state to manage iframe visibility based on image input focus
  const [showImageIframe, setShowImageIframe] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageInputFocus = () => {
    setShowImageIframe(true);
  };

  const handleImageInputBlur = () => {
    // A small timeout allows for user clicks inside the iframe.
    // The iframe can still be hidden if the user clicks outside of it.
    setTimeout(() => {
        setShowImageIframe(false);
    }, 200);
  };
  
  // Debounce the name suggestion fetch call
  useEffect(() => {
    if (formData.title.length > 1) {
      if (nameTimeoutRef.current) {
        clearTimeout(nameTimeoutRef.current);
      }
      nameTimeoutRef.current = setTimeout(async () => {
        try {
          const response = await fetch(
            `/api/google/complete/search?client=firefox&q=${formData.title}`
          );
          if (response.ok) {
            const data = await response.json();
            // The API response is an array: [query, [suggestions...]]
            setNameSuggestions(data[1] || []);
          }
        } catch (error) {
          console.error("Error fetching name suggestions:", error);
        }
      }, 500); // 500ms delay after user stops typing
    } else {
      setNameSuggestions([]);
    }
  }, [formData.title]);

  const handleNameSuggestionClick = (suggestion) => {
    setFormData((prevData) => ({ ...prevData, title: suggestion }));
    setNameSuggestions([]);
    setShowNameSuggestions(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting data:', formData);
    try {
          const apiIp = import.meta.env.VITE_API_IP;
          const response = await fetch(`http://${apiIp}/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Item created successfully!');
        setFormData({ title: '', shelfnumber: '', level: '', image: '', bin: '', content: '' });
      } else {
        alert('Failed to create item.');
      }
    } catch (error) {
      console.error('Error creating item:', error);
      alert('An error occurred while creating the item.');
    }
  };

  const inputClasses = "w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-salmonPink";
  const selectClasses = "w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-salmonPink";

  const generateNumberRange = (start, end) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const shelfNumbers = generateNumberRange(1, 15);
  const levelNumbers = generateNumberRange(1, 9);
  const binNumbers = generateNumberRange(1, 20);

  return (
    <div className="flex">
      <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Item</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <label className="block text-gray-700 font-semibold mb-1">Name</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              onFocus={() => setShowNameSuggestions(true)}
              onBlur={() => setTimeout(() => setShowNameSuggestions(false), 200)}
              className={inputClasses}
              required
            />
            {showNameSuggestions && nameSuggestions.length > 0 && (
              <div className="absolute top-full mt-2 w-full bg-paleTeal rounded-lg shadow-lg z-10 p-2">
                <ul className="divide-y divide-gray-200">
                  {nameSuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => handleNameSuggestionClick(suggestion)}
                      className="p-2 cursor-pointer hover:bg-lightPink rounded-md transition-colors"
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Shelf Number</label>
            <select name="shelfnumber" value={formData.shelfnumber} onChange={handleChange} className={selectClasses} required>
              <option value="">Select a shelf</option>
              {shelfNumbers.map(number => (
                <option key={number} value={number}>{number}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Level Number</label>
            <select name="level" value={formData.level} onChange={handleChange} className={selectClasses}>
              <option value="">Select a level</option>
              {levelNumbers.map(number => (
                <option key={number} value={number}>{number}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Bin Number</label>
            <select name="bin" value={formData.bin} onChange={handleChange} className={selectClasses}>
              <option value="">Select a bin</option>
              {binNumbers.map(number => (
                <option key={number} value={number}>{number}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Image Link</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              onFocus={handleImageInputFocus}
              onBlur={handleImageInputBlur}
              className={inputClasses}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Description</label>
            <textarea name="content" value={formData.content} onChange={handleChange} className={`${inputClasses} h-24`}></textarea>
          </div>
          <button type="submit" className="w-full bg-salmonPink text-white py-2 rounded-md hover:bg-red-400 transition-colors">Add Item</button>
        </form>
      </div>
      
      {/* Display iframe only when the image input is focused AND there is a search term */}
      {showImageIframe && formData.title && (
        <SearchIframe searchTerm={formData.title} />
      )}
    </div>
  );
}

export default CreateItem;
