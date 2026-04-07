import React from "react";

const Input = ({ icon, label, type = "text", placeholder, onChange }) => {
  return (
    <div className="mb-3">
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      <div className="relative mt-2">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </span>
        <input
          type={type}
          placeholder={placeholder}
          className="w-full pl-10 pr-5 py-4 rounded-2xl bg-white shadow-md border border-gray-100 focus:ring-2 focus:ring-red-500 outline-none"
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Input;
