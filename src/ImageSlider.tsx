import React, { useState } from "react";
import "./ImageSlider.css";

interface ImageSliderProps {
  images: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 左の矢印
  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // 右の矢印
  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="image-slider-container-dogrun">
      {/* 左の矢印 */}
      <button onClick={handlePrev} className="arrow-button left-arrow">
        &lt;
      </button>

      {/* 画像表示 */}
      <div className="image-dogrun">
        <img
          src={images[currentImageIndex]}
          alt={`Image ${currentImageIndex + 1}`}
          className="slider-image active"
        />
      </div>

      {/* 右の矢印 */}
      <button onClick={handleNext} className="arrow-button right-arrow">
        &gt;
      </button>
    </div>
  );
};

export default ImageSlider;
