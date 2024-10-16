import React from "react";
import PlanCard from "../PlanCard/PlanCard";
import { useGetAllSubscriptionQuery } from "../../features/api/admin/adminSubscriptionApi";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";

const HomeSubscription = () => {
  const { data: subscriptions, isLoading } = useGetAllSubscriptionQuery();
  if (isLoading) return <LoadingAnimation />;

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

export default HomeSubscription;
