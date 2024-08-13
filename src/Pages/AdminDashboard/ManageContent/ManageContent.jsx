import React from "react";
import { AiOutlineCopy } from "react-icons/ai";

const ManageContent = () => {
  return (
    // <div className="relative h-screen">
    //   <div className="flex items-center gap-x-[10px]">
    //     <AiOutlineCopy className="text-lg" />
    //     <p>Manage Content</p>
    //   </div>
    //   <div className="px-5 py-3 mt-3 bg-white">
    //     <p>Advantages Content</p>
    //     <hr className="my-2"/>
    //   </div>
    // </div>
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="p-6 bg-white shadow-md rounded-lg mb-8">
        <h2 className="text-xl font-bold mb-4">Advantages Content</h2>
        <div className="mb-4">
          <label className="font-semibold">Title :</label>
          <p className="ml-4">
            আমাদের Pharmacy Management Software এর সুবিধা সমূহ
          </p>
        </div>
        <div>
          <label className="font-semibold">Descriptions :</label>
          <ul className="list-disc ml-8 mt-2">
            <li>অনলাইনে, কম্পিউটারে ও মডিফিকেশনের প্রয়োজন নেই</li>
            <li>ইনভয়েস তৈরি (মোবাইলের জন্য, ট্যাবলেট ও ল্যাপটপ সহ)</li>
            <li>
              জেনারেল রিপোর্ট, অডিট রিপোর্ট ও সর্বাধিক বিক্রিত পণ্যের নাম সহ
            </li>
            <li>ক্রেতার রিপোর্ট সংরক্ষণ</li>
          </ul>
        </div>
      </div>

      <div className="p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-bold mb-4">Subscription Content</h2>
        <div className="mb-4">
          <label className="font-semibold">Title :</label>
          <p className="ml-4">
            বাংলাদেশদের ক্ষুদ্র ও মধ্য ব্যবসায়ের প্রশাসনিক দক্ষতা বাড়াতে
            সাহায্য করতে উদ্ভাবনী ফিচারের মালিকানাধীন একটি সফটওয়্যার
          </p>
        </div>
        <table className="w-full text-left border-collapse border border-gray-300">
          <thead className="bg-gray-100 whitespace-nowrap">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">
                No.
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Package Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Description
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Features
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Price BDT
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Duration/month
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2 text-left align-top">
                01
              </td>
              <td className="border border-gray-300 px-4 py-2 text-left align-top">
                Free Trial
              </td>
              <td className="border border-gray-300 px-4 py-2 text-left align-top">
                Get access to all premium features.
              </td>
              <td className="border border-gray-300 px-4 py-2 text-left align-top">
                <div
                  className="overflow-y-auto"
                  style={{ width: "200px", height: "100px" }}
                >
                  <ol className="list-decimal list-inside">
                    <li>All In One Dashboard</li>
                    <li>Create 30 invoices & bills</li>
                    <li>Auto bank reconciliation</li>
                    <li>Run Payroll for 5 employees</li>
                    <li>Auto bank reconciliation</li>
                    <li>Run Payroll for 5 employees</li>
                  </ol>
                </div>
              </td>

              <td className="border border-gray-300 px-4 py-2 text-left align-top">
                0.00
              </td>
              <td className="border border-gray-300 px-4 py-2 text-left align-top">
                01
              </td>
              <td className="flex gap-5 border border-gray-300 px-4 py-2 text-left align-top">
                <button className="bg-green-500 text-white px-2 py-1 rounded">
                  Edit
                </button>
                <button className="bg-red-500 text-white px-2 py-1 rounded ml-2">
                  Delete
                </button>
              </td>
            </tr>
            {/* Repeat for other packages */}
          </tbody>
        </table>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          Add more package
        </button>
      </div>

      

      <div className="p-6 bg-white shadow-md rounded-lg mb-8">
        <h2 className="text-xl font-bold mb-4">Advantages Content</h2>

        <div className="flex p-2">
          <div className="w-1/4 font-bold">Title:</div>
          <div className="w-3/4 border border-gray-300 p-2">
            আমাদের Pharmacy Management Software এর সুবিধা সমূহ
          </div>
        </div>

        <div className="flex p-2">
          <div className="w-1/4 font-bold">Descriptions:</div>
          <div className="w-3/4">
            <div
              className="border border-gray-300 p-2">
              <ol className=" list-inside">
                <li> - অনলাইন, কম্পিউটার এ সংরিক্ষণ প্রয়োজন নেই।</li>
                <li> - ইনভয়েস তৈরি (দোকানের নাম, ঠিকানা ও লোগো সহ)।</li>
                <li> - ক্রয়ের রেকর্ড, ওষুধ কোম্পানি ও সর্বরোহকারীর নাম সহ।</li>
                <li> - ক্রেতার রেকর্ড সংরক্ষণ।</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageContent;
