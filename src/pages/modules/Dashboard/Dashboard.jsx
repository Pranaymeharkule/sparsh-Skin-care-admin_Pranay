import React, { useEffect, useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { PageHeader } from "../../../components/common/PageHeader";
import DynamicTable from "../../../components/table/DynamicTable";
import { toast } from "react-toastify";
import useFetch from "../../../hooks/useFetch";
import conf from "../../../config";

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

  const [stats, setStats] = useState({});
  const [fetchData] = useFetch();

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
          url: `${conf.apiBaseUrl}/dashboard/stats`,
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

    fetchBookingOverview();
  }, [fetchData]);
   
  const columns = [
    { id: "srNo", label: "Sr. No.", minWidth: 70, align: "center" },
    { id: "patientName", label: "Patient Name", minWidth: 150 },
    { id: "appointmentType", label: "Appoint. Type", minWidth: 130 },
    { id: "dateTime", label: "Date & Time", minWidth: 160 },
    { id: "city", label: "City", minWidth: 120 },
    { id: "payment", label: "Payment", minWidth: 100 },
    { id: "action", label: "Action", minWidth: 100, align: "center" },
  ];

  const rows = appointments.map((appointment, index) => ({
    id: appointment.id,
    srNo: String(index + 1).padStart(2, "0"),

    patientName: {
      render: appointment.name,
      sortValue: appointment.name.toLowerCase(),
    },

    appointmentType: {
      render: appointment.type,
      sortValue: appointment.type.toLowerCase(),
    },

    dateTime: {
      render: appointment.datetime,
      sortValue: appointment.datetime, // If needed, convert to Date for real sorting
    },

    city: {
      render: appointment.city,
      sortValue: appointment.city.toLowerCase(),
    },

    payment: {
      render: appointment.payment,
      sortValue: appointment.payment.toLowerCase(),
    },

    action: (
      <div className="flex gap-3 justify-center">
        <Eye className="w-5 h-5 cursor-pointer" />
        <Pencil className="w-5 h-5 cursor-pointer" />
        <Trash2 className="w-5 h-5 cursor-pointer" />
      </div>
    ),
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
        {/* <table className="min-w-full text-left text-base">
          <thead>
            <tr className="mb-2">
              <th className="px-2 py-3 font-semibold text-center">Sr. No.</th>
              <th className="px-2 py-3 font-semibold">Patient Name</th>
              <th className="px-2 py-3 font-semibold">Appoint. Type</th>
              <th className="px-2 py-3 font-semibold">Date & Time</th>
              <th className="px-2 py-3 font-semibold">City</th>
              <th className="px-2 py-3 font-semibold">Payment</th>
              <th className="px-2 py-3 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a, index) => (
              <tr key={a.id} className="gap-12 hover:bg-gray-100 mb-2">
                <td className="px-2 py-3 text-center">
                  {String(index + 1).padStart(2, "0")}
                </td>
                <td className="px-2 py-3">{a.name}</td>
                <td className="px-2 py-3">{a.type}</td>
                <td className="px-2 py-3">{a.datetime}</td>
                <td className="px-2 py-3">{a.city}</td>
                <td className="px-2 py-3 text-green-600 font-medium">
                  {a.payment}
                </td>
                <td className="px-2 py-3 flex gap-2 text-gray-600">
                  <Eye className="w-4 h-4 cursor-pointer" />
                  <Pencil className="w-4 h-4 cursor-pointer" />
                  <Trash2 className="w-4 h-4 cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}
      </div>
    </div>
  );
}
