import React from "react"; 

const GalleryCard = ({ image }) => { 
  return (
    <div className="w-full h-64 overflow-hidden rounded-lg ">
      <img src={image} alt="gallery" className="w-full h-full object-cover" /> 
    </div>
  );
};

export default GalleryCard;
