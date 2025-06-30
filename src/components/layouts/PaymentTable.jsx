// src/components/PaymentTable.jsx
import React from "react";

export default function PaymentTable({ data = [] }) {
  return (
    <div className="w-full overflow-x-auto rounded">
      <table className="w-full min-w-[700px] text-sm border-separate border-spacing-0">
        <thead className="bg-gray-50 text-left">
          <tr>
            {[
              "Sr. No.",
              "Patient Name",
              "Contact",
              "Date & Time",
              "City",
              "Source",
              "UTR / Ref. No.",
              "Status",
            ].map((header) => (
              <th
                key={header}
                className="px-3 py-2 text-left font-medium text-gray-700 whitespace-nowrap"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              className="border-b text-left  border-dotted border-blue-300"
            >
              <td className="px-3 py-2">{item.id}</td>
              <td className="px-3 py-2">{item.name}</td>
              <td className="px-3 py-2">{item.contact}</td>
              <td className="px-3 py-2">{item.datetime}</td>
              <td className="px-3 py-2 ">{item.city}</td>
              <td className="px-3 py-2 ">{item.source}</td>
              <td className="px-3 py-2 ">{item.ref}</td>
              <td className="px-3 py-2 text-[#00D921] font-medium">
                {item.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
