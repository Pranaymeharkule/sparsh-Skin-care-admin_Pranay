import React, { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
// import uploadIcon from "../../../assets/svg/upload.svg";
// import image1 from "../../../assets/Gallery/image1.png";
// import image2 from "../../../assets/Gallery/image2.png";
// import image3 from "../../../assets/Gallery/image3.png";
// import image4 from "../../../assets/Gallery/image4.png";
// import image5 from "../../../assets/Gallery/image5.png";
// import image6 from "../../../assets/Gallery/image6.png";
// import image7 from "../../../assets/Gallery/image7.png";
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

  useEffect(() => {
    const fetchBookingOverview = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetchData({
          method: "GET",
          url: `${conf.apiBaseUrl}/gallery`,
        });
        if (res.success) {
          setImageList(res.data);
        } else {
          toast.error(res.message || "Failed to Images");
        }
      } catch (err) {
        const message = err.message || "Something went wrong!";
        toast.error(message);
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingOverview();
  }, [fetchData]);

  const handleDetele = async (id) => {
    setSelectedImageId(id);
    setShowCancelPopup(true);
  };

  const handleCancelConfirm = async (id) => {
    if (loading || deleteLoading) return;
    if (!id) return;

    try {
      setDeleteLoading(true);
      const res = await fetchData({
        method: "DELETE",
        url: `${conf.apiBaseUrl}/gallery/${id}`,
      });
      
      if (res.success) {
        toast.success("Image deleted successfully!");
        setImageList((prevList) => prevList.filter((img) => img._id !== id));
      } else {
        toast.error(res.message || "Failed to delete image.");
      }
    } catch (err) {
      const message = err.message || "Something went wrong!";
      toast.error(message);
    } finally {
      setShowCancelPopup(false);
      setDeleteLoading(false)
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Top Controls */}
      <PageHeader
        title={"Gallery Manager"}
        subtitle={"Edit and add photos in the gallery section."}
      />

      <div className="h-full overflow-y-auto mt-2">
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 px-2"> */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-10 px-2">
          <ImageUploader setImageList={setImageList} />
          {imageList.map((img) => (
            <div key={img._id} className="bg-[#C1A2AC] relative rounded-2xl">
              <GalleryCard image={img.image} />
              <div
                className="absolute bottom-3 right-3 cursor-pointer"
                onClick={() => handleDetele(img._id)}
              >
                <DeleteIcon />
              </div>
            </div>
          ))}
        </div>
      </div>
      {showCancelPopup && (
        <CancelOverlay
          onConfirm={() => handleCancelConfirm(selectedImageId)}
          onCancel={() => setShowCancelPopup(false)}
          message={"Are you sure you want to delete image?"}
          loading={deleteLoading}
        />
      )}
    </div>
  );
};

export default Gallery;
