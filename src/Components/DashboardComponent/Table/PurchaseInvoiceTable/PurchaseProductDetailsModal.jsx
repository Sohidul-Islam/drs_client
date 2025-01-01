import React from "react";

const PurchaseProductDetailsModal = ({ isOpen, onClose, productDetails }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div
        className={`${
          isOpen ? "animate-slide-in" : "animate-slide-out"
        } relative top-14 mx-auto p-5 border w-[80%] h-[80%] shadow-lg rounded-md bg-white`}
      >sdffds</div>
    </div>
  );
};

export default PurchaseProductDetailsModal;
