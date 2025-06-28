import React from "react";
import { IoIosSearch } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa";
import InquiryCard from "../../../components/InquiryCard";
import { PageHeader } from "../../../components/common/PageHeader";
import DownIcon from "../../../components/icons/DownIcon";
import SearchIcon from "../../../components/icons/SearchIcon";

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
    <div className="flex flex-col h-full max-w-[56rem]">
      <PageHeader
        title={"Contact Inquiry Manager"}
        subtitle={"Manage & Respond to customer Inquiry"}
      />

      {/* Status Cards */}
      <div className="flex gap-4">
        <div className="bg-[#FEEBE4] rounded-2xl px-4 py-2 w-32 text-center border border-[#FFCACA]">
          <p className="text-base font-medium">New</p>
          <p className="text-3xl font-semibold">2</p>
        </div>
        <div className="bg-[#FEEBE4] rounded-2xl px-4 py-2 w-32 text-center border border-[#FFCACA]">
          <p className="text-base font-medium">Pending</p>
          <p className="text-3xl font-semibold">3</p>
        </div>
        <div className="bg-[#D8FFA2] rounded-2xl px-4 py-2 w-32 text-center border border-[#C8FF7D]">
          <p className="text-base font-medium">Replied</p>
          <p className="text-3xl font-semibold">12</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-8 mt-4 text-sm ">
        <div className="relative w-full max-w-full">
          <SearchIcon className="absolute inset-y-0 left-3 top-2 flex items-center text-xl" />
          <input
            type="text"
            placeholder="Search by Name."
            className="w-full border rounded-lg border-[#a0a0a0] pl-10 pr-4 py-2 outline-none"
          />
        </div>

        <div className="relative">
          <select className="border rounded-lg font-semibold border-[#A0A0A0] px-3 py-2 appearance-none pr-8">
            <option>All Status</option>
          </select>
          <DownIcon className="absolute right-2 top-2.5 pointer-events-none text-lg" />
        </div>
      </div>

      {/* Scrollable Cards Section */}
      <div className="px-2 mt-2 space-y-0 flex-1 overflow-y-auto scrollbar-hidden min-h-0">
        {inquiries.map((item, idx) => (
          <InquiryCard inquiry={item} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default InquiryManager;
