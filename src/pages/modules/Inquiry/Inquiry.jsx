import React from "react";
import { IoIosSearch } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa";
import InquiryCard from "../../../components/InquiryCard";

const inquiries = [
  {
    status: "Pending",
    subject: "Follow-up dates",
    name: "Sakshi Sethiya",
    email: "sakshisethiya@gmail.com",
    phone: "91+ 9874-365-281",
    message:
      "I would like to know about the follow up date for my grandmother’s check-up for psoriasis.",
  },
  {
    status: "Pending",
    subject: "Sponsorship proposal",
    name: "Nikhil Naik",
    email: "Nikhilnaik526@gmail.com",
    phone: "91+ 9858-332-658",
    message: "Wanted to talk about the sponsorship of our college fest.",
  },
  {
    status: "Viewed",
    subject: "Sponsorship proposal",
    name: "Nikhil Naik",
    email: "Nikhilnaik526@gmail.com",
    phone: "91+ 9858-332-658",
    message: "Wanted to talk about the sponsorship of our college fest.",
  },
];

const InquiryManager = () => {
  return (
    <div className="flex flex-col h-full max-w-[52rem]">
      {/* Top Controls */}
      <div className="px-6 pt-6">
        {/* Heading */}
        <div className="w-fit">
          <h2 className="text-2xl font-semibold">Contact Inquiry Manager</h2>
          <p className="text-sm text-gray-500">
            Manage & Respond to customer Inquiry
          </p>
        </div>

        {/* Status Cards */}
        <div className="flex gap-4 mt-6">
          <div className="bg-[#FEEBE4] rounded-2xl p-4 w-32 text-center border border-[#FFCACA]">
            <p className="text-sm font-semibold">New</p>
            <p className="text-2xl font-bold">2</p>
          </div>
          <div className="bg-[#FEEBE4] rounded-2xl p-4 w-32 text-center border border-[#FFCACA]">
            <p className="text-sm font-semibold">Pending</p>
            <p className="text-2xl font-bold">3</p>
          </div>
          <div className="bg-[#D8FFA2] rounded-2xl p-4 w-32 text-center border border-[#C8FF7D]">
            <p className="text-sm font-semibold">Replied</p>
            <p className="text-2xl font-bold">12</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex items-center gap-4 mt-6">
          <div className="relative w-full max-w-full">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 text-lg">
              <IoIosSearch />
            </span>
            <input
              type="text"
              placeholder="Search by Name."
              className="w-full border rounded-lg border-gray-500 pl-10 pr-4 py-2 text-sm outline-none"
            />
          </div>

          <div className="relative">
            <select className="border rounded-lg font-semibold border-gray-500 px-3 py-2 text-sm appearance-none pr-6">
              <option>All Status</option>
            </select>
            <FaChevronDown className="absolute right-2 top-3 text-xs pointer-events-none text-gray-500" />
          </div>
        </div>
      </div>

      {/* Scrollable Cards Section */}
      <div className="px-6 mt-2 space-y-6 flex-1 overflow-y-auto scrollbar-hidden min-h-0">
        {inquiries.map((item, idx) => (
          <InquiryCard inquiry={item} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default InquiryManager;
