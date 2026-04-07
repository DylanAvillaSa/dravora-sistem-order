import React from "react";

const Section = ({ title, children }) => {
  return (
    <div className="space-y-3 mb-4">
      <p className="font-bold text-gray-900">{title}</p>
      {children}
    </div>
  );
};

export default Section;
