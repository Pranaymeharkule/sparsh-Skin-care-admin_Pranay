import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Calendar = () => {
  const [blockDate, setBlockDate] = useState(false);
  const [blockedDates, setBlockedDates] = useState([7, 14, 21, 28]);
  const [selectedDates, setSelectedDates] = useState([]);

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const dates = Array.from({ length: 30 }, (_, i) => i + 1);

  const toggleDateSelection = (date) => {
    if (blockedDates.includes(date)) return; // prevent selecting blocked dates

    setSelectedDates((prev) =>
      prev.includes(date) ? prev.filter((d) => d !== date) : [...prev, date]
    );
  };

  const handleToggle = () => {
    setBlockedDates((prev) => [...new Set([...prev, ...selectedDates])]);
    setSelectedDates([]); // clear selection
    setBlockDate((prev) => !prev);
  };

  return (
    <div className="flex gap-10 flex-wrap items-start h-full">
      {/* Calendar */}
      <div className="border border-[#434343] rounded-2xl p-4 w-[28rem]">
        {/* Month Header */}
        <div className="flex justify-between items-center border border-[#C2A2AC] p-2 mb-2 rounded-xl">
          <FaChevronLeft />
          <h2 className="text-lg">June 2025</h2>
          <FaChevronRight />
        </div>

        {/* Week Days */}
        <div className="grid grid-cols-7 gap-2 text-sm mb-2">
          {days.map((day) => (
            <div
              key={day}
              className={`aspect-square flex items-center justify-center rounded-md border border-[#C2A2AC] text-gray-700 text-sm ${
                day === "Sun" && "bg-[#DFDFDF]"
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Dates */}
        <div className="grid grid-cols-7 gap-2 text-sm">
          {dates.map((date) => {
            const isBlocked = blockedDates.includes(date);
            const isSelected = selectedDates.includes(date);

            let classes =
              "aspect-square flex items-center justify-center rounded-md border border-[#C2A2AC] text-gray-700 text-sm";

            if (isBlocked) {
              classes += " bg-[#DFDFDF] cursor-not-allowed";
            } else if (isSelected) {
              classes += " bg-[#FFD0D0]";
            } else {
              classes += " hover:bg-[#fbe5e5] cursor-pointer";
            }

            return (
              <div
                key={date}
                className={classes}
                onClick={() => toggleDateSelection(date)}
              >
                {date}
              </div>
            );
          })}
        </div>
      </div>

      {/* Toggle */}
      <div className="border border-[#434343] rounded-2xl px-10 py-2 flex items-center gap-5">
        <p>Block the date?</p>
        <button
          onClick={handleToggle}
          className={`w-16 h-8 flex items-center rounded-full px-1 transition-colors duration-300 ${
            blockDate ? "bg-[#7876D0]" : "bg-[#FFD0D0]"
          }`}
        >
          <div
            className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 text-xs flex items-center justify-center ${
              blockDate ? "translate-x-8" : "translate-x-0"
            }`}
          >
            {blockDate ? "Yes" : "No"}
          </div>
        </button>
      </div>
    </div>
  );
};

export default Calendar;
