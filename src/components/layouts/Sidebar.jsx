import React from "react";


import logo from "../../assets/logo.svg";
import { useLocation, useNavigate } from "react-router-dom";
import HomeIcon from "../icons/sidebar/HomeIcon";
import BellIcon from "../icons/sidebar/BellIcon";
import SparkleIcon from "../icons/sidebar/Sparkle";
import HomeContentIcon from "../icons/sidebar/HomecontentIcon";
import GalleryIcon from "../icons/sidebar/GalleryIcon";
import WalletIcon from "../icons/sidebar/WalletIcon";
import CalendarIcon from "../icons/sidebar/CalendarIcon";
import SettingIcon from "../icons/sidebar/SettingIcon";

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { icon: <HomeIcon />, label: "Dashboard", path: "/dashboard" },
    {
      icon: <BellIcon />,
      label: "Appointment Manager",
      path: "/appointments",
    },
    { icon: <SparkleIcon />, label: "Service Manager", path: "/services" },
    { icon: <HomeContentIcon />, label: "Content Manager", path: "/content" },
    { icon: <GalleryIcon />, label: "Gallery Manager", path: "/gallery" },
    { icon: <WalletIcon />, label: "Payment Manager", path: "/payments" },
    {
      icon: <CalendarIcon />,
      label: "Block the Date",
      path: "/block-date",
    },
  ];
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 backdrop-blur bg-opacity-50 z-30 md:hidden"
          onClick={onClose}
        />
      )}
      <div
        className={`fixed top-0 left-0 h-full w-72 px-6 bg-[#FDE6DD] text-gray-800 flex flex-col shadow-lg z-50  ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:z-0`}
      >
        {/* Logo and Title */}
        <div className="py-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="w-h-14 h-14" />
            <div className="text-2xl font-bold leading-tight text-left">
              Sparsh <br />
              Skin Clinic
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-6">
          <ul className="space-y-4  flex flex-col gap-y-2">
            {navItems.map((item) => (
              <SidebarItem
                key={item.label}
                icon={item.icon}
                label={item.label}
                active={location.pathname === item.path}
                onClick={() => navigate(item.path)}
              />
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="pb-6">
          <SidebarItem
            icon={<SettingIcon />}
            label="Settings"
            onClick={() => navigate("/setting")}
          />
        </div>
      </div>
    </>
  );
}

function SidebarItem({ icon, label, active = false, onClick }) {
  return (
    <li
      onClick={onClick}
      className={`flex items-stretch gap-3m rounded-lg cursor-pointer transition-colors ${
        active ? " text-black" : " text-[#7F7D7D]"
      }`}
    >
      {active && (
        <div className="bg-[#DCC5C6] w-2 rounded-tr-xl rounded-br-xl mr-3" />
      )}
      <div className="flex items-center gap-3 py-1">
        <span className="text-lg">{icon}</span>
        <span className="text-base">{label}</span>
      </div>
    </li>
  );
}
