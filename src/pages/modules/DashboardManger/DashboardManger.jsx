import React from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";

const appointments = [
  {
    id: 1,
    name: "Nitin Kumar",
    type: "Group",
    datetime: "15.06.25 , 11.30am",
    city: "Nagpur",
    payment: "Done",
  },
  {
    id: 2,
    name: "Robert Fox",
    type: "Individual",
    datetime: "15.06.25 , 11.45am",
    city: "Nagpur",
    payment: "Done",
  },
  {
    id: 3,
    name: "James Rob",
    type: "Individual",
    datetime: "15.06.25 , 01.00pm",
    city: "Nagpur",
    payment: "Done",
  },
  {
    id: 4,
    name: "James Rob",
    type: "Individual",
    datetime: "15.06.25 , 01.00pm",
    city: "Nagpur",
    payment: "Done",
  },
  {
    id: 5,
    name: "James Rob",
    type: "Individual",
    datetime: "15.06.25 , 01.00pm",
    city: "Nagpur",
    payment: "Done",
  },
];

const DashboardCard = ({ title, value, subtitle, highlight }) => (
  <div className="bg-[#FFF6F6] rounded-xl p-4 w-60 shadow-md border border-red-100">
    <h4 className="text-gray-500 text-sm">{title}</h4>
    <div className="text-2xl font-bold mt-1">{value}</div>
    <p className={`text-sm mt-1 ${highlight ? "text-green-500" : "text-gray-400"}`}>
      {subtitle}
    </p>
  </div>
);

export default function AppointmentDashboard() {
  return (
    <div className="p-6 space-y-6 font-sans">
      {/* Stats Cards */}
      <div className="flex gap-4 flex-wrap">
        <DashboardCard
          title="Total Appointments"
          value="247"
          subtitle="+12% from last month"
          highlight
        />
        <DashboardCard title="Group Appointments" value="4" subtitle="More than 1 patient" />
        <DashboardCard title="Nagpur Appointment" value="10" subtitle="Upcoming Appointment" />
        <DashboardCard title="Umred Appointments" value="8" subtitle="Upcoming Appointment" />
      </div>

      {/* Filters */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Recent Appointments</h2>
        <div className="flex gap-2">
          <select className="border rounded px-2 py-1 text-sm">
            <option>City</option>
          </select>
          <select className="border rounded px-2 py-1 text-sm">
            <option>Today</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border-t border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2">Sr. No.</th>
              <th className="p-2">Patient Name</th>
              <th className="p-2">Appoint. Type</th>
              <th className="p-2">Date & Time</th>
              <th className="p-2">City</th>
              <th className="p-2">Payment</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a, index) => (
              <tr key={a.id} className="gap-12 hover:bg-gray-50">
                <td className="p-2">{String(index + 1).padStart(2, "0")}</td>
                <td className="p-2">{a.name}</td>
                <td className="p-2">{a.type}</td>
                <td className="p-2">{a.datetime}</td>
                <td className="p-2">{a.city}</td>
                <td className="p-2 text-green-600 font-medium">{a.payment}</td>
                <td className="p-2 flex gap-2 text-gray-600">
                  <Eye className="w-4 h-4 cursor-pointer" />
                  <Pencil className="w-4 h-4 cursor-pointer" />
                  <Trash2 className="w-4 h-4 cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center text-sm gap-2 pt-2">
        <span className="text-gray-400">previous</span>
        <span className="px-2 py-1 border rounded bg-gray-200">01</span>
        <span className="text-gray-400">Next</span>
      </div>
    </div>
  );
}
