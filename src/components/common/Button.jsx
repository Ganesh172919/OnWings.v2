import React from "react";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
}) => {
  const baseStyle =
    "w-full font-bold py-3 px-6 rounded-md transition duration-200 flex items-center justify-center disabled:opacity-50";

  const styles = {
    primary: "bg-red-700 text-white hover:bg-red-800",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${styles[variant]}`}
    >
      {children}
    </button>
  );
};

export default Button;
