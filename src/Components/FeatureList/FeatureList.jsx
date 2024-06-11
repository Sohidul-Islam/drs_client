import React from "react";

const FeatureList = () => {
  return (
    <div>
      <h1 className="text-base font-semibold">
        আমাদের Pharmacy Management Software এর সুবিধা সমূহ:
      </h1>
      <ul className="list-disc pl-4 py-3 space-y-1 text-[13px]">
        <li>অনলাইন, কম্পিউটার এ সংরিক্ষণ প্রয়োজন নেই।</li>
        <li>ইনভয়েস তৈরি (দোকানের নাম, ঠিকানা ও লোগো সহ)।</li>
        <li>ক্রয়ের রেকর্ড, ওষুধ কোম্পানি ও সর্বরোহকারীর নাম সহ।</li>
        <li>ক্রেতার রেকর্ড সংরক্ষণ।</li>
        <li>বিপনীগুলো মেয়াদোত্তীর্ণ ঔষধ চিহ্নিত করতে পারবে।</li>
        <li>
          দৈনন্দিন, মাসিক ও বার্ষিক ক্রয়-বিক্রয় এবং লাভ-লোকসানের হিসাব জানতে
          পারবে।
        </li>
      </ul>
      <p className="text-[13px]">
        সফটওয়্যারটি সম্পর্কে আপনার যে কোন মূল্যবান মতামত আমাদেরকে{" "}
        <a href="mailto:bd@drasolution.com" className="text-blue-500">
          bd@drasolution.com
        </a>{" "}
        ই-মেইলে জানান.
      </p>
    </div>
  );
};

export default FeatureList;
