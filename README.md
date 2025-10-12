The Inventory Management App is a modern web application designed to help businesses and individuals organize and track their physical inventory. Built with React, Vite, and Tailwind CSS, the app provides a user-friendly interface for managing items, viewing stock levels, and locating items on shelves.
This application connects to a backend system (with its IP address hidden for security) to perform CRUD (Create, Read, Update, Delete) operations on item data. Key features include an item creation form with smart search suggestions and an embedded Google search for quick descriptions, a find items page with search functionality, and a clear shelf visualization.


The Inventory Management App is a modern web application designed to help businesses and individuals organize and track their physical inventory. Built with React, Vite, and Tailwind CSS, the app provides a user-friendly interface for managing items, viewing stock levels, and locating items on shelves.
This application connects to a backend system (with its IP address hidden for security) to perform CRUD (Create, Read, Update, Delete) operations on item data. Key features include an item creation form with smart search suggestions and an embedded Google search for quick descriptions, a find items page with search functionality, and a clear shelf visualization.
Environment Variables: Securely manages the backend API IP address using a .env file to protect sensitive information.


Technology Stack
Front-end:
React: A JavaScript library for building user interfaces.
Vite: A modern front-end build tool that provides a lightning-fast development server and build process.
Tailwind CSS: A utility-first CSS framework for building custom designs.
React Router: A standard library for routing in React applications.


APIs:
An internal inventory management API hosted at http://[VITE_API_IP].
A proxied Google Suggest API for search suggestions.
An embedded Google Search <iframe> for description assistance.

State Management: useState and useEffect hooks for local state and side effects.

Installation and Setup
Prerequisites
Node.js (version 14 or higher)
A backend API server accessible at the specified IP address.

Steps


Clone repo

git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

Install dependencies:
npm install

Create a .env file:
Create a file named .env in the root of your project and add your backend API's IP address:


Configure Vite Proxy (if needed):
Ensure your vite.config.js is set up with the proxy for Google search suggestions.

JS

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/google': {
        target: 'http://suggestqueries.google.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/google/, ''),
      },
    },
  },
});

-------------------------------------------------------------------------------------
run app

npm run dev

Open your browser and navigate to the local address provided by the terminal (e.g., http://localhost:5173).


Usage
Create Item: Navigate to the "Create Item" page to add new entries to your inventory.
Find Items: Use the search bar on the "Find Items" page to quickly locate specific items.
Shelf View: Explore a visual representation of your inventory, with items organized by their shelf number.

Notes on Functionality
Google Integration: The app uses an embedded <iframe> for Google search. Due to security restrictions (the Same-Origin Policy and X-Frame-Options headers), the app cannot programmatically read or interact with the content inside the <iframe>. Users must manually copy and paste information (such as image links or text for descriptions).
API Security: The .env file is used to avoid hardcoding sensitive information like the API IP address in the source code. However, since the variable is accessible on the client side, for a production environment, it is best to route all API calls through a secure backend to truly hide sensitive details.
