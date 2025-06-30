import React from "react";

const HidePasswordIcon = ({ size = 18, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 3L21 21"
      stroke="#7F7D7D"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M10.5858 10.5858C10.2107 10.9609 10 11.4696 10 12C10 13.1046 10.8954 14 12 14C12.5304 14 13.0391 13.7893 13.4142 13.4142M17.94 17.94C16.2215 19.2123 14.1724 20 12 20C7.705 20 4.109 16.742 2.458 12C3.1016 10.2066 4.2125 8.63904 5.63604 7.47583M9.87868 6.34315C10.572 6.11534 11.2777 6 12 6C16.295 6 19.891 9.258 21.542 14C21.1188 15.1872 20.5082 16.2735 19.7426 17.2033"
      stroke="#7F7D7D"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default HidePasswordIcon;
