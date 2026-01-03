import React from "react";

export default function CalendarIcon({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 30 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.33398 7.14575C7.75315 7.14575 7.27148 6.66409 7.27148 6.08325V1.83325C7.27148 1.25242 7.75315 0.770752 8.33398 0.770752C8.91482 0.770752 9.39648 1.25242 9.39648 1.83325V6.08325C9.39648 6.66409 8.91482 7.14575 8.33398 7.14575Z"
        fill="#272727"
      />
      {/* other paths remain same */}
    </svg>
  );
}
