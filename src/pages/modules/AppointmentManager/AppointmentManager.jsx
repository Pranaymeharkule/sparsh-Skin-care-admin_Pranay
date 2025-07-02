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
import { Link, useNavigate } from "react-router-dom";
import CancelOverlay from "../../../components/Overlay/CancelOverlay";
import DynamicTable from "../../../components/table/DynamicTable";
import { Eye, Pencil, Trash2 } from "lucide-react";
import JioDocumentIcon from "../../../components/icons/JioDocumentIcon";
import DoublePageIcon from "../../../components/DoublePageIcon";
import FilterIcon from "../../../components/icons/FilterIcon";

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
  const navigate = useNavigate();

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("fullName");
  const limit = 100;

  const columns = [
    { id: "srNo", label: "Sr. No.", minWidth: 70, align: "center" },
    { id: "patientName", label: "Patient Name", minWidth: 150 },
    { id: "appointmentType", label: "Appoint. Type", minWidth: 130 },
    { id: "contact", label: "Contact", minWidth: 100 },
    { id: "dateTime", label: "Date & Time", minWidth: 170 },
    { id: "city", label: "City", minWidth: 120 },
    { id: "payment", label: "Payment", minWidth: 110 },
    { id: "action", label: "Action", minWidth: 100, align: "center" },
  ];

  const rows = appointments.map((appointment, index) => ({
    id: appointment._id,
    srNo: String(index + 1).padStart(2, "0"),

    patientName: {
      render: appointment.patientName || "N/A",
      sortValue: (appointment.patientName || "").toLowerCase(),
    },

    appointmentType: {
      render: appointment.appointmentType || "N/A",
      sortValue: (appointment.appointmentType || "").toLowerCase(),
    },

    contact: {
      render: appointment.contact || "N/A",
      sortValue: appointment.contact || "",
    },

    dateTime: {
      render: appointment.dateTime || "N/A",
      sortValue: appointment.dateTime || "", // Consider parsing date for accurate sorting
    },

    city: {
      render: appointment.city || "N/A",
      sortValue: (appointment.city || "").toLowerCase(),
    },

    payment: {
      render: appointment.payment || "Pending",
      sortValue: (appointment.payment || "pending").toLowerCase(),
    },

    action: (
      <div className="flex gap-3 justify-center">
        <Trash2
          className="w-5 h-5 cursor-pointer hover:text-red-600"
          onClick={() => handleDetele(appointment._id)}
        />
        <Eye
          className="w-5 h-5 cursor-pointer hover:text-indigo-700"
          onClick={() => navigate(`view/${appointment._id}`)}
        />
      </div>
    ),
  }));

  useEffect(() => {
    const fetchBookingOverview = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetchData({
          method: "GET",
          url: `${conf.apiBaseUrl}/appointments/getAllAppointments`,
        });
        if (res.success) {
          setAppointments(res.appointments);
          console.log(res.appointments);
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
        method: "PUT",
        url: `${conf.apiBaseUrl}/appointments/deleteAppointment/${id}`,
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
    <div className="flex flex-col h-full">
      <PageHeader
        icon={<BellIcon size={30} className="text-xl" />}
        title={"Appointment Dashboard"}
      />
      <div className="flex items-center justify-between gap-2 mb-2 text-sm h-10">
        {/* Left Section */}
        <div className="flex gap-2 h-full">
          <div className="relative max-w-full h-full">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-xl" />
            <input
              type="text"
              placeholder="Search Patient Name."
              className="w-full h-full border rounded-lg border-[#a0a0a0] pl-10 pr-4 outline-none"
            />
          </div>
          <button className="flex items-center gap-1 px-3 h-full border border-[#a0a0a0] rounded-lg">
            Filter <FilterIcon />
          </button>
        </div>

        {/* Right Section */}
        <div className="flex gap-2 h-full text-[#4F4F4F]">
          <button className="bg-[#83D15A] px-3 h-full rounded-lg border border-[#6FC451] flex items-center gap-2 text-sm">
            <JioDocumentIcon className="text-xl" /> Export Excel
          </button>
          <button className="bg-[#83D15A] px-3 h-full rounded-lg border border-[#6FC451] flex items-center gap-2 text-sm">
            <DoublePageIcon className="text-xl" /> Export PDF
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <DynamicTable
          columns={columns}
          rows={rows}
          order={order}
          orderBy={orderBy}
          setOrder={setOrder}
          setOrderBy={setOrderBy}
          initialPageSize={limit}
          loading={loading}
          error={error}
        />
      </div>

      {showCancelPopup && (
        <CancelOverlay
          onConfirm={() => handleCancelConfirm(selectedAppoinmentId)}
          onCancel={() => setShowCancelPopup(false)}
          message={"Are you sure you want to Cancel this Appointment?"}
        />
      )}
    </div>
  );
}
