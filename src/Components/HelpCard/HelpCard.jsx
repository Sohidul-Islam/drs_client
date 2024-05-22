import React from "react";
import {
  IoMailUnreadOutline,
  IoCallOutline,
  IoMegaphoneOutline,
} from "react-icons/io5";

const HelpCard = ({display}) => {
  return (
    <div>
      <h4 className="flex gap-3 items-center justify-center text-lg font-semibold">
        <span>
          <IoMegaphoneOutline size={25} />
        </span>
        সাহায্যের জন্য যোগাযোগ
      </h4>

      <div className={`w-full md:max-w-[430px] mt-5 ${display} justify-center items-center gap-x-3 space-y-3 md:space-y-0`}>
        {/* email  */}
        <div className="flex gap-1 items-center text-[#880015] px-3 py-4 border border-[#880015] rounded-md bg-[#FFE7EB]">
          <IoMailUnreadOutline />
          <a href="mailto:pharnadrasolutions@gmail.com" className="text-xs ">
            pharnadrasolutions@gmail.com
          </a>
        </div>

        {/* phone  */}
        <div className="flex gap-1 items-center text-[#880015] px-3 py-3 border border-[#880015] rounded-md bg-[#FFE7EB]">
          <IoCallOutline />
          <div>
            <a href="tell:+8801812661911" className="text-xs">
              +8801812661911
            </a>
            ,
            <a href="tell:+8801994779217" className="text-xs">
              +8801994779217
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCard;
