import { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import React from "react";


export default function Notification() {
  const [notification, setNotification] = useState([]);

  useEffect(() => {
    fetchNotification();
  }, []);

  const fetchNotification = async () => {
    try {
      const res = await axiosInstance.get("/notification");
      setNotification(res.data);
    } catch (error) {
      console.error("Failed to load notifications:", error);
    }
  };

  return (
    <div className="w-full p-6">
      <h2 className="text-xl font-semibold mb-4">Notifications</h2>

      {notification.length === 0 ? (
        <p>No notifications found</p>
      ) : (
        notification.map((item, index) => (
          <div
            key={index}
            className="border p-4 rounded-lg mb-4 bg-white"
          >
            {item.type === "payment" ? (
              <>
                <p className="font-semibold">{item.name}</p>
                <p>Date: {item.datetime}</p>
                <p>City: {item.city}</p>
                <p className="text-green-600">Status: {item.status}</p>
              </>
            ) : (
              <>
                <p className="font-semibold">{item.name}</p>
                <p>Email: {item.email}</p>
                <p>Contact: {item.contact}</p>
                <p className="text-green-600">{item.subject}</p>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}
