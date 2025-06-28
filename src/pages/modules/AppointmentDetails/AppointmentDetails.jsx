import React from "react";

export default function AppointmentDetails() {
  const appointment = {
    name: "Rober",
    contact: "7809-564-984",
    type: "Skin Treatment",
    datetime: "15.06.25 , 01.00pm",
    city: "Nagpur",
    payment: "Done",
  };

  return (
    <div className="w-full mx-auto p-8 md:p-16 bg-white min-h-screen">
      <div className="bg-[#FEEBE4] px-4 py-2 rounded-t-md mb-6">
        <h2 className="text-xl text-left font-semibold">View Appointment</h2>
      </div>

      <form className="space-y-4">
        <InputField label="Patient Name" value={appointment.name} />
        <InputField label="Contact No." value={appointment.contact} />
        <InputField label="Appt. Type" value={appointment.type} />
        <InputField label="Date & Time" value={appointment.datetime} />
        <InputField label="City" value={appointment.city} />
        <InputField label="Payment" value={appointment.payment} />

        <div className="flex justify-center gap-16 pt-6">
          <button
            type="button"
            className="border-2 border-[#1E1874] text-[#1E1874] font-semibold py-1.5 px-6 rounded-md"
          >
            Back
          </button>
          <button
            type="button"
            className="bg-[#1E1874] text-white font-semibold py-1.5 px-8 rounded-md"
          >
            Edit
          </button>
        </div>
      </form>
    </div>
  );
}
function InputField({ label, value }) {
  return (
    <div className="md:flex items-center gap-4">
      <label className="w-48 font-medium text-left">
        {label} :
      </label>
      <input
        type="text"
        value={value}
        readOnly
        className="flex-1 border border-[#FC2C6D] w-full rounded-md px-3 py-2 bg-white text-gray-800 focus:outline-none"
      />
    </div>
  );
}

