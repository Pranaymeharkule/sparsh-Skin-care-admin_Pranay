import React, { useEffect, useState } from "react";
import GalleryCard from "../../../components/GallaryCard";
import { PageHeader } from "../../../components/common/PageHeader";
import useFetch from "../../../hooks/useFetch";
import conf from "../../../config";
import { toast } from "react-toastify";
import ImageUploader from "../../../components/ImageUploader";
import DeleteIcon from "../../../components/icons/DeleteIcon";
import CancelOverlay from "../../../components/Overlay/CancelOverlay";

const Gallery = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [imageList, setImageList] = useState([]);

  const [selectedImageId, setSelectedImageId] = useState("");
  const [showCancelPopup, setShowCancelPopup] = useState(false);

  const [fetchData] = useFetch();

  // ---------------- FETCH IMAGES ---------------- //
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);

      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}/gallery`,
      });

      if (res.success) {
        setImageList(res.data);
      } else {
        toast.error(res.message || "Failed to load gallery images");
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- DELETE IMAGE ---------------- //
  const handleDelete = (id) => {
    setSelectedImageId(id);
    setShowCancelPopup(true);
  };

  const confirmDelete = async (id) => {
    if (!id || deleteLoading) return;

    try {
      setDeleteLoading(true);

      const res = await fetchData({
        method: "DELETE",
        url: `${conf.apiBaseUrl}/gallery/${id}`,
      });

      if (res.success) {
        toast.success("Image deleted successfully!");

        setImageList((prev) => prev.filter((img) => img._id !== id));
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong!");
    } finally {
      setShowCancelPopup(false);
      setDeleteLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="Gallery Manager"
        subtitle="Edit and add photos in the gallery section."
      />

      <div className="h-full overflow-y-auto mt-2 px-2">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-10">

          {/* Upload button section */}
          <ImageUploader setImageList={setImageList} />

          {/* Gallery Items */}
          {imageList.length === 0 ? (
            <p className="text-gray-500 text-center col-span-full">
              No images found.
            </p>
          ) : (
            imageList.map((img) => (
              <div
                key={img._id}
                className="bg-[#C1A2AC] relative rounded-2xl overflow-hidden"
              >
                <GalleryCard image={img.image} />

                <button
                  className="absolute bottom-3 right-3 cursor-pointer"
                  onClick={() => handleDelete(img._id)}
                >
                  <DeleteIcon />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {showCancelPopup && (
        <CancelOverlay
          onConfirm={() => confirmDelete(selectedImageId)}
          onCancel={() => setShowCancelPopup(false)}
          message="Are you sure you want to delete this image?"
          loading={deleteLoading}
        />
      )}
    </div>
  );
};

export default Gallery;
