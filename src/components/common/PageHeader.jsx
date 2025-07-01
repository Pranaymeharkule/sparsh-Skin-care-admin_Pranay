import React from "react";

export const PageHeader = ({ icon, title, subtitle }) => {
  return (
    <div className="text-left mb-6">
      <span className=" flex items-center">

      {icon && <span className="mr-1.5">{icon}</span>}
      <h2 className="text-2xl font-semibold">{title}</h2>
      </span>
      {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
    </div>
  );
};
