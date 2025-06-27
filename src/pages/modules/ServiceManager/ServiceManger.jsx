import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { HiOutlineFilter } from "react-icons/hi";
import { BiEdit } from "react-icons/bi";
import { TbTrash } from "react-icons/tb";
import { GiSunflower } from "react-icons/gi";
import { toast } from "react-toastify";
import useFetch from "../../../hooks/useFetch";
import conf from "../../../config";

export default function ServiceManager() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchData] = useFetch();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetchData({
        url: `${conf.baseUrl}/v1/services`,
        method: "GET",
      });
      if (res.success) {
        setServices(res.data || []);
      } else {
        toast.error(res.message || "Failed to load services.");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    try {
      const res = await fetchData({
        url: `${conf.baseUrl}/v1/services/${id}`,
        method: "DELETE",
      });
      if (res.success) {
        toast.success("Service deleted successfully");
        fetchServices(); // Refresh the list
      } else {
        toast.error(res.message || "Failed to delete service.");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    }
  };

  return (
    <div className="p-4 md:p-8 font-sans text-sm w-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 text-xl md:text-2xl font-semibold">
        <GiSunflower className="text-3xl m-1" />
        <h1>Service Manager</h1>
      </div>

      {/* Top Bar */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-6 w-full">
        <div className="flex items-center w-full lg:w-2/3 border rounded-md shadow-sm px-3 py-2 bg-white">
          <FiSearch className="text-gray-500 md:text-xl mr-2" />
          <input
            type="text"
            placeholder="Search Service name"
            className="w-full outline-none text-sm"
          />
        </div>
        <div className="flex md:gap-8 gap-2 w-full lg:w-auto">
          <select className="text-black border-gray-300 border-2 font-semibold rounded-md md:px-4 px-1 py-2 bg-white md:text-xl">
            <option>All Category</option>
          </select>
          <button className="flex items-center justify-center gap-2 border-2 border-gray-300 md:px-4 px-1 py-2 rounded-md bg-white md:text-xl font-medium">
            Filter
            <HiOutlineFilter size={20} />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto">
        {loading ? (
          <p className="text-center py-6">Loading services...</p>
        ) : (
          <table className="min-w-full text-sm text-left">
            <thead className="font-bold">
              <tr>
                <th className="px-4 py-3">Service Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Edit</th>
                <th className="px-4 py-3">Remove</th>
              </tr>
            </thead>
            <tbody>
              {services.length > 0 ? (
                services.map((service) => (
                  <tr key={service.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">{service.name}</td>
                    <td className="px-4 py-3">{service.category || "Skin Treatment"}</td>
                    <td className="px-4 py-3 text-green-600 font-medium">
                      {service.status || "Active"}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      <BiEdit className="cursor-pointer text-2xl" />
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      <TbTrash
                        className="cursor-pointer text-2xl text-red-600"
                        onClick={() => handleDelete(service.id)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-4 py-4" colSpan="5">
                    No services found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
