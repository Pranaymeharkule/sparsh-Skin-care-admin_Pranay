// components/InquiryCard.jsx
import React from "react";
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";

const InquiryCard = ({ inquiry }) => {
  return (
    <div className="border-b-2 border-[#7F7D7D] py-3 space-y-2">
      {/* Status */}
      <p
        className={` text-black px-4 border py-1 rounded-lg text-sm mb-2 w-fit ${
          inquiry.status == "Pending"
            ? "border-[#f4c1c1] bg-[#f3cfcf]"
            : "border-[#c6f781] bg-[#d8ffa2]"
        }`}
      >
        {inquiry.status}
      </p>

      <p className=" text-left ml-2 font-semibold text-sm ">
        Subject: <span className=" ">{inquiry.subject}</span>
      </p>

      {/* User Info */}
      <div className="flex flex-wrap gap-x-10 gap-y-3  ml-2">
        <span className="flex items-center gap-1">
          <FaUser />
          {inquiry.name}
        </span>
        <span className="flex items-center gap-1">
          <FaEnvelope />
          {inquiry.email}
        </span>
        <span className="flex items-center gap-1">
          <FaPhone />
          {inquiry.phone}
        </span>
      </div>

      {/* Message */}
      <p className="text-left  ml-2">{inquiry.message}</p>

      {/* Actions */}
      <div className="flex gap-3 mt-2 text-sm">
        <button className="border border-[#8380d3] px-4 py-1 rounded-lg cursor-pointer">
          Mark as Read
        </button>
        <button className="bg-[#8380d3] text-white px-4 py-1 rounded-lg cursor-pointer font-semibold">
          Reply
        </button>
      </div>
    </div>
  );
};

export default InquiryCard;
