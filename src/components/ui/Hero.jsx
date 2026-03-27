import React from "react";
import Navbar from "./Navbar";
import HeroLayouts from "../layouts/HeroLayouts";

const Hero = () => {
  return (
    <HeroLayouts>
      <Navbar />
      <section className="absolute top-[35%] left-10 text-white flex flex-col">
        <h1 className="text-6xl font-bold tracking-wider">
          We Prepare <br /> For The{" "}
          <span className="text-secondary-color">Future</span>
        </h1>
        <p className="mt-5 w-2/3">
          We provide the best architectural design, contruction, and building
          maintance services for you.
        </p>

        <div className="flex items-center gap-5 text-sm mt-5">
          <button className="p-2 rounded bg-secondary-color text-white">
            Our services
          </button>

          <button className="p-2 rounded bg-white text-primary-color">
            View project
          </button>
        </div>
      </section>
    </HeroLayouts>
  );
};

export default Hero;
