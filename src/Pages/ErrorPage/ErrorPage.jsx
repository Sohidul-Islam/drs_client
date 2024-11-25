import React from 'react';
import { Link, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <div className="flex items-center justify-center h-screen bg-gray-400">
      <div className="w-[400px] h-[300px] px-4 py-8 bg-gray-100 shadow-lg rounded-lg flex items-center justify-center flex-col gap-5">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Oops!</h1>
        <p className="text-gray-700 mb-4">Something went wrong...</p>
        <p className='text-red-500'>{error.statusText || error.message}</p>
        
        <Link to='/' className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Go Home
        </Link>
      </div>
      
    </div>
  );
};

export default ErrorPage;
