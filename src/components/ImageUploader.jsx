import React, { useRef, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import uploadIcon from "../assets/svg/upload.svg"; // replace with your actual path
import useFetch from "../hooks/useFetch";
import conf from "../config";
import { toast } from "react-toastify";
import DeleteIcon from "./icons/DeleteIcon";

export default function ImageUploader({ setImageList }) {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchData] = useFetch();

  const handleImageUpload = () => {
    if (loading) return;

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setImage(file);
        handleUploadImage(file);
      }
    };
    input.click();
  };

  const handleUploadImage = async (image) => {
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);
    setLoading(true);
    try {
      const res = await fetchData({
        method: "POST",
        url: `${conf.apiBaseUrl}/gallery`,
        data: formData,
      });

      console.log(res);

      if (res.success) {
        const imageUrl = res.data.image;

        setImageList((prev) => [{ image: imageUrl }, ...prev]);

        toast.success("Appointment cancelled successfully!");
      } else {
        toast.error(res.message || "Failed to cancel appointment.");
      }
    } catch (err) {
      const message = err.message || "Something went wrong!";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className="w-full max-w-[20rem] h-64 rounded-2xl flex flex-col items-center justify-center gap-y-2 bg-[#E8E8E8] border border-[#D6D6D6] cursor-pointer"
        onClick={handleImageUpload}
      >
        
        {loading ? (
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-[#716FCD] rounded-full animate-spin"></div>
            <p className="mt-4 text-sm text-gray-500">Uploading...</p>
          </div>
        ) : (
          <>
            <CiCirclePlus className="text-4xl" />
            <p>Add new Image</p>
            <p className="flex items-center gap-2">
              <img src={uploadIcon} alt="Upload" className="w-6 h-6" />
              Upload Image
            </p>
          </>
        )}
      </div>
    </div>
  );
}

//   setImageList(prev =>[{image}, ...prev])
