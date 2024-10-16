import React from "react";
import logo from "../../assets/logo.png";
import PlanCard from "../../Components/PlanCard/PlanCard";
import { Link } from "react-router-dom";
import { useGetAllSubscriptionQuery } from "../../features/api/admin/adminSubscriptionApi";
import LoadingAnimation from "../../Components/LoadingAnimation/LoadingAnimation";

const SubscriptionPlans = () => {
  const { data: subscriptions, isLoading } = useGetAllSubscriptionQuery();

  if (isLoading) return <LoadingAnimation />;

  return (
    <div className="container mx-auto p-5 md:p-10 ">
      <Link to="/" className="flex items-center gap-3">
        <img className="w-10 md:h-8" src={logo} alt="DRA Solution logo" />
        <div className="text-xl md:text-2xl font-semibold">
          <span className="text-[#006E9E]">DRA</span> Solution
        </div>
      </Link>
      <div className="mt-6 md:text-center max-w-[600px] mx-auto ">
        <h2 className="text-xl md:text-3xl font-semibold">
          Choose your right plan!
        </h2>
        <p className="text-sm mt-2 md:mt-5">
          Explore our subscription plans and find the one that best fits your
          needs. Whether you're just starting or looking for advanced features,
          we've got you covered.
        </p>
      </div>
      <div className="mt-5 md:mt-10 md:flex justify-center gap-5 md:gap-10">
        {subscriptions?.map((subscription, index) => (
          <PlanCard
            key={index}
            index={index}
            subscription={subscription}
            planeType="Free Trial"
            price="0.00"
          />
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlans;
