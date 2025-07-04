import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import conf from "../../../config";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { PageHeader } from "../../../components/common/PageHeader";

export default function ViewAppoinment() {
  const { id } = useParams();
  const [search, setSearch] = useState("");
  //   const [appointment, setAppointment] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [fetchData] = useFetch();
  const [appointment, setAppointment] = useState({});

  useEffect(() => {
    const fetchBookingOverview = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetchData({
          method: "GET",
          url: `${conf.apiBaseUrl}/appointments/getAppointmentById/${id}`,
        });

        if (res.success) {
          console.log(res);
          setAppointment(res.appointment);
        } else {
          toast.error(res.message || "Failed to Appointment Details");
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

  return (
    <div className="flex flex-col h-full overflow-y-scroll">
      {/* Scrollable content wrapper for sm and md */}

      <div className="bg-[#FEEBE4] px-4 py-2 rounded-t-md my-6">
        <h2 className="text-2xl font-semibold text-left">View Appointment</h2>
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="p-4 text-center text-red-500 font-semibold">
          {error}
        </div>
      ) : !appointment ? (
        <div className="p-4 text-center text-gray-500 font-semibold">
          No Appoinment found.
        </div>
      ) : (
        <form className="space-y-4 pb-16">
          <InfoRow
            label="Patient Name"
            value={appointment.patientName || "N/A"}
          />
          <InfoRow label="Contact No." value={appointment.contact || "N/A"} />
          <InfoRow
            label="Appt. Type"
            value={appointment.appointmentType || "N/A"}
          />
          <InfoRow label="Date & Time" value={appointment.dateTime || "N/A"} />
          <InfoRow label="City" value={appointment.city || "N/A"} />
          <InfoRow label="Payment" value={appointment.payment || "N/A"} />

          <div className="flex flex-row justify-center gap-4 sm:gap-16 pt-6">
            <Link to="/appointments">
              <button
                type="button"
                className="border-2 border-[#716FCD] text-black font-semibold py-2 px-6 rounded-md cursor-pointer"
              >
                Back
              </button>
            </Link>
            <Link to="/appointments/edit">
              <button
                type="button"
                className="bg-[#716FCD] text-white font-semibold py-2 px-6 rounded-md cursor-pointer h-full"
              >
                Edit
              </button>
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
      <label className="w-full md:w-48 font-medium text-left">{label} :</label>
      <div className="w-full border border-[#FC2C6D] rounded-md px-3 py-2 bg-white  text-left">
        {value}
      </div>
    </div>
  );
}
