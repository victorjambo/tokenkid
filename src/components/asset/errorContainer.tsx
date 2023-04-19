import { ExclamationIcon } from "@heroicons/react/solid";
import React from "react";

const ErrorContainer: React.FC<{ loading: boolean; msg: string }> = ({
  loading,
  msg,
}) => {
  return (
    <div className="flex items-center justify-center h-screen" id="one">
      <div className="flex flex-col text-black">
        {!loading && <ExclamationIcon className="w-52 h-52 text-red-400" />}
        <div className="text-3xl">{loading ? "Loading" : msg}</div>
      </div>
    </div>
  );
};

export default ErrorContainer;
