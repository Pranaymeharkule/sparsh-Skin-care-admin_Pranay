import React from "react";
import Calendar from "../../../components/Calender";
 
const BlockDate = () => {
  return (
    <div className="flex flex-col h-full">
      {/* Top Controls */}
      <div className="px-6 pt-6 mb-4">
        {/* Heading */}
        <div className="w-fit flex flex-col items-start">
          <h2 className="text-2xl font-semibold">Block the dates</h2>
          <p className="text-sm text-gray-500">
            You can block the dates in which you are not available
          </p>
        </div>
      </div>

      <div className="h-full overflow-y-auto">
         <Calendar/>
      </div>
    </div>
  );
};

export default BlockDate;
