import React from "react";
import { AiOutlineCopy } from "react-icons/ai";
import ManageContentTable from "../../../Components/DashboardComponent/Table/ManageContentTable/ManageContentTable";
import { Link } from "react-router-dom";

const ManageContent = () => {
  return (
    <div className=" min-h-screen">
      <div className="flex items-center gap-x-[10px] mb-4">
        <AiOutlineCopy className="text-lg" />
        <p>Manage Content</p>
      </div>

      {/* Advantages Content */}
      <div className="p-5 bg-white border mb-4">
        <h2 className="text-base">Advantages Content</h2>
        <hr className="mt-2 mb-4 w-full border text-black" />
        <div className="mb-4 grid grid-cols-6 items-center">
          {/* title  */}
          <p className="col-span-1 flex justify-between mr-10">
            {" "}
            <span>Title</span> <span>:</span>
          </p>
          <p className="col-span-5 border p-4 text-sm">
            আমাদের Pharmacy Management Software এর সুবিধা সমূহ
          </p>
        </div>
        {/* description  */}
        <div className="grid grid-cols-6 items-center">
          <p className="col-span-1 flex justify-between mr-10">
            {" "}
            <span>Description</span> <span>:</span>
          </p>
          <ul className="col-span-5 border p-4 text-sm">
            <li> - অনলাইনে, কম্পিউটারে ও মডিফিকেশনের প্রয়োজন নেই</li>
            <li> - ইনভয়েস তৈরি (মোবাইলের জন্য, ট্যাবলেট ও ল্যাপটপ সহ)</li>
            <li>
              - জেনারেল রিপোর্ট, অডিট রিপোর্ট ও সর্বাধিক বিক্রিত পণ্যের নাম সহ
            </li>
            <li> - ক্রেতার রিপোর্ট সংরক্ষণ</li>
          </ul>
        </div>
      </div>

      {/* subscription Content */}
      <div className="p-5 bg-white border">
        <h2 className="text-base">Subscription Content</h2>
        <hr className="mt-2 mb-4 w-full border text-black" />
        <div className="mb-4 grid grid-cols-6 items-center">
          {/* title  */}
          <p className="col-span-1 flex justify-between mr-10">
            <span>Title</span> <span>:</span>
          </p>
          <p className="col-span-5 border p-4 text-sm">
            বাংলাদেশদের ক্ষুদ্র ও মধ্য ব্যবসায়ের প্রশাসনিক দক্ষতা বাড়াতে
            সাহায্য করতে উদ্ভাবনী ফিচারের মালিকানাধীন একটি সফটওয়্যার
          </p>
        </div>
        <p className="flex gap-4 mb-1">
          <span>Package Info</span> <span>:</span>
        </p>
        {/* table  */}
        <ManageContentTable />

        {/* button  */}
        <Link
          to="create-content"
          className=" text-[#066BC9]">
          <span className="text-white bg-[#066BC9] text-md px-[7px] py-[2px] rounded-full">
            +
          </span>
          <span className="ml-1 underline">Add more package</span>
        </Link>
      </div>
    </div>
  );
};

export default ManageContent;
