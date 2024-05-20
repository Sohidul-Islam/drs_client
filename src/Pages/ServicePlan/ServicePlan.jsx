import React from "react";
import pharmaLogin from "../../assets/pharma-login.png";
import PlanCard from "../../Components/PlanCard/PlanCard";

const ServicePlan = () => {
  return (
    <div className="px-5 md:px-10 py-5 md:py-10 font-sora">
      <div className="flex items-center gap-3">
        <img className="w-10 md:h-8" src={pharmaLogin} alt="Phara login" />
        <h1 className="text-2xl font-semibold">
          <span className="text-[#006E9E]">Pharma</span> DRA Solution
        </h1>
      </div>
      <div className="mt-6 md:text-center max-w-[600px] mx-auto ">
        <h2 className="text-xl md:text-3xl font-semibold">Choose your right plan!</h2>
        <p className="text-sm mt-2 md:mt-5">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum is simply dummy text of the printing and
          typesetting industry.
        </p>
      </div>
      <div className="mt-5 md:mt-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 ">
        <PlanCard planeType="Free Trial" price="0.00"/>
        <PlanCard planeType="Stellar" price="500.00" month="3"/>
        <PlanCard planeType="Stellar Business" price="1000.00" month="6"/>
        <PlanCard planeType="Premium" price="1500.00" month="12"/>
      </div>
    </div>
  );
};

export default ServicePlan;
