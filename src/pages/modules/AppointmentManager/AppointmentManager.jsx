import React, { useEffect, useState } from "react";
import {
  FaFileExcel,
  FaFilePdf,
  FaTrash,
  FaEye,
  FaSearch,
  FaFilter,
} from "react-icons/fa";
import BellIcon from "../../../components/icons/BellIcon";
import { PageHeader } from "../../../components/common/PageHeader";
import SearchIcon from "../../../components/icons/SearchIcon";
import DownIcon from "../../../components/icons/DownIcon";
import { toast } from "react-toastify";
import conf from "../../../config";
import useFetch from "../../../hooks/useFetch";
import { formatDateTime } from "../../../utils/formatDateTime";
import { Link } from "react-router-dom";
import CancelOverlay from "../../../components/Overlay/CancelOverlay";

// const appointments = [
//   {
//     id: 1,
//     name: "Leslie Alexander",
//     type: "Individual",
//     contact: "7809-564-984",
//     datetime: "15.06.25, 11.30am",
//     city: "Nagpur",
//     payment: "Done",
//   },
//   {
//     id: 2,
//     name: "Robert Fox",
//     type: "Individual",
//     contact: "8947-568-322",
//     datetime: "15.06.25, 11.45am",
//     city: "Umred",
//     payment: "Done",
//   },
//   {
//     id: 3,
//     name: "James Rob",
//     type: "Individual",
//     contact: "8954-211-569",
//     datetime: "15.06.25, 01.00pm",
//     city: "Nagpur",
//     payment: "Done",
//   },
//   {
//     id: 4,
//     name: "James Rob",
//     type: "Group",
//     contact: "9964-486-286",
//     datetime: "15.06.25, 01.00pm",
//     city: "Umred",
//     payment: "Done",
//   },
//   {
//     id: 5,
//     name: "James Rob",
//     type: "Individual",
//     contact: "9564-254-325",
//     datetime: "15.06.25, 01.00pm",
//     city: "Nagpur",
//     payment: "Done",
//   },
//   {
//     id: 6,
//     name: "James Rob",
//     type: "Individual",
//     contact: "9564-254-325",
//     datetime: "15.06.25, 01.00pm",
//     city: "Nagpur",
//     payment: "Done",
//   },
//   {
//     id: 7,
//     name: "James Rob",
//     type: "Individual",
//     contact: "9564-254-325",
//     datetime: "15.06.25, 01.00pm",
//     city: "Nagpur",
//     payment: "Done",
//   },
//   {
//     id: 8,
//     name: "James Rob",
//     type: "Individual",
//     contact: "9564-254-325",
//     datetime: "15.06.25, 01.00pm",
//     city: "Nagpur",
//     payment: "Done",
//   },
// ];

export default function AppointmentDashboard() {
  const [search, setSearch] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedAppoinmentId, setSelectedAppoinmentId] = useState("");
  const [showCancelPopup, setShowCancelPopup] = useState("");
  const [fetchData] = useFetch();

  useEffect(() => {
    const fetchBookingOverview = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetchData({
          method: "GET",
          url: `${conf.apiBaseUrl}/appointments`,
        });

        if (res.success) {
          setAppointments(res.appointments);
        } else {
          toast.error(res.message || "Failed to Appointments");
        }
      } catch (err) {
        const message = err.message || "Something went wrong!";
        toast.error(message);
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingOverview();
  }, [fetchData]);

  const handleCancelConfirm = async (id) => {
    if (!id) return;

    try {
      const res = await fetchData({
        method: "DELETE",
        url: `${conf.apiBaseUrl}/appointments/${id}`,
      });

      if (res.success) {
        toast.success("Appointment cancelled successfully!");
      } else {
        toast.error(res.message || "Failed to cancel appointment.");
      }
    } catch (err) {
      const message = err.message || "Something went wrong!";
      toast.error(message);
    } finally {
      setShowCancelPopup(false);
    }
  };

  const handleDetele = async (id) => {
    setSelectedAppoinmentId(id); 
    setShowCancelPopup(true);
  };

  console.log(appointments);
  return (
    <div className="p-6">
      <PageHeader
        icon={<BellIcon size={30} className="text-xl" />}
        title={"Appointment Dashboard"}
      />
      <div className="flex items-center justify-between mt-4 text-sm h-10">
        {/* Left Section */}
        <div className="flex gap-2 h-full">
          <div className="relative w-full max-w-full h-full">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-xl" />
            <input
              type="text"
              placeholder="Search Patient Name."
              className="w-full h-full border rounded-lg border-[#a0a0a0] pl-10 pr-4 outline-none"
            />
          </div>
          <button className="flex items-center gap-1 px-3 h-full border border-[#a0a0a0] rounded-lg">
            Filter <FaFilter />
          </button>
        </div>

        {/* Right Section */}
        <div className="flex gap-2 h-full">
          <button className="bg-[#83D15A] text-white px-3 h-full rounded-lg border border-[#6FC451] flex items-center gap-2 text-sm">
            <FaFileExcel /> Export Excel
          </button>
          <button className="bg-[#83D15A] text-white px-3 h-full rounded-lg border border-[#6FC451] flex items-center gap-2 text-sm">
            <FaFilePdf /> Export PDF
          </button>
        </div>
      </div>

      <div className="overflow-x-auto  gap-15 ">
        <table className="w-full border-collapse text-sm">
          <thead className=" text-left">
            <tr>
              <th className="p-2">Sr. No.</th>
              <th className="p-2">Patient Name</th>
              <th className="p-2">Appoint. Type</th>
              <th className="p-2">Contact</th>
              <th className="p-2">Date & Time</th>
              <th className="p-2">City</th>
              <th className="p-2">Payment</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt, index) => (
              <tr key={appt.id} className="gap-25 mt-8 mb-8 text-left">
                <td className="p-2">{String(index + 1).padStart(2, "0")}</td>
                <td className="p-2">{appt.patientName}</td>
                <td className="p-2">{appt.type}</td>
                <td className="p-2">{appt.contact}</td>
                <td className="p-2">{formatDateTime(appt.date, appt.time)}</td>
                <td className="p-2">{appt.city}</td>
                <td className="p-2 text-green-600 font-semibold">
                  {appt.status}
                </td>
                <td className="p-2 flex items-center gap-3 text-xl">
                  <FaTrash
                    className="text-gray-400 cursor-pointer hover:text-red-500"
                    onClick={() => handleDetele(appt._id)}
                  />
                  <Link to={`view/${appt._id}`} className="inline-block">
                    <FaEye className="text-gray-500 bg-white cursor-pointer hover:text-blue-500" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-end items-center gap-2 text-sm">
        <button className="text-gray-400 border px-2 py-1 rounded" disabled>
          previous
        </button>
        <span className="border px-3 py-1 rounded bg-gray-100">01</span>
        <button className="text-black border px-2 py-1 rounded">Next</button>
      </div>
      {showCancelPopup && (
        <CancelOverlay
          onConfirm={()=>handleCancelConfirm(selectedAppoinmentId)}
          onCancel={() => setShowCancelPopup(false)}
          message={"Are you sure you want to Cancel this Appointment?"}
        />
      )}
    </div>
  );
}
