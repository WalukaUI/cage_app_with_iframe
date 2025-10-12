import { Routes, Route, Link } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import CreateItem from './components/CreateItem';
import FindItem from './components/FindItem';
import ShelfView from './components/ShelfView';

function App() {
  return (
    <div className="bg-lightCream min-h-screen">
      <nav className="bg-paleTeal shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-gray-800">Inventory App</Link>
          <div className="space-x-4">
            <Link 
              to="/create" 
              className="text-gray-800 hover:text-salmonPink font-semibold transition-colors duration-300"
            >
              Create Item
            </Link>
            <Link 
              to="/find" 
              className="text-gray-800 hover:text-salmonPink font-semibold transition-colors duration-300"
            >
              Find Item
            </Link>
            <Link 
              to="/shelf" 
              className="text-gray-800 hover:text-salmonPink font-semibold transition-colors duration-300"
            >
              Shelf View
            </Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto mt-8 p-4">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/create" element={<CreateItem />} />
          <Route path="/find" element={<FindItem />} />
          <Route path="/shelf" element={<ShelfView />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
