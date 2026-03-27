import React from "react";
import Image from "next/image";

const HeroLayouts = ({ children }) => {
  return (
    <div className=" text-white w-full h-screen flex relative">
      <Image
        src="/images/background.png"
        alt="background"
        fill
        className="object-cover"
      />
      {children}
    </div>
  );
};

export default HeroLayouts;
