import React from "react";
import {
  FaHome,
  FaCalendarAlt,
  FaCog,
  FaImage,
  FaMoneyCheckAlt,
  FaThList,
  FaFileAlt,
} from "react-icons/fa";

import logo from "../../assets/logo.svg";
import { PiSealWarningLight } from "react-icons/pi";
import { useLocation, useNavigate } from "react-router-dom";

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { icon: <FaHome />, label: "Dashboard", path: "/dashboard" },
    {
      icon: <FaCalendarAlt />,
      label: "Appointment Manager",
      path: "/appointments",
    },
    { icon: <FaThList />, label: "Service Manager", path: "/services" },
    { icon: <FaFileAlt />, label: "Content Manager", path: "/content" },
    { icon: <FaImage />, label: "Gallery Manager", path: "/gallery" },
    { icon: <FaMoneyCheckAlt />, label: "Payment Manager", path: "/payments" },
    {
      icon: <PiSealWarningLight size={20} />,
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
            icon={<FaCog />}
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
