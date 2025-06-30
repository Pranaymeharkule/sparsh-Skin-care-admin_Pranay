import React from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import CalendarIcon from "../../../components/icons/CalenderIcon";

const notifications = [
  {
    type: "payment",
    name: "Rahul",
    datetime: "September 30, 2023, 10:00AM",
    city: "Nagpur",
    status: "Approved",
  },
  {
    type: "payment",
    name: "Rahul",
    datetime: "September 30, 2023, 10:00AM",
    city: "Nagpur",
    status: "Approved",
  },
  {
    type: "inquiry",
    name: "Rahul",
    email: "Rahul124@example.com",
    contact: "9645-878-224",
    received: "September 28, 2025, 2:15 PM",
    subject: "Inquiry about appointment scheduling",
  },
  {
    type: "inquiry",
    name: "Arman Modi",
    email: "Arman124@example.com",
    contact: "9678-668-224",
    received: "September 29, 2025, 2:15 PM",
    subject: "Inquiry about appointment scheduling",
  },
];

export default function DashbaordNotification() {
  return (
    <div className=" w-full p-6 mx-auto">
      <div className="flex  text-left  gap-2 text-xl font-semibold mb-6">
        <IoMdNotificationsOutline className="text-2xl" />
        <h2>Notifications</h2>
      </div>

      <div className="space-y-4">
        {notifications.map((item, idx) => (
          <div
            key={idx}
            className="border text-left rounded-3xl p-4 shadow-sm bg-white text-sm md:text-base"
          >
            <div className="flex">
<div className="  text-4xl px-2 flex items-center justify-center">

            <CalendarIcon className="h-8 w-8 "/>
</div>
            {item.type === "payment" ? (
              <div className="space-y-1">

                <p className="font-semibold">{item.name}</p>
                <p>
                  <span className="">Date & Time:</span>{" "}
                  {item.datetime}
                </p>
                <p>
                  <span className="">City:</span> {item.city}
                </p>
                <p className="text-[#089B1E] font-semibold">
                  Payment Status: {item.status}
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                <p className="">{item.name}</p>
                <p>
                  <span className=" ">Email:</span> {item.email}
                </p>
                <p>
                  <span className=" ">Contact Number:</span>{" "}
                  {item.contact}
                </p>
                <p>
                  <span className=" ">Received:</span>{" "}
                  {item.received}
                </p>
                <p className="text-[#089B1E] font-semibold">
                  Subject: {item.subject}
                </p>
              </div>
            )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
