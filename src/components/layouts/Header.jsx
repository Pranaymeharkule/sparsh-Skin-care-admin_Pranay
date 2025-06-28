import React from "react";
import userImg from "../../assets/user.png";
import NotificationIcon from "../../assets/icons/NotificationIcon";
import { FiMenu } from "react-icons/fi";
import { FaBars } from "react-icons/fa";

export default function Header({ onMenuClick }) {
  return (
    <header className="h-20 px-6 pr-6 md:pr-14 bg-gradient-to-r from-[#8C88D1] to-[#716FCD] flex justify-between md:justify-end items-center">
      <button
        className="flex md:hidden items-center justify-center bg-white rounded-xl px-3 py-3 h-fit"
        onClick={onMenuClick}
      >
        <FaBars className="text-xl" />
      </button>
      <div className="flex justify-end items-center">
        {/* Notification Icon */}
        <div className="relative mr-6 text-white">
          <NotificationIcon className="text-3xl" />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </div>

        {/* Profile Info */}
        <div className="flex items-center gap-3">
          {/* Profile Image with Online Dot */}
          <div className="relative">
            <img
              src={userImg}
              alt="profile"
              className="w-12 h-12 rounded-full object-cover"
            />
            <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
          </div>

          {/* Name and Email */}
          <div className="text-white text-sm leading-tight text-left">
            <p className="font-semibold mb-1.5">Dr. Harshal Rewatkar</p>
            <p className="text-xs">harshalrewatkar@ssc.com</p>
          </div>
        </div>
      </div>
    </header>
  );
}
