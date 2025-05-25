import React from "react";

type Props = {
  error?: string;
};

const InputErrorMessage: React.FC<Props> = ({ error }) => {
  if (!error) return null;

  return <p className="text-sm text-red-600 mt-1">{error}</p>;
};

export default InputErrorMessage;