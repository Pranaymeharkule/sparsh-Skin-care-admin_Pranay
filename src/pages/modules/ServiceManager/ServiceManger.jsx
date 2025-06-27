import React from "react";
import { FiSearch } from "react-icons/fi";
import { HiOutlineFilter } from "react-icons/hi";
import { FaEdit, FaTrash } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import { TbTrash } from "react-icons/tb";
import { GiSunflower } from "react-icons/gi";

const services = [
  "Derma roller for acne scars",
  "Psoriasis",
  "Hair Fall treatment",
  "Dandruff & scalp Treatment",
  "Hair Transplantation",
  "Anti Aging Treatment",
  "Skin Rejuvenation",
  "Skin Rejuvenation",
  "Skin Rejuvenation",
  "Skin Rejuvenation",
  "Skin Rejuvenation",
  "Skin Rejuvenation",
  "Skin Rejuvenation",
];

export default function ServiceManager() {
  return (
    <div className="p-4 md:p-8 font-sans text-sm w-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 text-xl md:text-2xl font-semibold">
        <span className="text-xl"><GiSunflower className="text-3xl m-1"/></span>
        <h1>Service Manager</h1>
      </div>

      {/* Top Bar */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-6 w-full">
        <div className="flex items-center w-full lg:w-2/3 border rounded-md shadow-sm px-3 py-2 bg-white">
          <FiSearch className="text-gray-500 md:text-xl mr-2" />
          <input
            type="text"
            placeholder="Search Service name"
            className="w-full outline-none text-sm"
          />
        </div>
        <div className="flex md:gap-8 gap-2 w-full lg:w-auto">
          <select className=" text-black  border-gray-300 border-2 font-semibold rounded-md md:px-4  px-1 py-2 bg-white md:text-xl">
            <option>All Category</option>
          </select>
          <button className="flex items-center justify-center gap-2 border-2 border-gray-300 md:px-4 px-1 py-2 rounded-md bg-white  md:text-xl font-medium">
            Filter
            <HiOutlineFilter size={20} />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto   ">
        <table className="min-w-full text-sm text-left">
          <thead className=" font-bold">
            <tr>
              <th className="px-4 py-3">Service Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Edit</th>
              <th className="px-4 py-3">Remove</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, idx) => (
              <tr key={idx} className=" hover:bg-gray-50">
                <td className="px-4 py-3">{service}</td>
                <td className="px-4 py-3">Skin Treatment</td>
                <td className="px-4 py-3 text-green-600 font-medium">Active</td>
                <td className="px-4 py-3 text-gray-700">
                  <BiEdit className="cursor-pointer text-2xl" />
                </td>
                <td className="px-4 py-3 text-gray-700">
                  <TbTrash className="cursor-pointer text-2xl" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
