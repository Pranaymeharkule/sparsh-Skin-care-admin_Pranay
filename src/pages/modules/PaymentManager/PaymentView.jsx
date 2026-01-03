import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PageHeader } from "../../../components/common/PageHeader";
import useFetch from "../../../hooks/useFetch";
import conf from "../../../config";
import { toast } from "react-toastify";

const PaymentView = () => {
  const { id } = useParams(); // 🔥 THIS WAS MISSING
  const navigate = useNavigate();
  const [fetchData] = useFetch();

  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPayment();
  }, [id]);

 const fetchPayment = async () => {
  try {
    setLoading(true);

    const res = await fetchData({
      method: "GET",
      url: `${conf.apiBaseUrl}/payments/${id}`,
    });

    if (res.success) {
      setPayment(res.data);
    } else {
      toast.error(res.message || "Payment not found");
    }
  } catch (err) {
    toast.error("Failed to load payment");
  } finally {
    setLoading(false);
  }
};


  if (loading) return <p className="p-4">Loading...</p>;
  if (!payment) return <p className="p-4">No payment found</p>;

  return (
    <div className="flex flex-col gap-4 p-4">
      <PageHeader title="View Payment" />

      <div className="bg-white shadow rounded-lg p-4 grid grid-cols-2 gap-4">
        <p><b>Patient Name:</b> {payment.patientName}</p>
        <p><b>Contact:</b> {payment.contact}</p>
        <p><b>City:</b> {payment.city}</p>
        <p><b>Date & Time:</b> {payment.dateTime}</p>
        <p><b>Payment Source:</b> {payment.paymentSource}</p>
        <p><b>Transaction ID:</b> {payment.transactionId || "-"}</p>
        <p><b>Fees:</b> ₹{payment.fees}</p>
      </div>

      <button
        onClick={() => navigate(-1)}
        className="bg-black text-white px-4 py-2 rounded w-fit"
      >
        Back
      </button>
    </div>
  );
};

export default PaymentView;
