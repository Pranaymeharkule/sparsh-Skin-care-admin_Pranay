import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import conf from "../config";
import { toast } from "react-toastify";

const ImageUploader = ({ setImageList }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchData] = useFetch();

  const handleUpload = async (e) => {
    e.preventDefault(); // 🔥 VERY IMPORTANT

    if (!file) {
      toast.error("Please select an image!");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);

      const res = await fetchData({
        method: "POST",
        url: `${conf.apiBaseUrl}/gallery`, // ✅ FIXED
        data: formData,
      });

      if (res.success) {
        toast.success("Image uploaded successfully!");
        setImageList((prev) => [res.data, ...prev]);
        setFile(null);
      } else {
        toast.error(res.message || "Upload failed");
      }
    } catch (err) {
      toast.error(err.message || "Upload failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleUpload}
      className="bg-gray-100 p-4 rounded-xl text-center border border-gray-300"
    >
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-2"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white px-4 py-2 rounded-lg"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </form>
  );
};

export default ImageUploader;
