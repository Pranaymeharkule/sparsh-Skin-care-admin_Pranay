import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import useFetch from "../hooks/useFetch";
import conf from "../config";

import { toast } from "react-toastify";

const Calendar = () => {
  const [blockDate, setBlockDate] = useState(false);
  const [blockedDates, setBlockedDates] = useState([]); // YYYY-MM-DD
  const [selectedDates, setSelectedDates] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date(2025, 5)); // June 2025

  const [fetchData] = useFetch();

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  /* ================= FETCH BLOCKED DATES ================= */
  useEffect(() => {
    fetchBlockedDates();
  }, []);

  const fetchBlockedDates = async () => {
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}/block-dates`,
      });

      if (res.success) {
        setBlockedDates(res.data.map((d) => d.date));
      }
    } catch (err) {
      toast.error("Failed to load blocked dates");
    }
  };

  /* ================= HELPERS ================= */
  const formatDate = (dateObj) =>
    dateObj.toISOString().split("T")[0]; // YYYY-MM-DD

  const toggleDateSelection = (dateObj) => {
    const formatted = formatDate(dateObj);
    if (blockedDates.includes(formatted)) return;

    setSelectedDates((prev) =>
      prev.includes(formatted)
        ? prev.filter((d) => d !== formatted)
        : [...prev, formatted]
    );
  };

  /* ================= BLOCK / UNBLOCK ================= */
  const handleToggle = async () => {
    try {
      if (!blockDate) {
        // BLOCK
        for (const date of selectedDates) {
          await fetchData({
            method: "POST",
            url: `${conf.apiBaseUrl}/block-dates`,
            data: { date },
          });
        }

        setBlockedDates((prev) => [...prev, ...selectedDates]);
        toast.success("Date(s) blocked successfully");
      } else {
        // UNBLOCK
        for (const date of selectedDates) {
          await fetchData({
            method: "DELETE",
            url: `${conf.apiBaseUrl}/block-dates/${date}`,
          });
        }

        setBlockedDates((prev) =>
          prev.filter((d) => !selectedDates.includes(d))
        );
        toast.success("Date(s) unblocked successfully");
      }

      setSelectedDates([]);
      setBlockDate((prev) => !prev);
    } catch (err) {
      toast.error("Operation failed");
    }
  };

  /* ================= MONTH CHANGE ================= */
  const changeMonth = (offset) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + offset)
    );
    setSelectedDates([]);
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

  const daysInMonth = getDaysInMonth(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );

  const firstDay = (daysInMonth[0].getDay() + 6) % 7;

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
            {currentDate.toLocaleString("default", { month: "long" })}{" "}
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
              className={`aspect-square flex items-center justify-center rounded-md border border-[#C2A2AC] ${
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
            const formatted = formatDate(dateObj);
            const isBlocked = blockedDates.includes(formatted);
            const isSelected = selectedDates.includes(formatted);

            let classes =
              "aspect-square flex items-center justify-center rounded-md border border-[#C2A2AC]";

            if (isBlocked) {
              classes += " bg-[#DFDFDF] cursor-not-allowed";
            } else if (isSelected) {
              classes += " bg-[#FFD0D0]";
            } else {
              classes += " hover:bg-[#fbe5e5] cursor-pointer";
            }

            return (
              <div
                key={formatted}
                className={classes}
                onClick={() => toggleDateSelection(dateObj)}
              >
                {dateObj.getDate()}
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
          className={`w-16 h-8 flex items-center rounded-full px-1 ${
            blockDate ? "bg-[#7876D0]" : "bg-[#FFD0D0]"
          }`}
        >
          <div
            className={`w-6 h-6 rounded-full bg-white shadow-md transform ${
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
