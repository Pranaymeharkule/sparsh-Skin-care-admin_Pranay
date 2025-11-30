import React, { useState } from "react";
import CheckIcon from "./icons/CheckIcon"; // change if different
import ReplyIcon from "./icons/ReplyIcon"; // change if different

const InquiryCard = ({ inquiry, onMarkAsRead, onSendReply }) => {
  const [replyVisible, setReplyVisible] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");

  return (
    <div className="border border-gray-300 rounded-lg px-4 py-3 bg-white shadow-sm">
      <div className="flex justify-between">
        <div>
          <p className="text-lg font-semibold">{inquiry.fullName}</p>
          <p className="text-sm text-gray-600">{inquiry.email}</p>
          <p className="text-sm mt-2">{inquiry.message}</p>
        </div>

        <div className="text-right">
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${
              inquiry.status === "New"
                ? "bg-yellow-200"
                : inquiry.status === "Pending"
                ? "bg-orange-200"
                : inquiry.status === "Replied"
                ? "bg-green-200"
                : "bg-gray-200"
            }`}
          >
            {inquiry.status}
          </span>

          <div className="mt-2 flex gap-3 justify-end">
            {/* BUTTON: MARK AS READ */}
            <button
              className="text-sm text-blue-600 hover:underline"
              onClick={() => onMarkAsRead(inquiry._id)}
            >
              Mark as Read
            </button>

            {/* BUTTON: SHOW REPLY INPUT */}
            <button
              className="text-sm text-purple-600 hover:underline"
              onClick={() => setReplyVisible(!replyVisible)}
            >
              Reply
            </button>
          </div>
        </div>
      </div>

      {/* REPLY INPUT AREA */}
      {replyVisible && (
        <div className="mt-3">
          <textarea
            className="w-full border border-gray-400 rounded px-3 py-2 text-sm"
            placeholder="Write a reply message…"
            rows="3"
            value={replyMessage}
            onChange={(e) => setReplyMessage(e.target.value)}
          />

          <div className="flex justify-end mt-2">
            <button
              className="px-4 py-1 bg-black text-white rounded text-sm"
              onClick={() => {
                onSendReply(inquiry._id, replyMessage);
                setReplyMessage("");
                setReplyVisible(false);
              }}
            >
              Send Reply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InquiryCard;
