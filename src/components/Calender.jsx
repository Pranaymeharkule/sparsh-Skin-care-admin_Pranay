import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Calendar = () => {
  const [blockDate, setBlockDate] = useState(false);
  const [blockedDates, setBlockedDates] = useState([7, 14, 21, 28]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date(2025, 5)); // June 2025

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const toggleDateSelection = (date) => {
    if (blockedDates.includes(date.getDate())) return;
    const key = date.getDate();

    setSelectedDates((prev) =>
      prev.includes(key) ? prev.filter((d) => d !== key) : [...prev, key]
    );
  };

  const handleToggle = () => {
    setBlockedDates((prev) => [...new Set([...prev, ...selectedDates])]);
    setSelectedDates([]);
    setBlockDate((prev) => !prev);
  };

  const changeMonth = (offset) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + offset);
    setCurrentDate(newDate);
    setSelectedDates([]); // Reset selection on month change
  };

  const getDaysInMonth = (year, month) => {
    const days = [];
    const date = new Date(year, month, 1);
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const firstDay = (daysInMonth[0].getDay() + 6) % 7; // adjust for Monday start

  return (
    <div className="flex gap-10 flex-wrap items-start h-full">
      {/* Calendar */}
      <div className="border border-[#434343] rounded-2xl p-4 w-[28rem]">
        {/* Month Header */}
        <div className="flex justify-between items-center border border-[#C2A2AC] p-2 mb-2 rounded-xl">
          <button onClick={() => changeMonth(-1)}>
            <FaChevronLeft />
          </button>
          <h2 className="text-lg">
            {currentDate.toLocaleString("default", {
              month: "long",
            })}{" "}
            {currentDate.getFullYear()}
          </h2>
          <button onClick={() => changeMonth(1)}>
            <FaChevronRight />
          </button>
        </div>

        {/* Week Days */}
        <div className="grid grid-cols-7 gap-2 text-sm mb-2">
          {days.map((day) => (
            <div
              key={day}
              className={`aspect-square flex items-center justify-center rounded-md border border-[#C2A2AC] text-gray-700 ${
                day === "Sun" && "bg-[#DFDFDF]"
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Dates */}
        <div className="grid grid-cols-7 gap-2 text-sm">
          {[...Array(firstDay)].map((_, i) => (
            <div key={`blank-${i}`} />
          ))}
          {daysInMonth.map((dateObj) => {
            const day = dateObj.getDate();
            const isBlocked = blockedDates.includes(day);
            const isSelected = selectedDates.includes(day);

            let classes =
              "aspect-square flex items-center justify-center rounded-md border border-[#C2A2AC] text-gray-700";

            if (isBlocked) {
              classes += " bg-[#DFDFDF] cursor-not-allowed";
            } else if (isSelected) {
              classes += " bg-[#FFD0D0]";
            } else {
              classes += " hover:bg-[#fbe5e5] cursor-pointer";
            }

            return (
              <div
                key={day}
                className={classes}
                onClick={() => toggleDateSelection(dateObj)}
              >
                {day}
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
