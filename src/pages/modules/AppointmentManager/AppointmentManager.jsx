import React from "react";
import { FiSearch } from "react-icons/fi";
import { HiOutlineFilter } from "react-icons/hi";
import { FaFileExcel, FaFilePdf, FaRegCopy } from "react-icons/fa";
import { TiBell } from "react-icons/ti";
import PaymentTable from "../../../components/layouts/PaymentTable";

const data = [
  {
    id: "01",
    name: "Leslie Alexander",
    contact: "7809-564-984",
    datetime: "15.06.25 , 11.30am",
    city: "Nagpur",
    source: "upi",
    ref: "1254-6457-8556",
    status: "Complete",
  },
  {
    id: "02",
    name: "Robert Fox",
    contact: "8947-568-322",
    datetime: "15.06.25 , 11.45am",
    city: "Umred",
    source: "upi",
    ref: "1254-6457-8556",
    status: "Complete",
  },
  {
    id: "03",
    name: "James Rob",
    contact: "8954-211-569",
    datetime: "15.06.25 , 01.00pm",
    city: "Nagpur",
    source: "upi",
    ref: "1254-6457-8556",
    status: "Complete",
  },
  {
    id: "04",
    name: "James Rob",
    contact: "9964-486-286",
    datetime: "15.06.25 , 01.00pm",
    city: "Umred",
    source: "Bank Tran.",
    ref: "1284-3554-25",
    status: "Complete",
  },
  {
    id: "05",
    name: "James Rob",
    contact: "9564-254-325",
    datetime: "15.06.25 , 01.00pm",
    city: "Nagpur",
    source: "upi",
    ref: "1254-6457-8556",
    status: "Complete",
  },
  {
    id: "06",
    name: "James Rob",
    contact: "9564-254-325",
    datetime: "15.06.25 , 01.00pm",
    city: "Nagpur",
    source: "upi",
    ref: "1254-6457-8556",
    status: "Complete",
  },
  {
    id: "07",
    name: "James Rob",
    contact: "9564-254-325",
    datetime: "15.06.25 , 01.00pm",
    city: "Nagpur",
    source: "Bank Tran.",
    ref: "1284-3554-25",
    status: "Complete",
  },
  {
    id: "08",
    name: "James Rob",
    contact: "9564-254-325",
    datetime: "15.06.25 , 01.00pm",
    city: "Nagpur",
    source: "upi",
    ref: "1254-6457-8556",
    status: "Complete",
  },
];
export default function AppointmentManager() {
  return (
    <div className="p-4 md:p-8 font-sans text-sm w-full">
      <div className="flex items-center gap-3 mb-4 text-xl md:text-2xl font-semibold">
        <TiBell size={30} className="text-xl" />
        <h1>Payment Manager</h1>
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-4 w-full">
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-2/3">
          <div className="flex items-center w-full md:w-1/3 sm:w-3/4 border rounded-md shadow-sm px-3 py-2 bg-white">
            <FiSearch className="text-gray-500 text-xl mr-2" />
            <input
              type="text"
              placeholder="Search Payment Transaction"
              className="w-full outline-none text-sm"
            />
          </div>
          <button className="flex items-center justify-center gap-2 border border-gray-300 px-4 py-2 rounded-md bg-white shadow-sm text-sm font-medium">
            Filter
            <HiOutlineFilter size={20} />
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          <button className="flex items-center gap-2 bg-green-100 text-gray-700 border border-[#D4FFBD] px-3 py-2 rounded shadow-sm text-sm">
            <FaFileExcel /> Export Excel
          </button>
          <button className="flex items-center gap-2 bg-green-100 text-gray-700 border border-[#D4FFBD] px-3 py-2 rounded shadow-sm text-sm">
            <FaRegCopy /> Export PDF
          </button>
        </div>
      </div>

      <PaymentTable data={data} />

      <div className="flex items-center justify-end gap-2 mt-4 text-sm flex-wrap">
        <button className="border border-gray-300 text-gray-500 px-3 py-1 rounded-md bg-gray-100">
          Previous
        </button>
        <span className="border border-gray-300 px-3 py-1 rounded-md bg-white">
          01
        </span>
        <button className="border border-gray-300 px-3 py-1 rounded-md bg-white">
          Next
        </button>
      </div>
    </div>
  );
}
