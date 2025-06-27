import React from "react";
import { CiCirclePlus } from "react-icons/ci";
import uploadIcon from "../../../assets/svg/upload.svg"; 
import image1 from "../../../assets/Gallery/image1.png";
import image2 from "../../../assets/Gallery/image2.png";
import image3 from "../../../assets/Gallery/image3.png";
import image4 from "../../../assets/Gallery/image4.png";
import image5 from "../../../assets/Gallery/image5.png";
import image6 from "../../../assets/Gallery/image6.png";
import image7 from "../../../assets/Gallery/image7.png";
import GalleryCard from "../../../components/GallaryCard";

const imageList = [image1, image2, image3, image4, image5, image6, image7];

const Gallery = () => {
  return (
    <div className="flex flex-col h-full">
      {/* Top Controls */}
      <div className="px-6 pt-6 mb-4">
        {/* Heading */}
        <div className="w-fit flex flex-col items-start">
          <h2 className="text-2xl font-semibold">Gallery Manager</h2>
          <p className="text-sm text-gray-500">
            Edit and add photos in the gallery section.
          </p>
        </div>
      </div>

      <div className="h-full overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 px-6">
          <div className="w-full h-64 rounded-lg flex flex-col items-center justify-center gap-y-2 bg-[#E8E8E8] border border-[#D6D6D6] cursor-pointer">
            <CiCirclePlus className="text-4xl" />
            <p>Add new Image</p>
            <p className="flex items-center gap-2">
              <img src={uploadIcon} alt="Upload" className="w-6 h-6" />
              Upload Image
            </p>
          </div>
          {imageList.map((url, index) => (
            <GalleryCard key={index} image={url} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
