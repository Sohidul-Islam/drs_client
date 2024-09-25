import React, { useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useAddUserSubscriptionMutation } from "../../features/api/admin/adminSubscriptionApi";

const PlanCard = ({ subscription, index, month }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [addUserSubscription] = useAddUserSubscriptionMutation();

  const isOdd = index % 2 !== 0;
  const backgroundColor = isOdd ? "bg-[#F0F8FF]" : "";

  const handleSubscription = async (subscriptionId) => {
    setLoading(true);
    const userSubscriptionData = {
      userId: user?.id,
      subscriptionPlanId: subscriptionId,
    };

    try {
      const response = await addUserSubscription(userSubscriptionData);
      if (response?.data?.status) {
        const sslUrl = response?.data?.data?.sslUrl;
        window.location.href = sslUrl;
          setLoading(false);
        } else {
          setLoading(false);
        }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div
      className={`relative w-full md:max-w-[302px] h-[516px] bg-white border border-[#E2E2E2] rounded-lg shadow-lg p-5 ${backgroundColor}`}
    >
      <span className=" bg-[#006E9E] text-white text-xs font-bold px-2 py-1 rounded">
        {subscription?.package}
      </span>
      <div className="mt-6">
        <p className="text-gray-600 text-sm">{subscription?.description}</p>
      </div>
      <div className="text-2xl font-semibold my-4">
        {subscription?.price}.00 BDT
        <span className="text-xs font-normal">/{month} month</span>
      </div>
      <ul className="space-y-2 text-xs">
        {subscription?.offers?.map((offer, index) => (
          <li key={index} className="flex items-center gap-2">
            <FaCircleCheck fill="#006E9E" size={15} />
            {offer?.name}
          </li>
        ))}
      </ul>
      <button
        type="submit"
        onClick={() => handleSubscription(subscription?.id)}
        disabled={loading}
        className={`${
          loading
            ? "hover:text-gray-400 border-gray-400 cursor-no-drop"
            : "hover:text-white hover:bg-[#006E9E] border-[#858585]"
        } w-[90%] mt-8 border rounded-md py-2 text-center absolute bottom-2 left-1/2 transform -translate-x-1/2`}
      >
        Choose Plan
      </button>
    </div>
  );
};

export default PlanCard;
