import React, { useEffect, useState } from "react";
import BellIcon from "../../../components/icons/BellIcon";
import { PageHeader } from "../../../components/common/PageHeader";
import SearchIcon from "../../../components/icons/SearchIcon";
import FilterIcon from "../../../components/icons/FilterIcon";
import JioDocumentIcon from "../../../components/icons/JioDocumentIcon";
import DoublePageIcon from "../../../components/DoublePageIcon";
import DynamicTable from "../../../components/table/DynamicTable";
import { Eye } from "lucide-react";
import { toast } from "react-toastify";
import useFetch from "../../../hooks/useFetch";
import conf from "../../../config";
import { useNavigate } from "react-router-dom";

const PaymentManager = () => {
  const [payments, setPayments] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("patientName");
  const limit = 100;

  const [fetchData] = useFetch();

  /* ---------------- FETCH PAYMENTS ---------------- */
  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);

      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}/payments`,
      });

      if (res.success) {
        setPayments(res.data || []);
      } else {
        toast.error(res.message || "Failed to fetch payments");
      }
    } catch (err) {
      toast.error(err.message || "Server error");
      setError("Failed to load payments");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- SEARCH FILTER ---------------- */
  const filteredPayments = payments.filter((p) =>
    p.patientName?.toLowerCase().includes(search.toLowerCase())
  );

  /* ---------------- TABLE COLUMNS ---------------- */
  const columns = [
    { id: "srNo", label: "Sr. No.", align: "center" },
    { id: "patientName", label: "Patient Name" },
    { id: "contact", label: "Contact" },
    { id: "dateTime", label: "Date & Time" },
    { id: "city", label: "City" },
    { id: "paymentSource", label: "Payment Source" },
    { id: "transactionId", label: "TRN / Trf. ID" },
    { id: "fees", label: "Fees" },
    { id: "action", label: "Action", align: "center" },
  ];

  /* ---------------- TABLE ROWS ---------------- */
  const rows = filteredPayments.map((payment, index) => ({
    id: payment._id,
    srNo: String(index + 1).padStart(2, "0"),
    patientName: { render: payment.patientName },
    contact: { render: payment.contact },
    dateTime: { render: payment.dateTime },
    city: { render: payment.city },
    paymentSource: { render: payment.paymentSource || "UPI" },
    transactionId: { render: payment.transactionId || "-" },
    fees: { render: `₹ ${payment.fees}` },
    action: {
      render: (
      <Eye
  className="w-5 h-5 cursor-pointer hover:text-indigo-600"
  onClick={() => navigate(`/payments/view/${payment._id}`)}
/>

      ),
    },
  }));

  return (
    <div className="flex flex-col h-full">
      {/* HEADER */}
      <PageHeader
        icon={<BellIcon size={30} />}
        title="Payment Manager"
      />

      {/* TOP BAR */}
      <div className="flex items-center justify-between gap-2 mb-3 text-sm h-10">
        {/* LEFT */}
        <div className="flex gap-2 h-full">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-xl" />
            <input
              type="text"
              placeholder="Search Patient Name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-full border rounded-lg border-gray-400 pl-10 pr-4 outline-none"
            />
          </div>

          <button className="flex items-center gap-1 px-3 h-full border border-gray-400 rounded-lg">
            Filter <FilterIcon />
          </button>
        </div>

        {/* RIGHT */}
        <div className="flex gap-2 h-full text-gray-700">
          <button className="bg-green-400 px-3 h-full rounded-lg border flex items-center gap-2">
            <JioDocumentIcon /> Export Excel
          </button>
          <button className="bg-green-400 px-3 h-full rounded-lg border flex items-center gap-2">
            <DoublePageIcon /> Export PDF
          </button>
        </div>
      </div>

      {/* TABLE */}
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
};

export default PaymentManager;
