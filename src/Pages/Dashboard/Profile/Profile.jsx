import React, { useState } from "react";
import UserInformation from "../../../Components/DashboardComponent/UserInformation/UserInformation";
import ShopInformation from "../../../Components/DashboardComponent/ShopInformation/ShopInformation";

const Profile = () => {
  const [status, setStatus] = useState("user");

  return (
    <div className="">
      <div className="bg-white p-4 space-x-12 border border-[#E9E9E9] rounded-md">
        <button
          onClick={() => setStatus("user")}
          className={`${status !== "user" && "text-gray-400"}`}
        >
          User Information
        </button>
        <button
          onClick={() => setStatus("shop")}
          className={`${status !== "shop" && "text-gray-400"}`}
        >
          Shop Information
        </button>
      </div>
      <div className="mt-4">
        {status === "user" ? <UserInformation /> : <ShopInformation />}
      </div>
    </div>
  );
};

export default Profile;
