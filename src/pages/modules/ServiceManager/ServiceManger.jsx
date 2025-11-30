import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import EditIcon from "../../../components/icons/EditIcon";
import TrashIcon from "../../../components/icons/TrashIcon";
import ServiceManagerIcon from "../../../components/icons/ServiceManagerIcon";
import { toast } from "react-toastify";
import useFetch from "../../../hooks/useFetch";
import conf from "../../../config";

export default function ServiceManager() {
  const [services, setServices] = useState([]);
  const [fetchData] = useFetch();

  // EDIT STATES
  const [editService, setEditService] = useState(null);
  const [editName, setEditName] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editStatus, setEditStatus] = useState("");

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}/services`, // FIXED URL
      });

      if (res.success) {
        setServices(res.services);
      }
    } catch (err) {
      toast.error("Failed to load services");
    }
  };

  const removeService = async (id) => {
    try {
      await fetchData({
        method: "DELETE",
        url: `${conf.apiBaseUrl}/services/${id}`, // FIXED URL
      });

      toast.success("Deleted");
      loadServices();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const openEditModal = (service) => {
    setEditService(service);
    setEditName(service.name);
    setEditCategory(service.category);
    setEditStatus(service.status);
  };

  const updateService = async () => {
    try {
      await fetchData({
        method: "PUT",
        url: `${conf.apiBaseUrl}/services/${editService._id}`, // FIXED URL
        data: {
          name: editName,
          category: editCategory,
          status: editStatus,
        },
      });

      toast.success("Service updated");
      setEditService(null);
      loadServices();
    } catch (err) {
      toast.error("Update failed");
    }
  };

  return (
    <div className="p-4 text-sm w-full">
      <div className="flex items-center gap-3 mb-4 text-xl font-semibold">
        <ServiceManagerIcon className="text-3xl m-1" />
        <h1>Service Manager</h1>
      </div>

      <div className="flex items-center w-full border border-gray-500 rounded-md px-3 py-2 bg-white mb-6">
        <FiSearch className="text-gray-500 text-xl mr-2" />
        <input
          type="text"
          placeholder="Search Service name"
          className="w-full outline-none text-sm"
        />
      </div>

      <table className="min-w-full text-lg text-left">
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
          {services.map((s) => (
            <tr key={s._id} className="hover:bg-gray-50">
              <td className="px-4">{s.name}</td>
              <td className="px-4">{s.category}</td>
              <td
                className={`px-4 font-medium ${
                  s.status === "Active" ? "text-green-600" : "text-gray-500"
                }`}
              >
                {s.status}
              </td>
              <td
                className="px-4 py-2 cursor-pointer"
                onClick={() => openEditModal(s)}
              >
                <EditIcon />
              </td>
              <td
                className="px-4 py-2 cursor-pointer"
                onClick={() => removeService(s._id)}
              >
                <TrashIcon />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* EDIT MODAL */}
     {editService && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
    <div className="bg-white border border-gray-300 rounded-lg p-5 shadow-xl w-[450px]">

      <h2 className="text-xl font-semibold mb-4 border-b pb-2">
        Edit Service
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Service Name
        </label>
        <input
          type="text"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          className="w-full border border-gray-400 rounded-md px-3 py-2 text-sm outline-none focus:border-black"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Category
        </label>
        <input
          type="text"
          value={editCategory}
          onChange={(e) => setEditCategory(e.target.value)}
          className="w-full border border-gray-400 rounded-md px-3 py-2 text-sm outline-none focus:border-black"
        />
      </div>

      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Status
        </label>
        <select
          value={editStatus}
          onChange={(e) => setEditStatus(e.target.value)}
          className="w-full border border-gray-400 rounded-md px-3 py-2 text-sm outline-none focus:border-black"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <div className="flex justify-end gap-3">
        <button
          className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300 transition"
          onClick={() => setEditService(null)}
        >
          Cancel
        </button>

        <button
          className="px-4 py-2 text-sm bg-black text-white rounded hover:bg-gray-800 transition"
          onClick={updateService}
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
