import React, { useEffect, useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { PageHeader } from "../../../components/common/PageHeader";
import DynamicTable from "../../../components/table/DynamicTable";
import { toast } from "react-toastify";
import useFetch from "../../../hooks/useFetch";
import conf from "../../../config";

const DashboardCard = ({ title, value, subtitle, highlight }) => (
  <div className="bg-[#FEEBE4]  rounded-3xl p-4 w-60 shadow-md border border-[#FFBDBD]">
    <h4 className=" text-lg font-medium">{title}</h4>
    <div className="text-3xl font-semibold mt-1">{value}</div>
    <p
      className={`text-base mt-1 ${
        highlight ? "text-green-500" : "text-gray-500"
      }`}
    >
      {subtitle}
    </p>
  </div>
);

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [stats, setStats] = useState({
    totalAppointments: 0,
    groupAppointments: 0,
    nagpurUpcoming: 0,
    umredUpcoming: 0,
    percentageChange: 0,
  });
  const [fetchData] = useFetch();

  const [appointments, setAppointments] = useState([]);

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("fullName");
  const limit = 100;

  useEffect(() => {
    const fetchBookingOverview = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetchData({
          method: "GET",
          // conf.apiBaseUrl should be like "http://localhost:5000/api/admin"
          url: `${conf.apiBaseUrl}/appointments/dashboard/stats`,
        });

        if (res.success) {
          setStats(res.data);
        } else {
          toast.error(res.message || "Failed to Booking Overview");
        }
      } catch (err) {
        const message = err.message || "Something went wrong!";
        toast.error(message);
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    const fetchRecent = async () => {
      try {
        const res = await fetchData({
          method: "GET",
          url: `${conf.apiBaseUrl}/appointments/dashboard/recent`,
        });

        if (res.success) {
          setAppointments(res.data);
        } else {
          toast.error(res.message || "Failed to load recent appointments");
        }
      } catch (err) {
        toast.error(err.message || "Something went wrong!");
      }
    };

    fetchBookingOverview();
    fetchRecent();
  }, [fetchData]);

  const columns = [
    { id: "srNo", label: "Sr. No.", minWidth: 70, align: "center" },
    { id: "patientName", label: "Patient Name", minWidth: 150 },
    { id: "appointmentType", label: "Appoint. Type", minWidth: 130 },
    { id: "dateTime", label: "Date & Time", minWidth: 160 },
    { id: "city", label: "City", minWidth: 120 },
    { id: "payment", label: "Payment", minWidth: 100 },
  ];

  // Map DB appointments to rows used by your DynamicTable component
  const rows = appointments.map((a, index) => ({
    id: a._id,
    srNo: String(index + 1).padStart(2, "0"),

    patientName: {
      render: a.patientName,
      sortValue: a.patientName && a.patientName.toLowerCase(),
    },

    appointmentType: {
      render: a.appointmentType,
      sortValue: a.appointmentType && a.appointmentType.toLowerCase(),
    },

    dateTime: {
      render: `${new Date(a.date).toLocaleDateString()} , ${a.time}`,
      sortValue: new Date(a.date),
    },

    city: {
      render: a.city,
      sortValue: a.city && a.city.toLowerCase(),
    },

    payment: {
      render: a.paymentStatus || "Pending",
      sortValue: (a.paymentStatus || "Pending").toLowerCase(),
    },

   
  }));

  return (
    <div className="flex flex-col h-full">
      {/* Stats Cards */}
      <div className="flex justify-around flex-wrap gap-3">
        <DashboardCard
          title="Total Appointments"
          value={stats.totalAppointments}
          subtitle={`+${stats.percentageChange}% from last month`}
          highlight
        />
        <DashboardCard
          title="Group Appointments"
          value={stats.groupAppointments}
          subtitle="More than 1 patient"
        />
        <DashboardCard
          title="Nagpur Appointment"
          value={stats.nagpurUpcoming}
          subtitle="Upcoming Appointment"
        />
        <DashboardCard
          title="Umred Appointments"
          value={stats.umredUpcoming}
          subtitle="Upcoming Appointment"
        />
      </div>

      {/* Filters */}
      <div className="flex justify-between items-start mt-6">
        <PageHeader title={"Recent Appointments"} />

        <div className="flex gap-2">
          <div className="font-medium">
            sort:
            <select className="border border-[#7F7D7D] rounded-lg px-2 py-0.5 text-sm ml-1 font-normal">
              <option>City</option>
            </select>
          </div>
          <div className="font-medium">
            sort:
            <select className="border border-[#7F7D7D] rounded-lg px-2 py-0.5 text-sm ml-1 font-normal">
              <option>Today</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
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
    </div>
  );
}
