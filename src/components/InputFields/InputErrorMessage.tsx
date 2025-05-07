import React from "react";

type Props = {
  error?: string;
};

const InputErrorMessage: React.FC<Props> = ({ error }) => {
  if (!error) return null;

  return <p className="text-red-500 text-xs mt-1">{error}</p>;
};

export default InputErrorMessage;