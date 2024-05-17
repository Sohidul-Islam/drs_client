import React from 'react';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className='text-center'>
      <p>Header</p>
      <p>Sidebar</p>
      <Outlet/>
    </div>
  );
};

export default DashboardLayout;