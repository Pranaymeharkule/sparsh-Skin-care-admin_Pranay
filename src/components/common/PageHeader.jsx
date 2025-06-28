import React from "react";

export const PageHeader = ({ title, subtitle }) => {
  return (
    <div className="text-left mb-6">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
  );
};
