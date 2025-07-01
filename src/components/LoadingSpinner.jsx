import * as React from "react";
const LoadingSpinner = ({ size = "lg" }) => {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-4",
    lg: "h-10 w-10 border-4",
  };

  return (
    <div className="flex justify-center items-center md:mr-20 h-full my-8">
      <div
        className={`animate-spin rounded-full border-t-transparent border-solid ${sizeClasses[size]} border-[#716FCD] `}
      />
    </div>
  );
};

export default LoadingSpinner;
