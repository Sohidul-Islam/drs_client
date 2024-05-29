import React from "react";
import HelpCard from "../HelpCard/HelpCard";
import logo from "../../assets/logo.png";
import FeatureList from "../FeatureList/FeatureList";

const HomeDetails = () => {
  return (
    <div className="font-sora">
      <h1 className="text-lg md:text-3xl font-semibold">
        Pharmacy Management Software
      </h1>
      <p className="text-xs mt-2 leading-5 w-full md:w-3/4">
        মডেল ফার্মেসি ও মডেল মেডিসিন শপ গুলোর দৈনন্দিন ক্রয়-বিক্রয় এর হিসাব সহজে
        রেকর্ড করার জন্য, DRA Solution নিয়ে এলো অনলাইন ভিত্তিক ERP সফটওয়্যার।
      </p>

      <div className="mt-5 md:mt-7 grid grid-cols-1 md:grid-cols-7 lg:grid-cols-4 gap-5 md:gap-10">
        <div className="md:col-span-5 lg:col-span-3 p-4 border border-[#880015] rounded-md">
          <FeatureList />
        </div>
        {/* contact info  */}
        <div className="col-span-1 md:col-span-2 lg:col-span-1 border border-[#880015] rounded-md p-4">
          <HelpCard display="block !space-y-4" />
          <div className="flex items-center justify-center gap-2 mt-9">
            <img className="w-10 h-8" src={logo} alt="DRA Solution logo" />
            <p className="text-base font-semibold">
              <span className="text-[#006E9E]">Pharma</span> DRA Solution
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeDetails;
