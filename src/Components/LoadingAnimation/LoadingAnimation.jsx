import Lottie from "lottie-react";
import React from "react";
import loadingAnimation from "../../assets/loading-animation.json";

const LoadingAnimation = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Lottie
        animationData={loadingAnimation}
        loop={true}
        style={{ width: "150px" }}
      />
    </div>
  );
};

export default LoadingAnimation;
