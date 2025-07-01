import React, { useState } from "react";
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";
import useFetch from "../hooks/useFetch"; // adjust path if needed

const InquiryCard = ({ inquiry }) => {
  const [fetchData] = useFetch();
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replySent, setReplySent] = useState(false);
  const [isRead, setIsRead] = useState(inquiry.isRead || false);

  //  Handle "Mark as Read"
  const handleMarkAsRead = async () => {
    try {
      const response = await fetchData({
        method: "PUT",
        url: `https://dr-website-backend.onrender.com/api/v1/contactInquiry/mark-read/${inquiry._id}`,
      });

      console.log("Marked as read:", response);
      alert("Marked as read!");
      setIsRead(true);
    } catch (error) {
      console.error("Failed to mark as read:", error);
      alert("Failed to mark as read.");
    }
  };

  //  Handle Reply Submit
  const handleReplyClick = async () => {
    if (!showReplyBox) {
      setShowReplyBox(true);
      return;
    }

    if (!replyText.trim()) {
      alert("Please enter a reply.");
      return;
    }

    try {
      const response = await fetchData({
        method: "PUT",
        url: `https://dr-website-backend.onrender.com/api/v1/contactInquiry/reply/${inquiry._id}`,
        data: {
          replyMessage: replyText,
        },
      });

      alert("Reply sent successfully!");
      setReplySent(true);
      setShowReplyBox(false);
      console.log(response);
    } catch (error) {
      console.error("Failed to send reply:", error);
      alert("Failed to send reply.");
    }
  };

  return (
    <div className="border-b-2 border-[#7F7D7D] py-3 space-y-2">
      {/* Status */}
      <p
        className={`text-black px-4 border py-1 rounded-lg text-sm mb-2 w-fit ${
          inquiry.status === "Pending"
            ? "border-[#f4c1c1] bg-[#f3cfcf]"
            : "border-[#c6f781] bg-[#d8ffa2]"
        }`}
      >
        {inquiry.status}
      </p>

      {/* Subject */}
      <p className="text-left ml-2 font-semibold text-sm">
        Subject: <span>{inquiry.subject}</span>
      </p>

      {/* User Info */}
      <div className="flex flex-wrap gap-x-10 gap-y-3 ml-2">
        <span className="flex items-center gap-1">
          <FaUser />
          {inquiry.fullName}
        </span>
        <span className="flex items-center gap-1">
          <FaEnvelope />
          {inquiry.email}
        </span>
        <span className="flex items-center gap-1">
          <FaPhone />
          {inquiry.mobile}
        </span>
      </div>

      {/* Existing Reply */}
      {inquiry.note && (
        <p className="text-left ml-2 ">
         {inquiry.note}
        </p>
      )}

      {/* Actions */}
      <div className="flex items-start gap-3 mt-2 text-sm">
        {/*  Mark as Read */}
        <button
          onClick={handleMarkAsRead}
          disabled={isRead}
          className={`flex items-center gap-2 border px-4 py- rounded-lg font-medium ${
            isRead
              ? "border-green-400 text-green-600 bg-green-50 cursor-not-allowed"
              : "border-[#8380d3] text-black"
          }`}
        >
          {isRead ? (
            <>
              <span>Read</span>
              <span className="text-green-00 text-lg">✔</span>
            </>
          ) : (
            "Mark as Read"
          )}
        </button>

        {/*Show textarea when reply is clicked */}
        {showReplyBox && (
          <textarea
            rows="1"
            value={replyText}
            onChange={e => setReplyText(e.target.value)}
            placeholder="Type your reply here..."
            className="border border-gray-300 rounded-lg px-3 py-1 w-64 resize-none"
          />
        )}

        <button
          onClick={handleReplyClick}
          className="bg-[#8380d3] text-white px-4 py-1 rounded-lg cursor-pointer font-semibold"
        >
          {replySent ? "Replied" : showReplyBox ? "Send" : "Reply"}
        </button>
      </div>
    </div>
  );
};

export default InquiryCard;