import React from 'react';
import UserInformation from '../../../Components/DashboardComponent/UserInformation/UserInformation';

const Profile = () => {
  return (
    <div className='font-sora'>
      <div className='bg-white p-4 space-x-12 border border-[#E9E9E9] rounded-md'>
        <button>User Information</button>
        <button>Shop Information</button>
      </div>
      <div className='mt-4'>
        <UserInformation/>
      </div>
    </div>
  );
};

export default Profile;