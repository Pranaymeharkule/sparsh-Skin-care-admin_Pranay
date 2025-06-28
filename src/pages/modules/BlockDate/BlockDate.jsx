import React from "react";
import Calendar from "../../../components/Calender";
import { PageHeader } from "../../../components/common/PageHeader";

const BlockDate = () => {
  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title={"Block the dates"}
        subtitle={"You can block the dates in which you are not available"}
      />

      <div className="h-full overflow-y-auto mt-2">
        <Calendar />
      </div>
    </div>
  );
};

export default BlockDate;
