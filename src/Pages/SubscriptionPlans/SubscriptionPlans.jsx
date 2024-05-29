import React from "react";
import logo from "../../assets/logo.png";
import PlanCard from "../../Components/PlanCard/PlanCard";
import { Link } from "react-router-dom";

const SubscriptionPlans = () => {
  return (
    <div className="container mx-auto p-5 md:p-10 font-sora ">
      <Link to="/" className="flex items-center gap-3">
        <img className="w-10 md:h-8" src={logo} alt="DRA Solution logo" />
        <div className="text-xl md:text-2xl font-semibold">
          <span className="text-[#006E9E]">Pharma</span> DRA Solution
        </div>
      </Link>
      <div className="mt-6 md:text-center max-w-[600px] mx-auto ">
        <h2 className="text-xl md:text-3xl font-semibold">
          Choose your right plan!
        </h2>
        <p className="text-sm mt-2 md:mt-5">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum is simply dummy text of the printing and
          typesetting industry.
        </p>
      </div>
      {/* className="mt-5 md:mt-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5" */}

      <div className="mt-5 md:mt-10 md:flex justify-center gap-5 md:gap-10">
        <PlanCard planeType="Free Trial" price="0.00" />
        <PlanCard
          planeType="Stellar"
          price="300.00"
          month="6"
          backgroundColor="bg-gradient-sky-35"
        />
        <PlanCard planeType="Stellar Business" price="1200.00" month="12" />
      </div>
    </div>
  );
};

export default SubscriptionPlans;
