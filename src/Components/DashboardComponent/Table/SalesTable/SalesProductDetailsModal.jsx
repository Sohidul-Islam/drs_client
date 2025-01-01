import React from "react";

const SalesProductDetailsModal = ({ isOpen, onClose, productDetails }) => {
  // console.log(productDetails)
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div
        className={`${
          isOpen ? "animate-slide-in" : "animate-slide-out"
        } relative top-14 mx-auto p-5 border w-[80%] h-[80%] shadow-lg rounded-md bg-white`}
      >
        <h4>Sales Product Details</h4>
      </div>
    </div>
  );
};

export default SalesProductDetailsModal;
