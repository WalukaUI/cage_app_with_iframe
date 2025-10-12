import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
      <Link to="/create" className="bg-lightPink p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Create Items</h2>
        <p className="text-gray-700">Add new items to your inventory with detailed information.</p>
      </Link>

      <Link to="/find" className="bg-lightPink p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Find Items</h2>
        <p className="text-gray-700">Search for specific items by name in your inventory.</p>
      </Link>

      <Link to="/shelf" className="bg-lightPink p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Shelf View</h2>
        <p className="text-gray-700">Visualize all items organized by their shelf and bin.</p>
      </Link>
    </div>
  );
}

export default LandingPage;

