import React from 'react';
import { AiOutlineReconciliation } from 'react-icons/ai';

const ManageStore = () => {
  return (
    <div className="relative h-screen">
    <div className="flex items-center gap-x-[10px]">
      <AiOutlineReconciliation className="text-lg" />
      <p>Manage Store</p>
    </div>
    <div className="px-5 py-3 mt-3 bg-white">Manage Store</div>
  </div>
  );
};

export default ManageStore;