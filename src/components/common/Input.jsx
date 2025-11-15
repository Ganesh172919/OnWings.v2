import React from "react";

const Input = ({ id, label, type = "text", value, onChange, placeholder }) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-bold text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-1 block w-full p-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
      />
    </div>
  );
};

export default Input;
