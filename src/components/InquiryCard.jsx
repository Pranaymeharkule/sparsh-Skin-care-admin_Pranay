// components/InquiryCard.jsx
import React from "react";
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";

const InquiryCard = ({ inquiry }) => {
  return (
    <div className="border-b py-4 space-y-2">
      {/* Status */}
      <div className="text-left">
        <p
          className={` text-black px-6 border  py-2 rounded-xl text-sm mb-2 w-fit ${
            inquiry.status == "Pending"
              ? "border-[#f4c1c1] bg-[#f3cfcf]"
              : "border-[#c6f781] bg-[#d8ffa2]"
          }`}
        >
          {inquiry.status}
        </p>

        <p className="font-semibold  text-sm ">
          Subject: <span className=" ">{inquiry.subject}</span>
        </p>
      </div>

      {/* User Info */}
      <div className="flex flex-wrap gap-x-10 gap-y-3 items-centertext-gray-700">
        <span className="flex items-center gap-1">
          <FaUser className="text-gray-500" />
          {inquiry.name}
        </span>
        <span className="flex items-center gap-1">
          <FaEnvelope className="text-gray-500" />
          {inquiry.email}
        </span>
        <span className="flex items-center gap-1">
          <FaPhone className="text-gray-500" />
          {inquiry.phone}
        </span>
      </div>

      {/* Message */}
      <p className="text-sm text-left">{inquiry.message}</p>

      {/* Actions */}
      <div className="flex gap-3 mt-2">
        <button className="border border-[#8380d3] px-4 py-1 rounded-xl">
          Mark as Read
        </button>
        <button className="bg-[#8380d3] text-white px-4 py-1 rounded-xl font-semibold">
          Reply
        </button>
      </div>
    </div>
  );
};

export default InquiryCard;
