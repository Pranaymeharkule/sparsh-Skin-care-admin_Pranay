import React from "react";

const ShowPasswordIcon = ({ size = 18, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <mask
      id="mask0_4973_3552"
      style={{ maskType: "luminance" }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="18"
      height="18"
    >
      <path d="M18 0H0V18H18V0Z" fill="white" />
    </mask>
    <g mask="url(#mask0_4973_3552)">
      <path
        d="M11.6825 8.99993C11.6825 10.4849 10.4825 11.6849 8.99747 11.6849C7.51247 11.6849 6.3125 10.4849 6.3125 8.99993C6.3125 7.51493 7.51247 6.31494 8.99747 6.31494C10.4825 6.31494 11.6825 7.51493 11.6825 8.99993Z"
        stroke="#7F7D7D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.99893 15.203C11.6464 15.203 14.1139 13.643 15.8314 10.943C16.5064 9.88553 16.5064 8.10803 15.8314 7.05053C14.1139 4.35053 11.6464 2.79053 8.99893 2.79053C6.35141 2.79053 3.88391 4.35053 2.16641 7.05053C1.49141 8.10803 1.49141 9.88553 2.16641 10.943C3.88391 13.643 6.35141 15.203 8.99893 15.203Z"
        stroke="#7F7D7D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

export default ShowPasswordIcon;
