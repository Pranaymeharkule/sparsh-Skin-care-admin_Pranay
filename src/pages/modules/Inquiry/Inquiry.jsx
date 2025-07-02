import React, { useEffect, useState } from "react";
import axios from "axios";
import InquiryCard from "../../../components/InquiryCard";
import { PageHeader } from "../../../components/common/PageHeader";
import DownIcon from "../../../components/icons/DownIcon";
import SearchIcon from "../../../components/icons/SearchIcon";
import useFetch from "../../../hooks/useFetch"; // Adjust path if different
import conf from "../../../config";

const InquiryManager = () => {
  const [inquiries, setInquiries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [fetchData] = useFetch();

  useEffect(() => {
    fetchInquiries();
    fetchStatusCounts();
  }, []);

  const fetchInquiries = async () => {
    try {
      const response = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}/contactInquiry`,
      });

      console.log("API response:", response);
      setInquiries(response.inquiries);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch inquiries:", error);
      setError("Failed to load inquiries.");
      setLoading(false);
    }
  };

  // Filtered data based on search and status
  const filteredInquiries = Array.isArray(inquiries)
    ? inquiries.filter((item) => {
        const name = item?.fullName?.toLowerCase() || "";
        const status = item?.status || "";

        const matchSearch = name.includes(searchTerm.trim().toLowerCase());
        const matchStatus =
          statusFilter === "All Status" || status === statusFilter;

        return matchSearch && matchStatus;
      })
    : [];

  // Count inquiries by status

  const [statusCounts, setStatusCounts] = useState({
    Pending: 0,
    New: 0,
    Replied: 0,
  });

  const fetchStatusCounts = async () => {
    try {
      const response = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}/contactInquiry/count`,
      });

      console.log("API response:", response);
      setStatusCounts(response.counts);
      console.log("status:", statusCounts);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch inquiries:", error);
      setError("Failed to load inquiries.");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-[56rem]">
      <PageHeader
        title="Contact Inquiry Manager"
        subtitle="Manage & Respond to customer Inquiry"
      />

      {/* Status Cards */}
      <div className="flex gap-4">
        <StatusCard
          label="Pending"
          count={statusCounts.Pending}
          bg="#FEEBE4"
          border="#FFCACA"
        />
        <StatusCard
          label="New"
          count={statusCounts.New}
          bg="#FFF5D3"
          border="#FFE08F"
        />
        <StatusCard
          label="Replied"
          count={statusCounts.Replied}
          bg="#D8FFA2"
          border="#C8FF7D"
        />
      </div>

      {/* Search & Filter */}
      <div className="flex items-center gap-8 mt-4 text-sm">
        <div className="relative w-full">
          <SearchIcon className="absolute inset-y-0 left-3 top-2 text-xl" />
          <input
            type="text"
            placeholder="Search by Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border rounded-lg border-[#a0a0a0] pl-10 pr-4 py-2 outline-none"
          />
        </div>

        <div className="relative">
          <select
            className="border rounded-lg font-semibold border-[#A0A0A0] px-3 py-2 appearance-none pr-8"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All Status</option>
            <option>Pending</option>
            <option>Viewed</option>
            <option>Replied</option>
          </select>
          <DownIcon className="absolute right-2 top-2.5 pointer-events-none text-lg" />
        </div>
      </div>

      {/* Inquiry List */}
      <div className="px-2 mt-2 space-y-2 flex-1 overflow-y-auto scrollbar-hidden min-h-0">
        {loading ? (
          <p className="text-gray-600 text-center mt-6">Loading inquiries...</p>
        ) : error ? (
          <p className="text-red-500 text-center mt-6">{error}</p>
        ) : filteredInquiries.length > 0 ? (
          filteredInquiries.map((item, idx) => (
            <InquiryCard inquiry={item} key={idx} />
          ))
        ) : (
          <p className="text-gray-500 text-center mt-4">No inquiries found.</p>
        )}
      </div>
    </div>
  );
};

// Reusable StatusCard component
const StatusCard = ({ label, count, bg, border }) => (
  <div
    className="rounded-2xl px-4 py-2 w-32 text-center"
    style={{ backgroundColor: bg, border: `1px solid ${border}` }}
  >
    <p className="text-base font-medium">{label}</p>
    <p className="text-3xl font-semibold">{count}</p>
  </div>
);

export default InquiryManager;
