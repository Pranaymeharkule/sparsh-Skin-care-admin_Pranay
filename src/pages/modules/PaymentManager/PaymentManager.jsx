import React, { useEffect, useState } from "react";

import BellIcon from "../../../components/icons/BellIcon";
import { PageHeader } from "../../../components/common/PageHeader";
import SearchIcon from "../../../components/icons/SearchIcon";
import DownIcon from "../../../components/icons/DownIcon";
import { toast } from "react-toastify";
import conf from "../../../config";
import useFetch from "../../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import CancelOverlay from "../../../components/Overlay/CancelOverlay";
import DynamicTable from "../../../components/table/DynamicTable";
import { Eye } from "lucide-react";
import JioDocumentIcon from "../../../components/icons/JioDocumentIcon";
import DoublePageIcon from "../../../components/DoublePageIcon";
import FilterIcon from "../../../components/icons/FilterIcon";

const appointmentss = [
  {
    id: 1,
    name: "Leslie Alexander",
    type: "Individual",
    contact: "7809-564-984",
    datetime: "15.06.25, 11.30am",
    city: "Nagpur",
    payment: "Done",
  },
  {
    id: 15,
    name: "Leslie Alexander",
    type: "Individual",
    contact: "7809-564-984",
    datetime: "15.06.25, 11.30am",
    city: "Nagpur",
    payment: "Done",
  },
  {
    id: 16,
    name: "Leslie Alexander",
    type: "Individual",
    contact: "7809-564-984",
    datetime: "15.06.25, 11.30am",
    city: "Nagpur",
    payment: "Done",
  },
  {
    id: 14,
    name: "Leslie Alexander",
    type: "Individual",
    contact: "7809-564-984",
    paymentMethod:"Debit Card",
    datetime: "15.06.25, 11.30am",
    city: "Nagpur",
    payment: "Done",
  },
  {
    id: 2,
    name: "Robert Fox",
    type: "Individual",
    contact: "8947-568-322",
    datetime: "15.06.25, 11.45am",
    city: "Umred",
    payment: "Done",
  },
  {
    id: 3,
    name: "James Rob",
    type: "Individual",
    contact: "8954-211-569",
    datetime: "15.06.25, 01.00pm",
    paymentMethod:"Debit Card",
    city: "Nagpur",
    payment: "Done",
  },
  {
    id: 4,
    name: "James Rob",
    type: "Group",
    contact: "9964-486-286",
    datetime: "15.06.25, 01.00pm",
    city: "Umred",
    payment: "Done",
  },
  {
    id: 5,
    name: "James Rob",
    type: "Individual",
    contact: "9564-254-325",
    datetime: "15.06.25, 01.00pm",
    city: "Nagpur",
    payment: "Done",
  },
  {
    id: 6,
    name: "James Rob",
    type: "Individual",
    contact: "9564-254-325",
    datetime: "15.06.25, 01.00pm",
    city: "Nagpur",
    payment: "Done",
  },
  {
    id: 7,
    name: "James Rob",
    type: "Individual",
    contact: "9564-254-325",
    datetime: "15.06.25, 01.00pm",
    city: "Nagpur",
    payment: "Done",
  },
  {
    id: 8,
    name: "James Rob",
    type: "Individual",
    contact: "9564-254-325",
    datetime: "15.06.25, 01.00pm",
    city: "Nagpur",

    payment: "Done",
  },
];

export default function PaymentManager() {
  const [search, setSearch] = useState("");
  const [payments, setPayments] = useState(appointmentss);
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
  { id: "srNo", label: "Sr. No.", align: "center" },
  { id: "patientName", label: "Patient Name" },
  { id: "contact", label: "Contact" },
  { id: "dateTime", label: "Date & Time" },
  { id: "city", label: "City" },
  { id: "paymentSource", label: "Payment Source" },
  { id: "trId", label: "TRN/ Trf. ID" },
  { id: "fees", label: "Fees" },
  { id: "action", label: "Action", align: "center" },
];


const rows = payments.map((appointment, index) => ({
  id: appointment._id,
  srNo: String(index + 1).padStart(2, "0"),
  patientName: { render: appointment.name },
  contact: { render: appointment.contact },
  dateTime: { render: appointment.datetime },
  city: { render: appointment.city },
  paymentSource: { render: appointment.paymentMethod || "UPI" },
  trId: { render: appointment.transactionId || "1245–5648–1154" },
  fees: { render: `₹ ${appointment.fee || 250}` },
  action: {
    render: (
      <div className="flex gap-3 justify-center">
        <Eye className="w-5 h-5 cursor-pointer hover:text-indigo-700" />
      </div>
    ),
  },
}));

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        icon={<BellIcon size={30} className="text-xl" />}
        title={"Payment Manager"}
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

      <div className="overflow-x-auto ">
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
          // onConfirm={() => handleCancelConfirm(selectedAppoinmentId)}
          onCancel={() => setShowCancelPopup(false)}
          message={"Are you sure you want to Cancel this Appointment?"}
        />
      )}
    </div>
  );
}
