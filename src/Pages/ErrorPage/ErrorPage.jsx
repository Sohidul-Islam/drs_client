import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-400">
      <div className="max-w-md px-4 py-8 bg-gray-100 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Oops!</h1>
        <p className="text-gray-700 mb-4">Something went wrong...</p>
        <p className="text-gray-700 mb-8">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
        <Link to='/' className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
