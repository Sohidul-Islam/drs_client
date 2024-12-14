import React from "react";
import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <div className="bg-bgRegister bg-cover bg-no-repeat h-screen">
      <div className="flex items-center justify-center h-full bg-[#1F23A8]/50 ">
        <div className="w-[500px] h-[400px] px-8 bg-gray-100 shadow-lg rounded-lg flex items-center justify-center flex-col gap-5">
          <h1 className="text-3xl font-bold text-red-500 mb-2">Oops!</h1>
          <p className="text-gray-700 mb-2">Something went wrong</p>
          <p className="text-red-500 mb-4 text-center">{error.statusText || error.message}</p>

          <Link
            to="/"
            className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
