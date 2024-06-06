import React, { useState, useEffect } from "react";
import UserInformation from "../../../Components/DashboardComponent/UserInformation/UserInformation";
import ShopInformation from "../../../Components/DashboardComponent/ShopInformation/ShopInformation";

const Profile = () => {
  const [status, setStatus] = useState("user");

  useEffect(() => {
    const savedStatus = localStorage.getItem("profileStatus");
    if (savedStatus) {
      setStatus(savedStatus);
    }
  }, []);

  const handleStatusChange = (status) => {
    setStatus(status);
    localStorage.setItem("profileStatus", status);
  };

  return (
    <div>
      <div className="bg-white p-4 space-x-12 border border-[#E9E9E9] rounded-md">
        <button
          onClick={() => handleStatusChange("user")}
          className={`${status !== "user" && "text-gray-400"}`}
        >
          User Information
        </button>
        <button
          onClick={() => handleStatusChange("shop")}
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
