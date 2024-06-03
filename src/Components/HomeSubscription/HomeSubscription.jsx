import React from "react";
import PlanCard from "../PlanCard/PlanCard";

const HomeSubscription = () => {
  return (
    <div className="">
      <h3 className="text-xl font-semibold">সাবস্ক্রিপশন প্যাকেজসমূহ</h3>
      <p className="mt-2 text-xs leading-6">
        বাংলাদেশের খুঁচরা ঔষধ বিপনীগুলোর কাজ সহজসাধ্য করতে ঔষধ প্রশাসন
        অধিদপ্তরের সার্বিক তত্ত্বাবধানে ম্যানেজমেন্ট সায়েন্সেস ফর হেলথ - এর
        বেটার হেলথ ইন বাংলাদেশ (বিএইচবি) প্রকল্প তাদের জন্য একটি ফার্মেসি
        ম্যানেজমন্টে সফটওয়্যার তৈরি করেছে। সফটওয়্যারটি বিপনীগুলো বিনামূল্যেই
        ব্যবহার করতে পারবে
      </p>
      <div className="mt-5 md:mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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

export default HomeSubscription;
