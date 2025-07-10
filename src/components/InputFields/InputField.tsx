import React from "react";
import inputFieldsProps from "./inputs.types";
import { useState } from "react";


const InputField: React.FC<inputFieldsProps> = ({
  label,
  className,
  value,
  ...fieldProps
}) => {

  const [isFocused, setIsFocused] = useState(false);

  const float = isFocused || value;
  return (
    <div className="relative w-full mt-4">
      <label htmlFor={fieldProps.name} 
       className={`absolute left-3 top-2 text-sm transition-all duration-200 ${
        float ? "text-blue-600 text-xs -top-2.5 bg-white px-1" : "text-gray-500 top-4"}`}>
        {label}
      </label>
      <input
        id={fieldProps.name}
        className="w-full border border-gray-300 rounded-md px-3 pt-5 pb-2 text-sm placeholder-transparent focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
        placeholder={label}
        {...fieldProps}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      
    </div>
  );
};

export default InputField;
