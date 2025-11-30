import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import conf from "../../../config";
import { toast } from "react-toastify";

export default function EditAppointmentDetails() {
  const { id } = useParams();  
  const navigate = useNavigate();
  const [fetchData] = useFetch();

  const [appointment, setAppointment] = useState({
    patientName: "",
    contact: "",
    appointmentType: "",
    date: "",
    time: "",
    city: "",
    payment: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchData({
          method: "GET",
          url: `${conf.apiBaseUrl}/appointments/getAppointmentById/${id}`,
        });

        if (res.success) {
          setAppointment(res.appointment);
        } else {
          toast.error("Failed to load appointment");
        }
      } catch {
        toast.error("Error loading appointment");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id, fetchData]);

  const handleChange = (field, value) => {
    setAppointment((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdate = async () => {
    try {
      const res = await fetchData({
        method: "PUT",
        url: `${conf.apiBaseUrl}/appointments/updateAppointment/${id}`,
        data: appointment,
      });

      if (res.success) {
        toast.success("Updated successfully");
        navigate("/appointments");
      } else {
        toast.error("Update failed");
      }
    } catch {
      toast.error("Update error");
    }
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="w-full mx-auto p-8 md:p-16 bg-white min-h-screen">
      <div className="bg-[#FEEBE4] px-4 py-2 rounded-t-md mb-6">
        <h2 className="text-xl text-left font-semibold">Edit Appointment</h2>
      </div>

      <form className="space-y-4">
        <InputField
          label="Patient Name"
          value={appointment.patientName}
          onChange={(v) => handleChange("patientName", v)}
        />

        <InputField
          label="Contact"
          value={appointment.contact}
          onChange={(v) => handleChange("contact", v)}
        />

        <InputField
          label="Type"
          value={appointment.appointmentType}
          onChange={(v) => handleChange("appointmentType", v)}
        />

        <InputField
          label="Date"
          value={appointment.date}
          onChange={(v) => handleChange("date", v)}
        />

        <InputField
          label="Time"
          value={appointment.time}
          onChange={(v) => handleChange("time", v)}
        />

        <InputField
          label="City"
          value={appointment.city}
          onChange={(v) => handleChange("city", v)}
        />

        <InputField
          label="Payment"
          value={appointment.payment}
          onChange={(v) => handleChange("payment", v)}
        />

        <div className="flex justify-center gap-16 pt-6">
          <button
            type="button"
            className="border-2 border-[#1E1874] text-[#1E1874] font-semibold py-1.5 px-6 rounded-md"
            onClick={() => navigate("/appointments")}
          >
            Back
          </button>

          <button
            type="button"
            className="bg-[#1E1874] text-white font-semibold py-1.5 px-8 rounded-md"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

function InputField({ label, value, onChange }) {
  return (
    <div className="md:flex items-center gap-4">
      <label className="w-48 font-medium text-left">{label} :</label>
      <input
        type="text"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 border border-[#FC2C6D] w-full rounded-md px-3 py-2 bg-white text-gray-800 focus:outline-none"
      />
    </div>
  );
}
