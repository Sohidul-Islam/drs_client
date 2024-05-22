import React from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import HomeSubscription from "../../../Components/HomeSubscription/HomeSubscription";
import HomeDetails from "../../../Components/HomeDetails/HomeDetails";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-5 md:px-12 my-5 md:my-10 font-sora">
        <HomeDetails />
        <hr className="h-1 text-black my-8 md:my-12" />
        <HomeSubscription />
      </div>
    </div>
  );
};

export default Home;
