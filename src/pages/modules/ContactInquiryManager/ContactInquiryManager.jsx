import React from "react";
import { FiSearch } from "react-icons/fi";
import { MdEmail, MdOutlineContactPhone } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { RiMailDownloadLine } from "react-icons/ri";
import { IoCallOutline } from "react-icons/io5";

const inquiries = [
  {
    id: 1,
    status: "Pending",
    subject: "Follow-up dates",
    name: "Sakshi Sethiya",
    email: "sakshisethiya@gmail.com",
    phone: "9874-365-281",
    message: "I would like to know about the follow up  date for my grandmother's check-up for psoriasis.",
  },
  {
    id: 2,
    status: "Pending",
    subject: "Sponsorship proposal",
    name: "Nikhil Naik",
    email: "Nikhilnaik526@gmail.com",
    phone: "9858-332-658",
    message: "Wanted to talk about the sponsorship of our college fest.",
  },
  {
    id: 3,
    status: "Replied",
    subject: "Sponsorship proposal",
    name: "Nikhil Naik",
    email: "Nikhilnaik526@gmail.com",
    phone: "9858-332-658",
    message: "Wanted to talk about the sponsorship of our college fest.",
  },
];
const statusCounts = [
  { status: "New", count: 2 },
  { status: "Pending", count: 3 },
  { status: "Replied", count: 12 },
];

const statusColors = {
  Pending: "bg-[#FFECEC] text-[#D1293D]",
  Replied: "bg-[#D9FFB4] text-[#004900]",
  New: "bg-[#FCEEEE] text-[#D04A02]",
};

export default function ContactInquiryManager() {
  return (
    <div className="p-4 md:p-8 text-left w-full text-sm font-sans">
      {/* Header */}
      <div className="text-xl  md:text-3xl font-semibold mb-1">
        Contact Inquiry Manager
      </div>
      <p className="text-gray-500 text-md mb-5">Manage & Respond to Customer Inquiry</p>

      {/* Summary */}
  <div className="flex gap-4 mb-6">
  {statusCounts.map(({ status, count }) => (
    <div
      key={status}
      className={`rounded-lg  py-4 w-28 text-center  shadow-md ${
        status === "New"
          ? "bg-[#FCEEEE] text-text-black"
          : status === "Pending"
          ? "bg-[#FFECEC] text-black"
          : "bg-[#D9FFB4] text-black"
      }`}
    >
      <div className=" mb-1  text-xl font-medium">{status}</div>
      <div className=" font-bold text-2xl">{count}</div>
    </div>
  ))}
</div>



      {/* Filter */}
      <div className="flex flex-col  md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex items-center border rounded-md px-3 py-2 my-4 w-full md:w-4/5 bg-white shadow-sm">
          <FiSearch className=" mr-2 text-3xl text-black" />
          <input
            type="text"
            placeholder="Search by Name."
            className="w-full outline-none text-sm  placeholder:text-gray-600"
          />
        </div>
        <select className="border rounded-md font-semibold px-6 py-2  bg-white shadow-sm text-sm">
          <option >All Status</option>
          <option>New</option>
          <option>Pending</option>
          <option>Replied</option>
        </select>
      </div>

      {/* Inquiry List */}
      <div className="space-y-4">
        {inquiries.map((inquiry) => (
          <div
            key={inquiry.id}
            className="border-b pb-4 border-gray-500"
          >
          <span
  className={`inline-block px-3 py-1 mb-2  rounded font-normal ${
    inquiry.status === "Replied"
      ? "bg-[#d5ffac] text-[black] border border-green-300"
      : "bg-[#FFCACA] text-[black] border-red-300 border"
  }`}
>
              {inquiry.status}
            </span>
            <p className="font-semibold text-md mb-1">
              Subject: <span className="text-gray-800">{inquiry.subject}</span>
            </p>
            <div className="flex flex-col md:flex-row md:items-center text-lg text-gray-700 gap-4 mb-1">
              <div className="flex items-center ">
                <MdOutlineContactPhone className="text-gray-600 mr-1" />
                {inquiry.name} 
                
              </div>
              <div className="flex items-center gap-1">
                <RiMailDownloadLine className="text-gray-600 mr-1" />
             
                 {inquiry.email}
                
              </div>
              <div className="flex items-center gap-1 md:ml-6">
                <IoCallOutline className="text-gray-600" />
                +91 {inquiry.phone}
              </div>
            </div>
            <p className="text-gray-700 mb-2 text-lg">{inquiry.message}</p>
            <div className="flex gap-2">
              <button className="text-sm border-2 border-[#716FCD] px-3 py-1 rounded-md bg-white hover:bg-gray-200">
                Mark as Read
              </button>
              <button className="text-sm  text-white bg-[#716FCD] px-3 py-1 rounded font-semibold hover:bg-indigo-600">
                Reply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
