import React, { useEffect, useRef } from "react";

export default function CancelOverlay({ onConfirm, onCancel, message, loading }) {
  const modalRef = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onCancel();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onCancel]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        className="bg-white rounded-lg px-6 py-6 max-w-md w-full text-center shadow-lg"
        ref={modalRef}
      >
        <h2 className="text-lg font-medium mb-6">
          {message}
        </h2>

        <div className="flex justify-center gap-6">
          <button
            onClick={onCancel}
            className="border-2 border-[#1D1283] text-[#1D1283] font-semibold px-6 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            No
          </button>

          <button
            onClick={onConfirm}
            className="bg-[#1D1283] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#140c66] transition"
            // disabled={loading}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
