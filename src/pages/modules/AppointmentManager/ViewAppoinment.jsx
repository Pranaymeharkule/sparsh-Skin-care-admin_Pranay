import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import conf from "../../../config";
import { toast } from "react-toastify";

export default function ViewAppoinment() {
  const { id } = useParams();
  const [search, setSearch] = useState("");
//   const [appointment, setAppointment] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const [fetchData] = useFetch();
  const [appointment, setAppointment] = useState({
    name: "Rober",
    contact: "7809-564-984",
    type: "Skin Treatment",
    datetime: "15.06.25 , 01.00pm",
    city: "Nagpur",
    payment: "Done",
  });

  useEffect(() => {
    const fetchBookingOverview = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetchData({
          method: "GET",
          url: `${conf.apiBaseUrl}/appointments/${id}`,
        });

        if (res.success) {
            console.log(res)
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
    <div className="w-full h-screen bg-white overflow-hidden">
      {/* Scrollable content wrapper for sm and md */}
      <div className="h-full overflow-y-auto px-4 sm:px-8 md:px-16 py-8">
        <div className="bg-[#FEEBE4] px-4 py-2 rounded-t-md mb-6">
          <h2 className="text-xl font-semibold text-left">View Appointment</h2>
        </div>

        <form className="space-y-4 pb-16">
          <InfoRow label="Patient Name" value={appointment.patientName} />
          <InfoRow label="Contact No." value={appointment.contact} />
          <InfoRow label="Appt. Type" value={appointment.type || "N/A"} />
          <InfoRow label="Date & Time" value={appointment.date +", "+ appointment.time} />
          <InfoRow label="City" value={appointment.city} />
          <InfoRow label="Payment" value={appointment.status} />

          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-16 pt-6">
            <Link to="/appointments">
            <button
              type="button"
              className="border-2 border-[#716FCD] text-black font-semibold py-2 px-6 rounded-md cursor-pointer"
              >
              Back
            </button>
                </Link>
            <Link to="/editappointment">
              <button
                type="button"
                className="bg-[#716FCD] text-white font-semibold py-2 px-6 rounded-md cursor-pointer"
              >
                Edit
              </button>
            </Link>
          </div>
        </form>
      </div>
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
