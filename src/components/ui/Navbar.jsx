import React from "react";

const Navbar = () => {
  return (
    <nav className="flex bg-primary-color items-center z-20 justify-between fixed top-0 left-0 right-0 p-5">
      <h1 className="text-2xl tracking-widest text-secondary-color font-semibold text-shadow-2xs">
        Kontraktor
      </h1>

      <ul className="flex items-center justify-between gap-5">
        <li className="group relative transition duration-300 cursor-pointer">
          <p className="hover:text-orange-400 duration-300">Home</p>
          <span className="absolute -bottom-1 left-0 block h-0.5 w-0 bg-secondary-color transition-all duration-500 group-hover:w-full"></span>
        </li>

        <li className="group relative transition duration-300 cursor-pointer">
          <p className="hover:text-orange-400 duration-300">About us</p>

          <span className="absolute -bottom-1 left-0 block h-0.5 w-0 bg-secondary-color transition-all duration-500 group-hover:w-full"></span>
        </li>

        <li className="group relative transition duration-300 cursor-pointer">
          <p className="hover:text-orange-400 duration-300">Service</p>

          <span className="absolute -bottom-1 left-0 block h-0.5 w-0 bg-secondary-color transition-all duration-500 group-hover:w-full"></span>
        </li>

        <li className="group relative transition duration-300 cursor-pointer">
          <p className="hover:text-orange-400 duration-300">Project</p>
          <span className="absolute -bottom-1 left-0 block h-0.5 w-0 bg-secondary-color transition-all duration-500 group-hover:w-full"></span>
        </li>
      </ul>

      <button>Contact Us</button>
    </nav>
  );
};

export default Navbar;
