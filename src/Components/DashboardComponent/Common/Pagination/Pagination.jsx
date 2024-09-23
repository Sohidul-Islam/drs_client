import React from "react";

const Pagination = ({
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
  totalPages,
}) => {
  // Page size button/selection
  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
  };

  // Handle Previous Button Click
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle Next Button Click
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="border-t">
      <div className="my-4 flex justify-between">
        {/* Show selection */}
        <div>
          <label className="text-sm font-medium text-[#1F1F1F] mr-2">
            Show
          </label>
          <select
            className="text-sm border outline-gray-300 text-gray-700 py-1 px-1 rounded-md"
            value={pageSize}
            onChange={handlePageSizeChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </div>
        {/* Next and Previous Buttons */}
        <div>
          <button
            onClick={handlePrevious}
            className={`border px-3 py-1 text-base ${
              currentPage === 1
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer hover:bg-gray-300"
            }`}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className={`border px-3 py-1 text-base ${
              currentPage === totalPages || totalPages === 0
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer hover:bg-gray-300"
            }`}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
