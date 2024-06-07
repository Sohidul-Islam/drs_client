import React from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import HomeSubscription from "../../../Components/HomeSubscription/HomeSubscription";
import HomeDetails from "../../../Components/HomeDetails/HomeDetails";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-5 md:px-12 my-5 md:my-10">
        <HomeDetails />
        <hr className="h-1 text-black my-8 md:my-12" />
        {/* <div className="grid grid-cols-1 md:grid-cols-4">
          <div className="col-span-1 md:col-span-3">
            <HomeSubscription />
          </div>
        </div> */}
        <div className="md:w-3/4">
          <HomeSubscription />
        </div>
      </div>
    </div>
  );
};

export default Home;
