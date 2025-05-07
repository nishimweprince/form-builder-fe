import React from "react";
import inputFieldsProps from "./inputs.types";


const InputField: React.FC<inputFieldsProps> = ({
  label,
  className,
  ...fieldProps
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={fieldProps.name} className="block mb-1 font-medium text-sm text-gray-700">
        {label}
      </label>
      <input
        id={fieldProps.name}
        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition  ${className}`}
        {...fieldProps}
      />
      
    </div>
  );
};

export default InputField;
